import React, { useState, useEffect, createRef } from 'react';
import './style.css';
import { 
  isValibCep, 
  isValidUf, 
  isValidCPF, 
  isValidCNPJ,
  isValidEMail
} from '../../../utilities/Utilities';

import { 
  noMask, 
  maskCep, 
  maskCPF, 
  maskCNPJ
} from '../../../utilities/masks';
import { getCep } from '../../../api/Correios/Services';
import {getTreatmentMasculine, getTreatmentFemale  } from '../../../data/treatment';

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
    basic_copy: dataDefault,
    document_type: dataDefault,
    document: dataDefault,
    description: dataDefault,
    date: dataDefault,  
    sexo: dataDefault,
    treatment: dataDefault, 
    address_type: dataDefault,
    address: dataDefault,
    address_number: dataDefault, 
    city: dataDefault,
    uf: dataDefault,
    address_complement: dataDefault,   
    district: dataDefault,
    cep: dataDefault,
    phone_number1: dataDefault,
    whats_app_phone1: dataDefault,
    phone_number2: dataDefault,
    whats_app_phone2: dataDefault,
    phone_number3: dataDefault,
    whats_app_phone3: dataDefault,
    email1: dataDefault,
    email2: dataDefault,
    site: dataDefault,
    facebook: dataDefault,
    instagram: dataDefault,
    notes: dataDefault,
  }

  const [formStatus, setFormStatus] = useState(()=>statusFormDefault);
  const [isSubmit, setIsSubmit] = useState(false);
  const [type_document, setTypeDocument] = useState('CPF');

  const masculine_list = getTreatmentMasculine();
  const female_list = getTreatmentFemale();

  const references = {
    name_application_bb: createRef(),
    id_application_bb: createRef(),
    address: createRef(),
    address_number: createRef(),
    document_type: createRef(),
    document: createRef(),
    registration_date: createRef(),
  }

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

  const handleChangeMaskCPF = (e) => { 
    e.preventDefault();
    
    maskCPF(e);
    props.setCustomer({ ...props.customer, [e.target.name]: noMask(e.target.value) });
  }

  const handleChangeMaskCNPJ = (e) => { 
    e.preventDefault();
    
    maskCNPJ(e);
    props.setCustomer({ ...props.customer, [e.target.name]: noMask(e.target.value) });
  }

  const handleChangeDocumentType = (e) => {    
    
    e.preventDefault();

    console.log(e.target.name + ' - ' + e.target.value)

    props.setCustomer({ ...props.customer, document_type: e.target.value });

    if (e.target.value === 1) {
      setTypeDocument('CPF');
    }else { setTypeDocument('CNPJ'); }
    clearDocument();

    console.log(props.customer.document_type)

  };


  const handleSubmit = (e) => {
    
    e.preventDefault();
    setIsSubmit(true);
    
    //console.log(props.customer);

    if (validate()) {
      
      console.log(props.customer);
     
      return;
    }
  };

  useEffect(() => {


    /*const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    console.log(formatDate(today, 'aaaa-mm-dd'))
    props.customer.date_registration = formatDate(today, 'aaaa-mm-dd');
    references.registration_date.current.value = props.customer.date_registration;
    
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(props.customer);
    }*/

  }, []);

  const searchCep = async (e) => { 

     if(testCep()){

      const resp = await getCep(noMask(e.target.value));
      const logradouro_split = resp.data.logradouro.split(' ', 1);

      console.log(resp.data);

      document.getElementById('city').value = resp.data.localidade;
      document.getElementById('uf').value = resp.data.uf;
      document.getElementById('district').value = resp.data.bairro;
      document.getElementById('address').value = resp.data.logradouro; 
      document.getElementById('address_type').value = logradouro_split[0];

      setFormStatus({...formStatus, 
        address: {
          erro: '',
          validate: 'form-control is-valid',
          complement: 'Complemento: { ' + resp.data.complemento + ' }',
          feedback: 'valid-feedback'
        }
      });

      setFormStatus({...formStatus, 
        city: {
          erro: '',
          validate: 'form-control is-valid'
        },
        uf: {
          erro: '',
          validate: 'form-control is-valid'
        },
        district: {
          erro: '',
          validate: 'form-control is-valid'
        },
        address: {
          erro: '',
          validate: 'form-control is-valid'
        },
        address_type: {
          erro: '',
          validate: 'form-control is-valid'
        }
      });

      
      props.setCustomer({ ...props.customer,
       ...{ city: resp.data.localidade, 
            uf: resp.data.uf,
            district: resp.data.bairro,
            address: resp.data.logradouro,
            address_type: logradouro_split
          }
      });

    }
  }

  const clearDocument = () => { 

    props.setCustomer({ 
      ...props.customer,
      document: ''
     });

     references.document.current.value = '';
     setFormStatus({...formStatus, 
      document: {
        erro: '',
        validate: 'form-control'
      }
    });
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
          testDate() &&
          testDescription() &&
          testCep() &&
          testCity() &&
          testUf()  &&
          testDistrict() &&
          testTypeAddress() &&
          testAddress() &&
          testNumberAddress() &&
          testComplementAdress()
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
    if (!props.customer.basic_copy) {
      setFormStatus({...formStatus, 
        basic_copy: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      basic_copy: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testDocumentType = () => {
    if (!references.document_type.current.value) {
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
        document: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }

    if (type_document === 'CPF') {

      if (!isValidCPF(noMask(props.customer.document))) {
        setFormStatus({...formStatus, 
          document: {
            erro: 'CPF inválido!',
            validate: 'form-control is-invalid'
          }
        });
        references.document.current.focus();
        return false;
      }
    } else {
      if (!isValidCNPJ(noMask(props.customer.document))) {
        setFormStatus({...formStatus, 
          document: {
            erro: 'CNPJ inválido!',
            validate: 'form-control is-invalid'
          }
        });
        references.document.current.focus();
        return false;
      }
    }    
    setFormStatus({...formStatus, 
      document: {
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

  const testDate = () => {
    if (!props.customer.date) {
      setFormStatus({...formStatus, 
        date: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      date: {
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

  const testTypeAddress = () => {
    if (!props.customer.address_type) {
      setFormStatus({...formStatus, 
        address_type: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      address_type: {
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

  const testNumberAddress = () => {
    if (!props.customer.address_number) {
      setFormStatus({...formStatus, 
        address_number: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      address_number: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testComplementAdress = () => {
    if (!props.customer.address_complement) {
      setFormStatus({...formStatus, 
        address_complement: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      address_complement: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testPhone1 = () => {
    if (!props.customer.phone_number1) {
      setFormStatus({...formStatus, 
        phone_number1: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      phone_number1: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testSexo = () => {
    if (!props.customer.sexo) {
      setFormStatus({...formStatus, 
        sexo: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      sexo: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testTreatment = () => {
    if (!props.customer.treatment) {
      setFormStatus({...formStatus, 
        treatment: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    setFormStatus({...formStatus, 
      treatment: {
        erro: '',
        validate: 'form-control is-valid'
      }
    });
    return true;
  }

  const testEmail1 = () => {
    if (props.customer.email1) {
      if (isValidEMail(props.customer.email1)) {
        setFormStatus({...formStatus, 
          email1: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
      setFormStatus({...formStatus, 
        email1: {
          erro: 'E-mail inválido!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
  }

  const testEmail2 = () => {
    if (props.customer.email2) {
      if (isValidEMail(props.customer.email2)) {
        setFormStatus({...formStatus, 
          email2: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
      setFormStatus({...formStatus, 
        email2: {
          erro: 'E-mail inválido!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
  }

  return(
    <div className='container-sm'>
      <h4 className='title-page'>Cadastar Cliente</h4>
      <form onSubmit={handleSubmit}>         
      <div className="form-row">
            <div className="col-md-6 mb-3">
              <label>Nome app<span className='required_field'> *</span></label>
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
              <label>ID app<span className='required_field'> *</span></label>
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
              <label>Chave desenvolvedor<span className='required_field'> *</span></label>
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
              <label>Cliente Id<span className='required_field'> *</span></label>
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
              <label>Segredo do cliente<span className='required_field'> *</span></label>
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
              <label>Copia Básica<span className='required_field'> *</span></label>
              <textarea  
                className={formStatus.basic_copy.validate} 
                name="basic_copy" 
                onChange={handleChange}
                onBlur={testCopiarBasica}
                required
              />
              <div className="invalid-feedback">
                { formStatus.basic_copy.erro }
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div className="col-md-4 mb-3">
              <label>Tipo Documento<span className='required_field'> *</span></label>
              <select 
                className={formStatus.document_type.validate}
                name="document_type"
                id="document_type"
                ref={references.document_type}
                onChange={handleChangeDocumentType}
                onBlur={testDocumentType}
                required
              >
                  <option value=''></option>
                  <option value={1}>Física</option>
                  <option value={2}>Jurídica</option>
              </select>
              <div className="invalid-feedback">
                { formStatus.document_type.erro }
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label>{type_document}<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.document.validate} 
                name="document" 
                id="document"
                onChange={type_document === 'CPF' ? handleChangeMaskCPF :  handleChangeMaskCNPJ }
                ref={references.document}
                onBlur={testDocument}
                required 
              />
              <div className="invalid-feedback">
                { formStatus.document.erro } 
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label>Data nascimento<span className='required_field'> *</span></label>
              <input 
                type="date" 
                className={formStatus.date.validate}
                name="date"
                ref={references.registration_date} 
                onChange={handleChange}
                onBlur={testDate}
                required  
                maxLength={10}
                //disabled
              />
              <div className="invalid-feedback">
                {formStatus.date.erro}
              </div>
            </div>    
            <div className="col-md-2 mb-3">
              <label>Sexo<span className='required_field'> *</span></label>
              <select 
                className={formStatus.sexo.validate}
                name="sexo"
                onChange={handleChange}
                onBlur={testSexo}
                required
              >
                  <option value=''></option>
                  <option value='M'>M</option>
                  <option value='F'>F</option>
              </select>
              <div className="invalid-feedback">
                { formStatus.sexo.erro }
              </div>
            </div>
          </div>
          <div className="form-row">
          <div className="col-md-3 mb-3">
              <label>Tratamento<span className='required_field'> *</span></label>
              <select 
                className={formStatus.treatment.validate}
                name="treatment"
                onChange={handleChange}
                onBlur={testTreatment}
                required
              >
                { 
                  props.customer.sexo === 'F' ?
                    female_list.map((treatment_f, index) => 
                      <option key={index = index+1} value={ treatment_f }>
                        { treatment_f }
                      </option>)
                  : masculine_list.map((treatment_m, index) => 
                      <option key={index = index+1} value={ treatment_m }>
                        { treatment_m }
                      </option>)             
                }
          
              </select>
              <div className="invalid-feedback">
                { formStatus.treatment.erro }
              </div>
            </div>
            <div className="col-md-9 mb-3">
              <label >Descrição<span className='required_field'> *</span></label>
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
            <div className="col-md-2 mb-3">
              <label>CEP<span className='required_field'> *</span></label>
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
            <div className="col-md-4 mb-3">
              <label>Cidade<span className='required_field'> *</span></label>
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
              <label>UF<span className='required_field'> *</span></label>
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
            <div className="col-md-4 mb-3">
              <label>Bairro<span className='required_field'> *</span></label>
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
          <div className='form-row'>
          <div className="col-md-2 mb-3">
              <label>Tipo<span className='required_field'> *</span></label>
              <select 
                type="text" 
                className={formStatus.address_type.validate} 
                name="address_type" 
                id='address_type'
                onChange={handleChange}
                onBlur={testTypeAddress}
                required  
              >
                 <optgroup label="Tipos de Logradouro">
                    <option value=""></option>
                    <option value="Aeroporto"> Aeroporto </option>
                    <option value="Alameda"> Alameda </option>
                    <option value="Área"> Área </option>
                    <option value="Avenida"> Avenida </option>
                    <option value="Chácara"> Chácara </option>
                    <option value="Colônia"> Colônia </option>
                    <option value="Condomínio"> Condomínio </option>
                    <option value="Conjunto"> Conjunto </option>
                    <option value="Bêco"> Bêco </option>
                    <option value="Distrito"> Distrito </option>
                    <option value="Esplanada"> Esplanada </option>
                    <option value="Estação"> Estação </option>
                    <option value="Estrada"> Estrada </option>
                    <option value="Favela"> Favela </option>
                    <option value="Fazenda"> Fazenda </option>
                    <option value="Feira"> Feira </option>
                    <option value="Jardim"> Jardim </option>
                    <option value="Ladeira"> Ladeira </option>
                    <option value="Lago"> Lago </option>
                    <option value="Lagoa"> Lagoa </option>
                    <option value="Largo"> Largo </option>
                    <option value="Loteamento"> Loteamento </option>
                    <option value="Morro"> Morro </option>
                    <option value="Núcleo"> Núcleo </option>
                    <option value="Parque"> Parque </option>
                    <option value="Passarela"> Passarela </option>
                    <option value="Pátio"> Pátio </option>
                    <option value="Praça"> Praça </option>
                    <option value="Quadra"> Quadra </option>
                    <option value="Recanto"> Recanto </option>
                    <option value="Residencial"> Residencial </option>
                    <option value="Rodovia"> Rodovia </option>
                    <option value="Rua"> Rua </option>
                    <option value="Setor"> Setor </option>
                    <option value="Sítio"> Sítio </option>
                    <option value="Travessa"> Travessa </option>
                    <option value="Trecho"> Trecho </option>
                    <option value="Trevo"> Trevo </option>
                    <option value="Via"> Via </option>
                    <option value="Viaduto"> Viaduto </option>
                    <option value="Viela"> Viela </option>
                    <option value="Vila"> Vila </option>                                         
                  </optgroup>
              </select>

              <div className="invalid-feedback">
                { formStatus.address_type.erro  } 
              </div>
            </div>    
          <div className="col-md-8 mb-3">
              <label>Logradouro<span className='required_field'> *</span> </label>{formStatus.address.complement ? <a href='https://buscacepinter.correios.com.br/app/localidade_logradouro/index.php'  target="blank">: Buscar CEP</a> : ''}
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
            <div className="col-md-2 mb-3">
              <label>Nº<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.address_number.validate} 
                name="address_number" 
                id='address_number'
                ref={ references.address_number }
                onChange={handleChange}
                onBlur={testNumberAddress}
                required  
                placeholder='Nº/Apto/Casa'/>
              <div className="invalid-feedback">
                { formStatus.address_number.erro  } 
              </div>
            </div>               
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label>Complemento</label>
              <textarea  
                className= { formStatus.address_complement.validate } 
                name="address_complement"
                id="address_complement" 
                onChange={handleChange}
                onBlur={testComplementAdress}
                required
                placeholder='Ponto de referência...'
              />
              <div className="invalid-feedback">
                { formStatus.address_complement.erro }
              </div>
            </div>
          </div>  
          <div className="form-row">
            <div className="col-md-4 mb-3">
                <label>Telefone 01</label>
                <input 
                  type="text" 
                  className={formStatus.phone_number1.validate} 
                  name="phone_number1" 
                  id='phone_number1'
                  //ref={ references.phone_number1 }
                  onChange={handleChange}
                  onBlur={testPhone1}
                  required
                  placeholder='(00) 0.0000-0000'
                />
                <div className="invalid-feedback">
                  { formStatus.phone_number1.erro  } 
                </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group form-check">  
                <label>Telefone 02</label>                
                <input 
                  type="text" 
                  className={formStatus.phone_number2.validate} 
                  name="phone_number2" 
                  id='phone_number2'
                  //ref={ references.phone_number2 }
                  onChange={handleChange}
                  onBlur={()=>{}}
                  placeholder='(00) 0.0000-0000'
                />
                <div className="invalid-feedback">
                  { formStatus.phone_number2.erro  } 
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="form-group form-check">                
                <label className="form-check-label">Telefone 03</label>               
                <input type="checkbox" className="form-check-input" id="box_phone2"/> 
                <input 
                  type="text" 
                  className={formStatus.phone_number3.validate} 
                  name="phone_number3" 
                  id='phone_number3'
                  //ref={ references.phone_number3 }
                  onChange={handleChange}
                  onBlur={()=>{}}
                  placeholder='(00) 0.0000-0000'
                />
                <div className="invalid-feedback">
                  { formStatus.phone_number3.erro  }
                </div>
              </div>                
            </div>
          </div>       
          <div className="form-row">
            <div className="col-md-6 mb-3">
                <label>E-mail 01</label>
                <input 
                  type="text" 
                  className={formStatus.email1.validate} 
                  name="email1" 
                  id='email1'
                  //ref={ references.email1 }
                  onChange={handleChange}
                  onBlur={testEmail1}
                  placeholder=''
                  //maxLength={}
                />
                <div className="invalid-feedback">
                  { formStatus.email1.erro  }
                </div>
            </div>
            <div className="col-md-6 mb-3">
                <label>E-mail 02</label>
                <input 
                  type="text" 
                  className={formStatus.email2.validate} 
                  name="email2" 
                  id='email2'
                  //ref={ references.email2 }
                  onChange={handleChange}
                  onBlur={testEmail2}
                  //required  
                  placeholder=''
                />
                <div className="invalid-feedback">
                  { formStatus.email2.erro  }
                </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-4 mb-3">
                <label>Site</label>
                <input 
                  type="text" 
                  className={formStatus.site.validate} 
                  name="site" 
                  id='site'
                  //ref={ references.email1 }
                  onChange={handleChange}
                  onBlur={()=>{}}
                  placeholder=''
                />
                <div className="invalid-feedback">
                  { formStatus.site.erro  }
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <label>Facebook</label>
                <input 
                  type="text" 
                  className={formStatus.facebook.validate} 
                  name="facebook" 
                  id='facebook'
                  //ref={ references.facebook }
                  onChange={handleChange}
                  onBlur={()=>{}}
                  //required  
                  placeholder=''
                />
                <div className="invalid-feedback">
                  { formStatus.facebook.erro  }
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <label>Instagram</label>
                <input 
                  type="text" 
                  className={formStatus.instagram.validate} 
                  name="instagram" 
                  id='instagram'
                  //ref={ references.instagram }
                  onChange={handleChange}
                  onBlur={()=>{}}
                  //required  
                  placeholder=''
                />
                <div className="invalid-feedback">
                  { formStatus.instagram.erro  }
                </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
            <label>Anotações</label>
                <textarea 
                  type="text" 
                  className={formStatus.notes.validate} 
                  name="notes" 
                  id='notes'
                  //ref={ references.notes }
                  onChange={handleChange}
                  onBlur={()=>{}}
                  //required  
                  placeholder=''
                />
                <div className="invalid-feedback">
                  { formStatus.notes.erro  }
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