import axios from 'axios';

const getURN = (fileName) => {
    const config = {
        method: 'get',
        url: '/models'
    }
    return axios(config).then(response => {
        let model = null;
        const modelList = response.data.models;
        model = modelList.find(item => item.DisplayName === fileName);
        return model;
    }).catch(err => {
        return err.response
    });
}

const getGeoJson = async(param, balance) => {
    const config = {
        method: 'get',
        url: `https://${balance}.data.osmbuildings.org/0.2/anonymous/tile/16/${param.lng}/${param.lat}.json`
    }
    return await axios(config)
        .then(async(response) => {
            return response;
        })
        .catch(err => {
            return err.response
    });
}

export { getURN, getGeoJson }
