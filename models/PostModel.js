const fsPromises = require('fs').promises

class PostModel {
    static #fileName = './data/posts.json'

    static async getAllPost() {
        try {
            const data = await fsPromises.readFile(this.#fileName)
            const posts = JSON.parse(data)
            return posts
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    static async addPost(post) {
        try {
            const data = await fsPromises.readFile(this.#fileName)
            const posts = JSON.parse(data)

            posts.push(post)

            await fsPromises.writeFile(this.#fileName, JSON.stringify(posts, null, 2))

            return {success: true, message: 'Post has been added'}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    static async deletePost(post) {
        try {
            const data = await fsPromises.readFile(this.#fileName)
            const posts = JSON.parse(data)

            const newPosts = posts.filter((el) => el.id !== post.id)
        
            await fsPromises.writeFile(this.#fileName, JSON.stringify(newPosts, null, 2))
            return {success: true, message: 'Post has been deleted'}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    static async updatePost(post_id, newPost) {
        try {
            const data = await fsPromises.readFile(this.#fileName)
            const posts = JSON.parse(data)

            const newPosts = posts.filter((post) => post.id !== post_id)
            newPosts.push(newPost)

            await fsPromises.writeFile(this.#fileName, JSON.stringify(newPosts, null, 2))
            return {success: true, message: 'Post has been updated'}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}

module.exports = PostModel