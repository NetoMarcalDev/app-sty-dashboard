import React, { useState } from 'react';
import CostumerRegisterComponent from '../../../components/Costumer/Register';
import Menu from '../../../components/Menu';
import { registerCustomer } from '../../../api/Clients/Clientes';
import axios from 'axios';
import { Alert } from 'reactstrap';
import ModalContirm from '../../../components/Modal/Confirm';

const CostumerRegister = () => {   

    const clientDefault = {
        name_application_bb: '',
        id_application_bb: '',
        developer_application_key : '',
        client_id: '',
        client_secret: '',
        document_type:'',
        document: '',
        description: '',
        date: '',
        address: '',
        city: '',
        uf: '',
        cep: '',
        access_key: ''
    }
    const modalDefault = { 
        modal: false, 
        titulo: '', 
        texto: '', 
        acao1: '', 
        acao2: '' 
    }

    const [message, setMessage] = useState('');
    const [customer, setCustomer] = useState(() => clientDefault);

    const [modal, setModal] = useState(modalDefault);
    const toggle = () => setModal(!modal);

    const register = async (e) => {

        e.preventDefault(); 
        
        axios.post('https://fortalcenter.com.br:3001/api/painel/clients/create', clientDefault, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res.status)
        })
        .catch((error) => {
          setMessage(() => error.response.data.message);
          
          setModal({
            ...modal,
            modal: true,
            titulo: 'Informação',
            texto: error.response.data.message,
            acao1: 'OK'
          })
        })
    }

    return(
        <>
            <Menu />
            <button onClick={(e) => register(e) }>Teste</button>
            {
                message !== '' ? (
                    <Alert color='danger'>{ message }</Alert>
                ) : ''
            }
            <ModalContirm modal={modal} toggle={toggle} />  
        </>
    )
}

export default CostumerRegister;