const fs = require('fs');


const getAllExercises = require('../exersise/getAll');
const getAllWorkouts = require("../workout/getAll");
//get all exercise saved
function satisfaction(){

    const exercises = getAllExercises();
    let exerciseDict = {}

    for (const exercise of exercises){
        exerciseDict[exercise.id] = {...exercise, times_trained: 0};
    }

    const date = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const workouts = getAllWorkouts(date.toISOString());

    for (const workout of workouts){
        for (const exercise of workout.exercises){
            exerciseDict[exercise.exercise_id.toString()].times_trained += exercise.count;
        }
    }

    return exerciseDict;
}

module.exports = satisfaction;
