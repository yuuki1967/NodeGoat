// Error handling middleware

var errorHandler = function(err, req, res, next) {

    "use strict";

    console.error(err.message);
    console.error(err.stack);
    var hsts = require('hsts')
    res.use(hsts({maxAge: 31536000})) 
    res.status(500);
    res.render("error-template", {
        error: err
    });
};

exports.errorHandler = errorHandler;
