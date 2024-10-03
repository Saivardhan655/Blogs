const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  type: {
    type: [String],
    enum: ['info', 'comedy', 'religious', 'sports', 'politics', 'cinema', 'others'],
    required: true
  },
  content: {
    type: String,
    required: [true, 'Please provide the type of content'],
    maxlength: 3000
  },
  likes: {
    type: Number,
    default: 0,
    required: [true, 'Please provide number of likes']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user']
  },
  imageUrl: {
    type: String,
    required: false
  },
  tags: {
    type: [String], // Array of tags for the post
    required: false // Tags are optional but encouraged for better recommendations
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
