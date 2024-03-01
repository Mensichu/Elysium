
//Productos
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Productos
    const pagina = window.location.pathname;
    //if(pagina.toLowerCase() == '/relacionplacacliente'){
    if(pagina.toLowerCase() == '/relacionplacacliente'){
        console.log("Cargo relacionPlacaCliente");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA RELACION PLACA CLIENTE

        document.querySelector('#fondo').classList.add('showNow');
        
        let rowIdCliente = null;
        let rowIdPlaca = null;
        let rowIdRelacion=null;



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA CLIENTE: placas RELACION



const gridOptionsRelacionPlacas = {

    // each entry here represents one column
    columnDefs: [
        {headerName: "Id_Relacion", 
                field: "id_relacion", hide: true
            },
        {headerName: "Id", 
            field: "id", hide: true
        },
        {headerName: "Placa",
            field: "placa",sort: 'asc', floatingFilter:true, 
            width: 110
            },
        {headerName: "Marca",
            field: "marca",sort: 'asc', floatingFilter:true, 
            width: 100
            },
        {headerName: "Modelo", 
            field: "modelo", floatingFilter:true,
            flex: 1, minWidth: 150
            },
        {headerName: "info", 
            field: "info", floatingFilter:true,
            width: 180
            }
    ],
    defaultColDef: {sortable: true, 
                    filter: 'agTextColumnFilter', 
                    enableRowGroup:true,
                    filterParams:{
                        buttons: ["apply","reset"]
                    },
                    resizable: true,
                },
    onModelUpdated: (event) => {
        if(true ){
            console.log('-----------------------------------------ON MODEL PLACA UPDATED');
            //Anima al reordenar las filas
            gridOptionsRelacionPlacas.api.redrawRows();
            
        }
    },

    getRowId: (params) => { return params.data.id; },

    rowHeight: 45, // altura de las filas en píxeles
    headerHeight: 30, // altura del encabezado en píxeles
    rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista
    rowSelection: 'single', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    overlayNoRowsTemplate: 'No se encontraron placas relacionadas a este cliente',
    getContextMenuItems: getContextMenuItems1,

    // example event handler
    onCellClicked: params => {
        if(params.data!== undefined){
            rowIdRelacion = params.data.id_relacion;
        }else{
            //guardarBtn.disabled=true;
        }
    },
    onCellContextMenu: params => {
        // Acciones a realizar al hacer clic derecho en una celda
        console.log('Hiciste clic derecho en la celda:', params.data.id);
        rowIdRelacion = params.data.id_relacion;
        // Puedes acceder a la fila seleccionada y realizar acciones adicionales
        params.api.deselectAll();
        const selectedNode = params.node;
        selectedNode.setSelected(true);
        //console.log('Datos de la fila seleccionada:', selectedRowNode.data);

        // Evita que aparezca el menú contextual predeterminado del navegador
        //params.event.preventDefault();
    },
    onSelectionChanged: () => {
        console.log('SelectionChanged')
        const selectedRows = gridOptionsRelacionPlacas.api.getSelectedRows();
        if (selectedRows.length === 0) {
            // aquí puedes hacer algo cuando no hay filas seleccionadas
            
          
        }
    }
};

  
  function getContextMenuItems1(params) {
    var result = [
      {
        // custom item
        name: 'Eliminar',
        action: () => {
            if(rowIdCliente!==null && rowIdRelacion!==null){
                construirModal(0);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un cliente y un vehiculo!", "toastColorError");
            }
        },
        cssClasses: ['red', 'bold'],
      },
      'copy',
      'separator',
      'export',
    ];
  
    return result;
  }

  function getContextMenuItems2(params) {
    var result = [
      {
        // custom item
        name: 'Eliminar',
        action: () => {
            if(rowIdPlaca!==null && rowIdRelacion!==null){
                construirModal(1);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un vehiculo y un cliente!", "toastColorError");
            }
        },
        cssClasses: ['red', 'bold'],
      },
      'copy',
      'separator',
      'export',
    ];
  
    return result;
  }

// get div to host the grid
const eGridDivRelacion = document.getElementById("myGridRelacion");

// new grid instance, passing in the hosting DIV and Grid Options
var temporal111 = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionPlacas);

const gridApiRelacionPlacas = gridOptionsRelacionPlacas.api;

//gridOptionsRelacionPlacas.api.setRowData([]);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA PLACA: clientes RELACION


