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

// -------------------------- delete a comment --------------------------- //

// do cheeze hain ek to kisi bnde ne kisi aur ki post pe comment kiya hoga vo khud use delete kr skta hai
// dusri cheez jis bnde ka post hai vo bhi apni post ke andar kisi aur ke comment ko delete kr skta hai

module.exports.destroy = function(req, res) {

    // find the comment
    Comment.findById(req.params.id).populate('post').exec(function(err, comment) {

        if(err) { console.log(`error finding comment in database - ${err}`); return res.redirect('back'); }

        // assuming that we found the comment
        if(comment.user == req.user.id || comment.post.user == req.user.id) {

            comment.remove();

            // also remove the comment id from post database
            let index = comment.post.comments.find((comm) => {return comm == req.params.id });

            comment.post.comments.splice(index, 1);

            comment.post.save();

            return res.redirect('back');

        }

        else{

            return res.redirect('back');
        }

    });

}