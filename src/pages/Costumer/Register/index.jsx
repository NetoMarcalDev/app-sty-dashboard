import React from 'react';
import CostumerRegisterComponent from '../../../components/Costumer/Register';
import Menu from '../../../components/Menu';
import { registerCustomer } from '../../../api/Clients/Clientes';

const CostumerRegister = () => {   

    const clientDefault = {
        name_application_bb: "sty_api_testes",
        id_application_bb: "36927",
        developer_application_key : "7091708b0cffbee0136fe18140050456b9f1a5bc",
        client_id: "eyJpZCI6IjM3N2ZjNTktOTEiLCJjb2RpZ29QdWJsaWNhZG9yIjowLCJjb2RpZ29Tb2Z0d2FyZSI6MjY5OTMsInNlcXVlbmNpYWxJbnN0YWxhY2FvIjoxfQ",
        client_secret: "eyJpZCI6IjZkMzU2YzgtMWMxMC00YzFlLWIxM2ItYjBhZGNlZmNmNWNmOCIsImNvZGlnb1B1YmxpY2Fkb3IiOjAsImNvZGlnb1NvZnR3YXJlIjoyNjk5Mywic2VxdWVuY2lhbEluc3RhbGFjYW8iOjEsInNlcXVlbmNpYWxDcmVkZW5jaWFsIjoyLCJhbWJpZW50ZSI6InByb2R1Y2FvIiwiaWF0IjoxNjUyMTI1Njc5Mjk5fQ",
        document_type: "1",
        document: "03377700000178",
        description: "Setydeias Serviços LTDA",
        date: "2022-07-17",
        address: "Rua, Lineu Machado, 777",
        city: "Fortaleza",
        uf: "CE",
        cep: "60520101",
        access_key: ""
    }

    return(
        <>
            <Menu />
            <button onClick={() => registerCustomer(clientDefault) }>Teste</button>
        </>
    )
}

export default CostumerRegister;