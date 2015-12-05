var ModelValidator = require('../src/lib/smart-model-validator.js');

describe('#node-model-validator', function() {
    var modelValidator;
    var rules = {};


    before(function () {
        modelValidator = new ModelValidator();
        rules = {name: {require:true,
                        type:'string'},
                 
                 age: {require:false,
                       type: 'int'}   
                };
    });

     it('basic validation check', function(done) {
        modelValidator.setRules(rules);
        modelValidator.setModel({name: 'Smith', age: 26});
        assert.equal(modelValidator.isValid(), true);

        done();
    });

      it('require check', function(done) {
        modelValidator.setRules(rules);
        modelValidator.setModel({age: 26});
        assert.equal(modelValidator.isValid(), false);

        done();
    });

    it('type check', function(done) {
        modelValidator.setRules(rules);
        modelValidator.setModel({name: 'Mr Smith', age: 'r26'});
        assert.equal(modelValidator.isValid(), false);

        done();
    });
});