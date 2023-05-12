//Placas
window.addEventListener('load',()=>{

    //Solo se ejecuta cada vez que se recargue la pagina y sea Placa
    const pagina = window.location.pathname;

    if(pagina.toLowerCase() == '/vehiculos/placas'){console.log("Cargo placas");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA PLACAS

        document.querySelector('#fondo').classList.add('showNow');

        //let rowId = null;
        let size = 20;
        let lastPage = 1;
        let actualPage = 1;
        let filtro1 = ''
        let filtro2 = ''
        let filtro3 = ''


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RESPONSIVE CONTAINER
        
        const containerDiv = document.getElementById('containerDiv');
                
        function comprobarAncho() {
            if (window.innerWidth < 1200) {
                // La página tiene menos de 1200px de ancho
                containerDiv.classList.remove('container');
            }else{
                // La página tiene 1200px o más de ancho
                containerDiv.classList.add('container');
            }
        }
        let temporizador;
        comprobarAncho();
        //Este retardo sirve para no hacer una cte. revision del ancho de la pantalla
        window.addEventListener("resize", function() {
            // Si el temporizador está activo, cancelarlo
            if (temporizador) {
                clearTimeout(temporizador);
            }
            // Iniciar un nuevo temporizador para ejecutar la función después de 200ms
            temporizador = setTimeout(comprobarAncho, 200);
        });



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBOBOX

        //------------------------------------------------------------------------------ ComboPagination
        const comboPagination = document.getElementById('page-size');
        cargarComboPagination();
        //Combo Pagination
        async function cargarComboPagination(){
            try{
                
                let paginations = await fetch('/paginations')
                .then(response => response.json());

                console.log("Numero de sizes en el combo pagination: "+paginations.length);
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<paginations.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                    const item = document.createElement("OPTION");
                    item.innerHTML = paginations[i].num_pagination;
                    item.value =paginations[i].num_pagination;
                    fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                    //Se setea el size por defecto
                    size= paginations[i].default?paginations[i].num_pagination:size;
                }

                //Vaciamos el combo primero
                for(i=comboPagination.options.length-1;i>=0;i--){
                    comboPagination.remove(i);
                }

                //Se agrega al combobox comboPagination
                comboPagination.appendChild(fragmento);
                //Se agrega la opcion Todos (-1)
                const item = document.createElement("OPTION");
                item.innerHTML = 'Todos';
                item.value = -1;
                comboPagination.appendChild(item);
                //Seleccionamos el por defecto:
                seleccionCombo(size,comboPagination);
                cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
            }catch(error){
                console.log(error.message);
            }

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



        //------------------------------------------------------------------------------ Combo Color
        const comboColor1 = document.getElementById('comboColor1');
        const comboColor2 = document.getElementById('comboColor2');
        cargarComboColor();

        async function cargarComboColor(){
            try{
                
                let color = await fetch('/comboColor')
                .then(response => response.json());

    
                console.log("Numero de colores en el combo color: "+color.length); // Imprime la lista de colores de vehículos en la consola
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<color.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada color al combobox color
                    const item = document.createElement("OPTION");
                    //item.innerHTML = color[i].nom_color.toUpperCase();
                    item.innerHTML = '';//color[i].nom_color;
                    item.value =color[i].id;
                    item.style.background= color[i].hex_color;
                    fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                }
                const fragmento2 = document.createDocumentFragment();
                for(i=0;i<color.length;i++){
                    const item = document.createElement("OPTION");
                    item.innerHTML = '';
                    item.value =color[i].id;
                    item.style.background= color[i].hex_color;
                    fragmento2.appendChild(item);
                }

                //Vaciamos el combo primero
                for(i=comboColor1.options.length-1;i>=0;i--){
                    comboColor1.remove(i);
                    comboColor2.remove(i);
                }
                for(i=comboColor2.options.length-1;i>=0;i--){
                    comboColor2.remove(i);
                }

                //Se agrega al combobox comboColor
                comboColor1.appendChild(fragmento);
                comboColor2.appendChild(fragmento2);
               
        
            }catch(error){
                console.log('Error al obtener comboColor:', error);
            }
        }


        comboColor1.addEventListener('change',(e)=>{
            console.log('cambieCC1')
            const rgb = comboColor1.options[comboColor1.selectedIndex].style.background;
            const hex = rgbToHex(rgb);
            document.querySelector("#Datos-Color1").value = hex;
            //Al cambiar el color 1, copia al color 2
            document.querySelector("#Datos-Color2").value = hex;
            const idColor = comboColor1.options[comboColor1.selectedIndex].value;
            seleccionComboColor2(idColor);
        });

        comboColor2.addEventListener('change',(e)=>{
            const rgb = comboColor2.options[comboColor2.selectedIndex].style.background;
            const hex = rgbToHex(rgb);
            document.querySelector("#Datos-Color2").value = hex;
        });

        function rgbToHex(backgroundColor){
            // Convertir de rgb a hex
            if (backgroundColor.indexOf("rgb") != -1) {
                backgroundColor = backgroundColor.match(/\d+/g);
                backgroundColor = "#" + ((1 << 24) + (parseInt(backgroundColor[0]) << 16) + (parseInt(backgroundColor[1]) << 8) + parseInt(backgroundColor[2])).toString(16).slice(1);
                return backgroundColor
            }
        }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBO MARCAS

        const comboMarca = document.getElementById('comboMarca');
        cargarComboMarca();
        //Combo Marca
        async function cargarComboMarca(){
            try{
                
                let marcas = await fetch('/comboMarcas')
                .then(response => response.json());
    
                console.log("Numero de marcas en el combo marca: "+marcas.length); // Imprime la lista de marcas de vehículos en la consola
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<marcas.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                    const item = document.createElement("OPTION");
                    item.innerHTML = marcas[i].nom_marca.toUpperCase();
                    item.value =marcas[i].id;
                    fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                }
    
                //Vaciamos el combo primero
                for(i=comboMarca.options.length-1;i>=0;i--){
                    comboMarca.remove(i);
                }
    
                //Se agrega al combobox comboMarca
                comboMarca.appendChild(fragmento);
                
        
            }catch(error){
                console.log('Error al obtener comboMarca:', error);
            }
        }

       

//------------------------------------------------------------------------------  Combo Marca: clic

        //Funcion solo cuando hubo un cambio en el comboMarca
        let comboMarcaSelecc= 0;
        comboMarca.addEventListener('click',(e)=>{
            //Solo ejecuta si esta conectado a internet
            if(conectado())cambioComboMarca(false);
        });


//------------------------------------------------------------------------------ Combo Modelo: Cambio-Forzar Cargar datos
        const comboModelo = document.getElementById('comboModelo');
        async function cambioComboMarca(forzar){
            if(forzar || comboMarcaSelecc!=comboMarca.value){
                try{
                        const data = await fetch('/comboAutosInfo/'+comboMarca.value)
                        .then(response => response.json());
                        
                        //Vaciamos el combo primero
                        for(i=comboModelo.options.length-1;i>=0;i--){
                            comboModelo.remove(i);
                        }

                        var modelos = data;
                        //En el caso de que sea una nueva marca sin modelos
                        if(modelos.length!== 0){
                            
                            //Creamos el elemento temporal
                            const fragmento = document.createDocumentFragment();
                            for(i=0;i<modelos.length;i++){
                                //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                                const item = document.createElement("OPTION");
                                item.innerHTML = (modelos[i].nom_auto+' | Y: '+modelos[i].ano+' | C: '+modelos[i].cilindraje.toFixed(1)).toUpperCase()
                                + ' | '+ (modelos[i].combustible? 'TD':'TM');
                                item.value =modelos[i].id;
                                fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                            }
                            
                            //Se agrega al combobox comboModelo
                            comboModelo.appendChild(fragmento);
                        }

                        comboMarcaSelecc= comboMarca.value;
                
                }catch(error){
                    console.log('Error al obtener comboModelo:', error);
                }
            }else{
                console.log('no cambio de marca,no hay necesidad de actualizar el combo modelo')
            }

        }

        
        
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID
        let clasesFila='';

        // configurar la instancia de ag-Grid
        const gridOptions = {

            // each entry here represents one column
            columnDefs: [
                {headerName: "Id", 
                        field: "id", hide: true},
                {headerName: "Placa", 
                        field: "placa",//filtro3
                        width: 120
                    },
                {headerName: "Marca",
                        field: "marca",sort: 'asc',//filtro1
                        width: 110},
                {headerName: "Modelo", 
                        field: "modelo",sort: 'asc', //filtro2
                        minWidth: 150,flex: 1
                    },
                {headerName: "Año", 
                        field: "año", filter: 'agNumberColumnFilter',
                        width: 80},
                {headerName: "Cil.", 
                        field: "cilindraje",
                        width: 80},
                {headerName: "Comb.", 
                        field: "combustible",
                        width: 100}

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
                    if(getSelectedRowId() === params.data.id){
                        params.node.setSelected(true);
                        seleccionTabla(params.data.id,false);
                        return clasesFila;
                    }
                }
                return '';
            },

            onModelUpdated: (event) => {
                if(getSelectedRowId!==null){
                    console.log('-----------------------------------------CHINGONNKNKN');

                    clasesFila='cambioColor';
                    botonesModoNuevo(false);
                    guardarBtn.disabled=true;
                }
            },
            onCellValueChanged: (event) => {
                // Aquí va el código que se ejecutará cuando cambie el valor de una celda
                console.log('--------------------------------------------ONCELLVALUECHANGED');

            },

            getRowId: (params) => { return params.data.id; },

            //Usa el ancho maximo disponible
            //domLayout: 'autoHeight', Esto quita la virtualizacion y los setFocus
            
            rowHeight: 50, // altura de las filas en píxeles
            headerHeight: 40, // altura del encabezado en píxeles
            rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista

            rowGroupPanelShow: 'always',
            rowSelection: 'single', // allow rows to be selected
            animateRows: true, // have rows animate to new positions when sorted
            overlayLoadingTemplate: 'Cargando tabla...',
            overlayNoRowsTemplate: 'Registros no encontrados',

            // example event handler
            onCellClicked: params => {
                placaInput.disabled=true;
                if(params.data!== undefined){
                    //console.log('cell was clicked', params.data);
                    botonesModoNuevo(false);
                    guardarBtn.disabled=false;
                    seleccionTabla(params.data.id,true);

                }else{
                    guardarBtn.disabled=true;
                }
            },

            onGridReady: function(params) {
                params.api.sizeColumnsToFit();
            },

            onGridSizeChanged: onGridSizeChanged
        };

        // get div to host the grid
        const eGridDiv = document.getElementById("myGrid");
        // new grid instance, passing in the hosting DIV and Grid Options
        var grid = new agGrid.Grid(eGridDiv, gridOptions);

        const gridApi = gridOptions.api;

        function onGridSizeChanged(params) {
            // get the current grids width
            var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
            console.log('gridWidth: ')
            console.log(gridWidth)

            // keep track of which columns to hide/show
            var columnsToShow = [];
            var columnsToHide = ['id'];

            if(gridWidth< 675){
                columnsToHide.push('combustible');
            }else{
                columnsToShow.push('combustible');
            }

            if(gridWidth< 600){
                columnsToHide.push('cilindraje');
            }else{
                columnsToShow.push('cilindraje');
            }

            if(gridWidth< 500){
                columnsToHide.push('año');
            }else{
                columnsToShow.push('año');
            }


            // iterate over all columns (visible or not) and work out
            // now many columns can fit (based on their minWidth)
            
            
            

            // show/hide columns based on current grid width
            params.columnApi.setColumnsVisible(columnsToShow, true);
            params.columnApi.setColumnsVisible(columnsToHide, false);

            // fill out any available space to ensure there are no gaps
            params.api.sizeColumnsToFit();
        }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID: ACTUALIZACION Y NUEVA FILA

        //---------------------------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGrid(data) {

            if (gridOptions.api) {
                
                return [{   id: data.id,
                            placa: data.nom_placa.toUpperCase(), 
                            marca: data.Auto.Marca.alias.toUpperCase(), 
                            modelo: data.Auto.nom_auto.toUpperCase(), 
                            año: data.Auto.ano, 
                            cilindraje: parseFloat(data.Auto.cilindraje).toFixed(1),
                            combustible: data.Auto.combustible? 'DIESEL.':'GAS.'
                        }];
            }
        }


        //---------------------------------------------------------------------Actualiza la fila a la tabla AG-GRID
        function actualizarFilaAgGrid(data) {
            const filaActualizada = datosAFilaGrid(data); 
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
            const filaNueva = datosAFilaGrid(data);
            const res = gridOptions.api.applyTransaction({ add: filaNueva });
            if (res.add) {
                const addedRow = res.add[0];

                //Selecciona la fila nueva
                gridOptions.api.deselectAll();
                addedRow.setSelected(true);
                //Enfoca la nueva fila
                gridOptions.api.ensureNodeVisible(addedRow);
            }
        }


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA MODO CARGA

        let tiempoCargaExcedido = true;
        function paginaModoCarga(activar){
                const inputCard = document.querySelectorAll('.form-group input');
                const buttonCard = document.querySelectorAll('.form-group button');
                const cardBody = document.getElementById('cardBodyTodo');
                const cardBodyCargando = document.getElementById('cardBodyCargando');
                if(activar){
                    tiempoCargaExcedido=true;
                    gridApi.showLoadingOverlay();
                    pinCarga('cargando')
                    inputCard.forEach(input => {
                        input.disabled=true;
                    });
                    buttonCard.forEach(button => {
                        button.disabled=true;
                    });
                    comboMarca.disabled=true;
                    setTimeout(()=>{
                        if(tiempoCargaExcedido){
                            cardBody.classList.add('invisible');
                            cardBodyCargando.classList.add('blockLoadingBody');
                        }
                    },500);
                }else{
                    tiempoCargaExcedido=false;
                    gridApi.hideOverlay();
                    pinCarga('success')
                    inputCard.forEach(input => {
                        input.disabled=false;
                    });
                    buttonCard.forEach(button => {
                        button.disabled=false;
                    });
                    comboMarca.disabled=false;
                    placaInput.disabled=true;
                    cardBody.classList.remove('invisible');
                    cardBodyCargando.classList.remove('blockLoadingBody');
                }
                
        }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA AG-GRID
        //Cargamos una vez acabe de cargar el size por defecto del comboPagination
        async function cargarTablaPlacas(page,size,search1,search2,search3){
            try{
                gridOptions.api.setRowData([])
                paginaModoCarga(true);
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const queryParams = new URLSearchParams({page:page-1,size:size,search1:search1,search2:search2,search3:search3});

                const data = await fetch(`/tablaPlacas?${queryParams.toString()}`)
                .then(response => response.json());
                console.log(size)
                lastPage = size!=-1?Math.ceil(data.count/size):1;
                pagesLabel.textContent= size!=-1?('Pagina '+actualPage+' de '+lastPage):'Todos';
                registrosLabel.textContent= data.count+' registros';
                actualPageInput.value = page
                const Placas = data.rows;
                //Dom: Map debe usarse para cambiar la estructura de los elementos de una colección
                const filasDeTabla = Placas.map((modelo) => datosAFilaGrid(modelo,0));
                gridOptions.api.applyTransaction({ add: [...filasDeTabla.flat()] });
                paginaModoCarga(false);
            }catch(error){
                console.log('Error al obtener las placas:', error);
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
                
                if(mouse){
                    paginaModoCarga(true);
                }
                if(conectado()){
                    const data = await fetch('/placa/'+id)
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Servidor - '+response.status+': '+response.statusText);
                        }
                        return response.json()
                    });
                    // carga los datos de data en los combos y textos de "Datos de Placa"
                    await cargarDatosDesdeSeleccion(data);
                    validacionVaciar();
                    if(mouse){
                        paginaModoCarga(false);
                        
                    };
                }
            }catch(error){
                toast(error.message, "toastColorError");
                pinCarga('fallo');
            }
        }

