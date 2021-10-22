const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {v4: uuid} = require('uuid')

class AuthController {
    static async login(req, res) {
        try {
            const {username, password} = req.body

            //cek apakah client mengirimkan data username dan password atau tidak
            if (!username || !password) {
                return res.status(400).json({success: false, message: 'Data is not complete'})
            }

            const user = await UserModel.getUserByUsername(username)
            
            //cek apakah yang terjadi error
            if (user && user.hasOwnProperty('success') && user.success === false) {
                return res.status(500).json(user)
            }

            //cek apakah user ditemukan
            if (!user) {
                return res.status(401).json({success: false, message: 'Username or Password is wrong'})
            }
            
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            //cek apakah password benar 
            if (!isPasswordCorrect) {
                return res.status(401).json({success: false, message: 'Username or Password is wrong'})
            }
            
            //kirim token
            const token = await jwt.sign({id: user.id, name: user.name, username: user.username}, 'rahasia banget nih')
            return res.status(200).json({success: true, message: 'Login succeded', token: token})

        } catch (error) {
            res.status(500).json({success: false, message: error.message})
        }
    }

    static async register(req, res) {
        const {name, username, password} = req.body
        
        //cek apakah request memiliki field name, username dan password
        if (!name|| !username|| !password) {
            return res.status(400).json({success: false,message: 'Data is not complete'})
        }
        
        try {
            //buat data user
            const user = {
                id: uuid(),
                name: name,
                username: username,
                password: await bcrypt.hash(password,10) 
            }

            //simpan data
            //akan dikembalikan pesan yang berisi transaksi suskes atau tidak
            const message = await UserModel.addUser(user)

            //jika add user tidak sukses kirim respon isi
            if (!message.success) {
                return res.status(500).json(message)
            }
            
            //jika sukses maka kirim respon ini
            return res.status(201).json(message)
        } catch (error) {
            res.status(500).json({success: false,message: error.message})
        }

    }
}

module.exports = AuthController