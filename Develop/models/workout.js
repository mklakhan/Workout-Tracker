const mongoose = require("mongoose");
const Schema = mongoose.Schema

const workout = new Schema({
    day: { type: Date},
    exercises: [
      {
        type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number
      }
    ]
})

const Workout = mongoose.model("Workout", workout)
module.exports = Workout


// const blogSchema = new Schema({
//     title:  String, // String is shorthand for {type: String}
//     author: String,
//     body:   String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs:  Number
//     }
//   });