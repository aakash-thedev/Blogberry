module.exports.signup = function(req, res) {
    return res.render('signup', {
        title : "CodeConnect | Sign Up"
    });
}

module.exports.signin = function(req, res) {
    return res.render('signin', {
        title : "CodeConnect | Sign In"
    });
}

module.exports.profile = function(req, res) {

    return res.render('profile', {
        title : "Aakash Srivastava | Profile"
    });
    
}

module.exports.posts = function (req, res) {

    return res.end('<h1> Posts Fetched </h1>');
}

module.exports.create = function(req, res) {
    // TODO later
    return res.redirect('back');
}