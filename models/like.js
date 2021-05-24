const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({

    // like will always be done by a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    // this field will define the objectId of liked object | Post ID or Comment ID |
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },

    // now there should be a dynamic refernce to which the like belongs | Post or Comment |
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }

}, {
    timestamps: true
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;