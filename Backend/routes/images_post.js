const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Post = require('../models/Post'); // Your Post model


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer-Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_posts', // Cloudinary folder
    allowedFormats: ['jpeg', 'png', 'jpg', 'mp4'],
  },
});
const upload = multer({ storage });

// POST route to upload an image and create a blog post
// Use `authenticate` middleware to ensure the user is authenticated
router.post('/create',upload.single('media'), async (req, res) => {
    try {
      const { title, content } = req.body;
      const imageUrl = req.file ? req.file.path : '';
  
      // Get the authenticated user ID from `req.user.userId`

      const userId = req.user.userId;
  
      // Create a new blog post with the authenticated user ID as `createdBy`
      const newPost = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        createdBy: userId,  // Use the userId from the token
      });
      
      await newPost.save();
      res.status(201).json({ message: 'Blog post created successfully', post: newPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  });
  

module.exports = router;
