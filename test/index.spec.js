var NodeModelValidator = require('../lib/node-model-validatior');

describe('#node-model-validator', function() {
    var validatore;

    before(function () {
        nodeModelValidator = new NodeModelValidator();
        nodeModelValidator.setRules({name: {require:true, type:string} });
        nodeModelValidator.setModel({name: 'rain'});
    });

    it('is Valid', function(done) {
        validatore.fetch(function(err, book) {
            expect(book).to.be.an('object');
            done();
        });
    });
});