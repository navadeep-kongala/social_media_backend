const express = require('express');
const router = express.Router();
const { create, getAllPosts } = require('../controllers/post.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const upload = require('../config/multer');

router.post('/create', verifyJWT, upload.single('image'), create);

// Add this line to handle fetching the posts feed
router.get('/', getAllPosts); 

module.exports = router;