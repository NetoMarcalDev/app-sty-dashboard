import React from 'react';

const RegisterCostumer = () => { 

    return(
        <form>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationServer01">Nome app BB</label>
                <input type="text" class="form-control is-valid" id="validationServer01" required placeholder='Nome do aplicativo no BB developer' />
                <div class="valid-feedback">
                    mensagem
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="validationServer02">ID app BB</label>
                <input type="text" class="form-control is-valid" id="validationServer02" required placeholder='O Id do aplicativo no BB developer'/>
                <div class="valid-feedback">
                    mensagem
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationServer03">Chave desenvolvedor</label>
                <input type="text" class="form-control is-valid" id="validationServer03" aria-describedby="validationServer03Feedback" required  placeholder='É a credencial para acionar as APIS do Banco do Brasil.'/>
                <div id="validationServer03Feedback" class="valid-feedback">
                    mensagem.
                </div>
              </div>              
            </div>
            <div className='form-row'>
            <div class="col-md-3 mb-3">
                <label for="validationServer04">Tipo Documento</label>
                <select class="custom-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                  <option selected>Física</option>
                  <option>Jurídica</option>
                </select>
                <div id="validationServer04Feedback" class="invalid-feedback">
                  mensagem.
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="validationServer05">Zip</label>
                <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required />
                <div id="validationServer05Feedback" class="invalid-feedback">
                mensagem.
                </div>
              </div>    
            </div>
            <button class="btn btn-primary" type="submit">Cadastrar</button>
       </form>
    )
}

export default RegisterCostumer;