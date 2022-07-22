import React, { useState, useEffect, createRef } from 'react';
import './style.css';
import { isValibCep, isValidUf } from '../../../utilities/Utilities';
import { maskCep, noMask } from '../../../utilities/masks';
import { getCep } from '../../../api/Correios/Services';

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
    client_secret: dataDefault,
    copiar_basica: dataDefault,
    document_type: dataDefault,
    documento: dataDefault,
    registration_date: dataDefault,
    description: dataDefault,
    cep: dataDefault,
    city: dataDefault,
    uf: dataDefault,
    district: dataDefault,
    address: dataDefault    
  }

  const [formStatus, setFormStatus] = useState(()=>statusFormDefault);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.setCustomer({ ...props.customer, [name]: value });
  };

  const handleChangeMaskCep = (e) => { 
    e.preventDefault();
    
    maskCep(e);
    props.setCustomer({ ...props.customer, [e.target.name]: e.target.value });
  }

  const handleChangeMaskUf = (e) => { 
    e.preventDefault();

    props.setCustomer({ ...props.customer, [e.target.name]: e.target.value });
  }

  const references = {
    name_application_bb: createRef(),
    id_application_bb: createRef(),
    address: createRef(),

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

  const searchCep = async (e) => { 

     if(testCep()){

      const resp = await getCep(noMask(e.target.value));
      console.log(resp.data);

      document.getElementById('city').value = resp.data.localidade;
      document.getElementById('uf').value = resp.data.uf;
      document.getElementById('district').value = resp.data.bairro;
      document.getElementById('address').value = resp.data.logradouro; 
      
      setFormStatus({...formStatus, 
        address: {
          erro: '',
          validate: 'form-control is-valid',
          complement: 'Complemento: { ' + resp.data.complemento + ' }',
          feedback: 'valid-feedback'
        }
      });

      props.setCustomer({ ...props.customer,
       ...{ city: resp.data.localidade, 
        uf: resp.data.uf,
        district: resp.data.bairro,
        address: resp.data.logradouro}
      });
      
    }
  }

  const validate = () => {    

    if (
          testNameApplication() && 
          testIdApplication() &&
          testDeveloperApplicationKey() &&
          testClientId() &&
          testCopiarBasica() &&
          testDocumentType() && 
          testDocument() &&
          testRegistrationDate() &&
          testDescription() &&
          testCep() &&
          testCity() &&
          testUf()  &&
          testDistrict() &&
          testAddress()
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

  const testCopiarBasica = () => {
    if (!props.customer.copiar_basica) {
      setFormStatus({...formStatus, 
        copiar_basica: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      copiar_basica: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testDocumentType = () => {
    if (!props.customer.document_type) {
      setFormStatus({...formStatus, 
        document_type: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      document_type: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testDescription = () => {
    if (!props.customer.description) {
      setFormStatus({...formStatus, 
        description: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      description: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testDocument = () => {
    if (!props.customer.document) {
      setFormStatus({...formStatus, 
        documento: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      documento: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }
  
  const testCep = () => {
    if (!props.customer.cep) {      
      
      setFormStatus({...formStatus, 
        cep: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    } 
    if (!isValibCep(props.customer.cep)) {
      setFormStatus({...formStatus, 
        cep: {
          erro: 'CEP inválido!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      cep: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testRegistrationDate = () => {
    if (!props.customer.date) {
      setFormStatus({...formStatus, 
        registration_date: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      registration_date: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testCity = () => {
    if (!props.customer.city) {
      setFormStatus({...formStatus, 
        city: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      city: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testUf = () => {
    if (!props.customer.uf) {
      setFormStatus({...formStatus, 
        uf: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    if (!isValidUf(props.customer.uf)) {
      setFormStatus({...formStatus, 
        uf: {
          erro: 'UF inválido!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      uf: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testDistrict = () => {
    if (!props.customer.district) {
      setFormStatus({...formStatus, 
        district: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      district: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testAddress = () => {
    if (!props.customer.address) {
      setFormStatus({...formStatus, 
        address: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      address: {
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
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label>Copia Básica</label>
              <textarea  
                className={formStatus.copiar_basica.validate} 
                name="copiar_basica" 
                onChange={handleChange}
                onBlur={testCopiarBasica}
                required
              />
              <div className="invalid-feedback">
                { formStatus.copiar_basica.erro }
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div className="col-md-4 mb-3">
              <label>Tipo Documento</label>
              <select 
                className={formStatus.document_type.validate}
                name="document_type"
                onChange={handleChange}
                onBlur={testDocumentType}
                required
              >
                  <option value={1}>Física</option>
                  <option value={2}>Jurídica</option>
              </select>
              <div className="invalid-feedback">
                { formStatus.document_type.erro }
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Documento</label>
              <input 
                type="text" 
                className={formStatus.documento.validate} 
                name="document" 
                onChange={handleChange}
                onBlur={testDocument}
                required 
                maxLength={18} 
              />
              <div className="invalid-feedback">
                { formStatus.documento.erro } 
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Data cadastro</label>
              <input 
                type="date" 
                className={formStatus.registration_date.validate}
                name="date" 
                onChange={handleChange}
                onBlur={testRegistrationDate}
                required  
                maxLength={8}
              />
              <div className="invalid-feedback">
                {formStatus.registration_date.erro}
              </div>
            </div>    
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label >Descrição</label>
              <input 
                type="text" 
                className={formStatus.description.validate} 
                name="description" 
                onChange={handleChange}
                onBlur={testDescription}
                required  
                placeholder='Nome do Cliente'
              />
              <div className="invalid-feedback">
                  { formStatus.description.erro }
              </div>
            </div>                            
          </div>
          <div className="form-row">
            <div className="col-md-3 mb-3">
              <label>CEP</label>
              <input 
                type="text" 
                className={formStatus.cep.validate} 
                name="cep" 
                onChange={handleChangeMaskCep}
                onBlur={searchCep}
                required  
                placeholder='CEP'
              />
              <div className="invalid-feedback">
                { formStatus.cep.erro } 
              </div>
            </div> 
            <div className="col-md-7 mb-3">
              <label>Cidade</label>
              <input 
                type="text" 
                className={formStatus.city.validate} 
                name="city" 
                id='city'               
                onChange={handleChange}
                onBlur={testCity}
                required  
                placeholder='Cidade'
              />
              <div className="invalid-feedback">
                { formStatus.city.erro  } 
              </div>
            </div>  
            <div className="col-md-2 mb-3">
              <label>UF</label>
              <select 
                type="text" 
                className={formStatus.uf.validate}  
                name="uf" 
                id='uf'
                onChange={handleChangeMaskUf} 
                onBlur={testUf}
                required  
                placeholder='UF'
                maxLength={2}
              >
                <option value=''></option>
                <option value='AC'>AC</option>
                <option value='AL'>AL</option>
                <option value='AP'>AP</option>
                <option value='AM'>AM</option>
                <option value='BA'>BA</option>
                <option value='CE'>CE</option>
                <option value='DF'>DF</option>
                <option value='ES'>ES</option>
                <option value='GO'>GO</option>
                <option value='MA'>MA</option>
                <option value='MT'>MT</option>
                <option value='MS'>MS</option>
                <option value='MG'>MG</option>
                <option value='PA'>PA</option>
                <option value='PB'>PB</option>
                <option value='BR'>PR</option>
                <option value='PE'>PE</option>
                <option value='PI'>PI</option>
                <option value='RJ'>RJ</option>
                <option value='RN'>RN</option>
                <option value='RS'>RS</option>
                <option value='RO'>RO</option>
                <option value='RR'>RR</option>
                <option value='SC'>SC</option>
                <option value='SP'>SP</option>
                <option value='SE'>SE</option>
                <option value='TO'>TO</option>
              </select>
              <div className="invalid-feedback">
                { formStatus.uf.erro  }
              </div>
            </div>                                   
          </div>
          <div className='form-row'>
          <div className="col-md-8 mb-3">
              <label>Endereço </label>{formStatus.address.complement ? <a href='https://buscacepinter.correios.com.br/app/localidade_logradouro/index.php'  target="blank">: Buscar CEP</a> : ''}
              <input 
                type="text" 
                className={formStatus.address.validate}
                name="address"
                id='address'
                ref={ references.address }
                onChange={handleChange}
                onBlur={testAddress}
                required  
                placeholder='Endereço'
              />
              <div className={formStatus.address.complement ? 'valid-feedback' : 'invalid-feedback'}>
                { formStatus.address.erro }
                { formStatus.address.complement }
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Bairro</label>
              <input 
                type="text" 
                className={formStatus.district.validate} 
                name="district" 
                id='district'
                onChange={handleChange}
                onBlur={testDistrict}
                required  
                placeholder='Bairro'/>
              <div className="invalid-feedback">
                { formStatus.district.erro  } 
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