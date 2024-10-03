// Function to combine content-based and collaborative filtering recommendations
const combineRecommendations = (contentRecs, collabRecs) => {
    const combinedRecsMap = new Map();
  
    // Add content-based recommendations to the map
    contentRecs.forEach(post => {
      combinedRecsMap.set(post._id.toString(), { post, score: 1 });
    });
  
    // Add collaborative filtering recommendations and adjust scores
    collabRecs.forEach(post => {
      const postId = post._id.toString();
      if (combinedRecsMap.has(postId)) {
        combinedRecsMap.get(postId).score += 1; // If it's already there, increase its score
      } else {
        combinedRecsMap.set(postId, { post, score: 1 });
      }
    });
  
    // Convert the map back to an array and sort by score
    const combinedRecsArray = Array.from(combinedRecsMap.values());
    combinedRecsArray.sort((a, b) => b.score - a.score);
  
    // Return the top 10 recommendations
    return combinedRecsArray.slice(0, 10).map(item => item.post);
  };
  
  module.exports = {
    combineRecommendations
  };  