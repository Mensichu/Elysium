
//Productos
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Productos
    const pagina = window.location.pathname;
    if(pagina == '/productos'){
        console.log("Cargo productos");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA PRODUCTO

document.querySelector('#fondo').classList.add('showNow');

let rowId = null;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBO PROVEEDOR
        const comboProveedor = document.getElementById('comboProveedor');
        cargarComboProveedor();
        //Combo Tipo
        async function cargarComboProveedor(){
            try{
                const proveedores = await fetch('/comboProveedor')
                .then(response => response.json());

                console.log("Numero de proveedores en el combo proveedor: "+proveedores.length); 
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<3;i++){
                    //Creamos la etiqueta option con su value y texto de cada proveedor al combobox de proveedores
                    const item = document.createElement("OPTION");
                    item.textContent = proveedores[i].nom_proveedor.toUpperCase();
                    item.value =proveedores[i].id;
                    fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                }

                //Vaciamos el combo primero
                for(i=comboProveedor.options.length-1;i>=0;i--){
                    comboProveedor.remove(i);
                }

                //Se agrega al combobox comboProveedor
                comboProveedor.appendChild(fragmento);

            }catch(error){
                console.log('Error al obtener comboProveedor:', error);
            }
        }



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBO SECCION
const comboSeccion = document.getElementById('comboSeccion');
cargarComboSeccion();
//Combo Seccion
async function cargarComboSeccion(){
    try{
        const seccion = await fetch('/comboSeccion')
        .then(response => response.json());

        console.log("Numero de secciones en el combo seccion: "+seccion.length); 
        //Creamos el elemento temporal
        const fragmento = document.createDocumentFragment();
        for(i=0;i<3;i++){
            //Creamos la etiqueta option con su value y texto de cada seccion al combobox de seccion
            const item = document.createElement("OPTION");
            item.textContent = seccion[i].cod_seccion.toUpperCase()+':'+seccion[i].nom_seccion.toUpperCase();
            item.value =seccion[i].id;
            fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
        }

        //Vaciamos el combo primero
        for(i=comboSeccion.options.length-1;i>=0;i--){
            comboSeccion.remove(i);
        }

        //Se agrega al combobox comboMarca
        comboSeccion.appendChild(fragmento);
        

    }catch(error){
        console.log('Error al obtener comboSeccion:', error);
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBO Clasificacion
        
        //Funcion para cargar un combo dependiendo de su categoriaPadre
        async function cargarCombo(combo, id){
            try{
                const tipos = await fetch('/categorias/'+id)
                .then(response => response.json());
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<tipos.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada clasificacion al combobox de clasificacion
                    const item = document.createElement("OPTION");
                    item.textContent = tipos[i].name.toUpperCase();
                    item.value =tipos[i].id;
                    fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                }

                //Vaciamos el combo primero
                for(i=combo.options.length-1;i>=0;i--){
                    combo.remove(i);
                }
                if(tipos.length==0){
                    const item = document.createElement("OPTION");
                    item.textContent = 'No Aplica'
                    item.value = 0;
                    fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                }
                //Se agrega al combobox comboMarca
                combo.appendChild(fragmento);
                combo.selectedIndex=0;

            }catch(error){
                console.log('Error al obtener comboClasificacion:', error);
            }
        }

        //Eventos listener click

        const comboTipo = document.getElementById('comboTipo');
        
        const comboCategoria = document.getElementById('comboCategoria');
        comboTipo.addEventListener('change',async ()=>{
            await cargarCombo(comboCategoria,comboTipo.value);
            await cargarCombo(comboGrupo,comboCategoria.value);
            await cargarCombo(comboSubgrupo,comboGrupo.value);
        });

        const comboGrupo = document.getElementById('comboGrupo');
        comboCategoria.addEventListener('change',async ()=>{
            await cargarCombo(comboGrupo,comboCategoria.value);
            await cargarCombo(comboSubgrupo,comboGrupo.value);
        });

        const comboSubgrupo = document.getElementById('comboSubgrupo');
        comboGrupo.addEventListener('change',async ()=>{
            await cargarCombo(comboSubgrupo,comboGrupo.value);
        });

        //Carga inicial
        cargarCombosClasificacion();
        async function cargarCombosClasificacion(){
            await cargarCombo(comboTipo,-1);
            await cargarCombo(comboCategoria,comboTipo.value);
            await cargarCombo(comboGrupo,comboCategoria.value);
            await cargarCombo(comboSubgrupo,comboGrupo.value);
        }



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID
        let clasesFila='';

        // configurar la instancia de ag-Grid
        const gridOptions = {

            // each entry here represents one column
            columnDefs: [
                {headerName: "Id", 
                        field: "id", hide: true
                    },/*
                {headerName: "Proveedor",
                    field: "nom_proveedor",sort: 'asc', floatingFilter:true, 
                    width: 150
                    },*/
                {headerName: "Marca",
                    field: "marca",sort: 'asc', floatingFilter:true, 
                    width: 140
                    },
                {headerName: "Producto", 
                    field: "nom_producto", floatingFilter:true,
                    flex: 1, minWidth: 150
                    }
                
            ],

            // default col def properties get applied to all columns
            defaultColDef: {sortable: true, 
                            filter: 'agTextColumnFilter', 
                            enableRowGroup:true,
                            filterParams:{
                                buttons: ["apply","reset"]
                            },
                            resizable: true,
                            //autoSizeAllColumns: true
                        },

            getRowClass: (params) => {
                if(params.data!== undefined){

                    if(rowId === params.data.id){

                        params.node.setSelected(true);
                        seleccionTabla(params.data.id,false);
                        return clasesFila;
                    }

                }
                return '';
            },

            onModelUpdated: (event) => {
                if(true || rowId!==null){
                    console.log('-----------------------------------------CHINGONNKNKN');
                    
                    clasesFila='cambioColor';
                    gridOptions.api.redrawRows();

                }
            },
            onCellValueChanged: (event) => {
                // Aquí va el código que se ejecutará cuando cambie el valor de una celda
                console.log('--------------------------------------------PERROS QUE PERRAN');

            },

            getRowId: (params) => { return params.data.id; },

            //Usa el ancho maximo disponible
            //domLayout: 'autoHeight', Esto quita la virtualizacion y los setFocus
            
            rowHeight: 50, // altura de las filas en píxeles
            headerHeight: 40, // altura del encabezado en píxeles
            rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista

            rowGroupPanelShow: 'always',
            //popupParent: document.body,
            rowSelection: 'single', // allow rows to be selected
            animateRows: true, // have rows animate to new positions when sorted

            // example event handler
            onCellClicked: params => {
                if(params.data!== undefined){
                    //console.log('cell was clicked', params.data);
                    rowId = params.data.id;
                    botonesModoNuevo(false);
                    guardarBtn.disabled=false;
                    seleccionTabla(rowId,true);

                }else{
                    guardarBtn.disabled=true;
                }
            }
        };

        // get div to host the grid
        const eGridDiv = document.getElementById("myGrid");
        // new grid instance, passing in the hosting DIV and Grid Options
        var grid = new agGrid.Grid(eGridDiv, gridOptions);

        const gridApi = gridOptions.api;
        
        //gridOptions.api.sizeColumnsToFit();
        
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID: ACTUALIZACION Y NUEVA FILA


        //---------------------------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGrid(data,n) {
            console.log('datosAFilaGrid')
            //console.log(parseFloat(data.Auto.cilindraje));
            if (gridOptions.api) {
                /*
                comboTipo.options[i].value == id_Tipo){
                    //una vez encontrado mostramos en el comboTipo dicho tipo
                    comboTipo.selectedIndex=i;
                */
                return [{   id: data.id,
                            /*nom_proveedor:data.Proveedors[0].nom_proveedor.toUpperCase(),//data.TipoDeIdentificacion.tipo.toUpperCase(), */
                            marca: data.marca.toUpperCase(), 
                            nom_producto: data.nom_producto.toUpperCase()}];
            

            }
        }


        //---------------------------------------------------------------------Actualiza la fila a la tabla AG-GRID
        function actualizarFilaAgGrid(data) {
            const filaActualizada = datosAFilaGrid(data,1); //n es el tipo de fila: 1 o 2
            //Actualiza la fila
            const selectedNodes = gridOptions.api.getSelectedNodes();
            if (selectedNodes.length > 0) {
                const selectedNode = selectedNodes[0];
                const newData = Object.assign({}, selectedNode.data, filaActualizada[0]);
                selectedNode.setData(newData);
                //Se encargan de activar la animacion
                clasesFila = 'cambioColor';
                gridOptions.api.redrawRows();
                // Lo enfoca
                gridOptions.api.ensureNodeVisible(selectedNode);

            }

        }

        //---------------------------------------------------------------------Agrega una nueva fila a la tabla AG-GRID
        function nuevaFilaAgGrid(data) {
            const filaNueva = datosAFilaGrid(data,1); //n es el tipo de fila: 0
            const res = gridOptions.api.applyTransaction({ add: filaNueva });
            if (res.add) {
                const addedRow = res.add[0];
                rowId = addedRow.rowId;
                //Selecciona la fila nueva
                gridOptions.api.deselectAll();
                addedRow.setSelected(true);
                //Enfoca la nueva fila
                gridOptions.api.ensureNodeVisible(addedRow);
            }
        }


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA AG-GRID

        cargarTablaProductos();
        async function cargarTablaProductos(){
            try{
                //pinCarga('cargando');
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const data = await fetch('/productosTabla')
                .then(response => response.json());
                const Productos = data;
                //mediante un for vamos cargando fila por fila
                for(i=0;i<Productos.length;i++){
                    let newRow = datosAFilaGrid(Productos[i],0);
                    gridOptions.api.applyTransaction({ add: newRow });
                }
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los productos:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }


        function getSelectedRowId() {
            const selectedRows = gridOptions.api.getSelectedRows();
            if (selectedRows.length > 0) {
                return selectedRows[0].id;
            }
            return null;
        }


        
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SELECCION TABLA AG-GRID

        async function seleccionTabla(id,mouse) {
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
                    comboTipo.disabled=true;
                }
                if(conectado()){
                    const data = await fetch('/producto/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    // carga los datos de data en los combos y textos de "Datos del Producto"
                    await cargarDatosDesdeSeleccion(data);
                    validacionVaciar();
                    if(mouse){
                        pinCarga('successFast')
                        inputCard.forEach(input => {
                            input.disabled=false;
                        });
                        buttonCard.forEach(button => {
                            button.disabled=false;
                        });
                        comboTipo.disabled=false;
                    };
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
            }
        }

        //------------------------------------------------------------------------------------Cargar Datos a DATOS DEL PRODUCTO

        async function cargarDatosDesdeSeleccion(data){
            var producto = data;
            //console.log(data);
            seleccionCombo(data.Proveedors[0].id,comboProveedor);
            //En la db esta todo en minusculas, pero en el front end esta en mayuscula
            
            //Cargamos el resto de datos
            document.getElementById("Datos-Marca").value=producto.marca.toUpperCase();
            document.getElementById("Datos-Nom-Producto").value=producto.nom_producto.toUpperCase();
            document.getElementById("Datos-Nom-Impresion").value=producto.nom_impresion.toUpperCase();
            
            //Clasificacion
            console.log('Envio el subgrupo: '+producto.id_subgrupo)
            const c = await cargarClasificacion(producto.id_subgrupo);
            cargarCombos(c);

            //Costo
            document.getElementById("Datos-CostoSinIva").value=producto.costosiniva.toFixed(2);
            document.getElementById("Datos-Iva").value=producto.iva.toFixed(2);
            document.getElementById("Datos-CostoConIva").value=producto.costoconiva.toFixed(2);
            //Ganancias
            document.getElementById("Datos-G1").value=producto.porcentaje1;
            document.getElementById("Datos-Pvp1").value=producto.pvp1.toFixed(2);
            document.getElementById("Datos-G2").value=producto.porcentaje2;
            document.getElementById("Datos-Pvp2").value=producto.pvp2.toFixed(2);
            document.getElementById("Datos-G3").value=producto.porcentaje3;
            document.getElementById("Datos-Pvp3").value=producto.pvp3.toFixed(2);
            //Stock
            document.getElementById("Datos-Cantidad").value=producto.cantidad.toFixed(2);
            document.getElementById("Datos-Minimo").value=producto.minimo.toFixed(2);
            //Codigos
            document.getElementById("Datos-Cod1").value=producto.cod1.toUpperCase();
            document.getElementById("Datos-Cod2").value=producto.cod2.toUpperCase();
            document.getElementById("Datos-Cod3").value=producto.cod3.toUpperCase();
            
            const obs_producto = producto.obs_producto;
            ocultarInputObs(obs_producto===null);
            document.getElementById("Datos-Obs").value=  (obs_producto===null?'':obs_producto);

            seleccionCombo(producto.id_seccion, comboSeccion);
        }



        function seleccionCombo(id, combo){

            for(i=0;i<combo.options.length;i++){
                if(combo.options[i].value == id){
                    //una vez encontrado mostramos en el combo correspondiente
                    combo.selectedIndex=i;
                    return;
                }
            }
            console.log('No encontre seleccionCombo');
        }


        async function cargarCombos(c){
            //console.log('Aqui esta c:')
            //console.log(c)
            //Combo tipo
            seleccionCombo(c[3].columna,comboTipo)
            //Combo Categoria
            await cargarCombo(comboCategoria,comboTipo.value);  //cargamos
            seleccionCombo(c[2].columna,comboCategoria);        //Seteamos
            //Combo Grupo
            await cargarCombo(comboGrupo,comboCategoria.value);  //cargamos
            seleccionCombo(c[1].columna,comboGrupo);        //Seteamos
            //Combo Grupo
            await cargarCombo(comboSubgrupo,comboGrupo.value);  //cargamos
            seleccionCombo(c[0].columna,comboSubgrupo);        //Seteamos
        }





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ OBTENER DATOS
        function obtenerDatos(){
            
            const noObs = document.getElementById('Datos-NoObs').checked

            const idSeleccionado = getSelectedRowId();
            const data = {
                id: (idSeleccionado!==null)?idSeleccionado:0,// si es que el idSeleccionado no existe

                //Datos
                id_proveedor: comboProveedor.value,
                marca: document.getElementById('Datos-Marca').value.trim().toLowerCase(),
                nom_producto: document.getElementById('Datos-Nom-Producto').value.trim().toLowerCase(),
                nom_impresion: document.getElementById('Datos-Nom-Impresion').value.trim().toLowerCase(),
                //Clasificacion
                id_subgrupo: comboSubgrupo.value,
                //Costo
                costosiniva: document.getElementById('Datos-CostoSinIva').value,
                iva: document.getElementById('Datos-Iva').value,
                costoconiva: document.getElementById('Datos-CostoConIva').value,
                //Precio
                porcentaje1: document.getElementById('Datos-G1').value,
                pvp1: document.getElementById('Datos-Pvp1').value,
                porcentaje2: document.getElementById('Datos-G2').value,
                pvp2: document.getElementById('Datos-Pvp2').value,
                porcentaje3: document.getElementById('Datos-G3').value,
                pvp3: document.getElementById('Datos-Pvp3').value,
                //Stock
                cantidad: document.getElementById('Datos-Cantidad').value,
                minimo: document.getElementById('Datos-Minimo').value,
                //Codigos
                cod1: document.getElementById('Datos-Cod1').value,
                cod2: document.getElementById('Datos-Cod2').value,
                cod3: document.getElementById('Datos-Cod3').value,
                //Obs
                obs_producto: noObs?null:document.getElementById('Datos-Obs').value.trim().toLowerCase(),
                //Seccion
                id_seccion: comboSeccion.value

            };
            
            return data;
        }


        function botonesModoNuevo(bloquear){
            const modoActual = nuevoBtn.textContent;
            const bg_new = document.getElementById('datosModeloCard')
            if(bloquear && modoActual!='Agregar'){
                //Bloqueado
                guardarBtn.disabled=true;
                nuevoBtn.textContent = 'Agregar';
                bg_new.classList.add('bg_new');
                nuevoBtn.classList.add('btn-success');
                nuevoBtn.classList.remove('btn-outline-success');
                toast("Ingrese el nuevo producto a agregar", "toastColorInfo");
            }else if(!bloquear && modoActual!='Nuevo'){
                //Desbloqueado
                guardarBtn.disabled=true;
                nuevoBtn.textContent = 'Nuevo';
                bg_new.classList.remove('bg_new');
                nuevoBtn.classList.remove('btn-success');
                nuevoBtn.classList.add('btn-outline-success');
                //toast("Nuevo modelo Desactivado", "toastColorInfo");
            }
            
            
        }


        function modoNuevoModelo(){

            if(nuevoBtn.textContent === 'Nuevo'){
                vaciarDatosProducto()
                botonesModoNuevo(true);
                validacionVaciar();
                return false;
            }else{
                return true;

            }
        }

        function vaciarDatosProducto(){

            document.getElementById("Datos-Marca").value='';
            document.getElementById("Datos-Nom-Producto").value='';
            document.getElementById("Datos-Nom-Impresion").value='';
            document.getElementById("Datos-CostoSinIva").value='';
            document.getElementById("Datos-Iva").value='';
            document.getElementById("Datos-CostoConIva").value='';
            document.getElementById("Datos-G1").value='';
            document.getElementById("Datos-Pvp1").value='';
            document.getElementById("Datos-G2").value='';
            document.getElementById("Datos-Pvp2").value='';
            document.getElementById("Datos-G3").value='';
            document.getElementById("Datos-Pvp3").value='';
            document.getElementById("Datos-Cantidad").value='';
            document.getElementById("Datos-Minimo").value='';
            document.getElementById("Datos-Cod1").value='';
            document.getElementById("Datos-Cod2").value='';
            document.getElementById("Datos-Cod3").value='';
            document.getElementById("Datos-Obs").value='';
            
            ocultarInputObs(true);
        }


        //----------------------------------------------------------------------OBSERVACIONES

        const checkNoObs = document.getElementById('Datos-NoObs');
        checkNoObs.addEventListener('change',()=>{
            ocultarInputObs(checkNoObs.checked);
                
        });


        function ocultarInputObs(ocultar){
            checkNoObs.checked=ocultar;
            if(ocultar){
                document.querySelector("#formObs").style.display='none';
                document.querySelector("#noTieneObsLabel").textContent='No tiene observaciones';
            }else{
                document.querySelector("#formObs").style.display='block';
                document.querySelector("#noTieneObsLabel").textContent='Tiene observaciones';
            }
        }


        
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MODAL

        //-----------------------------------------------------------Construccion modal

        function construirModal(numeroModal){
            const titulo = ['test','Modificar','Nuevo'];

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
            if(numeroModal == 1)textoP.textContent='Guardar cambios a producto existente';
            if(numeroModal == 2)textoP.textContent='Guardar como nuevo producto';
            modalBody.insertBefore(textoP,modalBody.firstChild);

            //BUTTON 1
            const boton1 = document.getElementById('confirmar');
            boton1.value= numeroModal;
            if(numeroModal == 1)boton1.textContent='Guardar';
            if(numeroModal == 2)boton1.textContent='Nuevo';
            
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

                // Guardar cambios al modelo
                if(btnConfirmar.value==1)modificarProducto();
                // Nuevo modelo
                if(btnConfirmar.value==2)nuevoProducto();

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
                //e.target.parentNode.id=="contVehiculos1" ||
                e.target.parentNode.tagName === 'BODY' ){
                    cerrarModal();
                }
        });


        
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BOTONES PRINCIPALES

        
        /*

        async function presionarEnter(event){
            if (event.code === "Enter" || event.which === 13) {
                // Código a ejecutar al presionar Enter
                const data = obtenerDatos();
                pinCarga('cargando');
                //Al querer verificar si el cliente existe para agregar uno nuevo
                //Esta omite el id actual, y busca todos menos los '0000000000'
                if(await proveedoresRepetidos(0,data.identificacion,data.nom_proveedor)){
                    //Si devuelve true significa que encontro una modelo año cil igual
                    toast("El proveedor ya existe!", "toastColorError");
                    pinCarga('fallo');
                }else{
                    toast("Identificacion y proveedor disponible", "toastColorSuccess");
                    pinCarga('success');
                }
            }
        }
        */

