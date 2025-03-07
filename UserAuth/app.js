const express = require("express")
const connectDB = require("./src/config/db")
const dotenv = require('dotenv')
const routes = require("./src/router")
const cors = require("cors")
const app = express()


dotenv.config()

connectDB();

const port = 3001;

// app.use(express.json())
app.use(cors())
app.use('/api/auth', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})