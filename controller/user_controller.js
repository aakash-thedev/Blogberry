const User = require('../models/user');
const Post = require('../models/post');

module.exports.signup = function(req, res) {

    if(!req.isAuthenticated()) {

        return res.render('signup', {
            title : "Blog Berry | Sign Up"
        });
    }

    return res.redirect('/home');
}

module.exports.signin = function(req, res) {

    if(!req.isAuthenticated()) {
        return res.render('signin', {
            title : "Blog Berry | Sign In"
        });
    }

    return res.redirect('/home');
}

// ----------------------------- Home action --------------------- //

// declare this function to be async

module.exports.home = async function(req, res) {

    if(!req.isAuthenticated()){
        return res.redirect('/');
    }

    // nested population

    // instead of doing nested callbacks of function 
    // we can use async await to make it a lot cleaner

    try{
        // success from await Post.find({}).... will be stored in posts variable that will be all the posts
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate([{
            path : 'comments',
            populate : {
                path : 'user'
            }
        }, {
            path: 'comments',
            populate: {
                path: 'likes'
            }
        }])
        .populate('likes');

        // success from await User.find({}); will be stored in users variable

        let users = await User.find({});

        // then we will return when both of above async fn will be executed

        return res.render('home', {
            title : 'Blog Berry | Home',
            postsArray : posts,
            all_users : users
        });

    }
    
    catch(err) { console.log(`Error - ${err}`); }
}

// ------------------------ USer Profile Controller ------------------- //

module.exports.profile = async function(req, res) {

    // we have gotten rid of those callback function hell
    // yayyyyyyy :D

    try{
        // find the user
        let user = await User.findById(req.params.id); 

        let posts = await Post.find({user : req.params.id})
        .sort('-createdAt')
        .populate('user')
        .populate([{
            path : 'comments',
            populate : {
                path : 'user'
            }
        }, {
            path: 'comments',
            populate: {
                path: 'likes'
            }
        }])
        .populate('likes');

        return res.render('profile', {
            title : `${user.name} | Profile`,
            profile_user : user,
            postsArray : posts
        });
    }

    catch(err) { console.log(`Error - ${err}`); }
}

// ---------------------- Update User -------------------- //

module.exports.updateUser = async function(req, res) {
    
    // only logged in user can edit his/her profile
    if(req.params.id == req.user.id) {

        // update the profile
        let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

        // now because we have added enctype="multipart/form-data" in our form
        // thats we we will not be able to fetch our info just by req.something
        // body parser will not allow it
        // thats we multer is used
        User.uploadAvatar(req, res, function(err) {

            if(err) { console.log(`******Multer Error - ${err} `); }

            console.log(req);

            // // now set up the user schema values 
            updatedUser.name = req.body.name;
            updatedUser.email = req.body.email;

            // if file is chosen then
            if (req.file) {
                updatedUser.avatar = User.avatarPath + '/' + req.file.filename;
            }

            updatedUser.save();

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

// ------------------------------- Create A new user ----------------------------------- //

module.exports.create = async function(req, res) {

    console.log("USER - ", req.body);

    if(req.body.password !== req.body.password2){
        return res.redirect('back');
    }

    //check if given username already exists
    let user = await User.findOne({email : req.body.email});

    if(!user){

        let newUser = await User.create({
            name : req.body.username,
            email : req.body.email,
            avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
            gender : req.body.gender,
            dob : `${req.body.birth_date}'/'${req.body.birth_month}'/'${req.body.birth_year}`,
            password : req.body.password
        });

        console.log("User Created - ", newUser);

        // if user is created successfully go to signin page
        return res.redirect('/sign-in');

    }

    else{
        return res.redirect('back');
    }
}

// ---------------------------------------- Create A New Session for user who log in ----------------------------------------- //

module.exports.createSession = function(req, res) {

    // display a flash message of "User signed in successfully"
    req.flash('success', 'Logged in successfully');

    return res.redirect('/home');

}

// ----------------- to sign out ---------------------- //
module.exports.destroySession = function(req, res) {

    // inbuilt function logout() given by passport.js
    req.logout();

    req.flash('success', 'Logged out successfully');

    return res.redirect('/');
}