export function maskTelefone(e) {
    
  e.currentTarget.maxLength = 11;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  
  if(value.length > 8) {

    value = value.replace(/^(\d{1})(\d)/, "$1.$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  }
  else {

    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  }
    
  e.currentTarget.value = value;
  return e;
}

export function maskTelefone2(value) {
     
  if(value.length > 8) {

    value = value.replace(/^(\d{1})(\d)/, "$1.$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  }
  else {

    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  }
    
  return value;
}

export function  noMask(numero) {

  let padrao = '';
  
  for (let i = 0; i < numero.length; i++) {
    
    if(numero.charAt(i) !== '.' && numero.charAt(i) !== '-') {
      padrao = padrao + numero.charAt(i);
    }      
  }
  
  return padrao;   
}

export function maskCep(e) {
    
  e.currentTarget.maxLength = 10;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/(\d)(\d{3})$/, "$1-$2"); 
    
  e.currentTarget.value = value;
  return e;
}

