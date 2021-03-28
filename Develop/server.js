const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
require("dotenv").config()
const {router,routerRange} = require('./routes/workoutrouter')
const app = express()

mongoose.connect('mongodb://localhost:27017/workout', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.use('/', router)
app.use('/', routerRange)

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'))
})

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname + '/public/stats.html'))
})

// app.post('/api/workouts', (req,res) => {
//     console.log(request.body)
//     res.send('i got the data')
// })

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})


