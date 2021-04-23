const Post = require('../models/post');

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