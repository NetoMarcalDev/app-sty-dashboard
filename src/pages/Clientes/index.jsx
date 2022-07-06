import React, { useEffect, useState } from 'react';
import { getClients } from '../../api/Clients/Clientes';

import Menu from '../../components/Menu';


const Clients = () => {

    const [list, setList] = useState([]);

    useEffect(() => {

        showList();

    }, []);

    const showList = async () => {
    
        try {
          
            const resp = await getClients();

            if (resp.status === 201) {
                setList([...resp.data.clients]);
            }
    
        } catch (error) {
    
         console.log(error);      
        }
    }

    return(
        <div>
            <Menu />
            Clientes: {
                    list.map((client)=>(
                        <li key={client.id_client}>
                            {client.description}
                        </li>
                    ))
                } 
            <hr className="my-3"/>
        </div>
    )

}

export default Clients;