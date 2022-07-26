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

export function isValidCPF (cpf) {
  
  cpf = cpf.replace(/[^\d]+/g,'');	
	
  if(cpf === '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length !== 11 || 
		cpf === "00000000000" || 
		cpf === "11111111111" || 
		cpf === "22222222222" || 
		cpf === "33333333333" || 
		cpf === "44444444444" || 
		cpf === "55555555555" || 
		cpf === "66666666666" || 
		cpf === "77777777777" || 
		cpf === "88888888888" || 
		cpf === "99999999999")
			return false;		
	// Valida 1o digito	
	let add = 0;	
	for (let i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		let rev = 11 - (add % 11);	
		if (rev === 10 || rev === 11)		
			rev = 0;	
		if (rev !== parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (let i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev === 10 || rev === 11)	
		rev = 0;	
	if (rev !== parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

export function isValidCNPJ(value) {
 
  
}