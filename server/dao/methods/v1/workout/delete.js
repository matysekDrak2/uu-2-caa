const fs = require('fs');


//Create a workout
function delete_workout(id) {
    const path = process.cwd() +'/server/dao/storage/workout/'+id+'.json'
    const exists = fs.existsSync(path);
    // Check if there aren't none duplicates
    if (!exists) {
        return ""
    }
    fs.unlinkSync(path)

    return ""
}

module.exports = delete_workout;