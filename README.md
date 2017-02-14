# smart-model-validator
[![Build Status](https://github.com/eftakhairul/smart-model-validator.svg?branch=master)](https://travis-ci.org/eftakhairul/smart-model-validator) [![GitHub issues](https://img.shields.io/github/issues/eftakhairul/smart-model-validator.svg)](https://github.com/eftakhairul/smart-model-validator/issues)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/eftakhairul/smart-model-validator/master/LICENSE)

It validate model as object against specific rules. It's has following features

-- Custom error message
-- Accept custom validation

### Version
0.0.5


### Installation
Install package globally:

```sh
$ npm install -g smart-model-validator
```

Or inside project:

```sh
$ npm install smart-model-validator --save
```


## Examples
```js
//require library
var ModelValidator = require('smart-model-validator');


var modelValidator = new ModelValidator();
modelValidator.setRules({name:{require:true, type: 'string'}});
console.log(modelValidator.isValid({name: 'Mr. Smith'}));   //true
```

## Supported Validation
    - String
    - Int
    - Base64
    - Boolean
    - Date
    - Float
    - IP
    - ISBN
    - SO8601
    - JSON
    - UUID
    
    
