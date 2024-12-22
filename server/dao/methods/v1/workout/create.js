const fs = require('fs');


//Create a workout
function create(data) {
    const path = process.cwd() +'/server/dao/storage/workout/'+data.id+'.json'
    const exists = fs.existsSync(path);
    // Check if there aren't none duplicates
    if (exists) {
        return JSON.parse('{"message": "Object with this ID already exists. Try Again"}');
    }
    // Check if all passed ids are valid
    for (const exercise of data.exercises) {
        const exercise_path = process.cwd() + '/server/dao/storage/exercise/' + exercise.exercise_id + '.json';
        const exists = fs.existsSync(exercise_path);
        if (!exists) {
            return JSON.parse('{"message": "Exercise with ID ' + exercise.exercise_id + ' does not exists."}')
        }
    }

    const data_string = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, data_string);

    return data
}

module.exports = create;