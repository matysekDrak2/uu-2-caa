const fs = require('fs');

//get specific an exercise
function get(id) {
    const path = process.cwd() +'/server/dao/storage/exercise/'+id+'.json'
    const exists = fs.existsSync(path)
    if (!exists) {
        return false
    }
    return JSON.parse(fs.readFileSync(path, 'utf8'))
}

module.exports = get;