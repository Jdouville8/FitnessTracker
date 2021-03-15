const db = require("../models");
const router = require("express").Router();

// db.Workout.find({}).then(function (res) {
//     if (res.length === 0) {
//         console.log("DB is populating");
//         require("../seeders/seed.js");
//     }
// });

// Gets all workouts from mongo database and returns them as an array in JSON format
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        console.log("All currently existing workouts");
        console.log(dbWorkout);
        // Iterates through array of workouts to begin calculation of total duration of combined exercises
        dbWorkout.forEach(workout => {
            // Declaration of variable to keep track of total combined exercise duration for a given workout; iteration through exercises to extract duration and add to total
            let totalDur = 0;
            workout.exercises.forEach(exercise => {
                totalDur += exercise.duration;
            });
            workout.totalDuration = totalDur;

        });

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// ADD EXERCISE
router.put("/api/workouts/:id", ({body, params}, res) => {
    db.Workout.findOneAndUpdate(
        {__id: params.id},
        {
            $push: {exercises: body}
        },
        { new: true }
    ).then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

// CREATE NEW WORKOUT
// router.post("/api/workouts", ({ body }, res) => {

// });

// GET WORKOUTS (within certain range)
// router.get("/api/workouts/range", (req, res) => {

// });


module.exports = router;