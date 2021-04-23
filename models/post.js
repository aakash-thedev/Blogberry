const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },

    // well this is a post schema so we have to connect it to the users schema
    user : {
        type : mongoose.Schema.Types.ObjectId,
        // ref here refers to which Schem you are talking about
        ref : 'User'
    }
}, {
    // create time stamps here
    timestamps: true
});

const Post = mongoose.model('Post_collection', postSchema);

module.exports = Post;