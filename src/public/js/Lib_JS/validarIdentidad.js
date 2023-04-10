async function validarCedula(cedula) {
    const url = 'https://srienlinea.sri.gob.ec/sri-verificador-identidad/rest/validarIdentidad';
    const data = {
      tipoIdentificacion: 'C',
      identificacion: cedula,
      codigoPais: '593',
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('<usuario>:<contraseña>')
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.valido;
  }
  
  // Ejemplo de uso
  validarCedula('1234567890').then((valido) => {
    if (valido) {
      console.log('La cédula es válida');
    } else {
      console.log('La cédula no es válida');
    }
  });