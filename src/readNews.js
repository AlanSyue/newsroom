const thenify = require('thenify');
const inquirer = require('inquirer');
const feed = thenify(require('feed-read-parser'));
const cheerio = require('cheerio');
const ora = require('ora');
const axios = require('axios');
const extractor = require('unfluff');

const { getTitleQuestion } = require('./questions');

const getCommonPrefixIndex = (articles, maxCommonPrefixLength = 80) => {
  const commonPrefixIndex = articles.reduce((prefixIndex, article, idx) => {
    if (idx !== 0) {
      const currentStr = article.title;
      const prevStr = articles[idx - 1].title;
      for (let j = 0; j < prefixIndex; j += 1) {
        if (prevStr[j] !== currentStr[j]) {
          return j;
        }
      }
    }
    return prefixIndex;
  }, maxCommonPrefixLength);

  return commonPrefixIndex;
};

const showhNewsContent = async (title, feedUrl) => {
  await axios
    .get(feedUrl)
    .then(response => {
      const content = extractor(response.data);
      console.log('\x1b[32m', `\n title: ${title}\n`);
      console.log('\x1b[36m', `${content.text}\n`);
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = async (sourceInfo, pageSize = 10) => {
  const spinner = ora(
    `Trying to fetch the ${sourceInfo.title}'s latest news...`
  ).start();

  const articles = (await feed(sourceInfo.feedUrl)).slice(0, pageSize);

  const commonPrefixIndex = getCommonPrefixIndex(articles);

  // {
  //   title1: url1,
  //   title2: url2,
  // }
  let articleMap = {};

  articles.forEach(article => {
    const { title, link } = article;
    articleMap[title.slice(commonPrefixIndex)] = link;
  });

  spinner.succeed();

  let titleAnswer = await inquirer.prompt([
    getTitleQuestion(Object.keys(articleMap), pageSize),
  ]);

  // check the feed is made by https://curated.co
  const isCuratedCo = /issues\.rss/.test(sourceInfo.feedUrl);
  if (isCuratedCo) {
    articleMap = {};
    const regex = new RegExp(titleAnswer.title);

    articles.forEach(article => {
      if (regex.test(article.title)) {
        const $ = cheerio.load(article.content);
        // eslint-disable-next-line func-names
        $('h4 a').each(function() {
          const title = $(this).text();
          const url = $(this).attr('href');
          articleMap[title] = url;
        });
      }
    });

    titleAnswer = await inquirer.prompt([
      getTitleQuestion(Object.keys(articleMap), pageSize),
    ]);
  }

  const titleList = titleAnswer.title;
  const feedsResult = [];
  for (let i = 0; i < titleList.length; i += 1) {
    const title = titleList[i];
    const feedUrl = articleMap[title];
    feedsResult.push(showhNewsContent(title, feedUrl));
  }
  await Promise.all(feedsResult);
  return true;
};
