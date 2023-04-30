//Login
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Agentes
    const pagina = window.location.pathname;
    if(pagina == '/login'){
        console.log("Cargo login");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA LOGIN

      document.querySelector('#fondo').classList.add('showNow');


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIN
        /*
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const btnSesion = document.getElementById('btn-Sesion');
        btnSesion.addEventListener('click', async e=>{
            //e.preventDefault();
            await fetch('/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  username: username,
                  password: password
                })
              })
                .then(async response => {
                  // Manejar la respuesta del servidor
                  console.log(await response)
                })
                .catch(error => {
                  // Manejar errores
                  console.log(error)
                });
        });
        */
    }

  if(pagina == '/register'){
      console.log("Cargo register");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA REGISTER

    document.querySelector('#fondo').classList.add('showNow');


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ REGISTER
          /*
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;

          const btnSesion = document.getElementById('btn-Sesion');
          btnSesion.addEventListener('click', async e=>{
              //e.preventDefault();
              await fetch('/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password
                  })
                })
                  .then(async response => {
                    // Manejar la respuesta del servidor
                    console.log(await response)
                  })
                  .catch(error => {
                    // Manejar errores
                    console.log(error)
                  });
          });
          */

      const username = document.getElementById('username');
      const password1 = document.getElementById('password1');
      const password2 = document.getElementById('password2');

    

    password2.addEventListener('input',()=>{
      validarElemento(password2,(password1.value == password2.value));
    });

    function validarElemento(elemento,valido){
      if(valido){
          elemento.classList.remove('is-invalid');
          elemento.classList.add('is-valid');
          elemento.parentNode.classList.remove('is-invalid');
          elemento.parentNode.classList.add('is-valid');
      }else{
          elemento.classList.add('is-invalid');
          elemento.classList.remove('is-valid');
          elemento.parentNode.classList.add('is-invalid');
          elemento.parentNode.classList.remove('is-valid');
      }
  }

  }

});
