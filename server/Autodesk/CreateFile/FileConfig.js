var FileConfig = {
    'method': 'PUT',
    'url': 'https://developer.api.autodesk.com/oss/v2/buckets/',
    'headers': {
      'Authorization': 'Bearer ',
      'Content-Type': 'application/octet-stream'
    },
    body: "<file contents here>"
  };

module.exports = FileConfig;