const User = require('../models/user');
const Post = require('../models/post');

module.exports.signup = function(req, res) {

    if(!req.isAuthenticated()) {

        return res.render('signup', {
            title : "Codemate | Sign Up"
        });
    }

    return res.redirect('/home');
}

module.exports.signin = function(req, res) {

    if(!req.isAuthenticated()) {
        return res.render('signin', {
            title : "Codemate | Sign In"
        });
    }

    return res.redirect('/home');
}

// ----------------------------- Home action --------------------- //

module.exports.home = function(req, res) {

    // fetch posts from database
    // Post.find({}, function(err, posts){
        
    //     if(err) { console.log("Error fetching posts from database"); return res.redirect('back'); }

    //     return res.render('home', {
    //         title : 'Codemate',
    //         postsArray : posts
    //     });
    
    // });

    // now as we are storing user id as ref in post schema
    // we have to fetch info corresponding that user id in User schema
    // for that mongoose has populate function

    Post.find({}).populate('user').exec((err, posts) => {

        if(err) { console.log("Error fetching posts from database"); return res.redirect('back'); }

        return res.render('home', {
            title : 'Codemate',
            postsArray : posts
        });

    });
}

module.exports.profile = function(req, res) {

    console.log(req.user);

    if(req.isAuthenticated()){
        return res.render('profile', {
            title : "Aakash Srivastava",
            user : req.user
        });
    }

    return res.render('/sign-in');
    
}

// when click on logo | if you are logged in then go no where but if you are at sign-in or sign-up page then go to home page

module.exports.logoAction = function(req, res) {

    if(!req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.redirect('/home');
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

    return res.redirect('/home');

}

// ----------------- to sign out ---------------------- //
module.exports.destroySession = function(req, res) {

    // inbuilt function logout() given by passport.js
    req.logout();

    return res.redirect('/');
}