const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const media_path = path.join('/uploads/posts');

const postSchema = new mongoose.Schema({

    content : {
        type : String
    },

    media : {
        type : String
    },

    // well this is a post schema so we have to connect it to the users schema
    user : {
        type : mongoose.Schema.Types.ObjectId,
        // ref here refers to which Schema you are talking about
        ref : 'User'
    },

    // it would be much better and faster if we store all the comments of posts in postSchema
    // so that whenever we fetch a post we could fetch its comments as well

    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ],

    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

}, {
    // create time stamps here
    timestamps: true
});

// -------------------------------- set up this code from multer's documentation -------------------- //

var storage = multer.diskStorage({

    destination: function (req, file, cb) {

        // this is basically a cb (callback function where we need to tell exact path where we need to store our files path from user.js to avatars)
        cb(null, path.join(__dirname, '..', media_path));
    },

    filename: function (req, file, cb) {

        // fieldname is avatar in userschema
        cb(null, file.fieldname + '-' + Date.now());
    }
});

 // -------------------------- static methods under postSchema ------------------------- //

postSchema.statics.uploadMedia = multer({storage : storage}).single('media');
postSchema.statics.mediaPath = media_path;

const Post = mongoose.model('Post', postSchema);

module.exports = Post;