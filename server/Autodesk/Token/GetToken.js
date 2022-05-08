const rp = require('request-promise');
const credentials = require('./Credentials')

module.exports = {
    value : async function () {
    let response
    var token;
    
    response = await rp(credentials)
        .then(response => token = 'Bearer ' + JSON.parse(response)['access_token'])
        .catch(err => console.log('could not complete task', err));
    
    return await token
    }
}