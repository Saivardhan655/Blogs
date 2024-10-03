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
    default: 0, // You can set a default value, so it starts at 0
    required: [true, 'Please provide number of likes']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, 'Please provide the user']
  },
  imageUrl: {
    type: String, // Store the Cloudinary URL here
    required: false // Not all posts may have images, so make it optional
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);