//------------------------------------------------------------------------------------Cargar Datos a DATOS DE PLACA

        async function cargarDatosDesdeSeleccion(data){
            var placa = data;
            await seleccionComboMarca(placa.Auto.id_marca);
            seleccionComboModelo(placa.id_auto);

            //Cargamos el resto de datos
            document.getElementById("Datos-Placa").value=placa.nom_placa.toUpperCase();
            //Valida si es un mismo color
            if(placa.colores.length>1){
                const arregloColor = placa.colores;
                //Asigna el color del arregle al color1 y color2
                arregloColor.forEach(color =>{
                    if(color.id == placa.color1){
                        document.querySelector("#Datos-Color1").value = color.hex_color;    
                    }else{
                        document.querySelector("#Datos-Color2").value = color.hex_color;    
                    }
                });
            }else{
                document.querySelector("#Datos-Color1").value = placa.colores[0].hex_color;
                document.querySelector("#Datos-Color2").value = placa.colores[0].hex_color;
            }
            
            
            
            setTimeout(()=>{
                document.querySelector("#Datos-Color1").setAttribute('disabled','true');
                document.querySelector("#Datos-Color2").setAttribute('disabled','true');
            },300);

            
            seleccionComboColor1(placa.color1);
            seleccionComboColor2(placa.color2);

            
            let clave = placa.clave;
            let obs_placa = placa.obs_placa;
            
            ocultarInputClave(clave==='0');
            ocultarInputObs(obs_placa===null);

            document.getElementById("Datos-Clave").value=(clave==='0'?'':clave);
            document.getElementById("Datos-Obs").value=  (obs_placa===null?'':obs_placa);
        }




        //-----------------------------------------------------Seteamos el comboMarca desde su Id
        async function seleccionComboMarca(id_marca){
            //ComboMarca es un elemento tipo select que almacena varios elementos tipo option
            //Buscamos en el comboMarca .value(id de cada marca) el que corresponda al id_marca del auto seleccionado
            for(i=0;i<comboMarca.options.length;i++){
                if(comboMarca.options[i].value == id_marca){
                    //una vez encontrado mostramos en el comboMarca dicha marca
                    comboMarca.selectedIndex=i;
                    //al actualizar el combo marca, cargamos los modelos de dicha marca
                    await cambioComboMarca(false);//Esto actualiza el combomodelo
                    break;
                }
            }
        }

        //-----------------------------------------------------Seteamos el comboModelo desde su Id

        function seleccionComboModelo(id_auto){
            //Se busca el .value(id del modelo) que corresponda al id del auto que recibe
            for(i=0;i<comboModelo.options.length;i++){
                if(comboModelo.options[i].value == id_auto){
                    comboModelo.selectedIndex=i;
                    break;
                    
                }
            }
        }


        //-----------------------------------------------------Seteamos el comboColor1 desde su Id

        function seleccionComboColor1(id_color1){
            for(i=0;i<comboColor1.options.length;i++){
                if(comboColor1.options[i].value == id_color1){
                    comboColor1.selectedIndex=i;
                    break;
                    
                }
            }
        }

        //-----------------------------------------------------Seteamos el comboColor2 desde su Id

        function seleccionComboColor2(id_color2){
            for(i=0;i<comboColor2.options.length;i++){
                if(comboColor2.options[i].value == id_color2){
                    comboColor2.selectedIndex=i;
                    break;
                    
                }
            }
        }



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ OBTENER DATOS

        function obtenerDatos(){
            const noClave = document.getElementById('Datos-NoClave').checked
            const noObs = document.getElementById('Datos-NoObs').checked
            const idSeleccionado = getSelectedRowId();
            const data = {
                id: (idSeleccionado!==null)?idSeleccionado:0,// si es que el idSeleccionado no existe
                id_marca: document.getElementById('comboMarca').value,
                id_auto: document.getElementById('comboModelo').value,
                nom_placa: document.getElementById('Datos-Placa').value.trim().toLowerCase(),
                clave: noClave?0:document.getElementById('Datos-Clave').value.trim().toLowerCase(),
                color1: document.getElementById('comboColor1').value,
                color2: document.getElementById('comboColor2').value,
                obs_placa: noObs?null:document.getElementById('Datos-Obs').value.trim().toLowerCase(),

            };
            
            return data;
        }

        function botonesModoNuevo(bloquear){
            const modoActual = nuevoBtn.textContent;
            const bg_new = document.getElementById('datosModeloCard')
            if(bloquear && modoActual!='Agregar'){
                //Bloqueado
                guardarBtn.disabled=true;
                placaInput.disabled=false;
                nuevoBtn.textContent = 'Agregar';
                bg_new.classList.add('bg_new');
                nuevoBtn.classList.add('btn-success');
                nuevoBtn.classList.remove('btn-outline-success');
                toast("Ingrese la nueva placa a agregar", "toastColorInfo");
            }else if(!bloquear && modoActual!='Nuevo'){
                //Desbloqueado
                guardarBtn.disabled=true;
                placaInput.disabled=true;
                nuevoBtn.textContent = 'Nuevo';
                bg_new.classList.remove('bg_new');
                nuevoBtn.classList.remove('btn-success');
                nuevoBtn.classList.add('btn-outline-success');
                //toast("Nuevo modelo Desactivado", "toastColorInfo");
            }
            
            
        }


        function modoNuevaPlaca(){

            if(nuevoBtn.textContent === 'Nuevo'){
                vaciarDatosPlaca()
                botonesModoNuevo(true);
                validacionVaciar();
                return false;
            }else{
                return true;

            }
        }

        function vaciarDatosPlaca(){
            document.getElementById("Datos-Placa").value='';
            document.getElementById("Datos-Clave").value='';
            document.getElementById("Datos-Obs").value='';
            ocultarInputClave(true);
            ocultarInputObs(true);
        }



        function ocultarInputClave(ocultar){
            noTieneClave.checked=ocultar;
            if(ocultar){
                document.querySelector("#formClave").style.display='none';
                document.querySelector("#noTieneClaveLabel").textContent='No tiene clave';
            }else{
                document.querySelector("#formClave").style.display='block';
                document.querySelector("#noTieneClaveLabel").textContent='Tiene clave';
            }
        }

        function ocultarInputObs(ocultar){
            noTieneObs.checked=ocultar;
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
            if(numeroModal == 1)textoP.textContent='Guardar cambios a placa existente';
            if(numeroModal == 2)textoP.textContent='Guardar como una nueva placa';
            modalBody.insertBefore(textoP,modalBody.firstChild);

            //BUTTON 1
            const boton1 = document.getElementById('confirmar');
            boton1.value= numeroModal;
            if(numeroModal == 0)boton1.textContent='test';
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

                //Nueva marca
                if(btnConfirmar.value==0)nuevaMarca();
                // Guardar cambios a la placa
                if(btnConfirmar.value==1)modificarPlaca();
                // Nueva placa
                if(btnConfirmar.value==2)nuevaPlaca();

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
                e.target.parentNode.id=="contVehiculos1" ||
                e.target.parentNode.tagName === 'BODY' ){
                    cerrarModal();
                }
        });




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BOTONES PRINCIPALES

        //-------------------------ENTER verificar
        const placaInput = document.getElementById('Datos-Placa')
        placaInput.addEventListener('keyup', async (event)=>{
                    
            if(placaInput.value.length>6){
                if (event.code === "Enter" || event.which === 13) {
                    // Código a ejecutar al presionar Enter
                    const data = obtenerDatos();
                    pinCarga('cargando');
                    console.log(data.id);
                    console.log(data.nom_placa);
                    //Al querer verificar si la placa existe para agregar uno nuevo
                    //Esta no omite el id actual, y busca todos
                    if(await placasRepetidas(0,data.nom_placa)){
                        //Si devuelve true significa que encontro una placa igual
                        toast("La Placa ya existe!", "toastColorError");
                        pinCarga('fallo');
                    }else{
                        toast("Placa disponible", "toastColorSuccess");
                        pinCarga('success');
                    }
                }
            }
        });

        //-------------------------BTN NVerificar
        const btnVerificar = document.querySelector("#btn-Verificar");
        btnVerificar.addEventListener('click',async ()=>{
            const data = obtenerDatos();
            pinCarga('cargando');
            console.log(data.id);
            console.log(data.nom_placa);
            //Al querer verificar si la placa existe para agregar uno nuevo
            //Esta no omite el id actual, y busca todos
            if(await placasRepetidas(0,data.nom_placa)){
                //Si devuelve true significa que encontro unaplaca igual
                toast("La Placa ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                toast("Placa disponible", "toastColorSuccess");
                pinCarga('success');
            }
            
        });


//-------------------------BTN No tiene clave
        const noTieneClave = document.querySelector("#Datos-NoClave");
        noTieneClave.addEventListener('change',()=>{
            ocultarInputClave(noTieneClave.checked);
            
        });

//-------------------------BTN No tiene observaciones
        const noTieneObs = document.querySelector("#Datos-NoObs");
        noTieneObs.addEventListener('change',()=>{
            ocultarInputObs(noTieneObs.checked);
        });



//-------------------------BTN modificar Placa

        const guardarBtn = document.getElementById("btn-Guardar");
        

        guardarBtn.disabled=true;
        placaInput.disabled=true;
        guardarBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(getSelectedRowId()!== null){
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

//-------------------------BTN nueva Placa

        const nuevoBtn = document.getElementById("btn-Nuevo");

        nuevoBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if( (modoNuevaPlaca() && validacionNuevo()) ){

                //Construimos aqui el modal
                construirModal(2);
                //Una vez que tenemos las dimensiones construidas, lanzamos la animacion y mostramos
                ejecutarAnimacion();
            }
        });





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES PRINCIPALES




