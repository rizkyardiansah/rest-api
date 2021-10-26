const PostModel = require('../models/PostModel')
const {v4: uuid} = require('uuid')

class PostController {
    static async getAll(req, res) {
        try {
            const posts = await PostModel.getAllPost()
            
            if (posts.hasOwnProperty('success') && posts.success === false) {
                return res.status(500).json(posts)
            }
    
            return res.status(200).json({success: true, data: posts})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }

    static async createPost(req, res) {
        const {title, category, body} = req.body
        const user_id = req.user.id
        
        //cek apakah data lengkap
        if (!title || !category || !body) {
            return res.status(400).json({success: false, message: 'Data is not complete'})
        }

        const post = {
            id : uuid(),
            user_id: user_id,
            title: title,
            category: category,
            body: body
        }

        try {
            const message = await PostModel.addPost(post)
    
            if (!message.success) {
                return res.status(500).json(message)
            }
    
            return res.status(201).json(message)
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }

    static async deletePost(req, res) {
        try {
            const post_id = req.params.id
            const posts = await PostModel.getAllPost()
            const user_id = req.user.id
            
            const post = posts.find(post => post.id === post_id)

            if (!post){
                return res.status(404).json({success: false, message: 'Post not found'})
            }

            if (post.user_id !== user_id) {
                return res.status(403).json({success: false, message: 'You are not Authorized to delete this post'})
            }

            const message = await PostModel.deletePost(post)
            if (message.success === false) {
                return res.status(500).json(message)
            }
            return res.status(200).json(message)
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }

    static async updatePost(req, res) {
        try {
            const post_id = req.params.id
            const posts = await PostModel.getAllPost()
            const user_id = req.user.id

            const post = posts.find(post => post.id === post_id)

            if (!post){
                return res.status(404).json({success: false, message: 'Post not found'})
            }

            if (post.user_id !== user_id) {
                return res.status(403).json({success: false, message: 'You are not Authorized to update this post'})
            }

            const updatedPost = {
                id: post_id,
                user_id: user_id,
                title: req.body.title,
                category: req.body.category,
                body: req.body.body
            }
            
            const message = await PostModel.updatePost(post_id, updatedPost)
            if (message.success == false) {
                return res.status(500).json(message)
            }
            return res.status(200).json(message)
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}

module.exports = PostController;