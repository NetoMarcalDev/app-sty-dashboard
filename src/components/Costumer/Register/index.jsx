import React, { useState, useEffect, createRef } from 'react';
import './style.css';

const RegisterCostumer = (props) => { 
    
  const dataDefault = {
    erro: 'Campo obrigatório!',
    validate: 'form-control'
  } 
  const statusFormDefault =  {
    name_application_bb: dataDefault,
    id_application_bb: dataDefault,
    developer_application_key: dataDefault,
    client_id: dataDefault,
    client_secret: dataDefault
  }

  const [formStatus, setFormStatus] = useState(()=>statusFormDefault);
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
    setIsSubmit(true);
    
    if (validate()) {
      console.log(props.customer);
      return;
    }    
  };

  /*useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(props.customer);
    }
  }, [errors]);*/

  const validate = () => {    

    if (testNameApplication() && 
          testIdApplication() &&
          testDeveloperApplicationKey() &&
          testClientId()
      )
    {
      return true;
    }
    return false;
  }

  const testNameApplication = () => {
    if (!props.customer.name_application_bb) {
      setFormStatus({...formStatus, 
        name_application_bb: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      //references.name_application_bb.current.focus();
      return false;
    }
    setFormStatus({...formStatus, 
      name_application_bb: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testIdApplication = () => {
    if (!props.customer.id_application_bb) {
      setFormStatus({...formStatus, 
        id_application_bb: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      id_application_bb: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

   const testDeveloperApplicationKey = () => {
    if (!props.customer.developer_application_key) {
      setFormStatus({...formStatus, 
        developer_application_key: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      developer_application_key: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testClientId = () => {
    if (!props.customer.client_id) {
      setFormStatus({...formStatus, 
        client_id: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      client_id: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testClientSecret = () => {
    if (!props.customer.client_secret) {
      setFormStatus({...formStatus, 
        client_secret: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      client_secret: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
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
                className={formStatus.name_application_bb.validate}
                ref={ references.name_application_bb }
                name='name_application_bb'
                autoFocus 
                onChange={handleChange}
                onBlur={testNameApplication}
                required
                placeholder='Nome do aplicativo no BB developer' 
              />
               <div className="invalid-feedback">
                { formStatus.name_application_bb.erro }
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>ID app</label>
              <input 
                type="text" 
                className={formStatus.id_application_bb.validate}  
                ref={ references.id_application_bb}
                name="id_application_bb"     
                onChange={handleChange}  
                onBlur={testIdApplication}
                required       
                placeholder='O Id do aplicativo no BB developer'
              />
              <div className="invalid-feedback">
                { formStatus.id_application_bb.erro }
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label>Chave desenvolvedor</label>
              <textarea  
                className={formStatus.developer_application_key.validate}
                name="developer_application_key" 
                onChange={handleChange} 
                onBlur={testDeveloperApplicationKey}
                required 
                placeholder='É a credencial para acionar as APIS do Banco do Brasil.' 
              />
              <div className="invalid-feedback">
                { formStatus.developer_application_key.erro }
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div className="col-md-12 mb-3">
              <label>Cliente Id</label>
              <textarea  
                className={formStatus.client_id.validate}
                name="client_id" 
                onChange={handleChange}
                onBlur={testClientId}
                required 
                placeholder='É o identificador público e único no OAuth do Banco do Brasil.' 
              />
              <div className="invalid-feedback">
                { formStatus.client_id.erro }
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label>Segredo do cliente</label>
              <textarea  
                className={formStatus.client_secret.validate}
                name="client_secret" 
                onChange={handleChange}
                onBlur={testClientSecret}
                required
                placeholder='É conhecido apenas para sua aplicação e o servidor de autorização.'
              />
              <div className="invalid-feedback">
                { formStatus.client_secret.erro }
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