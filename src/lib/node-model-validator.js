(function () {
    "use strict";

   var validator = require('validator');
    
    /**
     * Node Model Validator
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
                    require       : rules[property].hasOwnProperty('require') ? rules[property].require : false,
                    type          : rules[property].hasOwnProperty('type') ? rules[property].type : false,
                    error_message : rules[property].hasOwnProperty('message')? rules[message].message : false
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
     * @example: nodeModelValidator.AddRule('email', true, 'email', 'email has to be valid');
     *
     * @param {String} property name
     * @param {Bool} is_require or not
     * @param {String|Object} name of validator or referece of validator method
     * @param {String} custom error message
     *
     * @public
     */
    NodeModelValidator.prototype.AddRule = function(property, is_required, type, message) {

        if (property == 'undefined') throw new Error('Property can not be empty');

        this.rules[property.trim().toString()] = {
            require         : typeof is_required !== 'undefined' ? is_required : false,
            type            : typeof type        !== 'undefined' ? type : false,
            error_message   : typeof message     !== 'undefined' ? message : false
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

                var isRequiredFail = false;

                if (this.rules[key].require &&
                    (!this.model.hasOwnProperty(key) ||
                    (this.model[key] == null || this.model[key] == '') )) {


                    isRequiredFail = true;
                    flag           = false;
                    this.errors[key]    = this.capitalize(key) + ' is required';
                }

               if (!isRequiredFail &&
                    this.rules[key].type &&
                    this.model.hasOwnProperty(key) &&
                    !this.checkValid(this.rules[key].type, this.model[key])) {

                    flag             = false;
                    this.errors[key] = this.rules[key].error_message? this.rules[key].error_message : 'Field:' + key + ' is not valid';
                }
            }
        };

        return flag;
    };


    /**
     * Return true if data is valid else false
     *
     * @private
     * @return Bool
     */
    NodeModelValidator.prototype.checkValid = function(method, data) {
        var validator_method = (typeof method === 'function') ? method : validator['is'+ this.capitalize(method)];

        return validator_method(data);
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
     * Checking input is string or not
     * 
     * Custromization method added to validator
     *
     * @private
     * @return Bool
     */
    validator.isString = function(value) {
        return (typeof value === 'string' || value instanceof String)? true: false
    };

    /**
     * Exports Node Model validator object
     */
    module.exports = NodeModelValidator;
})();