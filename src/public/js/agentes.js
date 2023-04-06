
//Agentes
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Agentes
    const pagina = window.location.pathname;
    if(pagina == '/agentes'){
        console.log("Cargo agentes");
        document.querySelector('.animation').classList.add("start-item1");    
    }
});


