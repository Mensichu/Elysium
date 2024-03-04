
//Productos
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Productos
    const pagina = window.location.pathname;
    if(pagina.toLowerCase() == '/relacionproductoauto'){
        console.log("Cargo relacionProductoauto");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA RELACION PRODUCTO AUTO

        document.querySelector('#fondo').classList.add('showNow');
        
        let rowIdProducto = null;
        let rowIdAuto = null;
        let rowIdRelacionAuto=null;
        let rowIdRelacionProducto=null;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++TABLA PRODUCTOS
        // configurar la instancia de ag-Grid
        const gridOptionsProductos = {

            // each entry here represents one column
            columnDefs: [
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
                if(true || rowIdProducto!==null){
                    console.log('-----------------------------------------ON MODEL PRODUCTO UPDATED');
                    //Anima al reordenar las filas
                    gridOptionsProductos.api.redrawRows();
                    
                }
            },

            getRowId: (params) => { return params.data.id; },

            rowHeight: 45, // altura de las filas en píxeles
            headerHeight: 30, // altura del encabezado en píxeles
            rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista
            rowSelection: 'single', // allow rows to be selected
            animateRows: true, // have rows animate to new positions when sorted

            // example event handler
            onCellClicked: params => {
                if(params.data!== undefined){
                    rowIdProducto = params.data.id;
                    rowIdRelacionAuto=null;
                    gridOptionsRelacionAutos.api.setRowData([])
                    const titleProductoRelacion = document.getElementById('titulo-Producto-Autos');
                    titleProductoRelacion.textContent= 'Producto: autos';
                }else{
                    console.log('Deseleccionaste!')
                }
            },
            onCellDoubleClicked: function(event) {
                // Manejar el doble clic en una celda
                
                rowIdProducto = event.data.id;
                rowIdRelacionAuto=null;
                seleccionTablaProducto(rowIdProducto,true);
            },
            onSelectionChanged: () => {
                console.log('SelectionChanged')
                const selectedRows = gridOptionsProductos.api.getSelectedRows();
                if (selectedRows.length === 0) {
                    // aquí puedes hacer algo cuando no hay filas seleccionadas
                    rowIdProducto=null
                  
                }
            }

        };
        // get div to host the grid
        const eGridDivProductos = document.getElementById("myGridProductos");
        // new grid instance, passing in the hosting DIV and Grid Options
        var grid = new agGrid.Grid(eGridDivProductos, gridOptionsProductos);

        const gridApiProductos = gridOptionsProductos.api;
        // obtenemos el elemento del encabezado de la tabla
//const headerElement = document.querySelector("#myGridProductos .ag-header-row");




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA PRODUCTO: autos RELACION






const gridOptionsRelacionAutos = {

    // each entry here represents one column
    columnDefs: [
        {headerName: "Id", 
                field: "id", hide: true
            },
        {headerName: "Marca",
            field: "marca",sort: 'asc', floatingFilter:true, 
            width: 100
            },
        {headerName: "Modelo", 
            field: "modelo",sort: 'asc', floatingFilter:true,
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
        if(true || rowIdRelacionAuto!==null){
            console.log('-----------------------------------------ON MODEL PRODUCTO-AUTOS UPDATED');
            //Anima al reordenar las filas
            gridOptionsRelacionAutos.api.redrawRows();
            
        }
    },

    getRowId: (params) => { return params.data.id; },

    rowHeight: 45, // altura de las filas en píxeles
    headerHeight: 30, // altura del encabezado en píxeles
    rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista
    rowSelection: 'single', // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    overlayNoRowsTemplate: 'No se encontraron autos relacionados a este producto',

    // example event handler
    onCellClicked: params => {
        if(params.data!== undefined){
            rowIdRelacionAuto = params.data.id;
            //seleccionTabla(rowIdProducto,true);
        }else{
            //guardarBtn.disabled=true;
        }
    },
    onSelectionChanged: () => {
        console.log('SelectionChanged')
        const selectedRows = gridOptionsRelacionAutos.api.getSelectedRows();
        if (selectedRows.length === 0) {
            // aquí puedes hacer algo cuando no hay filas seleccionadas
            rowIdRelacionAuto=null
          
        }
    }
};
// get div to host the grid
const eGridDivRelacionAutos = document.getElementById("myGridRelacionAutos");
// new grid instance, passing in the hosting DIV and Grid Options
var grid = new agGrid.Grid(eGridDivRelacionAutos, gridOptionsRelacionAutos);

const gridApiRelacionAutos = gridOptionsRelacionAutos.api;



gridOptionsRelacionAutos.api.setRowData([]);









//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++TABLA AUTOS

        // configurar la instancia de ag-Grid
        const gridOptionsAutos = {

            // each entry here represents one column
            columnDefs: [
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
                if(true || rowIdAuto!==null){

                    clasesFila='cambioColor';
                    gridOptionsAutos.api.redrawRows();

                }
            },
            onModelUpdated: (event) => {
                if(true || rowId!==null){
                    console.log('-----------------------------------------ON MODEL AUTO UPDATED');
                    //Anima al reordenar las filas
                    gridOptionsAutos.api.redrawRows();
                    //btnAutoRelacionNueva.disabled=true;
                    
                }
            },

            getRowId: (params) => { return params.data.id; },

            rowHeight: 50, // altura de las filas en píxeles
            headerHeight: 40, // altura del encabezado en píxeles
            rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista
            rowSelection: 'single', // allow rows to be selected
            animateRows: true, // have rows animate to new positions when sorted

            // example event handler
            onCellClicked: params => {
                if(params.data!== undefined){
                    rowIdAuto = params.data.id;
                    //seleccionTabla(rowIdProducto,true);
                    //btnAutoRelacionNueva.disabled=modotablaProductoRelacion;
                    rowIdRelacionProducto=null;
                    gridOptionsRelacionProductos.api.setRowData([])
                    const titleAutoRelacion = document.getElementById('titulo-Auto-Productos');
                    titleAutoRelacion.textContent= 'Auto: productos';
                }else{
                    //guardarBtn.disabled=true;
                }
            },
            onCellDoubleClicked: function(event){
                rowIdAuto = event.data.id;
                seleccionTablaAuto(rowIdAuto,true);
                rowIdRelacionProducto=null;//gridOptionsProductos.api.deselectAll();
            },
            onSelectionChanged: () => {
                console.log('SelectionChanged')
                const selectedRows = gridOptionsAutos.api.getSelectedRows();
                if (selectedRows.length === 0) {
                    // aquí puedes hacer algo cuando no hay filas seleccionadas
                    rowIdAuto=null
                  
                }
            }
        };
        // get div to host the grid
        const eGridDivAutos = document.getElementById("myGridAutos");
        // new grid instance, passing in the hosting DIV and Grid Options
        var grid = new agGrid.Grid(eGridDivAutos, gridOptionsAutos);

        const gridApiAutos = gridOptionsAutos.api;




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AUTOS: productos RELACION


const gridOptionsRelacionProductos = {

    // each entry here represents one column
    columnDefs: [
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
        if(true || rowIdRelacionProducto!==null){
            console.log('-----------------------------------------ON MODEL AUTO-PRODUCTOS UPDATED');
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
    overlayNoRowsTemplate: 'No se encontraron productos relacionados a este auto',

    // example event handler
    onCellClicked: params => {
        if(params.data!== undefined){
            rowIdRelacionProducto = params.data.id;
            //seleccionTabla(rowIdProducto,true);
        }else{
            //guardarBtn.disabled=true;
        }
    },
    onSelectionChanged: () => {
        console.log('SelectionChanged')
        const selectedRows = gridOptionsRelacionProductos.api.getSelectedRows();
        if (selectedRows.length === 0) {
            // aquí puedes hacer algo cuando no hay filas seleccionadas
            rowIdRelacionProducto=null
          
        }
    }
};
// get div to host the grid
const eGridDivRelacionProductos = document.getElementById("myGridRelacionProductos");
// new grid instance, passing in the hosting DIV and Grid Options
var grid = new agGrid.Grid(eGridDivRelacionProductos, gridOptionsRelacionProductos);

const gridApiRelacionProductos = gridOptionsRelacionProductos.api;



gridOptionsRelacionProductos.api.setRowData([]);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA CLIENTES

        cargarTablaProductos();
        async function cargarTablaProductos(){
            try{
                //pinCarga('cargando');
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const data = await fetch('/productosRelacion')
                .then(response => response.json());
                const Productos = data;
                //mediante un for vamos cargando fila por fila
                for(i=0;i<Productos.length;i++){
                    let newRow = datosAFilaGridProductos(Productos[i],0);
                    gridOptionsProductos.api.applyTransaction({ add: newRow });
                }
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los productos:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }

        //---------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGridProductos(data,n) {

            if (gridOptionsProductos.api) {

                return [{ 
                            id: data.id,
                            marca: data.marca.toUpperCase(), 
                            producto: data.nom_producto.toUpperCase()
                        }];
            
            }
        }


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA AUTOS
        
        cargarTablaAutos();
        async function cargarTablaAutos(){
            console.log('Cargandoooooo')
            
            try{
                //pinCarga('cargando');
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const data = await fetch('/autosRelacion')
                .then(response => response.json());
                const Autos = data;
                //mediante un for vamos cargando fila por fila
                for(i=0;i<Autos.length;i++){
                    let newRow = datosAFilaGridAutos(Autos[i],0);
                    gridOptionsAutos.api.applyTransaction({ add: newRow });
                }
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los autos:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }


        //-------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGridAutos(data,n) {

            if (gridOptionsAutos.api) {

                return [{ 
                            id: data.id,
                            marca: data.Marca.alias.toUpperCase(),
                            modelo: data.nom_auto.toUpperCase(),
                            info: ('Y: '+data.ano+' | C: '+data.cilindraje.toFixed(1)).toUpperCase()
                            + ' | '+ (data.combustible? 'TD':'TM')
                        }];
            
            }
        }


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SELECCIONES



        //------------------------------------------------------------------------------------ seleccion tabla producto
        let modotablaAutoRelacion= false;

        async function seleccionTablaProducto(id,mouse) {
            console.log('Id enviado es: '+id)
            const titleProductoRelacion = document.getElementById('titulo-Producto-Autos');
            //titleProductoRelacion.textContent= 'Producto: '+obtenerDatosFilaSeleccionadaProductos().marca;
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
                    const data = await fetch('/productoRelacionById/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    
                    const Autos = data.autos;
                    //console.log(Placas);
                    if(Autos.length!=0){
                        gridOptionsRelacionAutos.api.setRowData([])
                        //mediante un for vamos cargando fila por fila
                        for(i=0;i<Autos.length;i++){
                            let newRow = datosAFilaGridAutos(Autos[i],0);
                            gridOptionsRelacionAutos.api.applyTransaction({ add: newRow });
                        }
                        modotablaAutoRelacion=true;
                    }else{
                        if(modotablaAutoRelacion){
                            gridOptionsRelacionAutos.api.setRowData([])
                            //cargarTablaAutos();
                            modotablaAutoRelacion=false;
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

        //------------------------------------------------------------------------------------ seleccion tabla auto
        let modotablaProductoRelacion= false;

        async function seleccionTablaAuto(id,mouse) {
            console.log('Id enviado es: '+id)
            const titleAutoRelacion = document.getElementById('titulo-Auto-Productos');
            //titleAutoRelacion.textContent= 'Auto: '+obtenerDatosFilaSeleccionadaAutos().marca;//?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
                    const data = await fetch('/autoRelacionById/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    console.log('+++++++++++++++++++++++++++++++++++++++++')
                    const Productos = data.productos;
                    if(Productos.length!=0){
                        gridOptionsRelacionProductos.api.setRowData([])
                        //mediante un for vamos cargando fila por fila
                        for(i=0;i<Productos.length;i++){
                            let newRow = datosAFilaGridProductos(Productos[i],0);
                            gridOptionsRelacionProductos.api.applyTransaction({ add: newRow });
                        }
                        modotablaProductoRelacion=true;
                    }else{
                        if(modotablaProductoRelacion){
                            gridOptionsRelacionProductos.api.setRowData([])
                            //cargarTablaAutos();
                            modotablaProductoRelacion=false;
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
    

        function obtenerDatosFilaSeleccionadaProductos(){
            const gridApi = gridOptionsProductos.api;
            const selectedRowNode = gridApi.getSelectedNodes()[0];
            if(selectedRowNode!== undefined){
                const selectedData = selectedRowNode.data;
                //console.log(selectedData)
                return selectedData;
            }
            return null
        }
        function obtenerDatosFilaSeleccionadaAutos(){
            const gridApi = gridOptionsAutos.api;
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
        function obtenerDatosFilaSeleccionadaRelacionAutos(){
            const gridApi = gridOptionsRelacionAutos.api;
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
            let dataProducto = -1;
            let dataAuto = -1;
            if(numeroModal==0){
                dataProducto =   obtenerDatosFilaSeleccionadaProductos()
                dataAuto =     obtenerDatosFilaSeleccionadaRelacionAutos()
            }
            if(numeroModal==1){
                dataProducto =   obtenerDatosFilaSeleccionadaRelacionProductos()
                dataAuto =     obtenerDatosFilaSeleccionadaAutos()
            }
            if(numeroModal==2){
                dataProducto = obtenerDatosFilaSeleccionadaProductos()
                dataAuto = obtenerDatosFilaSeleccionadaAutos()
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
            //rowIdProducto rowIdRelacionAuto
            //rowIdRelacionProducto rowIdAuto
            if(numeroModal == 0)textoP.textContent='¿"'+dataProducto.producto+'" es un repuesto para: "'+dataAuto.marca+' '+dataAuto.modelo+' '+dataAuto.info+'"\n, desea Destruir esta relacion?';
            if(numeroModal == 1)textoP.textContent='¿"'+dataProducto.producto+'" es un repuesto para: "'+dataAuto.marca+' '+dataAuto.modelo+' '+dataAuto.info+'"\n, desea Destruir esta relacion?';
            if(numeroModal == 2)textoP.textContent='¿"'+dataProducto.producto+'" es un repuesto para: "'+dataAuto.marca+' '+dataAuto.modelo+' '+dataAuto.info+'" ?';
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
                //rowIdProducto rowIdRelacionAuto
                //rowIdRelacionProducto rowIdAuto
                if(btnConfirmar.value==0)eliminarRelacion(rowIdProducto,rowIdRelacionAuto);
                if(btnConfirmar.value==1)eliminarRelacion(rowIdRelacionProducto,rowIdAuto);
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


        
        //------------------------------------------------------------------------------------ btn PRODUCTO RELACION NUEVA

        const btnProductoRelacionNueva = document.getElementById('btn-ProductoRelacionar');

        
        btnProductoRelacionNueva.addEventListener('click',()=>{
            
            if(rowIdProducto!==null && rowIdAuto!==null){
                //console.log('CREANDO RELACION');
                //console.log('idCliente: '+rowIdProducto);
                //console.log('idPlaca: '+rowIdAuto);
                construirModal(2);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un producto y un auto!", "toastColorError");
            }
        });

        //------------------------------------------------------------------------------------ btn AUTO RELACION NUEVA

        const btnAutoRelacionNueva = document.getElementById('btn-AutoRelacionar');
        //btnAutoRelacionNueva.disabled=true;
        
        btnAutoRelacionNueva.addEventListener('click',()=>{
            
            if(rowIdProducto!==null && rowIdAuto!==null){
                construirModal(2);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un producto y un auto!", "toastColorError");
            }
        });




        //------------------------------------------------------------------------------------ btn PRODUCTO RELACION ELIMINAR

        const btnProductoRelacionEliminar = document.getElementById('btn-ProductoEliminarRelacion');

        
        btnProductoRelacionEliminar.addEventListener('click',()=>{
            
            if(rowIdProducto!==null && rowIdRelacionAuto!==null){
                construirModal(0);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un producto y un auto!", "toastColorError");
            }
        });

        //------------------------------------------------------------------------------------ btn AUTO RELACION ELIMINAR

        const btnAutoRelacionEliminar = document.getElementById('btn-AutoEliminarRelacion');

        
        btnAutoRelacionEliminar.addEventListener('click',()=>{
            
            if(rowIdRelacionProducto!==null && rowIdAuto!==null){
                construirModal(1);
                ejecutarAnimacion();
            }else{
                toast("Seleccione un producto y un auto!", "toastColorError");
            }

        });






//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES PRINCIPALES





        //---------------------------------------------- NUEVA RELACION

        async function nuevaRelacion(){
            pinCarga('cargando');
            await fetch('/createRelacionPA',{
                method: 'POST',
                body: JSON.stringify({
                    id_producto:rowIdProducto,
                    id_auto:rowIdAuto
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
        //rowIdProducto rowIdRelacionAuto
        //rowIdRelacionProducto rowIdAuto
        async function eliminarRelacion(id_producto,id_auto){
            pinCarga('cargando');
            await fetch('/deleteRelacionPA',{
                method: 'DELETE',
                body: JSON.stringify({
                    id_producto:id_producto,
                    id_auto:id_auto
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

            gridOptionsProductos.api.deselectAll();
            

        });








        
    }
});





        