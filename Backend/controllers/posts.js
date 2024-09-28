const Post=require('../models/Post')
const {StatusCodes}=require('http-status-codes')
const {BadRequestError,NotFoundError}=require('../errors')

const getAllPosts=async (req,res)=>{
    const posts=await Post.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}
const createPost=async(req,res)=>{
    req.body.createdBy=req.user.userId
    const post=await post.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

module.exports={
    getAllPosts,
    createPost
}
