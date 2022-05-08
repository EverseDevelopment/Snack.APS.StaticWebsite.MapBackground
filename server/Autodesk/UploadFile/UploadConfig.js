const BIM360Config = require('../Config/BIM360Config')

var UploadConfig = {
    'method': 'POST',
    'url': 'https://developer.api.autodesk.com/data/v1/projects/' + BIM360Config.project + '/items',
    'headers': {
      'Authorization': 'Bearer',
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    },
    body: ""
  
  };

module.exports = UploadConfig;