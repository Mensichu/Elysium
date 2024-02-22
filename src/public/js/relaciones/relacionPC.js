
//Productos
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Productos
    const pagina = window.location.pathname;
    //if(pagina.toLowerCase() == '/relacionplacacliente'){
    if(pagina.toLowerCase() == '/relacionplacacliente222'){
        console.log("Cargo relacionPlacaCliente");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA RELACION PLACA CLIENTE

        document.querySelector('#fondo').classList.add('showNow');
        
        let rowIdCliente = null;
        let rowIdPlaca = null;
        let rowIdRelacionPlaca=null;
        let rowIdRelacionCliente=null;



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA CLIENTE: placas RELACION



const gridOptionsRelacionPlacas = {

    // each entry here represents one column
    columnDefs: [
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
        if(true || rowIdRelacionPlaca!==null){
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

    // example event handler
    onCellClicked: params => {
        if(params.data!== undefined){
            rowIdRelacionPlaca = params.data.id;
            //seleccionTabla(rowIdCliente,true);
        }else{
            //guardarBtn.disabled=true;
        }
    },
    onSelectionChanged: () => {
        console.log('SelectionChanged')
        const selectedRows = gridOptionsRelacionPlacas.api.getSelectedRows();
        if (selectedRows.length === 0) {
            // aquí puedes hacer algo cuando no hay filas seleccionadas
            rowIdRelacionPlaca=null
          
        }
    }
};
// get div to host the grid
const eGridDivRelacion = document.getElementById("myGridRelacion");

// new grid instance, passing in the hosting DIV and Grid Options
var temporal111 = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionPlacas);

//const gridApiRelacionPlacas = gridOptionsRelacionPlacas.api;

//gridOptionsRelacionPlacas.api.setRowData([]);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA PLACA: clientes RELACION


const gridOptionsRelacionClientes = {

    // each entry here represents one column
    columnDefs: [
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
        if(true || rowIdRelacionCliente!==null){
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

    // example event handler
    onCellClicked: params => {
        if(params.data!== undefined){
            rowIdRelacionCliente = params.data.id;
            //seleccionTabla(rowIdCliente,true);
        }else{
            //guardarBtn.disabled=true;
        }
    },
    onSelectionChanged: () => {
        console.log('SelectionChanged')
        const selectedRows = gridOptionsRelacionClientes.api.getSelectedRows();
        if (selectedRows.length === 0) {
            // aquí puedes hacer algo cuando no hay filas seleccionadas
            rowIdRelacionCliente=null
          
        }
    }
};
// get div to host the grid
//const eGridDivRelacionClientes = document.getElementById("myGridRelacionClientes"); seria el mismo de arriba
// new grid instance, passing in the hosting DIV and Grid Options

    //const tablaRelClientes = document.createElement("div");



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA CLIENTES

        //cargarTablaClientes();
        async function cargarTablaClientes(){
            try{
                //pinCarga('cargando');
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const data = await fetch('/clientesRelacion')
                .then(response => response.json());
                const Clientes = data;
                //mediante un for vamos cargando fila por fila
                for(i=0;i<Clientes.length;i++){
                    let newRow = datosAFilaGridClientes(Clientes[i],0);
                    gridOptionsClientes.api.applyTransaction({ add: newRow });
                }
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los clientes:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }

        //---------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGridClientes(data,n) {

            if (gridOptionsClientes.api) {

                return [{ 
                            id: data.id,
                            identidad: data.identificacion.toUpperCase(), 
                            nombre: data.apellidos_empresa.toUpperCase()+(data.nombres!=null?' '+data.nombres.toUpperCase():'')
                        }];
            
            }
        }


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA PLACAS
        
        cargarTablaPlacas();
        async function cargarTablaPlacas(){
            console.log('Cargandoooooo')
            
            try{
                //pinCarga('cargando');
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const data = await fetch('/placasRelacion')
                .then(response => response.json());
                const Placas = data;
                //mediante un for vamos cargando fila por fila
                for(i=0;i<Placas.length;i++){
                    let newRow = datosAFilaGridPlacas(Placas[i],0);
                    gridOptionsPlacas.api.applyTransaction({ add: newRow });
                }
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener las placas:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }


        //-------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGridPlacas(data,n) {

            if (gridOptionsPlacas.api) {

                return [{ 
                            id: data.id,
                            placa: data.nom_placa.toUpperCase(), 
                            marca: data.Auto.Marca.alias.toUpperCase(),
                            modelo: data.Auto.nom_auto.toUpperCase(),
                            info: ('Y: '+data.Auto.ano+' | C: '+data.Auto.cilindraje.toFixed(1)).toUpperCase()
                            + ' | '+ (data.Auto.combustible? 'TD':'TM')
                        }];
            
            }
        }


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SELECCIONES



        //------------------------------------------------------------------------------------ seleccion tabla cliente
        let modotablaPlacaRelacion= false;

        async function seleccionTablaCliente(id,mouse) {
            console.log('Id enviado es: '+id)
            const titleClienteRelacion = document.getElementById('titulo-Cliente-Placas');
            titleClienteRelacion.textContent= 'Cliente: '+obtenerDatosFilaSeleccionadaClientes().identidad;
            try{
                const inputCard = document.querySelectorAll('.form-group input');
                const buttonCard = document.querySelectorAll('.form-group button');
                if(mouse){
                    pinCarga('cargando')
                    inputCard.forEach(input => {
                        input.disabled=true;
                    });
                    buttonCard.forEach(button => {
                        button.disabled=true;
                    });
                }
                if(conectado()){
                    const data = await fetch('/clienteRelacionById/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    // carga los datos de data en los combos y textos de "Datos del Cliente
                    const Placas = data.placas;
                    //console.log(Placas);
                    if(Placas.length!=0){
                        gridOptionsRelacionPlacas.api.setRowData([])
                        //mediante un for vamos cargando fila por fila
                        for(i=0;i<Placas.length;i++){
                            let newRow = datosAFilaGridPlacas(Placas[i],0);
                            gridOptionsRelacionPlacas.api.applyTransaction({ add: newRow });
                        }
                        modotablaPlacaRelacion=true;
                    }else{
                        if(modotablaPlacaRelacion){
                            gridOptionsRelacionPlacas.api.setRowData([])
                            //cargarTablaPlacas();
                            modotablaPlacaRelacion=false;
                        }
                        toast('No registra relacion alguna', "toastColorInfo");
                    }
                    
                    //validacionVaciar();
                    if(mouse){
                        pinCarga('successFast')
                        inputCard.forEach(input => {
                            input.disabled=false;
                        });
                        buttonCard.forEach(button => {
                            button.disabled=false;
                        });
                    };
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
            }
        }

        //------------------------------------------------------------------------------------ seleccion tabla placa
        let modotablaClienteRelacion= false;

        async function seleccionTablaPlaca(id,mouse) {
            console.log('Id enviado es: '+id)
            const titlePlacaRelacion = document.getElementById('titulo-Placa-Clientes');
            titlePlacaRelacion.textContent= 'Placa: '+obtenerDatosFilaSeleccionadaPlacas().placa;
            try{
                const inputCard = document.querySelectorAll('.form-group input');
                const buttonCard = document.querySelectorAll('.form-group button');
                if(mouse){
                    pinCarga('cargando')
                    inputCard.forEach(input => {
                        input.disabled=true;
                    });
                    buttonCard.forEach(button => {
                        button.disabled=true;
                    });
                }
                if(conectado()){
                    const data = await fetch('/placaRelacionById/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    console.log('+++++++++++++++++++++++++++++++++++++++++')
                    const Clientes = data.clients;
                    //console.log(Placas);
                    if(Clientes.length!=0){
                        gridOptionsRelacionClientes.api.setRowData([])
                        //mediante un for vamos cargando fila por fila
                        for(i=0;i<Clientes.length;i++){
                            let newRow = datosAFilaGridClientes(Clientes[i],0);
                            gridOptionsRelacionClientes.api.applyTransaction({ add: newRow });
                        }
                        modotablaClienteRelacion=true;
                    }else{
                        if(modotablaClienteRelacion){
                            gridOptionsRelacionClientes.api.setRowData([])
                            //cargarTablaPlacas();
                            modotablaClienteRelacion=false;
                        }
                        toast('No registra relacion alguna', "toastColorInfo");
                    }
                    
                    //validacionVaciar();
                    if(mouse){
                        pinCarga('successFast')
                        inputCard.forEach(input => {
                            input.disabled=false;
                        });
                        buttonCard.forEach(button => {
                            button.disabled=false;
                        });
                        //btnPlacaRelacionNueva.disabled=modotablaClienteRelacion;
                    };
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
            }
        }
    

        function obtenerDatosFilaSeleccionadaClientes(){
            const gridApi = gridOptionsClientes.api;
            const selectedRowNode = gridApi.getSelectedNodes()[0];
            if(selectedRowNode!== undefined){
                const selectedData = selectedRowNode.data;
                //console.log(selectedData)
                return selectedData;
            }
            return null
        }
        function obtenerDatosFilaSeleccionadaPlacas(){
            const gridApi = gridOptionsPlacas.api;
            const selectedRowNode = gridApi.getSelectedNodes()[0];
            if(selectedRowNode!== undefined){
                const selectedData = selectedRowNode.data;
                //console.log(selectedData)
                return selectedData;
            }
            return null
        }


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
                dataCliente =   obtenerDatosFilaSeleccionadaClientes()
                dataPlaca =     obtenerDatosFilaSeleccionadaRelacionPlacas()
            }
            if(numeroModal==1){
                dataCliente =   obtenerDatosFilaSeleccionadaRelacionClientes()
                dataPlaca =     obtenerDatosFilaSeleccionadaPlacas()
            }
            if(numeroModal==2){
                dataCliente = obtenerDatosFilaSeleccionadaClientes()
                dataPlaca = obtenerDatosFilaSeleccionadaPlacas()
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
            //rowIdCliente rowIdRelacionPlaca
            //rowIdRelacionCliente rowIdPlaca
            if(numeroModal == 0)textoP.textContent='¿"'+dataCliente.nombre+'" tiene un auto con placa: "'+dataPlaca.placa+'"\n, desea Destruir esta relacion?';
            if(numeroModal == 1)textoP.textContent='¿"'+dataCliente.nombre+'" tiene un auto con placa: "'+dataPlaca.placa+'"\n, desea Destruir esta relacion?';
            if(numeroModal == 2)textoP.textContent='¿"'+dataCliente.nombre+'" tiene un auto con placa: "'+dataPlaca.placa+'" ?';
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
                //rowIdCliente rowIdRelacionPlaca
                //rowIdRelacionCliente rowIdPlaca
                if(btnConfirmar.value==0)eliminarRelacion(rowIdCliente,rowIdRelacionPlaca);
                if(btnConfirmar.value==1)eliminarRelacion(rowIdRelacionCliente,rowIdPlaca);
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


        
        //------------------------------------------------------------------------------------ btn PRUEBA111

        const btnPrueba111 = document.getElementById('btn-Relacionar');

        
        btnPrueba111.addEventListener('click',()=>{
            
            prueba();
        });
        
        const btnBuscarCliente = document.getElementById("btn-BuscarCliente");

        btnBuscarCliente.addEventListener('click',()=>{
            const id = document.getElementById("Datos-Identificacion").value;
            buscarCliente(id);
        });

        const btnBuscarPlaca = document.getElementById("btn-BuscarPlaca");

        btnBuscarPlaca.addEventListener('click',()=>{
            const nom_placa = document.getElementById("Datos-Placa").value;
            buscarPlaca(nom_placa);
        });
        
        //------------------------------------------------------------------------------------ btn CLIENTE RELACION NUEVA

        const btnClienteRelacionNueva = document.getElementById('btn-ClienteRelacionar');

        
        /*btnClienteRelacionNueva.addEventListener('click',()=>{
            
            if(rowIdCliente!==null && rowIdPlaca!==null){
                //console.log('CREANDO RELACION');
                //console.log('idCliente: '+rowIdCliente);
                //console.log('idPlaca: '+rowIdPlaca);
                construirModal(2);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un cliente y un vehiculo!", "toastColorError");
            }
        });

        //------------------------------------------------------------------------------------ btn PLACA RELACION NUEVA

        const btnPlacaRelacionNueva = document.getElementById('btn-PlacaRelacionar');
        //btnPlacaRelacionNueva.disabled=true;
        
        btnPlacaRelacionNueva.addEventListener('click',()=>{
            
            if(rowIdCliente!==null && rowIdPlaca!==null){
                construirModal(2);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un cliente y un vehiculo!", "toastColorError");
            }
        });




        //------------------------------------------------------------------------------------ btn CLIENTE RELACION ELIMINAR

        const btnClienteRelacionEliminar = document.getElementById('btn-ClienteEliminarRelacion');

        
        btnClienteRelacionEliminar.addEventListener('click',()=>{
            
            if(rowIdCliente!==null && rowIdRelacionPlaca!==null){
                construirModal(0);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un cliente y un vehiculo!", "toastColorError");
            }
        });

        //------------------------------------------------------------------------------------ btn PLACA RELACION ELIMINAR

        const btnPlacaRelacionEliminar = document.getElementById('btn-PlacaEliminarRelacion');

        
        btnPlacaRelacionEliminar.addEventListener('click',()=>{
            
            if(rowIdRelacionCliente!==null && rowIdPlaca!==null){
                construirModal(1);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un cliente y un vehiculo!", "toastColorError");
            }

        });


        */



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES PRINCIPALES


        //-----------------------------------------------PRUEBA
        //0: no encontro 1: Tipo Cliente 2: Tipo Placa
        var tipoTabla=0;
        function prueba(){
            // Paso 1: Obtener el contenedor del grid
            const eGridDivRelacion = document.getElementById("myGridRelacion");

            // Paso 2: Verificar si hay hijos en el contenedor y eliminarlos
            while (eGridDivRelacion.firstChild) {
            eGridDivRelacion.removeChild(eGridDivRelacion.firstChild);
            }
            if (tipoTabla==0){
                // Paso 3: Crear la nueva tabla/grid
                var nuevaTabla = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionClientes);
                tipoTabla=1;
            }else if(tipoTabla==1){
                var nuevaTabla = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionPlacas);
                tipoTabla=2;
            }else if(tipoTabla==2){
                tipoTabla=0;
            }
            

        }

        async function buscarCliente(id){
            try{
                if(conectado()){
                    const data = await fetch('/clientByData/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    // carga los datos de data en los combos y textos de "Datos del Cliente
                    await cargarDatosDelCliente(data);
                    console.log("Estos son los datos")
                    console.log(data)
                    
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
            }
        }


        function cargarDatosDelCliente(data){
            document.getElementById("staticIdentificacion").value=data.identificacion;
            document.getElementById("staticLastName").value=data.apellidos_empresa;
            document.getElementById("staticName").value=data.nombres;
        }



        async function buscarPlaca(nom_placa){
            try{
                if(conectado()){
                    const data = await fetch('/placaByData/'+nom_placa)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    // carga los datos de data en los combos y textos de "Datos del Cliente
                    console.log("Estos son los datos")
                    console.log(data)
                    await cargarDatosDePlaca(data);
                    
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
            }
        }


        function cargarDatosDePlaca(data){
            document.getElementById("staticPlaca").value=data.nom_placa;
            document.getElementById("staticMarca").value=data.Auto.Marca.nom_marca;
            const info = (data.Auto.nom_auto+' | Y: '+data.Auto.ano+' | C: '+data.Auto.cilindraje.toFixed(1)).toUpperCase()
            + ' | '+ (data.Auto.combustible? 'TD':'TM');
            document.getElementById("staticModel").value=info;

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
        //rowIdCliente rowIdRelacionPlaca
        //rowIdRelacionCliente rowIdPlaca
        async function eliminarRelacion(id_cliente,id_placa){
            pinCarga('cargando');
            await fetch('/deleteRelacionPC',{
                method: 'DELETE',
                body: JSON.stringify({
                    id_cliente:id_cliente,
                    id_placa:id_placa
                }),
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
                    toast("Relacion Destruida", "toastColorSuccess");
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








        var btnPrueba = document.querySelector('#btnPrueba');
        btnPrueba.addEventListener('click', function(e) {
            e.preventDefault();
            //obtenerDatos();

            gridOptionsClientes.api.deselectAll();
            

        });








        
    }
});





        