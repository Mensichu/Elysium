window.addEventListener('load',()=>{

    //Solo se ejecuta cada vez que se recargue la pagina y sea Placa
    const pagina = window.location.pathname;

    if(pagina == '/vehiculos/placas'){

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA PLACAS

        document.querySelector('#fondo').classList.add('showNow');


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBO MARCAS

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

        //comboModelo.disabled=true;
        async function cambioComboMarca(forzar){
            if(forzar || comboMarcaSelecc!=comboMarca.value){
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
                        field: "placa", sort: 'asc',floatingFilter:true,
                        minWidth: 150,flex: 'auto'
                    },
                {headerName: "Marca",
                        field: "marca", sort: 'asc',floatingFilter:true, 
                        width:130},
                {headerName: "Auto", 
                        field: "auto", sort: 'asc',floatingFilter:true,
                        minWidth: 150,flex: 'auto'
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
                        //console.log('rowId:  '+rowId);
                        //console.log('params.data.id:  '+params.data.id);
                        params.node.setSelected(true);
                        //seleccionTabla(params.data.id,false);
                        return clasesFila;
                    }
                }
                return '';
            }
            ,
            onModelUpdated: (event) => {
                if(true || rowId!==null){
                    console.log('-----------------------------------------CHINGONNKNKN');
                    console.log(event.data)
                    //const selectedNodes = gridOptions.api.getSelectedNodes();
                    //gridOptions.api.ensureNodeVisible(selectedNodes[0]);
                    clasesFila='cambioColor';
                    gridOptions.api.redrawRows();
                    //botonesModoNuevo(false);
                    //guardarBtn.disabled=true;
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
            //popupParent: document.body,
            rowSelection: 'single', // allow rows to be selected
            animateRows: true, // have rows animate to new positions when sorted

            // example event handler
            onCellClicked: params => {
                if(params.data!== undefined){
                    //console.log('cell was clicked', params.data);
                    //rowId = params.data.id;
                    //botonesModoNuevo(false);
                    //guardarBtn.disabled=false;
                    //seleccionTabla(rowId,true);

                }else{
                    console.log('aja!')
                    //guardarBtn.disabled=true;
                }
            }
        };

        // get div to host the grid
        const eGridDiv = document.getElementById("myGrid");
        // new grid instance, passing in the hosting DIV and Grid Options
        var grid = new agGrid.Grid(eGridDiv, gridOptions);

        const gridApi = gridOptions.api;


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID: ACTUALIZACION Y NUEVA FILA




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ OBTENER DATOS

    function obtenerDatos(){
        const comboMarca = document.getElementById('comboMarca');
        const idSeleccionado = getSelectedRowId();
        const data = {
            id: (idSeleccionado!==null)?idSeleccionado:0,// si es que el idSeleccionado no existe
            id_marca: document.getElementById('comboMarca').value,
            Marca: {nom_marca: comboMarca.options[comboMarca.selectedIndex].text.trim().toLowerCase()},
            nom_auto: document.getElementById('Datos-Modelo').value.trim().toLowerCase(),
            alias: document.getElementById("Datos-Alias").value.trim().toLowerCase(),
            ano: document.getElementById("Datos-Año").value,
            cilindraje: document.getElementById("Datos-Cilindraje").value,
            consumo_motor: document.getElementById("Datos-CMotor").value,
            consumo_caja: document.getElementById("Datos-CCaja").value,
            combustible: document.getElementById('btnradio2').checked
        };
        console.log(data)
        return data;
    }

    function botonesModoNuevo(bloquear){
        const modoActual = nuevoBtn.textContent;
        if(bloquear && modoActual!='Agregar'){
            //Bloqueado
            //mostrarTextoModelo(true);
            //guardarNomAutoBtn.disabled=true;
            guardarBtn.disabled=true;
            nuevoBtn.textContent = 'Agregar';
            nuevoBtn.classList.add('btn-success');
            nuevoBtn.classList.remove('btn-outline-success');
            toast("Ingrese el nuevo modelo a agregar", "toastColorInfo");
        }else if(!bloquear && modoActual!='Nuevo'){
            //Desbloqueado
            mostrarTextoModelo(false);
            guardarNomAutoBtn.disabled=false;
            guardarBtn.disabled=true;
            nuevoBtn.textContent = 'Nuevo';
            nuevoBtn.classList.remove('btn-success');
            nuevoBtn.classList.add('btn-outline-success');
            //toast("Nuevo modelo Desactivado", "toastColorInfo");
        }
        
        
    }


    function modoNuevoModelo(){

        if(nuevoBtn.textContent === 'Nuevo'){
            vaciarDatosModelo()
            botonesModoNuevo(true);
            return false;
        }else{
            return true;

        }
    }

    function vaciarDatosModelo(){
        //document.getElementById("Datos-Modelo").value='';
        document.getElementById("Datos-Placa").value='';
        document.getElementById("Datos-Clave").value='';
    }





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BOTONES PRINCIPALES




//-------------------------BTN modificar Modelo

const guardarBtn = document.getElementById("btn-Guardar");

guardarBtn.disabled=true;
guardarBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    //console.log('guardar: '+rowId);
    if(true || rowId!== null){
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
    if( (modoNuevoModelo() && true) ){
        //Construimos aqui el modal
        //construirModal(2);
        //Una vez que tenemos las dimensiones construidas, lanzamos la animacion y mostramos
        //ejecutarAnimacion();
    }
});







//Fin de IF Vehiculos/Placas
    }


});