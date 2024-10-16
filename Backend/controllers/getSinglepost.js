const Post = require('../models/Post');
const Comment = require('../models/comment');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const addInteraction=require('./Interaction');

const getPost = async (req, res) => {
  const { user: { userId }, params: { id: postId } } = req;
  const post = await Post.findOne({ _id: postId});
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  const comments = await Comment.find({ postId });
  res.status(StatusCodes.OK).json({ post, comments });
};

const getonlyPost=async(req,res)=>{
  const {user:{userId},params:{id:postId}}=req
  const post=await Post.findOne({
      _id:postId,createdBy:userId
  })
  if(!post){
      throw new NotFoundError(`No Post with id ${postId}`)
  }
  res.status(StatusCodes.OK).json({post})
}

const addComment = async (req, res) => {
    const { user: { userId }, params: { id: postId }, body: { content } } = req;
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError(`No post with id ${postId}`);
    }
    addInteraction(userId, postId, 'comment');
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
    getonlyPost,
}
