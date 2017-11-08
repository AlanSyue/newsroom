
<h1 align="center">
  <br>
	<img width=480 src="https://rawgit.com/kpman/newsroom/master/media/logo.png" alt="newsroom">
	<br>
  <br>
</h1>

> 💻 A modern CLI to get your favorite news. 📰

[![npm version](https://img.shields.io/npm/v/newsroom-cli.svg?style=flat)](https://www.npmjs.com/package/newsroom-cli) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

## Install

```shell
npm install -g newsroom-cli
```

The CLI will register `newsroom` and `nr` in your shell.

## Usage

```shell
$ newsroom
```

or with your own awesome [OPML](http://dev.opml.org/) file

```shell
$ newsroom -o <your-awesome-list.opml>
```

You will enter a interactive command line interface.
Choose the source you want to receive and press enter.

```shell
$ newsroom [source] [number]
```

You can see the latest news from source.

<img width=859 src="https://rawgit.com/kpman/newsroom/master/media/screenshot.png" alt="screenshot">

## Help

```shell
$ newsroom --help
```

## Contributing

### Make the change

- Modify the source code in `src` folder.
- Run `npm run lint` from the project root. Make sure it pass the check.

### Push it

- Make a Pull-request

## Related Repos

- [haxor-news](https://github.com/donnemartin/haxor-news)

## Maintainers

- [Daniel Tseng](https://github.com/kpman)
- Waiting for you 🤘

## License

MIT
