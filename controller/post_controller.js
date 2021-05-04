const Post = require('../models/post');
const Comment = require('../models/comment');

// ------------------------------- Create Post ----------------------------------- //
module.exports.createPost =  function(req, res) {

    Post.create({
        content : req.body.content,
        user : req.user._id

    }, function(err, newPost){

        if(err){
            req.flash('error', err);
            return res.redirect('back');
        }

        console.log('New Post - ', newPost);

        req.flash('success', 'Your post published successfully');
        return res.redirect('back');

    });
}

// ---------------------------------------Delete any post --------------------------------------- //

// we are getting post id from view section
module.exports.destroy = async function(req, res) {

    // we are getting post id
    // so find that post exists in database

    // this id in params is from posts route
    let post = await Post.findById(req.params.id);

    // then check if posts id is same to logged in users id
    // without populating user key in database POST, user is just id of the refering user
    if(post.user == req.user.id) {

        post.remove();

        // also remove all comments from the post
        await Comment.deleteMany({post : req.params.id});

        req.flash('success', 'Post Deleted Successfully');
        return res.redirect('back');
    }
    
    else{
        req.flash('error', 'Not Authorized');
        return res.redirect('back');
    }
}