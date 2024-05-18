const bcrypt = require('bcrypt')
const User = require('../Model/Users')


const registerApi = async (req, res) => {
    let { user, pass } = req.body
    if (!user || !pass) return res.status(400).json({ "error": "user and pass are required" })
    let ifExist = User.findOne({username : user})

    if(ifExist) return res.status(400).json({"error" : "that username already exist."})

    const newUser = new User({
        username: user,
        password: await bcrypt.hash(pass, 10)
    })

    try {
        await newUser.save()
        res.status(200).json({ "success": `${user} has been added` })
    } catch (error) {
        res.status(500).json({ "error": "External server error" })
    }
}


const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginApi = async (req, res) => {
    let { user, pass } = req.body
    if (!user || !pass) return res.status(400).json({ "error": "user and pass are required" })

    // let ifExist = db.find(person => person.username === user)
    const ifExist = await User.findOne({ username: user });
    if (!ifExist) return res.status(400).json({ "error": "user does not exist" })

    let match = await bcrypt.compare(pass, ifExist.password)

    try {

        if (match) {

            const cookieId = jwt.sign(
                { "username": ifExist.username },
                process.env.COOKIE_ID,
                { expiresIn: '1d' }
            )

            ifExist.cookieId = cookieId
            await ifExist.save() // para ma save

            res.cookie('cookieId', cookieId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.status(200).json({ "success": "welcome" })
        } else {
            res.status(400).json({ "error": "wrong password" })
        }

    } catch (error) {
        res.status(500).json({ "error": "External server error" })
    }


}

let logoutApi = async (req, res) => {
    const cookieId = req.cookies.cookieId
    if (!cookieId) return res.status(400).json({ "error": "there's no cookieId in your cookies!" })

    try {
        let ifExist = await User.findOne({ cookieId: cookieId })
        ifExist.cookieId = ''
        await ifExist.save()
        
        res.status(200).json({"success" : `${ifExist.username} has been logged out!`})
    }catch(error){
        res.status(400).json({"error" : error.message})
    }

   
}

module.exports = {
    registerApi,
    loginApi,
    logoutApi
}