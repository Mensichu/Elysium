window.addEventListener('load',()=>{
    const liDropdown = document.querySelectorAll('.nav-item.dropdown');
    
    liDropdown.forEach(li =>{
        li.addEventListener('click', ()=>{
            //Si contiene show esta desplegado ya no se usa esta linea
            //const desplegar = li.children[0].classList.contains('show');
            desplegarDropdown(li, true);
        });
    });



    
    let bandDivNav=0;
    const divDropdown = document.querySelectorAll('.dropdown-menu');
    divDropdown.forEach(div =>{
        //console.log(div)
        div.addEventListener('mouseover', (e)=>{
            if(bandDivNav===0){
                //console.log('entro');
                bandDivNav=1;
            }
        });
        
        div.addEventListener('mouseleave', (e)=>{
            //console.log('salio');
            bandDivNav=0;
        });
        

        
        
    });



    
    liDropdown.forEach(li =>{
        li.addEventListener('mouseover', ()=>{
            liDropdown.forEach(li2 =>{
                desplegarDropdown(li2, false);
            });
            desplegarDropdown(li, true);
        });

        li.addEventListener('mouseout', ()=>{
            setTimeout(()=>{
                if(bandDivNav==0){
                    desplegarDropdown(li, false);
                }
            },500)
        });

        
        
    });
    
    
/*
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

*/
    
    navRemoveActive();
    function navRemoveActive(){
        const activos = document.querySelectorAll('.nav-link');
        activos.forEach(activo =>{
            //Esto evita conflicto con el Nav Tabs
            console.log(activo.id)
            if(activo.id!='excepcion')activo.classList.remove('active');
        });
    }

    



    navAddActive();
    function navAddActive(){
        navRemoveActive();
        const activos = document.querySelectorAll('.nav-link');        
        const pagina = window.location.pathname;
        console.log(pagina);
        if(pagina==('/')){activos[0].classList.add('active');bg_navElysium('#162938')};
        if(pagina==('/login')){activos[0].classList.add('active');bg_navElysium('#162938')};
        if(pagina.includes('/clientes')){activos[1].classList.add('active');bg_navElysium('#be7e15')};
        if(pagina.includes('/vehiculos/autos')){activos[2].classList.add('active');bg_navElysium('#273f83')};
        if(pagina.includes('/vehiculos/placas')){activos[2].classList.add('active');bg_navElysium('#4a5472')};
        if(pagina.includes('/productos')){activos[3].classList.add('active');bg_navElysium('#4a5472');};
        if(pagina.includes('/productos/clasificacion')){activos[3].classList.add('active');bg_navElysium('#9c342c');};
        if(pagina.includes('/Ventas'))activos[4].classList.add('active');
        if(pagina.includes('/Pedidos'))activos[5].classList.add('active');
        if(pagina.includes('/pedidos/proveedores')){activos[5].classList.add('active');bg_navElysium('#3a1947');};
        if(pagina.includes('/Pagos'))activos[6].classList.add('active');
        if(pagina.includes('/relacionPlacaCliente')){activos[7].classList.add('active');bg_navElysium('#1a1a1a');};
        if(pagina.includes('/relacionProductoAuto')){activos[7].classList.add('active');bg_navElysium('#1a1a1a');};
        

    }

    function bg_navElysium(bg_color){
        const navElysium = document.getElementById('navElysium');
            navElysium.style.background= bg_color;
            navElysium.classList.remove('bg-primary');
    }
    
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



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ANIMACION MODAL



const circulo = document.getElementById('circulo');


function ejecutarAnimacion(){
    circulo.style.transition = 'all 0.2s ease-out';
    //Se agrega la animacion 
    circulo.classList.add('circuloAnim');
    //Se obteiene los datos de posicion y forma
    const modalContent = document.querySelectorAll('.modal-content')[0];
    // Obtener las coordenadas absolutas del modal-content
    const rect = modalContent.getBoundingClientRect();
    // Se obtienen las coordenadas de posicion
    const modalContentTop = rect.top;
    const modalContentRight = rect.right-modalContent.offsetWidth;

    // Se asignan la posicion al circulo
    circulo.style.top = modalContentTop + 'px';
    circulo.style.right = modalContentRight + 'px';
    // Se asigna la forma de ancho y altura
    circulo.style.height=modalContent.offsetHeight+"px";
    circulo.style.width=modalContent.offsetWidth+"px";
    
    //console.log("Este es la altura del modal actual: "+myModalHeight);
    setTimeout(() => {
        //Muestra el modal una vez construido y la animacion llegue a la posicion correcta
        const modal = document.getElementById('myModal');
        modal.classList.add('show');
    }, 200); /* Esperar a que termine la animación */
    
}




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ANIMACION TOAST 

function toast(mensaje,colorClass){
    //Conseguimos mostrar el toast con un offset del teclado en pantalla
    const alturaTeclado = window.innerHeight - window.visualViewport.height;
    Toastify({
        text: mensaje+" ",
        duration: 3000, // duración en milisegundos
        gravity: "bottom", // posición en pantalla (top, bottom, left, right)
        position: "right", // alineación del mensaje (center, left, right)
        /*offset: {
            y: 35 // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          },*/
        offset: {
        y: alturaTeclado<1?35:alturaTeclado // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        },
        close:true,
        className: colorClass,

        //background: "radial-gradient(circle, #46b000, #46b0008a)" // color de fondo
        //"linear-gradient(to right, #00b09b, #96c93d)", // color de fondo
        }).showToast();
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ WHATSAPP CONTACTO

function messageToWs(valueTelefonoString) {
    const regex = /\d{10}/;
    const match = valueTelefonoString.match(regex);
  
    if (match) {
        //alert('Se han encontrado 10 números seguidos: ' + match[0]);
        let url = `https://wa.me/+593${match[0]}`;
        window.open(url, '_blank');
    }else{
        toast('No se encontro un numero valido', "toastColorError");
    }
  }



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MAIL COPY

  function btnCopy(inputCorreo){
    // Seleccionar el texto del input
    const text = inputCorreo.value;
    // Select the value/contents of the element
    inputCorreo.select();
    // Copy it to clipboard
    document.execCommand("Copy");
    // Deselect the text
    window.getSelection().removeAllRanges();
    toast("texto copiado!", "toastColorInfo");
}
    