const rp = require('request-promise');
const StorageConfig = require('./StorageConfig')
const BIM360Config = require('../Config/BIM360Config')

module.exports = {
  execute : async function (token, fileName) {
    let response
    var responseData
    StorageConfig.headers.Authorization = token

    StorageConfig.body = JSON.stringify({"jsonapi":{"version":"1.0"},
    "data":{"type":"objects","attributes":{"name": fileName },
    "relationships":{"target":{"data":{"type":"folders","id":BIM360Config.folder}}}}})

    response = await rp(StorageConfig)
        .then(response => responseData = JSON.parse(response)['data']['id'])
        .then(res => console.log("Option Storage"))
        .catch(err => console.log('could not complete', err));
  
  return await responseData
  }
}



