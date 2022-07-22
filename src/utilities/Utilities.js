export function testValidPhone(number) {

 if(number.length <= 8) {  
    
    return false;
  }
  
  if(number.length === 9) {
    
    if(number.charAt(0) === '4' || number.charAt(0) === '3') {
      return true;
    }
    else {
      return false;      
    }
  }

  if(number.length === 11) { 
    
    if((number.charAt(0) === '9') && ((number.charAt(2) === '9') || (number.charAt(2) === '8') )) {     
     
      return true;
    }
    else {
     
      return false;
    }
  } 
    
}

export function isValibCep (cep) {
	const pattern = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
	return pattern.test(cep);
}

export function isValidUf (uf) {
	const pattern = /^[A-Z]{2}$/;
	return pattern.test(uf);
}