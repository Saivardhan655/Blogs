const express=require('express')
const router=express.Router()

//const {getAllPosts,getPost,createPost,updatePost,deletePost}=require('../controllers/posts')
const {getAllPosts,createPost}=require('../controllers/posts')
router.route('/').post(createPost).get(getAllPosts)
//router.route('/:id').get(getPost).delete(deletePost).patch(updatePost)

module.exports=router