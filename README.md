# smart-model-validator
[![Build Status](https://travis-ci.org/eftakhairul/smart-model-validator.svg?branch=master)](https://travis-ci.org/eftakhairul/smart-model-validator) [![GitHub issues](https://img.shields.io/github/issues/eftakhairul/smart-model-validator.svg)](https://github.com/eftakhairul/smart-model-validator/issues)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/eftakhairul/smart-model-validator/master/LICENSE)

It validate model as object against specific rules

### Version
0.0.1


### Installation
Install package globally:

```sh
$ npm install -g node-model-validator
```

Or inside project:

```sh
$ npm install npm install node-model-validator --save
```


## Examples
```js
var nodeModelValidator = require('node-model-validator');

nodeModelValidator.setRules({name:{require:true, type: 'string'}});
console.log(nodeModelValidator.isValid({name: 'Mr. Smith'}));   //true
```