const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  interactionType: {
    type: String,
    enum: ['like', 'view', 'comment'], // Add other types as needed
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Interaction', InteractionSchema);
