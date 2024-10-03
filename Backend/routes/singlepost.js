const express = require('express');
const router = express.Router();
const { getPost, addComment ,getonlyPost} = require('../controllers/getSinglepost');

router.route('/:id')
  .get(getPost)
  .post(addComment);

module.exports = router;