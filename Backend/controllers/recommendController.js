const { getCollaborativeRecommendations } = require('../utils/collaborativeFiltering');
const { getContentBasedRecommendations } = require('../utils/contentBasedFiltering');
const { combineRecommendations } = require('../utils/hybridRecommender');

// Hybrid recommendation controller
const hybridRecommendations = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Get content-based recommendations
    const contentRecs = await getContentBasedRecommendations(userId);
    
    // Get collaborative filtering recommendations
    const collabRecs = await getCollaborativeRecommendations(userId);

    // Combine both sets of recommendations
    const combinedRecs = combineRecommendations(contentRecs, collabRecs);

    res.status(200).json({ recommendations: combinedRecs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
};

module.exports = {
  hybridRecommendations
};