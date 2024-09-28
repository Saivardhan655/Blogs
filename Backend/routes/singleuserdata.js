const express = require('express');
const router = express.Router();
const { getUserPostsByUsername } = require('../controllers/posts');
router.route('/:username/posts').get(getUserPostsByUsername);
module.exports = router;
