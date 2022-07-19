import React, { useState, useEffect, createRef } from 'react';
import './style.css';

const RegisterCostumer = (props) => { 
    
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.setCustomer({ ...props.customer, [name]: value });
  };

  const references = {
    name_application_bb: createRef(),
    id_application_bb: createRef()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(props.customer));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(props.customer);
    }
  }, [formErrors]);

  const validate = (values) => { 
    const errors = {};

    if (!values.name_application_bb) {
      errors.name_application_bb = "O nome da aplicação é obrigatório!";
    }
    if (!values.id_application_bb) {
      errors.id_application_bb = "O Id do app é Obrigatório!";
    }
    if (!values.developer_application_key) {
      errors.developer_application_key = "Chave desenvolvedor é obrigatória!";
    }
    return errors;
  }

  return(
    <div className='container-sm'>
      <h4 className='title-page'>Cadastar Cliente</h4>
      <form onSubmit={handleSubmit}>         
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label>Nome app</label>
              <input 
                type="text" 
                className={formErrors.name_application_bb ? "form-control is-invalid" : "form-control is-valid"} 
                ref={references.name_application_bb}
                name="name_application_bb" 
                autoFocus 
                onChange={handleChange}
                onBlur={handleSubmit}
                placeholder='Nome do aplicativo no BB developer' 
              />
              <div className="invalid-feedback">
                {formErrors.name_application_bb}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>ID app</label>
              <input 
                type="text" 
                className={formErrors.id_application_bb ? "form-control is-invalid" : "form-control is-valid"}  
                name="id_application_bb" 
                onChange={handleChange}
                onBlur={handleSubmit}
                placeholder='O Id do aplicativo no BB developer'
              />
              <div className="invalid-feedback">
                {formErrors.id_application_bb}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label>Chave desenvolvedor</label>
              <textarea  
                className={formErrors.developer_application_key ? "form-control is-invalid" : "form-control is-valid"} 
                name="developer_application_key" 
                onChange={handleChange}
                onBlur={handleSubmit}
                //required 
                placeholder='É a credencial para acionar as APIS do Banco do Brasil.' 
              />
              <div className="invalid-feedback">
                {formErrors.developer_application_key}
              </div>
            </div>
          </div>         
          <button 
            className="btn btn-block btn-margin" 
            style={{'background': '#008080', 'color': '#fff'}}
            type="submit"
          >
            Cadastrar
          </button>
     </form>
    </div>
  )
}

export default RegisterCostumer;