const route = require('express').Router()
const PostController = require('../controllers/PostController')
const {authenticate} = require('../middleware/authMiddleware')

route.get('/', PostController.getAll)
route.post('/',authenticate, PostController.createPost)
route.post('/:id/delete', authenticate, PostController.deletePost)
route.post('/:id/edit', authenticate, PostController.updatePost)
module.exports = route