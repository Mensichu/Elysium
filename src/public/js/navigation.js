window.addEventListener('load',()=>{
    const liDropdown = document.querySelectorAll('.nav-item.dropdown');
    liDropdown.forEach(li =>{
        li.addEventListener('click', ()=>{
            //Si contiene show esta desplegado
            const desplegar = li.children[0].classList.contains('show');
            desplegarDropdown(li, !desplegar);
        });

        
        
    });

    const navBarExitBtn = document.getElementById('navBarExitBtn');
    const navBarItems = document.getElementById('navbarColor01');
    navBarExitBtn.addEventListener('click',e=>{
        
        const desplegar = navBarItems.classList.contains('show');

        if(!desplegar){
            navBarExitBtn.classList.remove('collapsed')
            navBarExitBtn.setAttribute('aria-expanded','true');

            navBarItems.classList.add('show')
        }else{
            navBarExitBtn.classList.add('collapsed')
            navBarExitBtn.setAttribute('aria-expanded','false');

            navBarItems.classList.remove('show')
        }

    })

    
});



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CONECTADO

function conectado(){
    if (navigator.onLine) {
        // El navegador está en línea, se puede enviar la solicitud al servidor
        return true;
      } else {
        // El navegador no está en línea, muestra un mensaje de alerta al usuario
        toast("No hay conexión a Internet. Por favor, revisa tu conexión y vuelve a intentarlo.", "toastColorError");
        pinCarga('fallo');
        return false;
      }
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ NAVBAR

function desplegarDropdown(li,desplegar){

    if(desplegar){
        li.children[0].classList.add('show');
        li.children[0].setAttribute('aria-expanded','true');
        li.children[1].classList.add('show');
        li.children[1].setAttribute('data-bs-popper','static');
    }else{
        li.children[0].classList.remove('show');
        li.children[0].setAttribute('aria-expanded','false');
        li.children[1].classList.remove('show');
        li.children[1].removeAttribute('data-bs-popper');
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ANIMACION CARGA

const pin = document.getElementById('pin');

const tiempoCarga = 2000;

function pinCarga(estado){

    if(     estado === 'cargando'){
        cargando();
    }else if(estado === 'fallo'){
        fallo(tiempoCarga);
    }else if(estado === 'success'){
        success(tiempoCarga);
    }else if(estado === 'successFast'){
        success(300);
    }else if(estado === 'termino'){
        termino();
    }
            

}



function cargando(){
    pin.classList.add('loading');
    pin.classList.remove('fail');
    pin.classList.remove('success');
}

function fallo(tiempo){
    pin.classList.add('fail');
    pin.classList.remove('loading');
    pin.classList.remove('success');
    setTimeout(()=>{
        termino();
    },tiempo);
}

function success(tiempo){
    pin.classList.add('success');
    pin.classList.remove('loading');
    pin.classList.remove('fail');
    setTimeout(()=>{
        termino();
    },tiempo);
}

function termino(){
    pin.classList.remove('loading');
    pin.classList.remove('success');
    pin.classList.remove('fail');
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ANIMACION TOAST 

function toast(mensaje,colorClass){
    Toastify({
        text: mensaje+" ",
        duration: 3000, // duración en milisegundos
        gravity: "bottom", // posición en pantalla (top, bottom, left, right)
        position: "right", // alineación del mensaje (center, left, right)
        offset: {
            y: 35 // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          },
        close:true,
        className: colorClass,

        //background: "radial-gradient(circle, #46b000, #46b0008a)" // color de fondo
        //"linear-gradient(to right, #00b09b, #96c93d)", // color de fondo
        }).showToast();
}


