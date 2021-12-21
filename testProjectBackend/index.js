const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000



const app = express()
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})
app.use("/auth", authRouter)



const start = async () => {
    try{
        await mongoose.connect(`mongodb+srv://user:user@cluster0.t242o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()