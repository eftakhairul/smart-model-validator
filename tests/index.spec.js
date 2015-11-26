var NodeModelValidator = require('../src/lib/node-model-validator.js');

describe('#node-model-validator', function() {
    var nodeModelValidator;
    var rules = {};


    before(function () {
        nodeModelValidator = new NodeModelValidator();
        rules = {name: {require:true,
                        type:'string'},
                 
                 age: {require:false,
                       type: 'int'}   
                };
    });

     it('basic validation check', function(done) {
        nodeModelValidator.setRules(rules);
        nodeModelValidator.setModel({name: 'Smith', age: 26});
        assert.equal(nodeModelValidator.isValid(), true);

        done();
    });

      it('require check', function(done) {
        nodeModelValidator.setRules(rules);
        nodeModelValidator.setModel({age: 26});
        assert.equal(nodeModelValidator.isValid(), false);

        done();
    });

    it('type check', function(done) {
        nodeModelValidator.setRules(rules);
        nodeModelValidator.setModel({name: 'Mr Smith', age: 'r26'});
        assert.equal(nodeModelValidator.isValid(), false);

        done();
    });
});