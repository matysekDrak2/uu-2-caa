const fs = require('fs');


//Create a workout
function delete_exercise(id) {
    const path = process.cwd() +'/server/dao/storage/exercise/'+id+'.json'
    const exists = fs.existsSync(path);
    // Check if there aren't none duplicates
    if (!exists) {
        return ""
    }
    fs.unlinkSync(path)

    return ""
}

module.exports = delete_exercise;