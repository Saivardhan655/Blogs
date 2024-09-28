const Post=require('../models/Post')
const {StatusCodes}=require('http-status-codes')
const {BadRequestError,NotFoundError}=require('../errors')

const getAllPosts=async (req,res)=>{
    const posts=await Post.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({posts,count:posts.length})
}
const createPost=async(req,res)=>{
    req.body.createdBy=req.user.userId
    const post=await Post.create(req.body)
    res.status(StatusCodes.CREATED).json({post})
}
const updatePost=async(req,res)=>{
    const {body:{type,content,likes},user:{userId},params:{id:postId}}=req
    if(!content || !type || !likes){
        throw new BadRequestError('type,content or likes cannot be empty')
    }
    const post=await Post.findByIdAndUpdate({_id:postId,createdBy:userId},req.body,{new:true,runValidators:true})
    if(!post){
        throw new NotFoundError(`No Post with id ${postId}`)
    }
    res.status(StatusCodes.OK).json({post})
}

const deletePost=async(req,res)=>{
    const {user:{userId},params:{id:postId}}=req
    const job=await Post.findByIdAndRemove({_id:postId,createdBy:userId})
    if(!job){
        throw new NotFoundError(`No post with id ${postId}`)
    }
    res.status(StatusCodes.OK).send()
}

const getPost=async(req,res)=>{
    const {user:{userId},params:{id:postId}}=req
    const post=await Post.findOne({
        _id:postId,createdBy:userId
    })
    if(!post){
        throw new NotFoundError(`No job with id ${postId}`)
    }
    res.status(StatusCodes.OK).json({post})
}

const filteredContent = async (req, res) => {
    const { type, minLikes, createdBy } = req.query;
    if (!type && !createdBy) {
        throw new BadRequestError('type or createdBy must be provided');
    }
    try {
        const minLikesNum = Number(minLikes) || 0;
        const query = {
            likes: { $gte: minLikesNum }
        };
        if(type){
            query.type = type;
        }
        if(createdBy){
            query.createdBy = createdBy;
        }
        const contents = await Post.find(query);
        res.status(StatusCodes.OK).json({ contents });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving contents', error });
    }
};


module.exports={
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getPost,
    filteredContent,
}
