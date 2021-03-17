const db = require("../models");
const router = require("express").Router();



// Gets all workouts from mongo database and returns them as an array in JSON format
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        console.log("All currently existing workouts");
        // Iterates through array of workouts to begin calculation of total duration of combined exercises
        dbWorkout.forEach(workout => {
            // Declaration of variable to keep track of total combined exercise duration for a given workout; iteration through exercises to extract duration and add to total
            let totalDur = 0;
            workout.exercises.forEach(exercise => {
                totalDur += exercise.duration;
            });
            workout.totalDuration = totalDur;
            
        });
        
        console.log(dbWorkout);
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// CREATE NEW WORKOUT
router.post("/api/workouts", (req, res) => {
    // console.log(body)
    db.Workout.create(req.body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});

// ADD EXERCISE
router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


// GET WORKOUTS (within range)
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout)
    }).catch(err => {
        res.json(err)
    })
});


module.exports = router;


// db.Workout.find({}).then(function (res) {
//     if (res.length === 0) {
//         console.log("DB is populating");
//         require("../seeders/seed.js");
//     }
// });