const Interaction = require('../models/InteractionWithPost');
const Post = require('../models/Post');

// Function to get collaborative filtering recommendations
const getCollaborativeRecommendations = async (userId) => {
  try {
    // Fetch all interactions from other users
    const otherUserInteractions = await Interaction.find({ userId: { $ne: userId }, interactionType: 'like' }).populate('postId');
    
    // Count the number of likes for each post
    const postLikeCounts = {};
    otherUserInteractions.forEach(interaction => {
      const postId = interaction.postId._id.toString();
      postLikeCounts[postId] = (postLikeCounts[postId] || 0) + 1;
    });

    // Sort posts by like count and return top recommendations
    const sortedPostIds = Object.keys(postLikeCounts).sort((a, b) => postLikeCounts[b] - postLikeCounts[a]);
    const recommendedPosts = await Post.find({ _id: { $in: sortedPostIds } });

    return recommendedPosts;
  } catch (error) {
    throw new Error('Error fetching collaborative filtering recommendations');
  }
};

module.exports = {
  getCollaborativeRecommendations
};
