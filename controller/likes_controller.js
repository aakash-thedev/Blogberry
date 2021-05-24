const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLikes = async function(req, res) {

    try{
        // api would be like - /likes/toggle/?id=abc123&type=Post or Comment

        let likeable;
        // likeDeleted if false then means user has already liked the likeable if true that means user has not liked
        let likeDeleted = false;

        if(req.query.type === 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        }

        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // now if any existing like already exist 
        let existingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });

        if(existingLike) {

            // then toggle it to unlike
            // i.e. remove the like from Like Model and Likeable likes array
            
            // first remove it from likeable likes array
            likeable.likes.pull(existingLike._id);
            likeable.save();

            // now remove the existing like
            existingLike.remove();
            likeDeleted = true;
        }

        else{
            // there is no existing like we have to create a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            // push it into likeable likes array
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.status(200).json({
            message: "request successfull",
            data: {
                deleted: likeDeleted
            }
        });
    }

    catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}