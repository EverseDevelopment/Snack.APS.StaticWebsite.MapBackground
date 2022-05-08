const BIM360Config = require('../Config/BIM360Config')

var StorageConfig = {
    'method': 'POST',
    'url': 'https://developer.api.autodesk.com/data/v1/projects/' + BIM360Config.project + '/storage',
    'headers': {
      'Authorization': 'Bearer ',
      'Content-Type': 'application/json'
    },
    body: ""
  };

module.exports = StorageConfig;