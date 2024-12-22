const fs = require('fs');


const getExercise = require('../exersise/get');
//get updates specific exercise
function update(id, newData){

    const exercise = getExercise(id);

    const newExercise = {...exercise, ...newData};

    const path = process.cwd() +'/server/dao/storage/exercise/'+id+'.json'
    fs.writeFileSync(path, JSON.stringify(newExercise, null, 2));

    return newExercise;
}

module.exports = update;
