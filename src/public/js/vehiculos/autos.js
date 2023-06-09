//Autos
window.addEventListener('load',()=>{

    //Solo se ejecuta cada vez que se recargue la pagina y sea Vehiculos
    const pagina = window.location.pathname;
    
    if(pagina.toLowerCase() == '/vehiculos/autos'){console.log("Cargo autos");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA AUTOS

        document.querySelector('#fondo').classList.add('showNow');

        //let rowId = null;
        let size = 20;
        let lastPage = 1;
        let actualPage = 1;
        let filtro1 = ''
        let filtro2 = ''



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
 

        
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBOBOX

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
                cargarTablaModelos(actualPage,size,filtro1,filtro2);
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


//------------------------------------------------------------------------------ ComboMarca: Cargar datos
        const comboMarca = document.getElementById('comboMarca');
        cargarComboMarca(0);
        //Combo Marca
        async function cargarComboMarca(id){
            try{
                
                let marcas = await fetch('/comboMarcas')
                .then(response => response.json());

                // Almacena la lista de marcas de vehículos en un objeto en el archivo 'vehiculos.js'
                //var marcas = data;
    
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
                if(id!=0){
                    const index = comboMarca.querySelector(`option[value='${id}']`).index;
                    comboMarca.selectedIndex=index;
                }
        
            }catch(error){
                console.log(error.message);
            }
        
        }
        

//------------------------------------------------------------------------------  Combo Marca: clic

        //Funcion solo cuando hubo un cambio en el comboMarca
        let comboMarcaSelecc= 0;
        comboMarca.addEventListener('click',(e)=>{
            //Solo ejecuta si esta conectado a internet
            if(conectado())cambioComboMarca(false);
            //console.log("Hiciste click en el combo marca!");
            
        });


//------------------------------------------------------------------------------  Combo Modelo: clic
        const comboModelo = document.getElementById('comboModelo');

        comboModelo.addEventListener('click',(e)=>{
            //Solo ejecuta si esta conectado a internet
            if(conectado()){
                const nom_auto= document.getElementById("Datos-Modelo");
                nom_auto.value = comboModelo.options[comboModelo.selectedIndex].text.trim()
            }
            
        });


//------------------------------------------------------------------------------ Combo Modelo: Cambio-Forzar Cargar datos
        
        //comboModelo.disabled=true;
        async function cambioComboMarca(forzar){
            if(forzar || comboMarcaSelecc!=comboMarca.value){
                comboMarca.disabled=true;
                comboModelo.disabled=true;
                if(!forzar)pinCarga('cargando')
                try{
                        const data = await fetch('/comboAutos/'+comboMarca.value)
                        .then(response => response.json());
                        
                        //Vaciamos el combo primero
                        for(i=comboModelo.options.length-1;i>=0;i--){
                            comboModelo.remove(i);
                        }

                        // Almacena la lista de Modelos en un objeto en el archivo 'vehiculos.js'
                        var modelos = data;
                        //En el caso de que sea una nueva marca sin modelos
                        if(modelos.length!== 0){
                            //Actualizamos Alias
                            document.getElementById("Datos-Alias").value=modelos[0].Marca.alias.toUpperCase();
                            //Creamos el elemento temporal
                            const fragmento = document.createDocumentFragment();
                            for(i=0;i<modelos.length;i++){
                                //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                                const item = document.createElement("OPTION");
                                item.innerHTML = modelos[i].nom_auto.toUpperCase();
                                item.value =modelos[i].id;
                                fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                            }
                            
                            //Se agrega al combobox comboModelo
                            comboModelo.appendChild(fragmento);
                        }else{
                            //Carga el alias por defecto
                            const indice = comboMarca.selectedIndex;
                            const textoComboMarca = comboMarca.options[indice].text;
                            document.getElementById("Datos-Alias").value=textoComboMarca.toUpperCase();
                        }
                        if(!forzar)pinCarga('success')
                        comboMarcaSelecc= comboMarca.value;
                
                }catch(error){
                    console.log('Error al obtener comboModelo:', error);
                    if(!forzar)pinCarga('fallo');
                }
                comboMarca.disabled=false;
                comboModelo.disabled=false;
            }else{
                console.log('no cambio de marca,no hay necesidad de actualizar el combo modelo')
            }
            //console.log('termine cambioComboMarca()')
            
            
            
            
        }



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID
        let clasesFila='';

        // configurar la instancia de ag-Grid
        const gridOptions = {

            // each entry here represents one column
            columnDefs: [
                {headerName: "ID", 
                        field: "id", hide: true},
                {headerName: "Marca",
                        field: "marca", sort: 'asc',
                        width:130,
                    },
                {headerName: "Modelo", 
                        field: "modelo", sort: 'asc',
                        minWidth: 150,flex: 1,
                        //type: 'miEstilo',
                        //editable: true
                    },
                {headerName: "Año", 
                        field: "año",
                        width:80},
                {headerName: "Cil.", 
                        field: "cilindraje",
                        width:80},
                {headerName: "Comb.", 
                        field: "combustible",
                        width:110}
            ],

            // default col def properties get applied to all columns
            defaultColDef: {sortable: true, 
                            enableRowGroup:true,
                            filterParams:{
                                buttons: ["apply","reset"]
                            },
                            resizable: true,
                            //autoSizeAllColumns: true
                        },

            columnTypes:{
                miEstilo:{
                    editable: (params) =>{
                        return params.data.combustible === 'DIESEL.';
                    },
                    cellStyle: (params)=>{
                        if(params.data.combustible === 'borrarDIESEL.'){
                        return {backgroundColor: 'lightBlue'};
                        }
                    }
                }
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
                if(getSelectedRowId()!==null){
                    console.log('-----------------------------------------CHINGONNKNKN');
                    /*
                    gridOptions.api.addEventListener('animationCompleted', function() {
                        clasesFila='cambioColor';
                        gridOptions.api.redrawRows();
                        botonesModoNuevo(false);
                        guardarBtn.disabled=true;    
                    });
                    */
                    clasesFila='cambioColor';
                    botonesModoNuevo(false);
                    guardarBtn.disabled=true;    

                    setTimeout(()=>{
                        //gridOptions.api.redrawRows();
                    },1000);
                    
                }
            },
            onCellValueChanged: (event) => {
                // Aquí va el código que se ejecutará cuando cambie el valor de una celda
                console.log('--------------------------------------------PERROS QUE PERRAN');
                //clasesFila='cambioColor';
                //gridOptions.api.redrawRows();
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

            if(gridWidth< 600){
                columnsToHide.push('combustible');
            }else{
                columnsToShow.push('combustible');
            }

            if(gridWidth< 475){
                columnsToHide.push('año');
                columnsToHide.push('cilindraje');
            }else{
                columnsToShow.push('año');
                columnsToShow.push('cilindraje');
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
        function datosAFilaGrid(data,n) {
            //n es el tipo de fila
            //0: todos los datos
            //1: todos los datos menos marca y modelo
            //2: solo nom_auto
            //console.log('DatosAFilaGrid');
            //console.log(data.cilindraje);
            if (gridOptions.api) {
                //var newRow = [{ id: data.id, marca: data.Marca.nom_marca.toUpperCase(), modelo: data.nom_auto.toUpperCase(), año: data.ano, cilindraje: data.cilindraje, 
                //combustible: data.combustible? 'DIESEL.':'GAS.' }];
                switch(n){
                    case 0:
                        return [{ id: data.id, 
                                    marca: data.Marca.nom_marca.toUpperCase(), 
                                    modelo: data.nom_auto.toUpperCase(), 
                                    año: data.ano, 
                                    cilindraje: parseFloat(data.cilindraje).toFixed(1), 
                            combustible: data.combustible? 'DIESEL.':'GAS.' }];
                    case 1:
                        return [{ id: data.id, año: data.ano, cilindraje: parseFloat(data.cilindraje).toFixed(1), 
                            combustible: data.combustible? 'DIESEL.':'GAS.' }];
                    case 2:
                        return [{ modelo: data.nom_auto.toUpperCase() }];

                }
                return null;
            }
        }

//---------------------------------------------------------------------Actualiza la fila a la tabla AG-GRID
          function actualizarFilaAgGrid(data,n) {
            const filaActualizada = datosAFilaGrid(data,n); //n es el tipo de fila: 1 o 2
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
            const filaNueva = datosAFilaGrid(data,0); //n es el tipo de fila: 0
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
                    cardBody.classList.remove('invisible');
                    cardBodyCargando.classList.remove('blockLoadingBody');
                }
                
        }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CARGAR TABLA AG-GRID
        //Cargamos una vez acabe de cargar el size por defecto del comboPagination
        async function cargarTablaModelos(page,size,search1,search2){
            try{
                gridOptions.api.setRowData([])
                paginaModoCarga(true);
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const queryParams = new URLSearchParams({page:page-1,size:size,search1:search1,search2:search2});

                const data = await fetch(`/tablaAutos?${queryParams.toString()}`)
                .then(response => response.json());
                lastPage = size!=-1?Math.ceil(data.count/size):1;
                pagesLabel.textContent= size!=-1?('Pagina '+actualPage+' de '+lastPage):'Todos';
                registrosLabel.textContent= data.count+' registros';
                actualPageInput.value = page
                const Modelos = data.rows;
                //Dom: Map debe usarse para cambiar la estructura de los elementos de una colección
                const filasDeTabla = Modelos.map((modelo) => datosAFilaGrid(modelo,0));
                gridOptions.api.applyTransaction({ add: [...filasDeTabla.flat()] });
                paginaModoCarga(false);
            }catch(error){
                console.log('Error al obtener el auto:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
        }

        
        function getSelectedRowId() {
            const selectedRows = gridOptions.api.getSelectedRows();
            if (selectedRows.length > 0) {
                //console.log(selectedRows[0]);
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
                        const data = await fetch('/auto/'+id)
                        .then(response => {
                            if(!response.ok){
                                throw new Error('Servidor - '+response.status+': '+response.statusText);
                            }
                            return response.json()
                        });
                        // carga los datos de data en los combos y textos de "Datos del Modelo"
                        await cargarDatosDesdeSeleccion(data);
                        validacionVaciar();
                        if(mouse){
                            paginaModoCarga(false);
                            //pinCarga('successFast')
                        };
                    }
            }catch(error){
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
            }
        }

//--------------------------------------------------------------------------Cargar Datos a DATOS DEL MODELO

    async function cargarDatosDesdeSeleccion(data){
        // almaceno la respuesta ajax en la variable modelo
        var modelo = data;
        await seleccionComboMarca(modelo.id_marca);
        //Una vez seleccionado el comboMarca y cargado el comboModelo
        //se selecciona el modelo mediante el id
        //seleccionComboModelo(modelo.id);
        //se selecciona el modelo mediante el nom_auto
        //En la db esta todo en minusculas, pero en el front end esta en mayuscula
        seleccionComboModeloNombre(modelo.nom_auto.toUpperCase())
        //Cargamos el resto de datos
        document.getElementById("Datos-Modelo").value=modelo.nom_auto.toUpperCase();
        document.getElementById("Datos-Alias").value=modelo.Marca.alias.toUpperCase();
        document.getElementById("Datos-Año").value=modelo.ano;
        document.getElementById("Datos-Cilindraje").value=(modelo.cilindraje.toFixed(1)).replace(",", ".");
        //Selecciona si es a Gas o Diesel
        var gasSeleccion = document.getElementById('btnradio1');
        var dieselSeleccion = document.getElementById('btnradio2');
        gasSeleccion.checked = !modelo.combustible;
        dieselSeleccion.checked = modelo.combustible;

        document.getElementById("Datos-CMotor").value=modelo.consumo_motor;
        document.getElementById("Datos-CCaja").value=modelo.consumo_caja;
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
            //console.log('comboModelo '+i+': '+comboModelo.options[i].value)
            if(comboModelo.options[i].value == id_auto){
                //console.log(comboModelo.children[i].innerHTML)
                comboModelo.selectedIndex=i;
                break;
                
            }
        }
    }

//-----------------------------------------------------Seteamos el comboModelo desde su nom_auto

function seleccionComboModeloNombre(nom_auto){
    //Se busca el .value(id del modelo) que corresponda al id del auto que recibe
    for(i=0;i<comboModelo.options.length;i++){
        //console.log('comboModelo '+i+': '+comboModelo.options[i].value)
        if(comboModelo.options[i].textContent == nom_auto){
            //console.log(comboModelo.children[i].innerHTML)
            comboModelo.selectedIndex=i;
            break;
            
        }
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MOSTRAR MARCA ALIAS

    const aliasMarca = document.getElementById('formTextAlias');
    const labelMarca = document.getElementById('labelMarca');
    labelMarca.addEventListener('contextmenu',(e)=>{
        e.preventDefault();
        aliasMarca.classList.toggle('hidden');
    });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ EDITAR COMBO MODELO

    comboModelo.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // prevenir el menú contextual predeterminado del navegador
        console.log(e.target);
        if(e.target.tagName === 'SELECT'){
            mostrarTextoModelo(true);
        }
    });
      
    const inputModelo = document.getElementById('Datos-Modelo')
    inputModelo.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // prevenir el menú contextual predeterminado del navegador
        console.log(e.target.tagName);
        if(e.target.tagName === 'INPUT'){
            mostrarTextoModelo(false);
        }
    });


    function mostrarTextoModelo(mostar){
        if(mostar){
            //Si se decide mostrar el texto se debe ocultar el combo
            var inputModelo = document.getElementById('formTextModelo')
            var comboModelo = document.getElementById('formComboModelo')
            inputModelo.style.display="block";
            comboModelo.style.display="none";
            
            inputModelo.focus();
        }else{
            //Si se decide ocultar el texto se debe mostra el combo
            var inputModelo = document.getElementById('formTextModelo')
            var comboModelo = document.getElementById('formComboModelo')
            inputModelo.style.display="none";
            comboModelo.style.display="block";
            
            comboModelo.focus();
        }
    }


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBOMARCA: AGREGAR Y SETEA NUEVA MARCA
      
    function nuevaMarcaCombo(marcaNueva){
        const nuevaMarcaOption = document.createElement("OPTION");
        nuevaMarcaOption.textContent = marcaNueva.nom_marca.toUpperCase();
        nuevaMarcaOption.value =marcaNueva.id;
        console.log("Marca: "+marcaNueva.id)

        for (let i = 1; i < comboMarca.options.length; i++) {
            console.log('fila: '+i);
            const option = comboMarca.options[i];

            if (option.textContent.toUpperCase() >= nuevaMarcaOption.textContent.toUpperCase()) {
                console.log(nuevaMarcaOption);
                console.log(option);
                comboMarca.insertBefore(nuevaMarcaOption, option);
                seleccionComboMarca(marcaNueva.id);
                break;
                
            }
        }
    }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ OBTENER DATOS

    function obtenerDatos(){
        const comboMarca = document.getElementById('comboMarca');
        const idSeleccionado = getSelectedRowId();
        const cilCorregido = corregirFlotante(document.getElementById("Datos-Cilindraje").value)
        const data = {
            id: (idSeleccionado!==null)?idSeleccionado:0,// si es que el idSeleccionado no existe
            id_marca: document.getElementById('comboMarca').value,
            Marca: {nom_marca: comboMarca.options[comboMarca.selectedIndex].text.trim().toLowerCase()},
            nom_auto: document.getElementById('Datos-Modelo').value.trim().toLowerCase(),
            alias: document.getElementById("Datos-Alias").value.trim().toLowerCase(),
            ano: document.getElementById("Datos-Año").value,
            cilindraje: cilCorregido,
            consumo_motor: document.getElementById("Datos-CMotor").value,
            consumo_caja: document.getElementById("Datos-CCaja").value,
            combustible: document.getElementById('btnradio2').checked
          };
          console.log(data)
          return data;
    }


    function corregirFlotante(floatString){
        try{
            const numero = parseFloat(floatString);
            const numCorregido = numero.toFixed(1);
            return numCorregido
        }catch(error){

            console.log(error.Error);
        }
        return floatString;
    }


//
        function botonesModoNuevo(bloquear){
            const modoActual = nuevoBtn.textContent;
            const bg_new = document.getElementById('datosModeloCard')
            if(bloquear && modoActual!='Agregar'){
                //Bloqueado
                mostrarTextoModelo(true);
                guardarNomAutoBtn.disabled=true;
                guardarBtn.disabled=true;
                nuevoBtn.textContent = 'Agregar';
                bg_new.classList.add('bg_new');
                nuevoBtn.classList.add('btn-success');
                nuevoBtn.classList.remove('btn-outline-success');
                toast("Ingrese el nuevo modelo a agregar", "toastColorInfo");
            }else if(!bloquear && modoActual!='Nuevo'){
                //Desbloqueado
                mostrarTextoModelo(false);
                guardarNomAutoBtn.disabled=false;
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
                vaciarDatosModelo()
                botonesModoNuevo(true);
                validacionVaciar();
                return false;
            }else{
                return true;

            }
        }


        function vaciarDatosModelo(){
            //Se quita si la personas agregara un modelo igual pero año y cilindraje diferente
            //document.getElementById("Datos-Modelo").value='';
            document.getElementById("Datos-Alias").value='';
            document.getElementById("Datos-Año").value='';
            document.getElementById("Datos-Cilindraje").value='';
            
            document.getElementById("Datos-CMotor").value='';
            document.getElementById("Datos-CCaja").value='';
        }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MODAL

//-----------------------------------------------------------Construccion modal

        function construirModal(numeroModal){
            const titulo = ['Marca','Guardar','Nuevo'];

            //Vaciar Modal
            vaciarModal();
            
            //H5: TITLE
            const h5Title = document.getElementById('tituloHeader');
            h5Title.textContent=titulo[numeroModal];
            //DIV: CardBody
            const modalBody = document.getElementById('modalBody');
            //INPUT: TEXT o elemento P
            if(numeroModal == 0){
                const inputText = document.createElement('INPUT');
                inputText.type='text';
                inputText.id='inputModal';
                inputText.classList.add('modal-text');
                inputText.placeholder='Ingrese la nueva marca';
                inputText.maxlength='20';
                modalBody.insertBefore(inputText,modalBody.firstChild);
            }else{
                const textoP = document.createElement('P');
                textoP.classList.add('card-title');
                if(numeroModal == 1)textoP.textContent='Guardar cambios a modelo existente';
                if(numeroModal == 2)textoP.textContent='Guardar como un nuevo modelo';
                modalBody.insertBefore(textoP,modalBody.firstChild);
            }
            //BUTTON 1
            const boton1 = document.getElementById('confirmar');
            boton1.value= numeroModal;
            if(numeroModal == 0)boton1.textContent='Nueva Marca';
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
                // Guardar cambios al modelo
                if(btnConfirmar.value==1)modificarModelo();
                // Nuevo modelo
                if(btnConfirmar.value==2)nuevoModelo();
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


//-------------------------BTN modificar Alias Marca

        const guardarAliasMarcaBtn = document.getElementById('btn-GuardarAlias');

        guardarAliasMarcaBtn.addEventListener('click', (e)=>{
            // Evitamos el doble clic
            guardarAliasMarcaBtn.disabled=true;
            //Alias
            pinCarga('cargando');
            if(conectado() && validacionAlias()){
                modificarAliasMarca();
            }else{
                //toast
                toast("Llene el campo alias", "toastColorError");
            }
        });


//-------------------------BTN modificar nom_auto

const guardarNomAutoBtn = document.getElementById('btn-GuardarNomAuto');


guardarNomAutoBtn.addEventListener('click', (e)=>{
    // Evitamos el doble clic
    guardarNomAutoBtn.disabled=true;
    //Alias
    if(conectado() && validacionNomAuto()){
        modificarNomAuto();
    }else{
        //toast
        toast("Llene el campo alias", "toastColorError");
        guardarNomAutoBtn.disabled=false;
    }

});


//-------------------------BTN nueva Marca

        const btnAgregar = document.getElementById("btn-Agregar");


        btnAgregar.addEventListener('click',(e)=>{
            //Construimos aqui el modal
            construirModal(0);
            //Una vez que tenemos las dimensiones construidas, lanzamos la animacion y mostramos
            ejecutarAnimacion();

        });

//-------------------------BTN modificar Modelo

        const guardarBtn = document.getElementById("btn-Guardar");

        guardarBtn.disabled=true;
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

//-------------------------BTN nuevo Modelo

        const nuevoBtn = document.getElementById("btn-Nuevo");

        nuevoBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(modoNuevoModelo() && validacionNuevo()){
                //Construimos aqui el modal
                construirModal(2);
                //Una vez que tenemos las dimensiones construidas, lanzamos la animacion y mostramos
                ejecutarAnimacion();
            }
        });


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES PRINCIPALES


//---------------------------------------------- MODIFICAR Alias Marca



        async function modificarAliasMarca() {
            const data = obtenerDatos();

            await fetch(`/marcaAlias/${data.id_marca}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(response => {
                if(!response.ok){
                    //Manda al catch y envia el message error
                    throw new Error('Servidor - '+response.status+': '+response.statusText);
                }else{
                    toast("Alias de marca actualizado", "toastColorSuccess");
                    validacionVaciar();
                    pinCarga('success');
                }
                
            }).catch(error =>{
                toast(error.message, "toastColorError");
                pinCarga('fallo');
                console.log(error.message);
            })
            setTimeout(()=>{
                guardarAliasMarcaBtn.disabled=false;
            },1000);
        }

//--------------------------------------------- MARCA REPETIDAS

        async function marcasRepetidas(nom_marca){
            //No se usa pinCarga cargando, debido a que se realiza otro fetch(nueva marca) en consecuencia a este
            const res = await fetch(`/marcasRepetidas/${nom_marca}`)
            .then(response => {
                if(!response.ok){
                    throw new Error('Servidor - '+response.status+': '+response.statusText);
                }
                // tampoco pinCarga success
                return response.json()
            })
            .catch(error =>{
                toast(error.message, "toastColorError");
                console.log(error.message);
                pinCarga('fallo');
                btnConfirmar.disabled=false;
                return null;
            });

            return res.respuesta;
        }

//--------------------------------------------- NUEVA MARCA

        async function nuevaMarca(){
            const data = {
                nom_marca: document.getElementById('inputModal').value.trim().toLowerCase()
            };

            if(await marcasRepetidas(data.nom_marca)){
                //Si devuelve true significa que encontro una marca igual
                toast("La marca ya existe!", "toastColorError");
                pinCarga('fallo');
                btnConfirmar.disabled=false;
            }else{
                //No encontro una marca igual, procede a crearla
                pinCarga('cargando');
                await fetch('/marca',{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type':'application/json' 
                    }
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error('Servidor - '+response.status+': '+response.statusText);
                    }
                    return response.json()
                })
                .then(res =>{
                    data.id= res.id;
                    nuevaMarcaCombo(data);
                    toast("Marca agregado", "toastColorSuccess");
                    // Cerrar el cuadro modal
                    cerrarModal();
                    pinCarga('success')
                })
                .catch(error => {
                    toast(error.message, "toastColorError");
                    console.log(error.message);
                    pinCarga('fallo');
                });
                setTimeout(()=>{
                    btnConfirmar.disabled=false;
                },300);
                
            }

        }


//--------------------------------------------- MODELOS REPETIDOS

        async function modelosRepetidos(id,nom_auto,cilindraje,ano, combustible){
            //No se usa pinCarga cargando
            const queryParams = new URLSearchParams({id:id, nom_auto:nom_auto, cilindraje:cilindraje, ano:ano, combustible:combustible});

            const res = await fetch(`/autosRepetidos?${queryParams.toString()}`)
            .then(response => {
                if(!response.ok){
                    throw new Error('Servidor - '+response.status+': '+response.statusText);
                }
                return response.json();
            })
            .catch(error =>{
                toast(error.message, "toastColorError");
                console.log(error.message);
                return null;
            });

            return res.respuesta;
        }

//---------------------------------------------- MODIFICAR nom_auto

        async function modificarNomAuto(){
            const data = obtenerDatos();
            if(await modelosRepetidos(data.id,data.nom_auto,data.cilindraje,data.ano,data.combustible)){
                //Si devuelve true significa que encontro una modelo año cil igual
                toast("El modelo ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                pinCarga('cargando');
                await fetch(`/nomAuto/${data.id}`,{
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(async response => {
                    if(!response.ok){
                        throw new Error('Servidor - '+response.status+': '+response.statusText);
                    }else{
                        actualizarFilaAgGrid(data,2);
                        await cambioComboMarca(true);
                        //seleccionComboModelo(data.id)
                        seleccionComboModeloNombre(data.nom_auto);
                        toast("Nombre de modelo guardado", "toastColorSuccess");
                        guardarBtn.disabled=true;
                        cerrarModal();
                        pinCarga('success');
                    }
                }).catch(error =>{
                    toast(error.message, "toastColorError");
                    console.log(error.message);
                    pinCarga('fallo');
                });
                setTimeout(()=>{
                    guardarNomAutoBtn.disabled=false;
                },1000);
            }
            

        }

//---------------------------------------------- MODIFICAR modelo

        async function modificarModelo(){
            const data = obtenerDatos();
            if(await modelosRepetidos(data.id,data.nom_auto,data.cilindraje,data.ano,data.combustible)){
                //Si devuelve true significa que encontro una modelo año cil igual
                toast("El modelo ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                await fetch(`/auto/${data.id}`,{
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
                        //const filaActualizada = datosAFilaGrid(data);
                        guardarBtn.disabled=true;
                        cerrarModal();
                        actualizarFilaAgGrid(data,1);
                        await cambioComboMarca(true);
                        //seleccionComboModelo(data.id)
                        seleccionComboModeloNombre(data.nom_auto);
                        toast("Modelo guardado", "toastColorSuccess");
                        pinCarga('success');
                    }
                }).catch(error =>{
                    toast(error.message, "toastColorError");
                    console.log(error.message);
                    pinCarga('fallo');
                });
            }
            setTimeout(()=>{
                btnConfirmar.disabled=false;
            },300);
        }
        




//---------------------------------------------------- NUEVO modelo

        async function nuevoModelo(){
            const data = obtenerDatos();
            data.cilindraje
            if(await modelosRepetidos(0,data.nom_auto,data.cilindraje,data.ano,data.combustible)){
                //Si devuelve true significa que encontro una modelo año cil igual
                toast("El modelo ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                pinCarga('cargando');
                await fetch('/auto',{
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
                    await cambioComboMarca(true);
                    botonesModoNuevo(false);
                    cerrarModal();
                    nuevaFilaAgGrid(data)
                    toast("Modelo agregado", "toastColorSuccess");
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
            cargarTablaModelos(1,size,filtro1,filtro2);
        }

        function onFirstPage(){
            actualPageInput.value=1
            if(actualPage!=1){
                actualPage= 1
                cargarTablaModelos(actualPage,size,filtro1,filtro2);
            }
        }
        function onPreviousPage(){
            actualPageInput.value=actualPage
            if(actualPage>1){
                actualPage-=1
                cargarTablaModelos(actualPage,size,filtro1,filtro2);
            }
        }

        function onNextPage(){
            actualPageInput.value=actualPage
            if(actualPage<lastPage){
                actualPage+=1
                cargarTablaModelos(actualPage,size,filtro1,filtro2);
            }
        }


        function onLastPage(){
            actualPageInput.value=lastPage
            if(actualPage!=lastPage){
                actualPage= lastPage
                cargarTablaModelos(actualPage,size,filtro1,filtro2);
            }
        }

        function presionarEnterPage(event,page){
            if (event.code === "Enter" || event.which === 13) {
                console.log('presiono enter');
                if(page>=lastPage)onLastPage();
                if(page<=1)onFirstPage();
                if(page<lastPage && page>1){
                    actualPage=page
                    cargarTablaModelos(actualPage,size,filtro1,filtro2);
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


        function presionarEnterFilter1(){
            filtro1=filtro1Input.value;
            filtro2=filtro2Input.value;
            actualPage=1
            actualPageInput.value=1;
            cargarTablaModelos(actualPage,size,filtro1,filtro2);
        }


        function presionarEnterFilter2(){
            filtro1=filtro1Input.value;
            filtro2=filtro2Input.value;
            actualPage=1
            actualPageInput.value=1;
            cargarTablaModelos(actualPage,size,filtro1,filtro2);
        }

        function vaciarFiltro(){
            vaciarFiltro1();
            vaciarFiltro2();
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

        const filtro1Input = document.getElementById('filtro1Input');
        filtro1Input.addEventListener('keyup',(event)=>{
            if (event.code === "Enter" || event.which === 13) {
                presionarEnterFilter1();
            }
        });

        const filtro2Input = document.getElementById('filtro2Input');
        filtro2Input.addEventListener('keyup',(event)=>{
            if (event.code === "Enter" || event.which === 13) {
                presionarEnterFilter2();
            }
            
        });

        const filtro1Label = document.getElementById('filtro1Label');
        filtro1Label.addEventListener('click',(event)=>{
            vaciarFiltro1();
            cargarTablaModelos(actualPage,size,filtro1,filtro2);
        });

        const filtro2Label = document.getElementById('filtro2Label');
        filtro2Label.addEventListener('click',(event)=>{
            vaciarFiltro2();
            cargarTablaModelos(actualPage,size,filtro1,filtro2);
        });



        







//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++      FIN     +++++++++++++++++++++++++++++






        // agregar una fila a la tabla cuando se hace clic en el botón
        var btnPrueba = document.querySelector('#btnPrueba');
        btnPrueba.addEventListener('click', async function(e) {
            e.preventDefault();

            /*gridOptions.api.paginationGoToNextPage((e)=>{
                e.preventDefault();
                console.log(e);
            });*/

            gridOptions.api.setServerSideDatasource(dataSource);


        });
   

    }



});

