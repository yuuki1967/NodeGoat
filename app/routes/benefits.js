var BenefitsDAO = require("../data/benefits-dao").BenefitsDAO;

function BenefitsHandler(db) {
    "use strict";

    var benefitsDAO = new BenefitsDAO(db);

    this.displayBenefits = function(req, res, next) {

        benefitsDAO.getAllNonAdminUsers(function(error, users) {

            if (error) return next(error);
            var hsts = require('hsts')
            res.use(hsts({maxAge: 31536000})) 
            return res.render("benefits", {
                users: users,
                user: {
                    isAdmin: true
                }
            });
        });
    };

    this.updateBenefits = function(req, res, next) {
        var userId = req.body.userId;
        var benefitStartDate = req.body.benefitStartDate;

        benefitsDAO.updateBenefits(userId, benefitStartDate, function(error) {

            if (error) return next(error);

            benefitsDAO.getAllNonAdminUsers(function(error, users) {
                var data;

                if (error) return next(error);

                data = {
                    users: users,
                    user: {
                        isAdmin: true
                    },
                    updateSuccess: true
                };

                var hsts = require('hsts')
                res.use(hsts({maxAge: 31536000})) 
                return res.render("benefits", data);
            });
        });
    };
}

module.exports = BenefitsHandler;
