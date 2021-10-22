const fsPromises = require('fs').promises

class UserModel {
    static async addUser(user) {
        try {
            const data = await fsPromises.readFile('./data/users.json')
            const users = JSON.parse(data)
            users.push(user)
            await fsPromises.writeFile('./data/users.json',JSON.stringify(users, null, 2))

            return {success: true,message: 'User succesfully added'}
            
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    static async getUserByUsername(username) {
        try {
            const data = await fsPromises.readFile('./data/users.json')
            const users = JSON.parse(data)

            const user = users.find((user) => user.username === username)

            return user
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    static async validateUser(user) {
        try {
            const data = await fsPromises.readFile('./data/users.json')
            const users = JSON.parse(data)

            for (let el of users) {
                if (el.id === user.id && el.name === user.name && el.username === user.username) {
                    return true
                }
            }

            return false
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}

module.exports = UserModel