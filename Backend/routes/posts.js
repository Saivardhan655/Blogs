const express=require('express')
const router=express.Router()

const {getAllPosts,getPost,createPost,updatePost,deletePost, filteredContent}=require('../controllers/posts')
const {hybridRecommendations}=require('../controllers/recommendController')

router.route('/filter').get(filteredContent);
router.route('/recommend').get(hybridRecommendations);
router.route('/').post(createPost).get(getAllPosts)
router.route('/:id').delete(deletePost).patch(updatePost).get(getPost)


module.exports=router