const express = require('express');
const router = express.Router();
const { userdata } = require('../controllers/userprofile');
router.route('/').get(userdata);
module.exports = router;
