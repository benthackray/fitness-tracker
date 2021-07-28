var db = require("../models");
const router = require('express').Router();


router.get("/api/workouts", function (req, res) {
  // console.log('hello world');
  // res.send('hello world')
  db.Workout.find().then(function (dbWorkouts) {
    res.json(dbWorkouts);
  });
});

router.put("/api/workouts/:id", function (req, res) {
  db.Workout.updateOne({ _id: req.params.id }, { exercises: req.body.exercises })
    .then(function (dbPost) {
      res.json(dbPost);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
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