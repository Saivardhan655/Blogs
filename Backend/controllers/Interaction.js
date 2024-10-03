const Interaction = require('../models/InteractionWithPost');

const addInteraction = async (userId, postId, interactionType) => {
  try {
    const interaction = new Interaction({
      userId,
      postId,
      interactionType,
    });

    await interaction.save();
    console.log('Interaction saved!');
  } catch (error) {
    console.error('Error saving interaction:', error);
  }
};

module.exports=addInteraction;
