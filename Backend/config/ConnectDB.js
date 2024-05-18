const mongoose = require ('mongoose')

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Connected succesfully")
    }catch(error){
        console.log("Connection Failed" + error.message)
    }
}

module.exports = dbConnect