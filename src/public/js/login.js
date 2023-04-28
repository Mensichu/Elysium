//Login
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Agentes
    const pagina = window.location.pathname;
    if(pagina == '/login'){
        console.log("Cargo login");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA PLACAS

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



});
