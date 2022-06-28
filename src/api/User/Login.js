import axios from 'axios';
import Config from '../../globals/CompanySettings';

export const login =  async (user) => {
    
    const response = await axios.post(`${Config.config.endpoint}users/login`, user);
    return response;
}

