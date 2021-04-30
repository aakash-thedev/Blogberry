const Post = require('../models/post');
const Comment = require('../models/comment');

// ------------------------------- Create Post ----------------------------------- //
module.exports.createPost =  function(req, res) {

    Post.create({
        content : req.body.content,
        user : req.user._id

    }, function(err, newPost){

        if(err){
            console.log("error creating post");
            return res.redirect('back');
        }

        console.log("New Post - ", newPost);
        return res.redirect('back');

    });
}

// delete any post

// we are getting post id from view section
module.exports.destroy = function(req, res) {

    // we are getting post id
    // so find that post exists in database

    // this id in params is from posts route
    Post.findById(req.params.id, function(err, post) {

        if(err) { console.log('error fetchig post from database', err); return res.redirect('back'); }

        // then check if posts id is same to logged in users id
        // without populating user key in database POST, user is just id of the refering user
        if(post.user == req.user.id) {

            post.remove();

            // also remove all comments from the post
            Comment.deleteMany({post : req.params.id}, function(err2) {

                if(err) { console.log('error deleting comments of the post', err2); return res.redirect('back'); }

                return res.redirect('back');
            });
        }

        else{

            return res.redirect('back');

        }

    });

}