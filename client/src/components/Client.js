import axios from 'axios';

function getaccesstoken() {
	return axios.get('/token')
  	.then(response => {
        var res = JSON.parse(response.data);
  		return res;
  	})
	.catch(function (error) {
   	 	console.log(error);
  	});
}

const Client = { getaccesstoken };
export default Client;

