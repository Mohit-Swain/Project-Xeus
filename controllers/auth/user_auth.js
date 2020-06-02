const Sequelize = require('sequelize');
const sequelize = require('../../utils/database/sequelize_init');

const UserAuth = {
    getLogin: (req, res) => {
        res.render('auth/login.ejs', {
            title: 'login'
        });
    }
};

module.exports = UserAuth;