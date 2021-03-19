const express = require("express");
const path = require("path");
require("dotenv").config()
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static('public'))

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'))
})

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname + '/public/stats.html'))
})

app.post('/api/workouts', (req,res) => {
    console.log(request.body)
    res.send('i got the data')
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})


