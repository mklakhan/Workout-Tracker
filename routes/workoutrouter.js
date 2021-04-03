const express = require("express")
const db = require("../models")

const router = express.Router()
const routerRange = express.Router()

router
.get('/api/workouts', (req,res) => {
   // res.send('I am in the workouts')
     db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum:'$exercises.duration'
                }
            }
        },
        {
            $addFields: {
                totalDistance: {
                    $sum:'$exercises.distance'
                }
            }
        }
    ])
    .sort({day: -1})
    .limit(1)
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.json(err)
    })
})
.post('/api/workouts' , (req,res) => {
    // db.Workout
        console.log(`this is workouts and no ID: ${req.body.type}`);
        //res.json({ result: "I am in the post workouts" })
        if (req.body.type === 'resistance') { 
        db.Workout.create({
            day: Date.now(),
            exercises: [
                {
                    type: req.body.type,
                    name: req.body.name,
                    duration: req.body.duration,
                    weight: req.body.weight,
                    reps: req.body.reps,
                    sets: req.body.sets
                }
            ]
        }, (err, resp) => { 
            console.log("New docoument saved: ", resp);
            res.json({result: resp})

        })
        } else if (req.body.type === 'cardio') {
            db.Workout.create({
                day: Date.now(),
                exercises: [
                    {
                        type: req.body.type,
                        name: req.body.name,
                        duration: req.body.duration,
                        distance: req.body.distance
                    }
                ]
            }, (err, resp) => {
                console.log("New docoument saved: ", resp);
                res.json({ result: resp })

            })
        }
})
.put('/api/workouts/:id', (req,res) => {
     if (req.body.type === 'resistance') {
        db.Workout.findByIdAndUpdate({ _id: req.params.id}, {$push: {exercises: {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets
        }}
        }, (err, resp) => {
            console.log("Updated resp: ", resp); 
            res.json({results: resp})
        })
        } else if (req.body.type === 'cardio') {

        db.Workout.findByIdAndUpdate({ _id: req.params.id }, {$push: {exercises: {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            distance: req.body.distance,
        }}
        }, (err, resp) => { 
            console.log("Updated resp: ", resp);
            res.json({results: resp})
        })
        }
})

routerRange.get('/api/workouts/range', (req, res) => {
    res.send('I am in the workouts range')
})

module.exports = {
    router,
    routerRange
}