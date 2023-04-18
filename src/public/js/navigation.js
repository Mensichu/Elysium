window.addEventListener('load',()=>{

    const navPrincipal=document.querySelector('#idNavPrincipal');
    let start_item="start-item1";
    navPrincipal.addEventListener('click',(e)=>{
        const itemSeleccionado = e.target;
        //Removemos el ultimo valor de start-item
        document.querySelector('.animation').classList.remove(start_item);
        switch ((itemSeleccionado.classList.value).toString()){
            case "item1":
                start_item="start-item1";
                break;
            case "item2":
                start_item="start-item2";
                break;
            case 'item3':
                start_item="start-item3";
                break;
            case 'item4':
                start_item="start-item4";
                break;
            case 'item5':
                start_item="start-item5";
                break;
            case 'item6':
                start_item="start-item6";
                break;
            default:
                break;
        }
        //Actualizamos al nuevo valor de start-item escogido
        document.querySelector('.animation').classList.add(start_item);
    });


    
});

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


