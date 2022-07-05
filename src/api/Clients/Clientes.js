import axios from 'axios';
import Config from '../../globals/CompanySettings';

export const getClients =  async () => {
    
    const response = await axios.get(`${Config.config.api_endpoint}clients`);
    return response;
}

