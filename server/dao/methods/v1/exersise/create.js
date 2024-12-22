const fs = require('fs');


//create an exercise
function create(data) {
    const path = process.cwd() +'/server/dao/storage/exercise/'+data.id+'.json'
    const exists = fs.existsSync(path);
    if (exists) {
        return ""
    }
    const data_string = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, data_string);
    return 0
}

module.exports = create;