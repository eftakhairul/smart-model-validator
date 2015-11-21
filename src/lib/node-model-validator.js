(function () {
    "use strict";

    var validator = require('validator');

    /**
     * Node Model Validator.
     *
     * @constructor
     */
    var NodeModelValidator = function() {
        this.rules          = {};
        this.errors         = {};
        this.model          = {};
    };


    /**
     * Set Object of Rules
     *
     * @param {Object} rules to be added
     * @public
     */
    NodeModelValidator.prototype.setRules = function(rules) {
        for (var property in rules) {
            if (rules.hasOwnProperty(property)) {
                this.rules[property.trim().toString()] = {
                    require : rules[property].hasOwnProperty('require') ? rules[property].require : false,
                    type    : rules[property].hasOwnProperty('type') ? rules[property].type : false
                }
            }
        }
    };

    /**
     * Set Model Object
     *
     * @example: nodeModelValidator.setModel({name: 'Roy', age: 35});
     *
     * @param {Object} model
     * @public
     */
    NodeModelValidator.prototype.setModel = function(model) {
        if ( (Object.prototype.toString.call(model)) != "[object Object]" ||
            (Object.keys(model).length == 0)) throw "This is not a valid model";

        this.model  = model;
    };


    /**
     * Add new Rule
     *
     * @param {String} property name
     * @param {Bool} is_require or not
     * @param {String|Object} name of validator or referece of validator method
     * @public
     */
    NodeModelValidator.prototype.AddRule = function(property, is_required, type) {
        this.rules[property.trim().toString()] = {
            require : typeof is_required !== 'undefined' ? is_required : false,
            type    : type
        }
    };

    /**
     * Return the object of errors
     *
     * @public
     * @return Object
     */
    NodeModelValidator.prototype.getErrors = function() {
        return this.errors;
    };





    /**
     * check validation
     *
     * If model is valid against the provide validation rueles
     * It return true, neither it return false
     *
     * @param {Object|null} model for validator
     */
    NodeModelValidator.prototype.isValid = function(model) {
        this.model  = typeof model !== 'undefined' ? model : this.model;
        this.errors = [];
        var flag    = true;

        if (Object.keys(this.model).length == 0) throw "This is not a valid model";

        for (var key in this.rules) {
            if (this.rules.hasOwnProperty(key)) {

                if (this.rules[key].require &&
                    (!this.model.hasOwnProperty(key) ||
                    (this.model[key] == null || this.model[key] == '') )) {


                    this.flag           = false;
                    this.errors[key]    = "This value is required";
                }

                if (this.rules[key].type &&
                    this.model.hasOwnProperty(key) &&
                    !this.checkValid(this.rules[key].type, this.model[key])) {

                    this.flag        = false;
                    this.errors[key] = "This value is required";
                }
            }
        }


        return this.flag;
    };


    /**
     * Return true if data is valid else false
     *
     * @private
     * @return Bool
     */
    NodeModelValidator.prototype.checkValid = function(validator_method, data) {
        var validator = (typeof validator_method === 'function') ? validator_method : validator['is'+ this.capitalize(validator_method)];

        return validator(data);
    };

    /**
     * Return capitalized string
     *
     * @private
     * @return String
     */
    NodeModelValidator.prototype.capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    /**
     * Exports Node Model validator object
     */
    module.exports = NodeModelValidator;
})();