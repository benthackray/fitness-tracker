const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
      {

          type: {
              type: String,
              required: true
            },
          name: {
            type: String,
            required: true
          },
          duration: {

            type: Number,
            required: true
          },
          weight: Number,
          reps: Number,
          sets: Number,
          distance: Number
        }
    ]
}, 
{ toJSON: { virtuals: true }}
);

workoutSchema.virtual('totalDuration').get(function(){
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

workoutSchema.virtual('totalDistance').get(function(){
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.distance;
  }, 0);
});


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
