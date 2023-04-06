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