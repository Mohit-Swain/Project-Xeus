const Sequelize = require('sequelize');
const sequelize = require('../../utils/database/sequelize_init');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const User = require('../../models/database/user_model');

exports.getLogin = (req, res, next) => {
    res.render('auth/login.ejs', {
        title: 'login'
    });
};


exports.postLogin = (req, res, next) => {
    if (req.body) {
        let email = req.body.email;
        let password = req.body.password;
        return User.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if (!user) {
                return res.redirect('/login');
            }
            else {
                console.log(user.password);
                return bcrypt.compare(password, user.password).then((result) => {
                    console.log(result + 'res');

                    if (result === true) {
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        req.session.save((err) => {
                            if (err) {
                                return res.redirect('/login');
                            }
                            return res.redirect('/');
                        })
                    }
                    else {
                        res.redirect('/login');
                    }
                })
            }
        })

    } else {
        return next('no body found');
    }
};


exports.getSignup = (req, res, next) => {
    return res.render('auth/signup.ejs', {
        title: 'SignUp',
        errors: [],
    });
};


exports.postSignup = (req, res, next) => {
    errors = [];
    if (req.body) {
        console.log('here1');
        console.log(req.body);
        console.log(req.body['email']);
        let email = req.body['email'];
        let password = req.body['password'];
        let password2 = req.body['password2'];
        if (!email) errors.push('enter email');
        if (password !== password2) errors.push('password not matching');
        if (errors.length > 0) {
            return res.render('auth/signup.ejs', {
                title: 'SignUp',
                errors: errors
            });
        }
        return User.findOne({
            where: {
                email: email
            }
        }).then((result) => {
            if (result) {
                return res.redirect('/signup');
            } else {
                return bcrypt.hash(password, 12)
                    .then((pass) => {
                        return User.create({
                            user_id: uniqid(),
                            email: email,
                            password: pass
                        });
                    }).then((new_user) => {
                        console.log(new_user);
                        req.session.users = new_user;
                        req.session.isLoggedIn = true;
                        req.session.save((err) => {
                            if (err) {
                                return next(err);
                            }
                            res.redirect(302, '/');
                        });
                    })

            }
        }).catch((err) => {
            console.log(err);
        })

    } else {
        res.redirect('/signup');
    }
}


exports.getInfo = (req, res, next) => {
    res.render('auth/profileInfo.ejs', {
        title: 'profileInfo'
    });
}


