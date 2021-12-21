const User = require('./models/Users')
const Purches = require('./models/Purches')
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')
const Isemail = require ('isemail')


const generateAccessToken = (id) =>{
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn:"1h"})
}

class authController{
    async registration(req, res){
        try{
            const {email, username, password} = req.body
            const candidate = await User.findOne({username})
            if( candidate ){
                return res.status(400).json({
                    message: 'User with this name has been already created', 
                    errorType:"USERNAME_ALREADY_CREATED"
                })
            }
            const checkEmail = await User.findOne({email})
            if(checkEmail){
                return res.status(400).json({
                    message: 'User with this email has been already created', 
                    errorType:"EMAIL_ALREADY_CREATED"
                })
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({email, username, password: hashPassword})
            await user.save()
            return res.status(200).json(user)
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    
    async login(req, res){
        try{
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: `User with this email: ${email} dont exit`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){    
                return res.status(400).json({message: `Wrong password`})
            }
            const token = generateAccessToken(user._id)
            return res.json({
                token: token,
                expiresIn: 3600,
                username: user.username
            })

        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    
    async uploadHistoryUsers(req, res, next){
        try{
            const {username, type, trip} = req.body
            const purches = new Purches({username: username, type: type, trip: trip})
            await purches.save()
            console.log(purches)
            return res.status(200).json(purches)
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'historyUpload error'})
        }
    }

    async getHistory(req, res, next){
        try{
            const {username} = req.body
            const purches = await Purches.find({username})
            return res.json(purches)
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'getHistory error'})
        }
    }
}

module.exports = new authController()