//--------------------------------------------- PLACAS REPETIDOS

        async function placasRepetidas(id, nom_placa){
            //No se usa pinCarga cargando
            const queryParams = new URLSearchParams({id:id, nom_placa:nom_placa});

            const res = await fetch(`/placasRepetidas?${queryParams.toString()}`)
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


        //---------------------------------------------- NUEVA PLACA

        async function nuevaPlaca(){
            const data = obtenerDatos();

            if(await placasRepetidas(0,data.nom_placa)){
                //Si devuelve true significa que encontro una placa igual
                toast("La Placa ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                pinCarga('cargando');
                await fetch('/placa',{
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
                    botonesModoNuevo(false);
                    cerrarModal();
                    nuevaFilaAgGrid(res)
                    toast("Placa agregada", "toastColorSuccess");
                    pinCarga('success');
                }).catch(error =>{
                    toast(error.message, "toastColorError");
                    pinCarga('fallo');
                })
                
            }
            setTimeout(()=>{
                btnConfirmar.disabled=false;
            },600);
            
        }


        //---------------------------------------------- MODIFICAR PLACA

        async function modificarPlaca(){
            const data = obtenerDatos();

            if(await placasRepetidas(data.id,data.nom_placa)){
                //Si devuelve true significa que encontro una placa igual
                toast("La placa ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                await fetch(`/placa/${data.id}`,{
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
                        actualizarFilaAgGrid(res,0);
                        await cambioComboMarca(true);
                        toast("Placa guardada", "toastColorSuccess");
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


        
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++      PAGINATION     +++++++++++++++++++++++++++++
        
        const registrosLabel = document.getElementById('registrosLabel');
        const pageSize = document.getElementById('page-size');
        const pagesLabel = document.getElementById('pagesLabel');
        const actualPageInput = document.getElementById('actualPageInput');

        const firstPageBtn = document.getElementById('firstPageBtn')
        const nextPageBtn = document.getElementById('nextPageBtn')
        const previousPageBtn = document.getElementById('previousPageBtn')
        const lastPageBtn = document.getElementById('lastPageBtn')


        function onPageSizeChanged(){
            size = document.getElementById('page-size').value;
            //actualPage=1; vaciarFiltro ya lo hace
            vaciarFiltro();
            cargarTablaPlacas(1,size,filtro1,filtro2,filtro3);
        }

        function onFirstPage(){
            actualPageInput.value=1
            if(actualPage!=1){
                actualPage= 1
                cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
            }
        }
        function onPreviousPage(){
            actualPageInput.value=actualPage
            if(actualPage>1){
                actualPage-=1
                cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
            }
        }


        function onNextPage(){
            actualPageInput.value=actualPage
            if(actualPage<lastPage){
                actualPage+=1
                cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
            }
        }


        function onLastPage(){
            actualPageInput.value=lastPage
            if(actualPage!=lastPage){
                actualPage= lastPage
                cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
            }
        }

        function presionarEnterPage(event,page){
            if (event.code === "Enter" || event.which === 13) {
                console.log('presiono enter');
                if(page>=lastPage)onLastPage();
                if(page<=1)onFirstPage();
                if(page<lastPage && page>1){
                    actualPage=page
                    cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
                }
            }
        }


        firstPageBtn.addEventListener('click',()=>{
            onFirstPage();
        });

        previousPageBtn.addEventListener('click',()=>{
            onPreviousPage();
        });

        nextPageBtn.addEventListener('click',()=>{
            onNextPage();
        });

        lastPageBtn.addEventListener('click',()=>{
            onLastPage();
        });

        pageSize.addEventListener('change',()=>{
            onPageSizeChanged();
        });

        actualPageInput.addEventListener('keyup',(event)=>{
            try{
                actualPageInput.value=actualPageInput.value.trim();
                const texto = actualPageInput.value;
                const num = parseInt(texto);
                if(!isNaN(num)){
                    actualPageInput.value=num;
                    presionarEnterPage(event,num);
                }
            }catch(error){
                console.log(error)
            }
            
        });



        //-----------------------------------------------------------------FILTROS

                
        //-------------------------BTN CHECK filtros
        const pagSupDiv = document.getElementById('paginationSupDiv');
        const filtroCheck = document.getElementById('filtroCheck');
        filtroCheck.addEventListener('change',function(){
            if (this.checked) {
                console.log("El checkbox ha sido marcado");
                pagSupDiv.style.display='flex';
                // Aquí puedes agregar cualquier acción que quieras que se ejecute cuando se marque el checkbox
            } else {
                console.log("El checkbox ha sido desmarcado");
                pagSupDiv.style.display='none';
                // Aquí puedes agregar cualquier acción que quieras que se ejecute cuando se desmarque el checkbox
            }
        });

        function presionarEnterFilter(){
            filtro1=filtro1Input.value;
            filtro2=filtro2Input.value;
            filtro3=filtro3Input.value;
            actualPage=1
            actualPageInput.value=1;
            cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
        }


        function vaciarFiltro(){
            vaciarFiltro1();
            vaciarFiltro2();
            vaciarFiltro3();
        }

        function vaciarFiltro1(){
            filtro1 = '';
            filtro1Input.value='';
            actualPage=1;
        }
        function vaciarFiltro2(){
            filtro2 = '';
            filtro2Input.value='';
            actualPage=1;
        }
        function vaciarFiltro3(){
            filtro3 = '';
            filtro3Input.value='';
            actualPage=1;
        }

        const filtro1Input = document.getElementById('filtro1Input');
        filtro1Input.addEventListener('keyup',(event)=>{
            if (event.code === "Enter" || event.which === 13) {
                presionarEnterFilter();
            }
        });
        const filtro2Input = document.getElementById('filtro2Input');
        filtro2Input.addEventListener('keyup',(event)=>{
            if (event.code === "Enter" || event.which === 13) {
                presionarEnterFilter();
            }
            
        });
        const filtro3Input = document.getElementById('filtro3Input');
        filtro3Input.addEventListener('keyup',(event)=>{
            if (event.code === "Enter" || event.which === 13) {
                presionarEnterFilter();
            }
            
        });

        const filtro1Label = document.getElementById('filtro1Label');
        filtro1Label.addEventListener('click',(event)=>{
            vaciarFiltro1();
            cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
        });
        const filtro2Label = document.getElementById('filtro2Label');
        filtro2Label.addEventListener('click',(event)=>{
            vaciarFiltro2();
            cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
        });
        const filtro3Label = document.getElementById('filtro3Label');
        filtro3Label.addEventListener('click',(event)=>{
            vaciarFiltro3();
            cargarTablaPlacas(actualPage,size,filtro1,filtro2,filtro3);
        });











//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++      FIN     +++++++++++++++++++++++++++++



        var btnPrueba = document.querySelector('#btnPrueba');
        btnPrueba.addEventListener('click', function(e) {
            e.preventDefault();
            //obtenerDatos();

            //document.querySelector("#Datos-Color1").setAttribute('disabled','true');
            //document.querySelector("#Datos-Color2").setAttribute('disabled','true');

            

        });



//Fin de IF Vehiculos/Placas
    }


});




