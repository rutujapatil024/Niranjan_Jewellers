const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()

const dbConn = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB connection established")
    } catch(err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

module.exports = dbConn;