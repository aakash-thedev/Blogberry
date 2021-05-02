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

    if(!req.isAuthenticated()){
        return res.redirect('/');
    }

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

    // nested population

    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            // who has commented
            path : 'user'
        }
    })
    .exec((err1, posts) => {

        if(err1) { console.log("Error fetching posts from database", err1); return res.redirect('back'); }

        User.find({}, function(err2, users) {

            if(err2) { console.log("Error fetching users from database", err2); return res.redirect('back'); }

            return res.render('home', {
                title : 'Codemate',
                postsArray : posts,
                all_users : users
            });

        });

    });
}

module.exports.profile = function(req, res) {

    // find the user
    User.findById(req.params.id, function(err, user) {

        if(err) { console.log("Error fetching posts from database", err); return res.redirect('back'); }

        // find all the posts that user has made

        Post.find({user : req.params.id}, function(errP, posts) {
            
            if(errP) { console.log("Error fetching posts from database", errP); return res.redirect('back'); }

            return res.render('profile', {
                title : `${user.name} | Profile`,
                profile_user : user,
                postsArray : posts
            });

        });

    }); 
}

// ---------------------- Update User -------------------- //

module.exports.updateUser = function(req, res) {
    
    // only logged in user can edit his/her profile
    if(req.params.id == req.user.id) {

        // update the profile
        User.findByIdAndUpdate(req.params.id, req.body, function(err, updatedUser) {

            if(err) { console.log("Error updating user", err); return res.redirect('back'); }

            console.log(`User Updated - ${updatedUser}`);

            return res.redirect('back');

        });

    }
    
    else{

        return res.status(401).send("Unauthorized");
    }
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
                return res.redirect('/sign-in');
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