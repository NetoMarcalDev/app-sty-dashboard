import axios from 'axios';
import Config from '../../globals/CompanySettings';

export const getCustomer =  async () => {
    
    const response = await axios.get(`${Config.config.api_endpoint}clients`);
    return response;
}

export const registerCustomer = (data) => {
    axios.post(`${Config.config.api_endpoint}clients/create`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((res) => {
        console.log(res.message)
    })
    .catch((error) => {
      console.error(error)
    })
}
