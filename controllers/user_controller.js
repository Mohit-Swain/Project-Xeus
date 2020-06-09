exports.getDashboard = (req, res, next) => {
    res.render('users/dashboard.ejs', {
        title: 'Dashboard'
    });
}