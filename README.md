# generator-tribble [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]
> Example Yeoman generator using composition

## Installation
First, install [Yeoman](http://yeoman.io) and generator-tribble using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).
```bash
npm install -g yo
npm install -g generator-tribble
```
Then generate your new project:
```bash
mkdir mynewproject
cd mynewproject
yo tribble
```

## What Tribble does
### This generator creates: 

 - Optional cake build files (uses `generator-cake>=0.2.3` - currently pulling directly from github repo)
 - Optional license file (uses `generator-license`)
 - Creates empty `src` and `lib` folders
 - Creates a base `.gitignore` file
 - Initialises an empty git repository and an initial commit (uses `generator-git-init`)


### Still in development:

 - Enhance default build.cake file
   - Add common arguments and variables
   - Create initial git tag (e.g. 0.0.1)
   - Use gitVersion with tags
 - Option to connect local repo to remote repo already created in TFS
 - Option to create remote repo in TFS

## License 
MIT © [Richard Cooper]()
[npm-image]: https://badge.fury.io/js/generator-tribble.svg
[npm-url]: https://npmjs.org/package/generator-tribble
[travis-image]: https://travis-ci.org/frozenskys/generator-tribble.svg?branch=master
[travis-url]: https://travis-ci.org/frozenskys/generator-tribble
[daviddm-image]: https://david-dm.org/frozenskys/generator-tribble.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/frozenskys/generator-tribble
[coveralls-image]: https://coveralls.io/repos/github/frozenskys/generator-tribble/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/frozenskys/generator-tribble?branch=master