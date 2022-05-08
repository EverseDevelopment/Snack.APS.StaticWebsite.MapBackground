const rp = require('request-promise');
const UploadConfig = require('./UploadConfig')


  module.exports = {
    execute : async function (token, fileName, URN, BIMFolder) {
      let response
      var responseData
      var removeURN
      var completeURN
      var responseDataBuffer

      UploadConfig.headers.Authorization = token
      UploadConfig.body = JSON.stringify({"jsonapi":{"version":"1.0"},
      "data":{"type":"items","attributes":{"displayName":fileName,"extension":{"type":"items:autodesk.bim360:File","version":"1.0"}},
      "relationships":{"tip":{"data":{"type":"versions","id":"1"}},
      "parent":{"data":{"type":"folders","id":BIMFolder}}}},
      "included":[{"type":"versions","id":"1","attributes":{"name":fileName,"extension":{"type":"versions:autodesk.bim360:File","version":"1.0"}},
      "relationships":{"storage":{"data":{"type":"objects","id":URN}}}}]})
  
      response = await rp(UploadConfig)
        .then(response => responseData = JSON.parse(response)['included'][0]['id'])
        .then(res => removeURN = responseData.replace("fs.file:vf.", "dm.lineage:"))
        .then(res => removeURN = removeURN.replace("?version=1", ""))
        .then(res => responseDataBuffer = Buffer.from(responseData).toString('base64'))
        .then(res => completeURN = responseDataBuffer.replace('/', '_'))
        .then(res => console.log("File Uploaded"))

    return await {"removeURN": removeURN, "completeURN": completeURN}
    }
  }


 