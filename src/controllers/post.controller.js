const PostModel = require('../models/post.model');
const ImageKit = require('imagekit');

// Initialize ImageKit with your existing .env variables
const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT // Make sure to add this to your .env file
});

async function create(req, res) {
    try {
        const { caption, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        // ImageKit uploads buffers directly when converted to base64
        const fileBuffer64 = req.file.buffer.toString("base64");
        
        const imagekitResult = await imagekit.upload({
            file: fileBuffer64, 
            fileName: `${Date.now()}-${req.file.originalname}`, // Unique file name
            folder: "/posts" 
        });

        const imageUrl = imagekitResult.url; 

        // Create the post document
        const newPost = await PostModel.create({
        user: req.user.id, // Changed from req.user._id to req.user.id to match token payload
        image: imageUrl,
        caption,
        discription: description 
            });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newPost
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// 2. NEW FUNCTION: FETCH ALL POSTS FROM DATABASE
async function getAllPosts(req, res) {
    try {
        // Fetch posts and sort by newest first (-1)
        // If your schema links user profiles, you can use .populate('user', 'username')
        const posts = await PostModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            posts: posts
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Export both functions together at the bottom
module.exports = { create, getAllPosts };