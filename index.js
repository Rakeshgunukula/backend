
    // ===========*Conneting localhost server to mongodb *============

const express = require('express')

const mongoose = require('mongoose')

require('dotenv').config()

const cors = require('cors')

const routes = require('./routes/routes');

const app = express()
app.use(cors(
    {
        origin:'https://frontend-git-main-gunukula-rakeshs-projects.vercel.app/',
        methods: ['GET','POST','DELETE'],
        credentials: true,
    }
));

    app.use(express.json())

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}));

    app.use('/',routes);


    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log('Successfully Connected to MongoDB');
    })
    .catch((err) => {
        console.log("Error on connecting to MongoDB");
    })

    const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is Started and Running on " + PORT)
})