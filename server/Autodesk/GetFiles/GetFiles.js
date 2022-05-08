const rp = require('request-promise');
const GetFilesConfig = require('./GetFilesConfig')




module.exports = {
  execute : async function (token) {
    let files

    GetFilesConfig.headers.Authorization = token

    response = await rp(GetFilesConfig)
      .then(response => files = JSON.parse(response)['data'])
    
  return await fileCheck(files)
  }

  
}
async function fileCheck (json)  {
  var result = [];

  for(var i = 0; i < json.length; i++) {
    
   var id = json[i]['id'];
   id = id.replace("dm.lineage:", "fs.file:vf.")
   id = id + "?version=1"
   id = Buffer.from(id).toString('base64')
   id = id.replace('/', '_')


    var displayName = json[i]['attributes']['displayName']
    var object = {'ModelURN': id, 'DisplayName': displayName}
    result.push(object)
  }
  return await result
}
  