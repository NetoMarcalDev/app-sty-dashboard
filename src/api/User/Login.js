import axios from 'axios';

export const login =  async (user) => {
    
    const response = await axios.post('https://fortalcenter.com.br:3001/api/painel/clients', user);
    return response;
}

