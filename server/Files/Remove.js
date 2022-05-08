const fs = require('fs-extra')

function removeFile(filepath) {
    try {
        fs.unlinkSync(filepath)
        console.log(`file removed at '${filepath}' finished`)
    } catch(err) {
        console.error(err)
    }
}

module.exports = removeFile;