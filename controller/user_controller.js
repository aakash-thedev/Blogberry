const User = require('../models/user');

module.exports.signup = function(req, res) {

    if(!req.isAuthenticated()) {

        return res.render('signup', {
            title : "CodeConnect | Sign Up"
        });
    }

    return res.redirect('/user/profile');
}

module.exports.signin = function(req, res) {

    if(!req.isAuthenticated()) {
        return res.render('signin', {
            title : "CodeConnect | Sign In"
        });
    }

    return res.redirect('/user/profile');
}

module.exports.profile = function(req, res) {

    console.log(req.user);

    if(req.isAuthenticated()){
        return res.render('profile', {
            title : "Aakash Srivastava | Profile",
            user : req.user
        });
    }

    return res.redirect('/user/sign-in');
    
}

module.exports.posts = function (req, res) {

    return res.end('<h1> Posts Fetched </h1>');
}

module.exports.create = function(req, res) {
    
    // TODO later
    console.log(req.body);

    if(req.body.password !== req.body.password2){
        return res.redirect('back');
    }

    //check if given username already exists
    User.findOne({email : req.body.email}, (err, user) => {

        if(err){ console.log("Error finding user in database"); return; }

        if(!user){

            User.create({email : req.body.email, name : req.body.username, password : req.body.password}, function(err, user){

                if(err){ console.log("Error creating user", err); return; }

                console.log("User Created - ", user);

                // if user is created successfully go to signin page
                return res.redirect('/user/sign-in');
            });

        }

        else{
            return res.redirect('back');
        }

    });
}

module.exports.createSession = function(req, res) {

    return res.redirect('/user/profile');

}

// ----------------- to sign out ---------------------- //
module.exports.destroySession = function(req, res) {

    // inbuilt function logout() given by passport.js
    req.logout();

    return res.redirect('/');
}