const gridOptionsRelacionClientes = {

    // each entry here represents one column
    columnDefs: [
        {headerName: "Id_Relacion", 
                field: "id_relacion", hide: true
            },
        {headerName: "Id", 
                field: "id", hide: true
            },
        {headerName: "Identificacion",
            field: "identidad",sort: 'asc', floatingFilter:true, 
            width: 150
            },
        {headerName: "Cliente", 
            field: "nombre", floatingFilter:true,
            flex: 1, minWidth: 150
            }
        
    ],
    defaultColDef: {sortable: true, 
                    filter: 'agTextColumnFilter', 
                    enableRowGroup:true,
                    filterParams:{
                        buttons: ["apply","reset"]
                    },
                    resizable: true,
                },
    onModelUpdated: (event) => {
        if(true ){
            console.log('-----------------------------------------ON MODEL PLACA UPDATED');
            //Anima al reordenar las filas
            gridOptionsRelacionClientes.api.redrawRows();
            
        }
    },

    getRowId: (params) => { return params.data.id; },

    rowHeight: 45, // altura de las filas en píxeles
    headerHeight: 30, // altura del encabezado en píxeles
    rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista
    rowSelection: 'single', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    overlayNoRowsTemplate: 'No se encontraron clientes relacionados a esta placa',
    getContextMenuItems: getContextMenuItems2,

    // example event handler
    onCellClicked: params => {
        if(params.data!== undefined){
            rowIdRelacion = params.data.id_relacion;
            
        }else{
            
        }
    },
    onCellContextMenu: params => {
        // Acciones a realizar al hacer clic derecho en una celda
        console.log('Hiciste clic derecho en la celda:', params.data.id);
        rowIdRelacion = params.data.id_relacion;
        // Puedes acceder a la fila seleccionada y realizar acciones adicionales
        params.api.deselectAll();
        const selectedNode = params.node;
        selectedNode.setSelected(true);
        //console.log('Datos de la fila seleccionada:', selectedRowNode.data);

        // Evita que aparezca el menú contextual predeterminado del navegador
        //params.event.preventDefault();
    },
    onSelectionChanged: () => {
        console.log('SelectionChanged')
        const selectedRows = gridOptionsRelacionClientes.api.getSelectedRows();
        if (selectedRows.length === 0) {
            // aquí puedes hacer algo cuando no hay filas seleccionadas
            
          
        }
    }
};









