const db = require("../models");

module.exports = {
    registerDuplicateEmail(req, res, next) {
        db.users.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    auth: false,
                    message: "Error",
                    errors: "Email is already taken!"
                });
                return;
            }
            next();
        });
	},
	loginCheckEmail(req, res, next) {
        db.users.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                res.status(400).send({
                    auth: false,
                    message: "Error",
                    errors: "Email not Exist"
                });
                return;
            }
            next();
        });
	},
}