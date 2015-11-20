(function () {
    "use strict";

    /**
     * Node Model Validator.
     *
     *
     * @constructor
     */
    var NodeModelValidator = function() {
        this.flag           = false;
        this.validator      = {};
        this.error          = [];
        this.model          = {};
    };


    /**
     * Set new ISBN number
     *
     * @param {String} isbn to be added
     * @private
     */
    Gisbn.prototype.setIsbn = function(isbn) {
        this.isbn = isbn;
    }

    /**
     * Fetch all information from google book api
     *
     * @param {function} callback method
     * @return Object
     */
    Gisbn.prototype.fetch = function(callback) {

        //check callback
        callback = (typeof callback === 'function') ? callback : function() {};

        // Create the request uri
        var query = {
            key:        this.key,
            country:    this.country,
            q:          'isbn:' + this.isbn
        };

        //Book API Request URI
        var bookRequestUri = baseUrl + querystring.stringify(query);

        var req = https.get(bookRequestUri, function(res) {

            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                // Parse response body
                try {
                    var responseObject = JSON.parse(body);
                    callback(null, {
                        id:             responseObject.items[0].kind,
                        selflink:       responseObject.items[0].selfLink,
                        title:          responseObject.items[0].volumeInfo.title,
                        authors:        responseObject.items[0].volumeInfo.authors,
                        publisher:      responseObject.items[0].volumeInfo.publisher,
                        publisheddate:  responseObject.items[0].volumeInfo.publishedDate,
                        description:    responseObject.items[0].volumeInfo.description,
                        isbn13:         responseObject.items[0].volumeInfo.industryIdentifiers[0].identifier,
                        isbn10:         responseObject.items[0].volumeInfo.industryIdentifiers[1].identifier,
                        totalpages:     parseInt(responseObject.items[0].volumeInfo.pageCount, 10),
                        rating:         responseObject.items[0].volumeInfo.averageRating,
                        previewlink:    responseObject.items[0].volumeInfo.previewLink,
                        smallthumbnail: responseObject.items[0].volumeInfo.imageLinks.smallThumbnail,
                        thumbnail:      responseObject.items[0].volumeInfo.imageLinks.thumbnail
                    });

                } catch (e) {
                    callback(e, null);
                }
            });

            res.on('error', function(err) {
                // handle errors with the request itself
                console.error('Error with the request:', err.message);
                callback(err, null);
            });
        }).end();
    }

    /**
     * Exports googleapis.
     */
    module.exports = NodeModelValidator;
})();