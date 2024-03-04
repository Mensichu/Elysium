//Productos
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Productos
    const pagina = window.location.pathname;
    //if(pagina.toLowerCase() == '/relacionplacacliente'){
    if(pagina.toLowerCase() == '/relacionproductoauto'){
        console.log("Cargo relacionProductoauto");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA RELACION PRODUCTO AUTO

        document.querySelector('#fondo').classList.add('showNow');
        
        let rowIdProducto = null;
        let rowIdVehiculo = null;
        let rowIdRelacion=null;



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA PRODUCTO: vehiculo RELACION



const gridOptionsRelacionProductos = {

    // each entry here represents one column
    columnDefs: [
        {headerName: "Id_Relacion", 
                field: "id_relacion", hide: true
            },
        {headerName: "Id", 
                field: "id", hide: true
            },
        {headerName: "Marca",
            field: "marca",sort: 'asc', floatingFilter:true, 
            width: 150
            },
        {headerName: "Producto",
            field: "producto", floatingFilter:true,
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
            console.log('-----------------------------------------ON MODEL Producto UPDATED');
            //Anima al reordenar las filas
            gridOptionsRelacionProductos.api.redrawRows();
            
        }
    },

    getRowId: (params) => { return params.data.id; },

    rowHeight: 45, // altura de las filas en píxeles
    headerHeight: 30, // altura del encabezado en píxeles
    rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista
    rowSelection: 'single', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    overlayNoRowsTemplate: 'No se encontraron productos relacionados a este vehiculo',
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
        const selectedRows = gridOptionsRelacionProductos.api.getSelectedRows();
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
            if(rowIdProducto!==null && rowIdRelacion!==null){
                construirModal(0);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un producto y un vehiculo!", "toastColorError");
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
            if(rowIdVehiculo!==null && rowIdRelacion!==null){
                construirModal(1);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un vehiculo y un producto!", "toastColorError");
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
var temporal111 = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionProductos);

const gridApiRelacionPlacas = gridOptionsRelacionProductos.api;

//gridOptionsRelacionProductos.api.setRowData([]);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA VEHICULO: productos RELACION


const gridOptionsRelacionVehiculos = {

    // each entry here represents one column
    columnDefs: [
        {headerName: "Id_Relacion", 
                field: "id_relacion", hide: true
            },
        {headerName: "Id", 
                field: "id", hide: true
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
            console.log('-----------------------------------------ON MODEL VEHICULO UPDATED');
            //Anima al reordenar las filas
            gridOptionsRelacionVehiculos.api.redrawRows();
            
        }
    },

    getRowId: (params) => { return params.data.id; },

    rowHeight: 45, // altura de las filas en píxeles
    headerHeight: 30, // altura del encabezado en píxeles
    rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista
    rowSelection: 'single', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    overlayNoRowsTemplate: 'No se encontraron vehiculos relacionados a este producto',
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
        const selectedRows = gridOptionsRelacionVehiculos.api.getSelectedRows();
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
                    try{gridOptionsRelacionVehiculos.api.setRowData([]);
                        gridOptionsRelacionVehiculos.api.showLoadingOverlay();}catch(error){}
                    
                }else{//Tabla de Placas
                    try{gridOptionsRelacionProductos.api.setRowData([]);
                        gridOptionsRelacionProductos.api.showLoadingOverlay();}catch(error){}
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
                    //try{gridOptionsRelacionVehiculos.api.hideOverlay();}catch(error){}
                    
                }else{//Tabla de Placas
                    try{gridOptionsRelacionProductos.api.hideLoadingOverlay();}catch(error){}
                }
            }
            
        }  



        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA VEHICULOS

        async function cargarTablaVehiculos(Vehiculos){
            try{
                if(Vehiculos.length!=0){
                    for(i=0;i<Vehiculos.length;i++){
                        let newRow = datosAFilaGridVehiculos(Vehiculos[i],0);
                        gridOptionsRelacionVehiculos.api.applyTransaction({ add: newRow });
                    }
                }else{
                    gridOptionsRelacionVehiculos.api.setRowData([]);
                }
            }catch(error){
                console.log('Error al obtener los vehiculos:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }

        //---------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGridVehiculos(data,n) {

            if (gridOptionsRelacionVehiculos.api) {

                return [{ 
                            id_relacion: data.id_relacion,
                            id: data.id,
                            marca: data.Marca.alias.toUpperCase(),
                            modelo: data.nom_auto.toUpperCase(),
                            info: ('Y: '+data.ano+' | C: '+data.cilindraje.toFixed(1)).toUpperCase()
                            + ' | '+ (data.combustible? 'TD':'TM')
                        }];
            
            }
        }


        //+++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA PRODUCTOS

        async function cargarTablaProductos(Productos){
            try{
                if(Productos.length!=0){
                    for(i=0;i<Productos.length;i++){
                        let newRow = datosAFilaGridProductos(Productos[i],0);
                        gridOptionsRelacionProductos.api.applyTransaction({ add: newRow });
                    }
                }else{
                    gridOptionsRelacionProductos.api.setRowData([]);
                }
            }catch(error){
                console.log('Error al obtener los productos:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }

        //---------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGridProductos(data,n) {

            if (gridOptionsRelacionProductos.api) {

                return [{
                            id_relacion: data.id_relacion,
                            id: data.id,
                            marca: data.marca.toUpperCase(), 
                            producto: data.nom_producto.toUpperCase()
                        }];
            }
        }


        //-----------------------------------------------CAMBIAR TIPO TABLA
        //0: no encontro 1: Tipo Vehiculos 2: Tipo Producto
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
                var nuevaTabla = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionVehiculos);
                cargarTablaVehiculos(datos);
            }else if(tipoTabla==2){
                var nuevaTabla = new agGrid.Grid(eGridDivRelacion, gridOptionsRelacionProductos);
                cargarTablaProductos(datos);
            }

        }


        //-----------------------------------------------BUSCAR VEHICULO
        async function buscarVehiculo(id){
            tipoTabla=2;
            cambiarTipoTabla([]);
            paginaModoCarga(true);
            try{
                if(conectado()){
                    const data = await fetch('/autoByData/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    cargarDatosDelVehiculo(data);
                    cambiarTipoTabla(data.productos);
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
                borrarDatosDelVehiculo();
                cambiarTipoTabla([]);
            }

            paginaModoCarga(false);
        }


        function cargarDatosDelVehiculo(data){
            rowIdVehiculo=data.id;
            document.getElementById("staticMarca").value=data.Marca.nom_marca.toUpperCase();
            document.getElementById("staticModel").value=data.nom_auto;
            const info = ('Y: '+data.ano+' | C: '+data.cilindraje.toFixed(1)).toUpperCase()
            + ' | '+ (data.combustible? 'TD':'TM');
            document.getElementById("staticInfo").value=info;
            document.getElementById("tituloHeaderRelacion").innerHTML="Vehiculo: "+data.nom_auto.toUpperCase();
            document.getElementById("card-body-producto").classList.remove("card-body-green");
            document.getElementById("card-body-vehiculo").classList.add("card-body-green");
        }

        function borrarDatosDelVehiculo(){
            rowIdVehiculo=null;
            document.getElementById("staticMarca").value="_";
            document.getElementById("staticModel").value="_";;
            document.getElementById("staticInfo").value="_";;
            document.getElementById("tituloHeaderRelacion").innerHTML="Vehiculo: _";
            document.getElementById("card-body-producto").classList.remove("card-body-green");
            document.getElementById("card-body-vehiculo").classList.remove("card-body-green");
        }

        //-----------------------------------------------BUSCAR PRODUCTO
        async function buscarProducto(nom_producto){
            tipoTabla=1;
            cambiarTipoTabla([]);
            paginaModoCarga(true);
            try{
                if(conectado()){
                    const data = await fetch('/productoByData/'+nom_producto)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    cargarDatosDelProducto(data);
                    cambiarTipoTabla(data.autos);
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
                borrarDatosDelProducto();
                cambiarTipoTabla([]);
            }
            paginaModoCarga(false);
        }

        function cargarDatosDelProducto(data){
            rowIdProducto=data.id;
            document.getElementById("staticId").value=data.id;
            document.getElementById("staticMarcaProducto").value=data.marca.toUpperCase();
            document.getElementById("staticProducto").value=data.nom_producto;
            document.getElementById("tituloHeaderRelacion").innerHTML="Producto: "+data.nom_producto;
            document.getElementById("card-body-vehiculo").classList.remove("card-body-green");
            document.getElementById("card-body-producto").classList.add("card-body-green");

        }

        function borrarDatosDelProducto(){
            rowIdProducto=null;
            document.getElementById("staticId").value="0";
            document.getElementById("staticMarcaProducto").value="_";
            document.getElementById("staticProducto").value="_";
            document.getElementById("tituloHeaderRelacion").innerHTML="Producto: _";
            document.getElementById("card-body-vehiculo").classList.remove("card-body-green");
            document.getElementById("card-body-producto").classList.remove("card-body-green");

        }

        

        //---------------------------------------------- NUEVA RELACION

        async function nuevaRelacion(){
            pinCarga('cargando');
            await fetch('/createRelacionPA',{
                method: 'POST',
                body: JSON.stringify({
                    id_producto:rowIdProducto,
                    id_auto:rowIdVehiculo
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
            await fetch(`/deleteRelacionPA/${rowIdRelacion}`,{
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


       
        function obtenerDatosFilaSeleccionadaRelacionVehiculos(){
            const gridApi = gridOptionsRelacionVehiculos.api;
            const selectedRowNode = gridApi.getSelectedNodes()[0];
            if(selectedRowNode!== undefined){
                const selectedData = selectedRowNode.data;
                //console.log(selectedData)
                return selectedData;
            }
            return null
        }
        function obtenerDatosFilaSeleccionadaRelacionProductos(){
            const gridApi = gridOptionsRelacionProductos.api;
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
            let dataVehiculo = -1;
            let dataProducto = -1;
            if(numeroModal==0){//Seleccione un vehiculo y voy a eliminar una relacion de su producto
                dataVehiculo =   document.getElementById("staticMarca").value.toUpperCase()+" "+document.getElementById("staticModel").value.toUpperCase()
                +" "+document.getElementById("staticInfo").value.toUpperCase();
                dataProducto =     obtenerDatosFilaSeleccionadaRelacionProductos()
            }else if(numeroModal==1){
                dataVehiculo =   obtenerDatosFilaSeleccionadaRelacionVehiculos()
                dataProducto =     document.getElementById("staticProducto").value.toUpperCase();
            }else if(numeroModal==2){
                dataVehiculo = document.getElementById("staticMarca").value.toUpperCase()+" "+document.getElementById("staticModel").value.toUpperCase()
                +" "+document.getElementById("staticInfo").value.toUpperCase();
                dataProducto = document.getElementById("staticProducto").value;
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
            
            if(numeroModal == 0)textoP.textContent='¿"'+dataVehiculo+'" es compatible con el sgt producto: "'+dataProducto.producto+'"\n, desea destruir esta relacion?';
            if(numeroModal == 1)textoP.textContent='¿"'+dataVehiculo.marca+' '+dataVehiculo.modelo+' '+dataVehiculo.info+' '+
                                '" es compatible con el sgt producto: "'+dataProducto+'"\n, desea destruir esta relacion?';
            if(numeroModal == 2)textoP.textContent='¿El vehiculo "'+dataVehiculo+'" es compatible con el siguiente producto: "'+dataProducto+'" ?';
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
            console.log("Id del cliente: "+rowIdProducto);
            console.log("Id de placa: "+rowIdVehiculo);
            if(rowIdProducto!==null && rowIdVehiculo!==null){
                construirModal(2);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un cliente y un vehiculo!", "toastColorError");
            }
        });
        

        //------------------------------------------------------------------------------------ btn Buscar Cliente

        const btnbuscarVehiculo = document.getElementById("btn-BuscarVehiculo");

        btnbuscarVehiculo.addEventListener('click',()=>{
            const id = document.getElementById("Datos-Id-Vehiculo").value;
            buscarVehiculo(id);
        });


        //------------------------------------------------------------------------------------ btn Buscar Placa

        const btnBuscarPlaca = document.getElementById("btn-BuscarProducto");

        btnBuscarPlaca.addEventListener('click',()=>{
            const nom_producto = document.getElementById("Datos-Id-Producto").value;
            buscarProducto(nom_producto);
        });
        









        var btnPrueba = document.querySelector('#btnPrueba');
        btnPrueba.addEventListener('click', function(e) {
            e.preventDefault();
            //obtenerDatos();

            gridOptionsClientes.api.deselectAll();
            

        });








        
    }
});





        