import React, { useEffect, useState } from 'react';
import { getCustomer } from '../../api/Clients/Clientes';
import Menu from '../../components/Menu';

const Clients = () => {

    const [list, setList] = useState([]);

    useEffect(() => {

        showList();

    }, []);

    const showList = async () => {
    
        try {
          
            const resp = await getCustomer();

            if (resp.status === 201) {
                setList((prev) => (
                    [
                        ...prev, 
                        ...resp.data.clients
                    ]));
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