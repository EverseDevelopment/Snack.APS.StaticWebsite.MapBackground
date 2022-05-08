const BIM360Config = require('../Config/BIM360Config')

var FileConfig = {
    'method': 'GET',
    'url': 'https://developer.api.autodesk.com/data/v1/projects/' + BIM360Config.project + '/folders/' + BIM360Config.folder + '/contents',
    'headers': {
      'Authorization': 'Bearer ',
      'Content-Type': 'application/octet-stream'
    },
    body: "<file contents here>"
  };

module.exports = FileConfig;

