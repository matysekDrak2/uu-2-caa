const fs = require('fs');


const getWorkout = require('../workout/get');
//get updates specific exercise
function update(id, newData){

    const workout = JSON.parse(getWorkout(id));

    const newWorkout = {...workout, ...newData};

    const path = process.cwd() +'/server/dao/storage/workout/'+id+'.json'
    fs.writeFileSync(path, JSON.stringify(newWorkout, null, 2));

    return newWorkout;
}

module.exports = update;
