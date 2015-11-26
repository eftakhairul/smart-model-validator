# node-model-validator
[![Build Status](https://travis-ci.org/eftakhairul/node-model-validator.svg?branch=master)](https://travis-ci.org/eftakhairul/node-model-validator) [![GitHub issues](https://img.shields.io/github/issues/eftakhairul/node-model-validator.svg)](https://github.com/eftakhairul/node-model-validator/issues)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/eftakhairul/node-model-validator/master/LICENSE.txt)

It validate model as object against specific rules

  - Easy to get all information by ISBN
  - Structure data

You don't have to call manually Google API with ISBN number. This library will do everything for you and return you JSON object.



### Version
1.0.0


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