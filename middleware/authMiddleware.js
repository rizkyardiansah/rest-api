const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

async function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization
    
        const user = jwt.verify(token, 'rahasia banget nih')
        
        const isValid = await UserModel.validateUser(user)
    
        if (isValid.hasOwnProperty('success') && isValid.success === false) {
            res.status(500).json(isValid)
        }

        if (isValid === false) {
            res.status(403).json({success: false, message: 'You are not a valid user'})
        }

        if (isValid === true) {
            req.user = user
            next()
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {authenticate}