const fs = require('fs');

//get all exercise saved
/**@return Array<JSON>*/
function get_all(time_start_after = '0001-01-01T01:00:00.000+00:00'){
    const path = process.cwd() +'/server/dao/storage/workout/'
    const list_of_files = fs.readdirSync(path)

    /**@type Array<JSON>*/
    let data = []
    for (const file of list_of_files){
        const read = fs.readFileSync(path+file, 'utf8')
        /**@type JSON*/
        const json = JSON.parse(read)

        if (json.timeBegin < time_start_after) {
            continue
        }
        data.push(json)
    }
    return data
}

module.exports = get_all;
