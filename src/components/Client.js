import axios from 'axios';
import { tokenUrl, apiKey} from "../constants/dummyData";

function getaccesstoken() {
	let config = {
		method: 'get',
		url: tokenUrl,
		headers: { 
			'x-api-key': apiKey
		}
	};
	return axios(config)
  	.then(response => {
      let res = response.data;
  		return res;
  	})
		.catch(function (error) {
				console.log(error);
  	});
}

const Client = { getaccesstoken };
export default Client;

