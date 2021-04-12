const User = require('../models/user');

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
    console.log(req.body);

    if(req.body.password !== req.body.password2){
        return res.redirect('back');
    }

    //check if given username already exists
    User.findOne({email : req.body.email}, (error, user) => {

        if(error){ console.error("Error finding user in database"); return; }

        if(!user){

            User.create(req.body, function(error, user){

                if(error){ console.error("Error finding user in database"); return; }

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