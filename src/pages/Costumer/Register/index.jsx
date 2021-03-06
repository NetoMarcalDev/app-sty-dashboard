import React, { useState } from 'react';
import RegisterCostumer from '../../../components/Costumer/Register';
import Menu from '../../../components/Menu';
import { registerCustomer } from '../../../api/Clients/Clientes';
import axios from 'axios';
import ModalContirm from '../../../components/Modal/Confirm';
import '../../../styles.css';

const CostumerRegister = () => {   

    const clientDefault = {
        id: '',
        name_application_bb: '',
        id_application_bb: '',
        developer_application_key: '',
        client_id: '',
        client_secret: '',
        basic_copy: '',
        document_type: '',
        document: '',
        description: '',
        date: '',
        sexo: '',
        treatment: '',
        date_registration: '',
        date_update: '',
        address_type: '',
        address: '',
        address_number: '',
        city: '',
        uf: '',
        address_complement: '',
        district: '',
        cep: '',
        phone_number1: '',
        whats_app_phone1: '',
        phone_number2: '',
        whats_app_phone2: '',
        phone_number3: '',
        whats_app_phone3: '',
        email1 : '',
        email2: '',
        site: '',
        facebook: '',
        instagram: '',
        notes: '', 
        access_key: ''
    }
    const modalDefault = { 
        modal: false, 
        titulo: '', 
        texto: '', 
        acao1: '', 
        acao2: '' 
    }

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
          setModal({
            ...modal,
            modal: true,
            titulo: 'Informa????o',
            texto: error.response.data.message,
            acao1: 'OK'
          })
        })
    }
    
    const teste = (e) => {
       
        setModal({
            ...modal,
            modal: true,
            titulo: 'Informa????o',
            texto: `
            Nome app: ${customer.name_application_bb} -  
            ID app: ${customer.id_application_bb} - 
            Chave desenvolvedor:${customer.developer_application_key} - 
            Cliente Id: ${customer.client_id} - 
            Segredo do cliente: ${customer.client_secret} - 
            Copia B??sica: ${customer.copiar_basica} - 
            Tipo Documento: ${customer.document_type} - 
            Documento: ${customer.document} -  
            Data cadastro:${customer.date} - 
            Descri????o: ${customer.description} - 
            CEP: ${customer.cep} - 
            Cidade: ${customer.city} - 
            UF: ${customer.uf} - 
            Bairro: ${customer.district} - 
            Endere??o: ${customer.address} - 
            `,
            acao1: 'OK'
          })
    }

    return(
        <>
            <Menu />
            <RegisterCostumer 
                customer={customer} 
                setCustomer={setCustomer}
            />
            <ModalContirm 
                modal={modal} 
                toggle={toggle} 
            />  
        </>
    )
}

export default CostumerRegister;