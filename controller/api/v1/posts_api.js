const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                // who has commented
                path : 'user'
            }
        });

    return res.json(200, {
        message : "List of posts",
        posts : posts
    });
}

 // ---------------------------- delete a post ---------------------------- //
 // we are getting post id from view section
module.exports.destroy = async function(req, res) {

    try{

        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){

            post.remove();

            await Comment.deleteMany({post : req.params.id});

            return res.json(200, {
                message: "Post Deleted"
            });
        }

        else{
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
    }

    catch(err) {

        return res.json(500, {
            message : "Internal Server Error"
        });
    }
}