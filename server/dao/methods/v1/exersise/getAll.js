const fs = require('fs');

//get all exercise saved
/**
 * @return Array<JSON>
 * */
function get_all(){
    const path = process.cwd() +'/server/dao/storage/exercise/'
    const list_of_files = fs.readdirSync(path)

    /** @type Array<JSON> */
    let data = []
    for (const file of list_of_files){
        const read = fs.readFileSync(path+file, 'utf8')
        /**@type JSON*/
        const json = JSON.parse(read)
        data.push(json)
    }
    return data
}

module.exports = get_all;
