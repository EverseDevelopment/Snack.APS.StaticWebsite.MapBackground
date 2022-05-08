
const getToken = require('./Autodesk/Token/GetToken')
const files = require('./Autodesk//GetFiles/GetFiles')

module.exports = {
    execute : async function () {
                
        var token = await getToken.value()
        var models = await files.execute(token)
        return await models
    }
}