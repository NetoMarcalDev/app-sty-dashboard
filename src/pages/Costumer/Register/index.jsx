import React, { useState } from 'react';
import RegisterCostumer from '../../../components/Costumer/Register';
import Menu from '../../../components/Menu';
import { registerCustomer } from '../../../api/Clients/Clientes';
import axios from 'axios';
import ModalContirm from '../../../components/Modal/Confirm';

const CostumerRegister = () => {   

    const clientDefault = {
        name_application_bb: '',
        id_application_bb: '',
        developer_application_key : '',
        client_id: '',
        client_secret: '',
        copiar_basica: '',
        document_type: 1,
        document: '',
        description: '',
        date: '',   
        district: '',     
        address: '',
        city: '',
        uf: '',
        cep: '',
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
            titulo: 'Informação',
            texto: error.response.data.message,
            acao1: 'OK'
          })
        })
    }

    (function() {
        'use strict';
        window.addEventListener('load', function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();
    
    const teste = (e) => {
       
        setModal({
            ...modal,
            modal: true,
            titulo: 'Informação',
            texto: `
            Nome app: ${customer.name_application_bb} -  
            ID app: ${customer.id_application_bb} - 
            Chave desenvolvedor:${customer.developer_application_key} - 
            Cliente Id: ${customer.client_id} - 
            Segredo do cliente: ${customer.client_secret} - 
            Copia Básica: ${customer.copiar_basica} - 
            Tipo Documento: ${customer.document_type} - 
            Documento: ${customer.document} -  
            Data cadastro:${customer.date} - 
            Descrição: ${customer.description} - 
            CEP: ${customer.cep} - 
            Cidade: ${customer.city} - 
            UF: ${customer.uf} - 
            Bairro: ${customer.district} - 
            Endereço: ${customer.address} - 
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
                teste={teste}
            />
            <ModalContirm 
                modal={modal} 
                toggle={toggle} 
            />  
        </>
    )
}

export default CostumerRegister;