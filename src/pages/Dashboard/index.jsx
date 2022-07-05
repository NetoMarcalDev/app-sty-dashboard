import React, {useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import { getClients } from '../../api/Clients/Clientes';

const Dashboard = () => {

    const [list, setLis] = useState();

    useEffect(() => {

        showList();
      }, []);

    const showList = async () => {
    
        try {
          
            const resp = await getClients();
             
          if (resp.status === 201) {
                console.log(resp.data.clients[0].description)
              setLis([...resp.data]);  
          }
    
        } catch (error) {
    
         console.log(error);      
        }
      }

     const handleSubmit = async (e) => {
        e.preventDefault(); 

       
    }

    return(
        <div>
            <Menu title='Dashboard' />
            <hr className="my-3"/>
            <p>Cliente: { }</p>
        </div>
    )

}


export default Dashboard;