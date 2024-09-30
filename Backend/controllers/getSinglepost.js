const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getPost = async (req, res) => {
  const { user: { userId }, params: { id: postId } } = req;
  const post = await Post.findOne({ _id: postId});
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  const comments = await Comment.find({ postId });
  res.status(StatusCodes.OK).json({ post, comments });
};

const addComment = async (req, res) => {
    const { user: { userId }, params: { id: postId }, body: { content } } = req;
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError(`No post with id ${postId}`);
    }
    const comment = await Comment.create({
      postId,
      userId,
      content
    });
  
    res.status(StatusCodes.CREATED).json({ comment });
  };

module.exports={
    addComment,
    getPost,
}
