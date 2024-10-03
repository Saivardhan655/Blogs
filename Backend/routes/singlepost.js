const express = require('express');
const router = express.Router();
const { getPost, addComment ,getonlyPost} = require('../controllers/getSinglepost');
const {likePost}=require('../controllers/likeAPost')

router.route('/:id')
  .get(getPost)
  .post(addComment);
router.patch('/:id/like', likePost);
module.exports = router;