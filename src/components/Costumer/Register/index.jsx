import React from 'react';
import './style.css';

const RegisterCostumer = (props) => { 
    

  return(
    <div className='container-sm'>
      <h4 className='title-page'>Cadastar Cliente</h4>
      <form>         
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label for='inputRegisterCustomerNameAPP'>Nome app</label>
              <input 
                type="text" 
                className="form-control is-valid" 
                id="inputRegisterCustomerNameAPP" 
                aria-describedby="validationServer03Feedback"
                autoFocus 
                onChange={e => props.setCustomer({...props.customer, name_application_bb: e.target.value})}
                required 
                placeholder='Nome do aplicativo no BB developer' 
              />
              <div className="valid-feedback" id="validationServer03Feedback">
                  mensagem
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>ID app</label>
              <input 
                type="text" 
                className="form-control is-valid" 
                id="inputRegisterCustomerIdApp" 
                onChange={e => props.setCustomer({...props.customer, id_application_bb: e.target.value})}
                required 
                placeholder='O Id do aplicativo no BB developer'
              />
              <div className="valid-feedback">
                  mensagem
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label>Chave desenvolvedor</label>
              <textarea  
                className="form-control is-valid" 
                id="textareaRegisterCustomerCahveDesenvolvedor" 
                onChange={e => props.setCustomer({...props.customer, developer_application_key: e.target.value})}
                required 
                placeholder='É a credencial para acionar as APIS do Banco do Brasil.' 
              />
              <div className="valid-feedback">
                  mensagem
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div className="col-md-12 mb-3">
              <label>Cliente Id</label>
              <textarea  
                className="form-control is-valid" 
                id="textareaRegisterCustomerClienteId" 
                onChange={e => props.setCustomer({...props.customer, client_id: e.target.value})}
                required 
                placeholder='É o identificador público e único no OAuth do Banco do Brasil.' 
              />
              <div className="valid-feedback">
                  mensagem
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label>Segredo do cliente</label>
              <textarea  
                className="form-control is-valid" 
                id="textareaRegisterCustomerCopiarBase" 
                onChange={e => props.setCustomer({...props.customer, client_secret: e.target.value})}
                placeholder='É conhecido apenas para sua aplicação e o servidor de autorização.'
              />
              <div className="valid-feedback">
                  mensagem
              </div>
            </div>
          </div>       
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label>Copia Básica</label>
              <textarea  
                className="form-control is-valid" 
                id="textareaRegisterCustomerCopiarBase" 
                onChange={e => props.setCustomer({...props.customer, copiar_basica: e.target.value})}
              />
              <div className="valid-feedback">
                  mensagem
              </div>
            </div>
          </div>          
          <div className='form-row'>
            <div className="col-md-4 mb-3">
              <label>Tipo Documento</label>
              <select 
                className="custom-select is-invalid" 
                id="selectRegisterCustomerTipoDocumento"
                onChange={e => props.setCustomer({...props.customer, document_type: e.target.value})}
                required
              >
                  <option value={1}>Física</option>
                  <option value={2}>Jurídica</option>
              </select>
              <div id="validationServer04Feedback" className="invalid-feedback">
                mensagem.
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Documento</label>
              <input 
                type="text" 
                className="form-control is-invalid" 
                id="inputRegisterCustomerDocumento" 
                onChange={e => props.setCustomer({...props.customer, document: e.target.value})}
                aria-describedby="" 
                required 
                maxLength={18} 
              />
              <div id="validationServer05Feedback" className="invalid-feedback">
                mensagem.
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Data cadastro</label>
              <input 
                type="dadte" 
                className="form-control is-invalid" 
                id="inputRegisterCustomerDataCadastro" 
                onChange={e => props.setCustomer({...props.customer, date: e.target.value})}
                required  
                maxLength={10}
              />
              <div id="validationServer05Feedback" className="invalid-feedback">
                mensagem.
              </div>
            </div>    
          </div>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label >Descrição</label>
              <input 
                type="text" 
                className="form-control is-valid" 
                id="inputRegisterCustomerDescricao" 
                onChange={e => props.setCustomer({...props.customer, description: e.target.value})}
                aria-describedby="" 
                required  
                placeholder='Nome do Cliente'
              />
              <div id="validationServer03Feedback" className="valid-feedback">
                  mensagem.
              </div>
            </div>                            
          </div>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label>CEP</label>
              <input 
                type="text" 
                className="form-control is-valid" 
                id="inputRegisterCustomerCep" 
                onChange={e => props.setCustomer({...props.customer, cep: e.target.value})}
                required  
                placeholder='CEP'
                maxLength={10}
              />
              <div id="validationServer03Feedback" className="valid-feedback">
                  mensagem.
              </div>
            </div> 
            <div className="col-md-4 mb-3">
              <label>Cidade</label>
              <input 
                type="text" 
                className="form-control is-valid" 
                id="inputRegisterCustomerCidade"
                onChange={e => props.setCustomer({...props.customer, city: e.target.value})}
                required  
                placeholder='Cidade'
              />
              <div id="validationServer03Feedback" className="valid-feedback">
                  mensagem.
              </div>
            </div>  
            <div className="col-md-4 mb-3">
              <label>UF</label>
              <input 
                type="text" 
                className="form-control is-valid" 
                id="inputRegisterCustomerUf" 
                onChange={e => props.setCustomer({...props.customer, uf: e.target.value})} 
                required  
                placeholder='UF'
                maxLength={2}
              />
              <div id="validationServer03Feedback" className="valid-feedback">
                  mensagem.
              </div>
            </div>                                   
          </div>
          <div className='form-row'>
            <div className="col-md-4 mb-3">
              <label>Bairro</label>
              <input 
                type="text" 
                className="form-control is-valid" 
                id="inputRegisterCustomerBairro" 
                onChange={e => props.setCustomer({...props.customer, district: e.target.value})}
                required  
                placeholder='Bairro'/>
              <div id="validationServer03Feedback" className="valid-feedback">
                  mensagem.
              </div>
            </div>
            <div className="col-md-8 mb-3">
              <label>Endereço</label>
              <input 
                type="text" 
                className="form-control is-valid" 
                id="inputRegisterCustomerEndereco"
                onChange={e => props.setCustomer({...props.customer, address: e.target.value})}
                required  
                placeholder='Endereço'
              />
              <div id="validationServer03Feedback" className="valid-feedback">
                  mensagem.
              </div>
            </div>    
          </div>             
          <button 
            className="btn btn-success btn-lg btn-block btn-margin" 
            type="submit"
            onClick={(e) => props.teste(e)}
          >
            Cadastrar
          </button>
     </form>
    </div>
  )
}

export default RegisterCostumer;