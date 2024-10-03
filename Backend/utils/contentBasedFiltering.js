const Post = require('../models/Post');
const Interaction = require('../models/InteractionWithPost');

// Function to get content-based recommendations
const getContentBasedRecommendations = async (userId) => {
  try {
    // Fetch user interactions (e.g., liked posts)
    const interactions = await Interaction.find({ userId, interactionType: 'like' }).populate('postId');
    const likedPostTypes = interactions.map(interaction => interaction.postId.type);

    // Find similar posts based on liked post types
    const recommendedPosts = await Post.find({ type: { $in: likedPostTypes } });

    return recommendedPosts;
  } catch (error) {
    throw new Error('Error fetching content-based recommendations');
  }
};

module.exports = {
  getContentBasedRecommendations
};