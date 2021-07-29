var db = require("../models");
const router = require('express').Router();


router.get("/api/workouts", function (req, res) {
  // console.log('hello world');
  // res.send('hello world')
  db.Workout.find().then(function (dbWorkouts) {
    res.json(dbWorkouts);
  });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then(data => res.json(data))
    .catch(err => {
      console.log("err", err)
      res.json(err)
    })
});

router.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", function (req, res) {
  db.Workout.aggregate([{
    $addFields: {
      totalDuration: { $sum: "$exercises.duration" }
    }
  }]).then(function (dbWorkouts) {
    res.json(dbWorkouts);
  });
});

module.exports = router;