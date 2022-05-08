var credentials = {
    'method': 'POST',
    'url': 'https://developer.api.autodesk.com/authentication/v1/authenticate',
    'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PF=boZ6jpDwlNEmVzAGFiFx8i'
    },
form: {
    'grant_type': 'client_credentials',
    'client_id': 'xuOxBGMyIELM9PgRJuD8aIoHU33laUVZ',
    'client_secret': 'aoQDAnNMvHfXwFSo',
    'scope': 'data:read data:write'
    },
Json: true,
};

module.exports = credentials;