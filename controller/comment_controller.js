const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function(req, res) {

    console.log(req.body.post);
    // find the post in Post database
    Post.findById(req.body.post, function(err, post) {

        if(err) { console.log(`Error finding post in database : ${err}`); return res.redirect('back'); }

        if(post) {

            Comment.create({
                comment : req.body.comment,
                user : req.user._id,
                post : req.body.post

            }, function(err, comment) {

                if(err) { console.log(`Error creating comment : ${err}`); return res.redirect('back'); }

                // so new comment has been created
                // update post by pushing this new comment
                post.comments.push(comment);
                post.save();

                console.log(`new comment - ${comment}`);

            });

            return res.redirect('back');
        }

        console.log(`cannot find post !`);
        return res.redirect('back');

    });

}