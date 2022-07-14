import React from 'react';
import './style.css';

const RegisterCostumer = () => { 
    
  return(
    <div className='container-sm'>
      <h4 className='title-page'>Cadastar Cliente</h4>
      <form>         
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="validationServer01">Nome app</label>
              <input type="text" class="form-control is-valid" id="validationServer01" autoFocus required placeholder='Nome do aplicativo no BB developer' />
              <div class="valid-feedback">
                  mensagem
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="validationServer02">ID app</label>
              <input type="text" class="form-control is-valid" id="validationServer02" required placeholder='O Id do aplicativo no BB developer'/>
              <div class="valid-feedback">
                  mensagem
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-12 mb-3">
              <label for="validationServer01">Chave desenvolvedor</label>
              <textarea  class="form-control is-valid" id="validationServer01" required placeholder='É a credencial para acionar as APIS do Banco do Brasil.' />
              <div class="valid-feedback">
                  mensagem
              </div>
            </div>
          </div>       
          <div class="form-row">
            <div class="col-md-12 mb-3">
              <label for="validationServer01">Copiar Basic</label>
              <textarea  class="form-control is-valid" id="validationServer01" required placeholder='' />
              <div class="valid-feedback">
                  mensagem
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div class="col-md-4 mb-3">
              <label for="validationServer04">Tipo Documento</label>
              <select class="custom-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                <option value='1' selected>Física</option>
                <option value='2'>Jurídica</option>
              </select>
              <div id="validationServer04Feedback" class="invalid-feedback">
                mensagem.
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="validationServer05">Documento</label>
              <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required />
              <div id="validationServer05Feedback" class="invalid-feedback">
                mensagem.
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="validationServer05">Data cadastro</label>
              <input type="dadte" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required />
              <div id="validationServer05Feedback" class="invalid-feedback">
                mensagem.
              </div>
            </div>    
          </div>
          <div class="form-row">
            <div class="col-md-12 mb-3">
              <label for="validationServer03">Decrição</label>
              <input type="text" class="form-control is-valid" id="validationServer03" aria-describedby="validationServer03Feedback" required  placeholder='Nome do Cliente'/>
              <div id="validationServer03Feedback" class="valid-feedback">
                  mensagem.
              </div>
            </div>                            
          </div>
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <label for="validationServer03">CEP</label>
              <input type="text" class="form-control is-valid" id="validationServer03" aria-describedby="validationServer03Feedback" required  placeholder='Nome do Cliente'/>
              <div id="validationServer03Feedback" class="valid-feedback">
                  mensagem.
              </div>
            </div> 
            <div class="col-md-4 mb-3">
              <label for="validationServer03">Cidade</label>
              <input type="text" class="form-control is-valid" id="validationServer03" aria-describedby="validationServer03Feedback" required  placeholder='Nome do Cliente'/>
              <div id="validationServer03Feedback" class="valid-feedback">
                  mensagem.
              </div>
            </div>  
            <div class="col-md-4 mb-3">
              <label for="validationServer03">UF</label>
              <input type="text" class="form-control is-valid" id="validationServer03" aria-describedby="validationServer03Feedback" required  placeholder='Nome do Cliente'/>
              <div id="validationServer03Feedback" class="valid-feedback">
                  mensagem.
              </div>
            </div>                                   
          </div>
          <div className='form-row'>
            <div class="col-md-4 mb-3">
              <label for="validationServer03">Bairro</label>
              <input type="text" class="form-control is-valid" id="validationServer03" aria-describedby="validationServer03Feedback" required  placeholder='Nome do Cliente'/>
              <div id="validationServer03Feedback" class="valid-feedback">
                  mensagem.
              </div>
            </div>
            <div class="col-md-8 mb-3">
              <label for="validationServer03">Endereço</label>
              <input type="text" class="form-control is-valid" id="validationServer03" aria-describedby="validationServer03Feedback" required  placeholder='Nome do Cliente'/>
              <div id="validationServer03Feedback" class="valid-feedback">
                  mensagem.
              </div>
            </div>    
          </div>             
          <button className="btn btn-success btn-lg btn-block btn-margin" type="submit">Cadastrar</button>
     </form>
    </div>
  )
}

export default RegisterCostumer;