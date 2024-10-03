const Post = require('../models/Post'); // Assuming your model is named Post
const addInteraction=require('./Interaction');
// Function to handle liking a post
const likePost = async (req, res) => {
  const { id } = req.params; // Post ID from request URL
  const userId=req.user.userId;
  try {
    // Find the post by ID and increment its like count
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // Increment the likes field by 1
      { new: true } // Return the updated post
    );
    addInteraction(userId, id, 'like');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error liking the post', error });
  }
};

module.exports = {
  likePost
};