//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES PRINCIPALES


        //+++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA MODO CARGA

        function paginaModoCarga(activar){
            const inputCard = document.querySelectorAll('input');
            const buttonCard = document.querySelectorAll('button');
            
            if(activar){
                pinCarga('cargando')
                cambiarTipoTabla([]);
                if(tipoTabla==1){//Tabla de Clientes
                    try{gridOptionsRelacionClientes.api.setRowData([]);
                        gridOptionsRelacionClientes.api.showLoadingOverlay();}catch(error){}
                    
                }else{//Tabla de Placas
                    try{gridOptionsRelacionPlacas.api.setRowData([]);
                        gridOptionsRelacionPlacas.api.showLoadingOverlay();}catch(error){}
                }
                inputCard.forEach(input => {
                    input.disabled=true;
                });
                buttonCard.forEach(button => {
                    button.disabled=true;
                });
            }else{
                pinCarga('success')
                inputCard.forEach(input => {
                    input.disabled=false;
                });
                buttonCard.forEach(button => {
                    button.disabled=false;
                });
                if(tipoTabla==1){//Tabla de Clientes
                    //try{gridOptionsRelacionClientes.api.hideOverlay();}catch(error){}
                    
                }else{//Tabla de Placas
                    try{gridOptionsRelacionPlacas.api.hideLoadingOverlay();}catch(error){}
                }
            }
            
        }  



        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA CLIENTES

        async function cargarTablaClientes(Clientes){
            try{
                if(Clientes.length!=0){
                    for(i=0;i<Clientes.length;i++){
                        let newRow = datosAFilaGridClientes(Clientes[i],0);
                        gridOptionsRelacionClientes.api.applyTransaction({ add: newRow });
                    }
                }else{
                    gridOptionsRelacionClientes.api.setRowData([]);
                }
            }catch(error){
                console.log('Error al obtener los clientes:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }

        //---------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGridClientes(data,n) {

            if (gridOptionsRelacionClientes.api) {

                return [{ 
                            id_relacion: data.id_relacion,
                            id: data.id,
                            identidad: data.identificacion.toUpperCase(), 
                            nombre: data.apellidos_empresa.toUpperCase()+(data.nombres!=null?' '+data.nombres.toUpperCase():'')
                        }];
            
            }
        }


        //+++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA PLACAS

        async function cargarTablaPlacas(Placas){
            try{
                if(Placas.length!=0){
                    for(i=0;i<Placas.length;i++){
                        let newRow = datosAFilaGridPlacas(Placas[i],0);
                        gridOptionsRelacionPlacas.api.applyTransaction({ add: newRow });
                    }
                }else{
                    gridOptionsRelacionPlacas.api.setRowData([]);
                }
            }catch(error){
                console.log('Error al obtener los placas:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }

        //---------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGridPlacas(data,n) {

            if (gridOptionsRelacionPlacas.api) {

                return [{
                            id_relacion: data.id_relacion,
                            id: data.id,
                            placa: data.nom_placa.toUpperCase(), 
                            marca: data.Auto.Marca.alias.toUpperCase(),
                            modelo: data.Auto.nom_auto.toUpperCase(),
                            info: ('Y: '+data.Auto.ano+' | C: '+data.Auto.cilindraje.toFixed(1)).toUpperCase()
                            + ' | '+ (data.Auto.combustible? 'TD':'TM')
                        }];
            }
        }


        //-----------------------------------------------CAMBIAR TIPO TABLA
        //0: no encontro 1: Tipo Cliente 2: Tipo Placa
        var tipoTabla=0;
        function cambiarTipoTabla(datos){
            // Paso 1: Obtener el contenedor del grid
            const eGridDivRelacion = document.getElementById("myGridRelacion");

            // Paso 2: Verificar si hay hijos en el contenedor y eliminarlos
            while (eGridDivRelacion.firstChild) {
            eGridDivRelacion.removeChild(eGridDivRelacion.firstChild);
            }
            console.log(datos);
            // Paso 3: Crear la nueva tabla/grid
            if (tipoTabla==1){
                var nuevaTabla = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionClientes);
                cargarTablaClientes(datos);
            }else if(tipoTabla==2){
                var nuevaTabla = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionPlacas);
                cargarTablaPlacas(datos);
            }

        }


        //-----------------------------------------------BUSCAR CLIENTE
        async function buscarCliente(id){
            tipoTabla=2;
            cambiarTipoTabla([]);
            paginaModoCarga(true);
            try{
                if(conectado()){
                    const data = await fetch('/clientByData/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    cargarDatosDelCliente(data);
                    cambiarTipoTabla(data.placas);
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
                borrarDatosDelCliente();
                cambiarTipoTabla([]);
            }

            paginaModoCarga(false);
        }


        function cargarDatosDelCliente(data){
            rowIdCliente=data.id;
            document.getElementById("staticIdentificacion").value=data.identificacion;
            document.getElementById("staticLastName").value=data.apellidos_empresa;
            document.getElementById("staticName").value=data.nombres;
            document.getElementById("tituloHeaderRelacion").innerHTML="Cliente: "+data.apellidos_empresa+" "+data.nombres;
            document.getElementById("card-body-placa").classList.remove("card-body-green");
            document.getElementById("card-body-cliente").classList.add("card-body-green");

        }

        function borrarDatosDelCliente(){
            rowIdCliente=null;
            document.getElementById("staticIdentificacion").value="0";
            document.getElementById("staticLastName").value="_";
            document.getElementById("staticName").value="_";
            document.getElementById("tituloHeaderRelacion").innerHTML="Cliente: _";
            document.getElementById("card-body-placa").classList.remove("card-body-green");
            document.getElementById("card-body-cliente").classList.remove("card-body-green");

        }

        //-----------------------------------------------BUSCAR PLACA
        async function buscarPlaca(nom_placa){
            tipoTabla=1;
            cambiarTipoTabla([]);
            paginaModoCarga(true);
            try{
                if(conectado()){
                    const data = await fetch('/placaByData/'+nom_placa)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    cargarDatosDePlaca(data);
                    cambiarTipoTabla(data.clientes);
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
                borrarDatosDePlaca();
                cambiarTipoTabla([]);
            }
            paginaModoCarga(false);
        }


        function cargarDatosDePlaca(data){
            rowIdPlaca=data.id;
            document.getElementById("staticPlaca").value=data.nom_placa.toUpperCase();
            document.getElementById("staticMarca").value=data.Auto.Marca.nom_marca.toUpperCase();
            const info = (data.Auto.nom_auto+' | Y: '+data.Auto.ano+' | C: '+data.Auto.cilindraje.toFixed(1)).toUpperCase()
            + ' | '+ (data.Auto.combustible? 'TD':'TM');
            document.getElementById("staticModel").value=info;
            document.getElementById("tituloHeaderRelacion").innerHTML="Placa: "+data.nom_placa.toUpperCase();
            document.getElementById("card-body-cliente").classList.remove("card-body-green");
            document.getElementById("card-body-placa").classList.add("card-body-green");
            document.getElementById("cuadradoColor").style.backgroundColor=data.colores[0].hex_color;
            console.log(data)
        }

        function borrarDatosDePlaca(){
            rowIdPlaca=null;
            document.getElementById("staticPlaca").value="_";
            document.getElementById("staticMarca").value="_";
            document.getElementById("staticModel").value="_";;
            document.getElementById("tituloHeaderRelacion").innerHTML="Placa: _";
            document.getElementById("card-body-cliente").classList.remove("card-body-green");
            document.getElementById("card-body-placa").classList.remove("card-body-green");
            document.getElementById("cuadradoColor").style.backgroundColor="black";
        }

        //---------------------------------------------- NUEVA RELACION

        async function nuevaRelacion(){
            pinCarga('cargando');
            await fetch('/createRelacionPC',{
                method: 'POST',
                body: JSON.stringify({
                    id_cliente:rowIdCliente,
                    id_placa:rowIdPlaca
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response =>{
                if(!response.ok){
                    toast(response.status, "toastColorError");
                    throw new Error('Servidor - '+response.status+': '+response.statusText);
                }
                return response.json();
            })
            .then(async res =>{
                if(!(await res[1])){
                    console.log(!(await res[1]))
                    throw new Error('Ya existe esta relacion!');
                }else{
                    cerrarModal();
                    toast("Relacion Creada", "toastColorSuccess");
                    pinCarga('success');
                }
            }).catch(error =>{
                toast(error.message, "toastColorError");
                pinCarga('fallo');
            })
            
            
            setTimeout(()=>{
                btnConfirmar.disabled=false;
            },600);
            
        }




        //---------------------------------------------- ELIMINAR RELACION
        
        async function eliminarRelacion(){
            pinCarga('cargando');
            await fetch(`/deleteRelacionPC/${rowIdRelacion}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response =>{
                console.log(response)
                if(!response.ok){//Error del servidor
                    throw new Error('Servidor - '+response.status+': '+response.statusText);
                }
                if(response.status===404){//No encontro relacion a eliminar
                    toast('Relacion no existe!', "toastColorError");
                    
                }
                if(response.status===204){//Relacion destruida!
                    toast("Relacion Destruida!", "toastColorSuccess");
                }
                cerrarModal();
                pinCarga('success');
                return response;
                
            }).catch(error =>{
                toast(error.message, "toastColorError");
                pinCarga('fallo');
                return null;
            })            
            
            setTimeout(()=>{
                btnConfirmar.disabled=false;
            },600);
            
        }




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SELECCIONES


       
        function obtenerDatosFilaSeleccionadaRelacionClientes(){
            const gridApi = gridOptionsRelacionClientes.api;
            const selectedRowNode = gridApi.getSelectedNodes()[0];
            if(selectedRowNode!== undefined){
                const selectedData = selectedRowNode.data;
                //console.log(selectedData)
                return selectedData;
            }
            return null
        }
        function obtenerDatosFilaSeleccionadaRelacionPlacas(){
            const gridApi = gridOptionsRelacionPlacas.api;
            const selectedRowNode = gridApi.getSelectedNodes()[0];
            if(selectedRowNode!== undefined){
                const selectedData = selectedRowNode.data;
                //console.log(selectedData)
                return selectedData;
            }
            return null
        }

        

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MODAL

        //-----------------------------------------------------------Construccion modal

        function construirModal(numeroModal){
            const titulo = ['Eliminar relacion','Eliminar relacion','Nueva relacion'];
            let dataCliente = -1;
            let dataPlaca = -1;
            if(numeroModal==0){
                dataCliente =   document.getElementById("staticLastName").value.toUpperCase()+" "+document.getElementById("staticName").value.toUpperCase();
                dataPlaca =     obtenerDatosFilaSeleccionadaRelacionPlacas()
            }else if(numeroModal==1){
                dataCliente =   obtenerDatosFilaSeleccionadaRelacionClientes()
                dataPlaca =     document.getElementById("staticPlaca").value.toUpperCase();
            }else if(numeroModal==2){
                dataCliente = document.getElementById("staticLastName").value.toUpperCase()+" "+document.getElementById("staticName").value.toUpperCase();
                dataPlaca = document.getElementById("staticPlaca").value;
            }
            

            //Vaciar Modal
            vaciarModal();
            
            //H5: TITLE
            const h5Title = document.getElementById('tituloHeader');
            h5Title.textContent=titulo[numeroModal];
            //DIV: CardBody
            const modalBody = document.getElementById('modalBody');
            //INPUT: elemento P
            const textoP = document.createElement('P');
            textoP.classList.add('card-title');
            
            if(numeroModal == 0)textoP.textContent='¿"'+dataCliente+'" tiene un auto con placa: "'+dataPlaca.placa+'"\n, desea Destruir esta relacion?';
            if(numeroModal == 1)textoP.textContent='¿"'+dataCliente.nombre+'" tiene un auto con placa: "'+dataPlaca+'"\n, desea Destruir esta relacion?';
            if(numeroModal == 2)textoP.textContent='¿El cliente "'+dataCliente+'" tiene un auto con placa: "'+dataPlaca+'" ?';
            modalBody.insertBefore(textoP,modalBody.firstChild);

            //BUTTON 1
            const boton1 = document.getElementById('confirmar');
            boton1.value= numeroModal;
            boton1.textContent='Eliminar';
            if(numeroModal == 2)boton1.textContent='Confirmar';
            
            console.log('termine de construir el modal');
            
        }

        function vaciarModal(){
            const modalBody = document.getElementById('modalBody');
            modalBody.firstChild.remove();
        }



        //------------------------------------------------------Modal Confirmar

        const btnConfirmar =document.getElementById('confirmar');

        btnConfirmar.addEventListener('click', (e)=>{
            btnConfirmar.disabled=true;
            
            //Ejecutar funcion
            if(conectado()){
                pinCarga('cargando');
                
                if(btnConfirmar.value!=2)eliminarRelacion();
                if(btnConfirmar.value==2)nuevaRelacion();

            }

            // Restablecer el estado de la función cuando se complete
        });

        //-------------------------------------------------------Modal Cerrar

        const modal = document.getElementById('myModal');

        function cerrarModal(){
            modal.classList.remove('show');
            circulo.style = '';
            circulo.classList.remove('circuloAnim');
        }
        //Tres tipos de cancelar mediante el boton cancelar de cada modal, la X en el modal, y al hacer clic en la pantalla.
        // Cancelar X
        const btnCancelar1 = document.getElementById('cancelar1');
        btnCancelar1.addEventListener('click', (e)=>{
            cerrarModal();
        });
        // Cancelar boton
        const btnCancelar = document.getElementById('cancelar');
        btnCancelar.addEventListener('click', (e)=>{
            cerrarModal();
        });
        // Cancelar fondo
        modal.addEventListener('click', (e)=>{
            //console.log(e.target.parentNode)
            if(e.target.parentNode.id=="fondo" ||
                e.target.parentNode.classList=="container-fluid" ||
                e.target.parentNode.tagName === 'BODY' ){
                    cerrarModal();
                }
        });


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BOTONES PRINCIPALES



        //------------------------------------------------------------------------------------ btn Relacion nueva

        const btnRelacionNueva = document.getElementById('btn-Relacionar');

        
        btnRelacionNueva.addEventListener('click',()=>{
            console.log("Id del cliente: "+rowIdCliente);
            console.log("Id de placa: "+rowIdPlaca);
            if(rowIdCliente!==null && rowIdPlaca!==null){
                construirModal(2);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un cliente y un vehiculo!", "toastColorError");
            }
        });
        

        //------------------------------------------------------------------------------------ btn Buscar Cliente

        const btnBuscarCliente = document.getElementById("btn-BuscarCliente");

        btnBuscarCliente.addEventListener('click',()=>{
            const id = document.getElementById("Datos-Identificacion").value;
            buscarCliente(id);
        });


        //------------------------------------------------------------------------------------ btn Buscar Placa

        const btnBuscarPlaca = document.getElementById("btn-BuscarPlaca");

        btnBuscarPlaca.addEventListener('click',()=>{
            const nom_placa = document.getElementById("Datos-Placa").value;
            buscarPlaca(nom_placa);
        });
        









        var btnPrueba = document.querySelector('#btnPrueba');
        btnPrueba.addEventListener('click', function(e) {
            e.preventDefault();
            //obtenerDatos();

            gridOptionsClientes.api.deselectAll();
            

        });








        
    }
});





        