//-------------------------BTN modificar Modelo

        const guardarBtn = document.getElementById("btn-Guardar");

        guardarBtn.disabled=true;
        guardarBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(rowId!== null){
                if(validacionGuardar()){
                    //Construimos aqui el modal
                    construirModal(1);
                    //Una vez que tenemos las dimensiones construidas, lanzamos la animacion y mostramos
                    ejecutarAnimacion();
                }
            }else{
                toast("Vuelva a seleccionar la fila", "toastColorError");
            }
            
        });



//-------------------------BTN nuevo Modelo

        const nuevoBtn = document.getElementById("btn-Nuevo");

        nuevoBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if( (modoNuevoModelo() && validacionNuevo()) ){

                //Construimos aqui el modal
                construirModal(2);
                //Una vez que tenemos las dimensiones construidas, lanzamos la animacion y mostramos
                ejecutarAnimacion();
            }
        });




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES PRINCIPALES

        /*

        //--------------------------------------------- PROVEEDOR REPETIDOS

        async function proveedoresRepetidos(id, identificacion, nom_proveedor){
            //No se usa pinCarga cargando
            const queryParams = new URLSearchParams({id:id, identificacion:identificacion,nom_proveedor:nom_proveedor});

            const res = await fetch(`/proveedoresRepetidos?${queryParams.toString()}`)
            .then(response => {
                if(!response.ok){
                    throw new Error('Servidor - '+response.status+': '+response.statusText);
                }
                return response.json();
            })
            .catch(error =>{
                toast(error.message, "toastColorError");
                return null;
            });

            return res.respuesta;
        }
        */
        //---------------------------------------------- NUEVO PRODUCTO

        async function nuevoProducto(){
            const data = obtenerDatos();
            delete data.id;
            console.log(data)
            if(false && await productosRepetidos(0,data.identificacion,data.nom_producto)){
                //Si devuelve true significa que encontro una identificacion
                toast("El producto ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                pinCarga('cargando');
                await fetch('/producto',{
                    method: 'POST',
                    body: JSON.stringify(data),
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
                    data.id = res.id
                    //await cambioComboMarca(true);
                    botonesModoNuevo(false);
                    cerrarModal();
                    nuevaFilaAgGrid(res)
                    toast("Producto agregado", "toastColorSuccess");
                    pinCarga('success');
                    rowId=res.id;
                }).catch(error =>{
                    toast(error.message, "toastColorError");
                    console.log(error.message)
                    pinCarga('fallo');
                })
                
            }
            setTimeout(()=>{
                btnConfirmar.disabled=false;
            },600);
            
        }


        //---------------------------------------------- MODIFICAR PRODUCTO
        async function modificarProducto(){
            const data = obtenerDatos();

            if(false && await productosRepetidos(data.id,data.identificacion,data.nom_producto)){
                //Si devuelve true significa que encontro una proveedor igual
                toast("El producto ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                await fetch(`/producto/${data.id}`,{
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(async response => {
                    if(!response.ok){
                        toast(response.status, "toastColorError");
                        throw new Error('Servidor - '+response.status+': '+response.statusText);
                    }else{
                        guardarBtn.disabled=true;
                        cerrarModal();
                        const res = await response.json();
                        actualizarFilaAgGrid(res);
                        toast("Producto actualizado!", "toastColorSuccess");
                        pinCarga('success');
                    }
                }).catch(error =>{
                    toast(error.message, "toastColorError");
                    pinCarga('fallo');
                });
            }
            setTimeout(()=>{
                btnConfirmar.disabled=false;
            },300);
        }


        //Devuelve todos los ids de la clasificacion
        async function cargarClasificacion(id) {
            try{
                const inputCard = document.querySelectorAll('.form-group input');
                const buttonCard = document.querySelectorAll('.form-group button');
                
                if(conectado()){
                    const data = await fetch('/clasificacion/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    
                    return data;
                }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
            }
        }





        var btnPrueba = document.querySelector('#btnPrueba');
        btnPrueba.addEventListener('click', async function(e) {
            e.preventDefault();
            
            console.log(obtenerDatos());

        });
        


        
    }
});


