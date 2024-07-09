const bcrypt = require('bcrypt')
const User = require('../Model/Users')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerApi = async (req, res) => {
    let { user, pass } = req.body
    if (!user || !pass) return res.status(400).json({ "error": "user and pass are required" })
    let ifExist = await User.findOne({ username: user })
    if (ifExist) return res.status(400).json({ "error": "that username already exist." })



    try {
        const hashedPwd = await bcrypt.hash(pass, 10)
        const newUser = new User({
            username: user,
            password: hashedPwd
        })

        await newUser.save()
        res.status(200).json({ "success": `${user} has been added` })
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

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

            console.log(cookieId) /////////////////////

            ifExist.status = 'online'
            ifExist.cookieId = cookieId

            console.log(cookieId)
            await ifExist.save() // para ma save

            // res.cookie('cookieId', cookieId, { /*httpOnly: true,*/ maxAge: 24 * 60 * 60 * 1000 })

            console.log(cookieId)
            
            res.cookie('cookieId', cookieId, {
                path: '/auth',
                httpOnly: false,
                sameSite: 'none',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            })

            res.status(200).json({ "success": "welcome" })
        } else {
            res.status(400).json({ "error": "wrong password" })
        }

    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

let logoutApi = async (req, res) => {
    const cookieId = req.cookies.cookieId

    if (!cookieId) return res.status(401).json({ "error": "there's no cookieId in your cookies!" })

    try {
        let ifExist = await User.findOne({ cookieId: cookieId })
        ifExist.status = 'offline'
        ifExist.cookieId = ''
        await ifExist.save()

        res.status(200).json({ "success": `${ifExist.username} has been logged out!` })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }


}

let getAllUsers = async (req, res) => {
    let all = await User.find({})
    res.send(all)
}

let oneUser = async (req, res) => {
    let { cookieId } = req.params
    console.log(cookieId)
    let person = await User.findOne({ cookieId: cookieId })

    try {
        if (!person) res.status(400).json({ "error": "no username like that" })
        // May problema ako, yung cookie dun sa client side (application tab dev tool) is 
        // hindi kapareha nung cookie na nasasave sa database, kaya hindi gumagawa tong function nato, ayusin mo ito in the future
        res.json({ "success": person }).status(200)
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}



module.exports = {
    registerApi,
    loginApi,
    logoutApi,
    getAllUsers,
    oneUser
}