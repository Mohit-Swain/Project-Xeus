const Sequelize = require('sequelize');
const sequelize = require('../../utils/database/sequelize_init');
const uniqid = require('uniqid');
const User = require('../../models/database/user_model');
const UserAuth = {
    getLogin: (req, res, next) => {
        res.render('auth/login.ejs', {
            title: 'login'
        });
    },
    postLogin: (req, res, next) => {
        if (req.body) {
            let email = req.body.email;
            let password = req.body.password;
            return User.findOne({
                where: {
                    email: email
                }
            }).then((result) => {
                if (result) {
                    return res.redirect('/login');
                } else {
                    return User.create({
                        user_id: uniqid(),
                        email: email,
                        password: password
                    }).then((new_user) => {
                        res.redirect('/');
                    });
                }
            }).catch((err) => {
                console.log(err);
            })

        } else {
            return next('no body found');
        }
    }
};

module.exports = UserAuth;