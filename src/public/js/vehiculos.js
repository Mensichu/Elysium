

//import Toastify from 'toastify-js';
//Vehiculos
//Al instante

//import { response } from "express";

window.addEventListener('load',()=>{
    
    //Solo se ejecuta cada vez que se recargue la pagina y sea Vehiculos
    const pagina = window.location.pathname;

    if(pagina == '/vehiculos'){
        console.log("Cargo vehiculos");
        
        //Agregamos que sea visible por css modelos con su clase showNow
        document.querySelector('#contVehiculos1').classList.add('showNow');
        //Agregamos al navegador principal que su referencia es Vehiculos
        document.querySelector('.animation').classList.add("start-item2");
        //Guardamos el elemento node submenu (Placas modelos)
        const navSubMenu = document.querySelector('.subMenu');
        //Inicializamos la variable seleccion al cargar la pagina
        let seleccion="";
        //Creamos el evento listener al hacer click en el submenu (Placas modelos)
        navSubMenu.addEventListener('click',(e)=>{
            //Evitamos que el submenu redireccione la pagina
            e.preventDefault();
            //Condicion 1: solo devuelve true cuando el submenu esta abierto
            const cond1 = navSubMenu.classList.contains("_expand");//menu abierto
            //Condicion 2: solo devuelve verdadero cuando se haga clic en un submenu: Placas o modelos
            //Que son elementos de etiqueta <a>
            const cond2 = e.target.tagName == 'A';
            //Se agrega o quita la clase _exapand que despliega o repliega el submenu
            if(!cond1)navSubMenu.classList.toggle("_expand");
            //Se pregunta si el menu esta abierto y se hizo clic en un submenu
            if(cond1 && cond2){
                //Se agrega o quita la clase _exapand que despliega o repliega el submenu
                navSubMenu.classList.toggle("_expand");
                //Remueve la clase activo del submenu que este seleccionado
                document.querySelector(".active").classList.remove("active");
                //Se agrega la clase activo al elemento del submenu que se selecciono en este clic
                e.target.classList.add('active');
            };
            //Variable temporal para comparar con la nueva seleccion y se comprueba
            //si se a seleccionado un submenu diferente
            const temp = seleccion;
            seleccion= e.target.textContent;
            //Preguna si se selecciono un submenu diferente del anterior
            const cond3= temp!=seleccion;
            //Se actualiza el textoSeleccionado a la seleccion actual solo si
            //se hizo clic en una etiqueta <a>
            document.querySelector('.textoSeleccionado').textContent= cond2?seleccion:"";
            //Se pregunta si se hizo una seleccion diferente del anterior y si el submenu
            //esta abierto
            if(cond3 && cond1){
                if(seleccion=='Placas'){
                    
                }else if(seleccion=='Modelos'){
                    
                }
                //Se altera la clase showNow para alternar en una transicion entre Placas o Modelos
                document.querySelector('#contVehiculos1').classList.toggle('showNow');
                document.querySelector('#contVehiculos2').classList.toggle('showNow');
            }


        });

        
        //Modelos

        const comboMarca = document.getElementById('comboMarca');
        const comboModelo = document.getElementById('comboModelo');

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
            // Hace una llamada AJAX a la ruta '/productsa' para obtener la lista de marcas de vehículos
        
        }
        

        //Combo Modelo
        //Funcion solo cuando hubo un cambio en el comboMarca
        let comboMarcaSelecc= 0;
        comboMarca.addEventListener('click',(e)=>{
            //Solo ejecuta si esta conectado a internet
            if(conectado())cambioComboMarca(false);
            //console.log("Hiciste click en el combo marca!");
            
        });

        //Actualizamos combo Modelo
        async function cambioComboMarca(forzar){
            if(forzar || comboMarcaSelecc!=comboMarca.value){
                console.log('forzar: '+forzar);
                console.log('comboMarca: '+comboMarca.value);
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

                        comboMarcaSelecc= comboMarca.value;
                
                }catch(error){
                    console.log('Error al obtener comboModelo:', error);
                }
            }else{
                console.log('no cambio de marca,no hay necesidad de actualizar el combo modelo')
            }
            //console.log('termine cambioComboMarca()')
            
            
            
            
        }


        let clasesFila='';
        //------------------------------ TABLA ModeloS

        //----------------------------------AG-GRID
        // configurar la instancia de ag-Grid
        const gridOptions = {

            // each entry here represents one column
            columnDefs: [
                {headerName: "ID", 
                        field: "id", hide: true},
                {headerName: "Marca",
                        field: "marca", sort: 'asc',floatingFilter:true, 
                        width:130},
                {headerName: "Modelo", 
                        field: "modelo", sort: 'asc',floatingFilter:true, 
                        minWidth: 150,flex: 150,
                        //type: 'miEstilo',
                        editable: true
                        
                    },

                {headerName: "Año", 
                        field: "año", filter: 'agNumberColumnFilter', flex: 110,
                        minWidth: 75, maxWidth: 115},
                {headerName: "Cilindraje", 
                        field: "cilindraje", flex: 110,
                        minWidth: 75,maxWidth: 120},
                {headerName: "Combustible", 
                        field: "combustible", flex: 140,
                        minWidth: 100,maxWidth: 140}
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
                    if(rowId === params.data.id){
                        console.log('rowId:  '+rowId);
                        console.log('params.data.id:  '+params.data.id);
                        params.node.setSelected(true);
                        seleccionTabla(params.data.id);
                        return clasesFila;
                    }
                }
                return '';
            }
            ,
            onModelUpdated: (event) => {
                if(rowId!==null){
                    console.log('-----------------------------------------CHINGONNKNKN');
                    console.log(event.data)
                    //const selectedNodes = gridOptions.api.getSelectedNodes();
                    //gridOptions.api.ensureNodeVisible(selectedNodes[0]);
                    clasesFila='cambioColor';
                    gridOptions.api.redrawRows();
                    guardarBtn.disabled=true;
                }
            },
            onCellValueChanged: (event) => {
                // Aquí va el código que se ejecutará cuando cambie el valor de una celda
                //console.log('Celda modificada', event.data, event.colDef.field, event.newValue);
                clasesFila='cambioColor';
                gridOptions.api.redrawRows();
            },

            getRowId: (params) => { return params.data.id; },

            //Usa el ancho maximo disponible
            domLayout: 'autoHeight',

            rowGroupPanelShow: 'always',
            //popupParent: document.body,
            rowSelection: 'single', // allow rows to be selected
            animateRows: true, // have rows animate to new positions when sorted

            // example event handler
            onCellClicked: params => {
                if(params.data!== undefined){
                    //console.log('cell was clicked', params.data);
                    rowId = params.data.id;
                    seleccionTabla(rowId);
                    guardarBtn.disabled=false;
                }else{
                    console.log('aja!')
                    guardarBtn.disabled=true;
                }
            }
        };

        // get div to host the grid
        const eGridDiv = document.getElementById("myGrid");
        // new grid instance, passing in the hosting DIV and Grid Options
        var grid = new agGrid.Grid(eGridDiv, gridOptions);
        

        function datosAFilaGrid(data) {
            if (gridOptions.api) {
                var newRow = [{ id: data.id, marca: data.Marca.nom_marca.toUpperCase(), modelo: data.nom_auto.toUpperCase(), año: data.ano, cilindraje: data.cilindraje, 
                combustible: data.combustible? 'DIESEL.':'GAS.' }];
                return newRow;
            }
        }
        
          function actualizarFilaAgGrid(filaActualizada) {
            //Actualiza la fila
            const selectedNodes = gridOptions.api.getSelectedNodes();
            if (selectedNodes.length > 0) {
                const selectedNode = selectedNodes[0];
                const newData = Object.assign({}, selectedNode.data, filaActualizada[0]);
                selectedNode.setData(newData);
                //Se encargan de activar la animacion
                gridOptions.api.ensureNodeVisible(selectedNode);
                clasesFila = 'cambioColor';
                gridOptions.api.redrawRows();
            }

          }
          

          function nuevaFilaAgGrid(filaNueva) {
            const res = gridOptions.api.applyTransaction({ add: filaNueva });
            if (res.add) {
                const addedRow = res.add[0];
                rowId = addedRow.rowId;
                //Selecciona la fila nueva
                gridOptions.api.deselectAll();
                addedRow.setSelected(true);
                //seleccionTabla(rowId);
                gridOptions.api.ensureNodeVisible(addedRow);
                // enfocar la celda 'marca' de la fila seleccionada
                //gridOptions.api.setFocusedCell(addedRow.rowId, "marca");
            }
          }


        cargarTablaModelos();
        async function cargarTablaModelos(){
            try{
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const data = await fetch('/tablaAutos')
                .then(response => response.json());
                const Modelos = data;
                //mediante un for vamos cargando fila por fila
                for(i=0;i<Modelos.length;i++){
                    let newRow = datosAFilaGrid(Modelos[i]);
                    gridOptions.api.applyTransaction({ add: newRow });
                }

            }catch(error){
                console.log('Error al obtener el auto:', error);
            }
        }

        let rowId = null;
        let rowIdTemp = null;
        
        function getSelectedRowId() {
            const selectedRows = gridOptions.api.getSelectedRows();
            if (selectedRows.length > 0) {
                console.log(selectedRows[0]);
                return selectedRows[0].id;
            }
            return null;
          }


        async function seleccionTabla(id) {
            try{
                const data = await fetch('/auto/'+id)
                .then(response => response.json());

                // carga los datos de data en los combos y textos de "Datos del Modelo"
                await cargarDatosDesdeSeleccion(data);
                validacionVaciar();
                //Retorna el comboModelo
                mostrarTextoModelo(false);
                
        }catch(error){
            console.log('Error al obtener el auto:', error);
        }
    }



    async function cargarDatosDesdeSeleccion(data){
        // almaceno la respuesta ajax en la variable modelo
        var modelo = data;
        
        await seleccionComboMarca(modelo.id_marca);
        //Una vez seleccionado el comboMarca y cargado el comboModelo
        //se selecciona el modelo mediante el id
        seleccionComboModelo(modelo.id);
        //Cargamos el resto de datos
        document.getElementById("Datos-Modelo").value=modelo.nom_auto.toUpperCase();
        document.getElementById("Datos-Alias").value=modelo.Marca.alias.toUpperCase();
        document.getElementById("Datos-Año").value=modelo.ano;
        document.getElementById("Datos-Cilindraje").value=modelo.cilindraje;
        //Selecciona si es a Gas o Diesel
        var gasSeleccion = document.getElementById('btnradio1');
        var dieselSeleccion = document.getElementById('btnradio2');
        gasSeleccion.checked = !modelo.combustible;
        dieselSeleccion.checked = modelo.combustible;

        document.getElementById("Datos-CMotor").value=modelo.consumo_motor;
        document.getElementById("Datos-CCaja").value=modelo.consumo_caja;
    }


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



//------------------------------------------------------- Modales

        // Obtener el cuadro modal
		var modal0 = document.getElementById("myModal0");
        var modal1 = document.getElementById("myModal1");
        var modal2 = document.getElementById("myModal2");

		// Función para abrir el cuadro modal
		function abrirModal0() {
			//modal0.style.display = "block";
            modal0.classList.add('show');
		}

        // Función para abrir el cuadro modal
        function abrirModal1() {
            //modal1.style.display = "block";
            modal1.classList.add('show');
            //modal1.classList.remove('hide');
        }

        function abrirModal2() {
            //modal2.style.display = "block";
            modal2.classList.add('show');
        }


		// Función para cerrar el cuadro modal
		function cerrarModals() {
			//modal0.style.display = "none";
            //modal1.style.display = "none";
            //modal2.style.display = "none";
            circulo.style = '';
            circulo.classList.remove('circuloAnim');
            modal0.classList.remove('show');
            modal1.classList.remove('show');
            modal2.classList.remove('show');
            //modal0.classList.add('hide');
		}


        modal0.addEventListener('click', (e)=>{
            console.log(e.target.parentNode)
            if(e.target.parentNode.id=="fondo" ||
                e.target.parentNode.id=="contVehiculos1" )cerrarModals();
        });






        //cerrar Modal1 al hacer clic externo
        modal1.addEventListener('click', (e)=>{
            //console.log(e.target.parentNode)
            if(e.target.parentNode.id=="fondo" ||
            e.target.parentNode.id=="contVehiculos1" )cerrarModals();
        });




        //cerrar Modal2 al hacer clic externo
        modal2.addEventListener('click', (e)=>{
            console.log(e.target.parentNode)
            if(e.target.parentNode.id=="fondo" ||
            e.target.parentNode.id=="contVehiculos1" )cerrarModals();
});




//--------------------------------------------- AGREGAR MARCA

        const btnAgregar = document.getElementById("btn-Agregar");
        const confirmarMarca = document.getElementById("confirmarMarca");
        const cancelarMarca1 = document.getElementById("cancelarMarca1");
        const cancelarMarca2 = document.getElementById("cancelarMarca2");
        
        btnAgregar.addEventListener('click',(e)=>{
            ejecutarAnimacion(abrirModal0,0);
            //abrirModal0();

        });

        confirmarMarca.addEventListener('click',(e)=>{
            e.preventDefault();
            //Solo ejecuta si esta conectado a internet
            if(conectado())nuevaMarca();
            
        });

        cancelarMarca1.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });
        cancelarMarca2.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });

        async function nuevaMarca(){
            const data = {
                nom_marca: document.getElementById('textoNuevaMarca').value.trim().toLowerCase()
            };

            fetch('/marca',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type':'application/json' 
                }
            })
            .then(response => response.json())
            .then(res =>{
                data.id= res.id;
                nuevaMarcaCombo(data);
                toast("Marca agregado", "toastColorSuccess");
                // Cerrar el cuadro modal
                cerrarModals();
            })
            .catch(error => {
                toast("Error con el servidor", "toastColorError");
                console.log('Error al agregar marca nueva');
            });
            

        }


//---------------------------------------------- MODIFICAR Alias Marca


        const btnGuardarAliasMarca = document.getElementById('btn-GuardarAlias');

        btnGuardarAliasMarca.addEventListener('click', (e)=>{
            //Alias
            if(conectado() && validacionAlias()){
                modificarAliasMarca();
            }else{
                //toast
                toast("Llene el campo alias", "toastColorError");
            }
        });

        function modificarAliasMarca() {
            const data = obtenerDatos();
            
            fetch(`/marcaAlias/${data.id_marca}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(response => {
                if(!response.ok){
                    toast(response.status, "toastColorError");
                    throw new Error('modificarAliasMarca PUT fallo!');
                }
                return response.json();
            })
            .then(res => {
                toast("Alias de marca actualizado", "toastColorSuccess");
                cerrarModals();
            }).catch(error =>{
                toast("Error con el servidor", "toastColorError");
                console.log(error);
            })
        }




//---------------------------------------------- MODIFICAR modelo

        

        const guardarBtn = document.getElementById("btn-Guardar");
        const confirmarGuardar = document.getElementById("confirmarGuardar");
        const cancelarGuardar1 = document.getElementById("cancelarGuardar1");
        const cancelarGuardar2 = document.getElementById("cancelarGuardar2");

        guardarBtn.disabled=true;   

        guardarBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            console.log('guardar: '+rowId);
            if(rowId!== null){
                if(validacionGuardar()){
                    ejecutarAnimacion(abrirModal1,1);
                }else{
                    //toast
                    //toast("Llene todos los campos en rojo!", "toastColorError");
                }
            }else{
                toast("Vuelva a seleccionar la fila", "toastColorError");
            }
            
            
        });

        confirmarGuardar.addEventListener('click',(e)=>{
            e.preventDefault();
            //Solo ejecuta si esta conectado a internet
            if(conectado())modificarModelo();
            
        });

        cancelarGuardar1.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });
        cancelarGuardar2.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });

        function modificarModelo(){
            const data = obtenerDatos();
            
            fetch(`/auto/${data.id}`,{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if(!response.ok){
                    toast(response.status, "toastColorError");
                    throw new Error('modificarModelo PUT fallo!');
                }
                return response.json()
            })
            .then(async res =>{
                const filaActualizada = datosAFilaGrid(data);
                actualizarFilaAgGrid(filaActualizada);
                await cambioComboMarca(true);
                seleccionComboModelo(data.id)
                toast("Modelo guardado", "toastColorSuccess");
                guardarBtn.disabled=true;
                cerrarModals();
            }).catch(error =>{
                console.log(error)
                toast("Error con el servidor", "toastColorError");
            });
            console.log('entre');
            
            console.log('pase');
        }
        



        //---------------------------------------------- NUEVO modelo

        

        const nuevoBtn = document.getElementById("btn-Nuevo");
        const confirmarNuevo = document.getElementById("confirmarNuevo");
        const cancelarNuevo1 = document.getElementById("cancelarNuevo1");
        const cancelarNuevo2 = document.getElementById("cancelarNuevo2");


        nuevoBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(validacionNuevo()){
                ejecutarAnimacion(abrirModal2,2)
            }else{
                //toast
                //toast("Llene todos los campos en rojo!", "toastColorError");
            }
        });

        confirmarNuevo.addEventListener('click',(e)=>{
            e.preventDefault();
            //Solo ejecuta si esta conectado a internet
            if(conectado())nuevoModelo();
            
        });

        cancelarNuevo1.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });
        cancelarNuevo2.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });

        function nuevoModelo(){
            const data = obtenerDatos();

            fetch('/auto',{
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response =>{
                if(!response.ok){
                    throw new Error('nuevoModelo POST fallo!');
                }
                return response.json();
            })
            .then(res =>{
                data.id = res.id
                //const filaNueva = datosAFila(data);
                //nuevaFilaTabla(filaNueva);
                const filaNueva = datosAFilaGrid(data);
                nuevaFilaAgGrid(filaNueva)
                toast("Modelo agregado", "toastColorSuccess");
                rowId=res.id;
                cerrarModals();
            }).catch(error =>{
                console.log(error)
                toast("Error con el servidor", "toastColorError");
            })
        }








        
        const circulo = document.getElementById('circulo');


        function ejecutarAnimacion(abrirModal, n){
            circulo.style.transition = 'all 0.2s ease-out';
            //Se agrega la animacion 
            circulo.classList.add('circuloAnim');
            //Se obteiene los datos de posicion y forma
            const modalContent = document.querySelectorAll('.modal-content')[n];
            // Obtener las coordenadas absolutas del modal-content
            const rect = modalContent.getBoundingClientRect();
            // Se obtienen las coordenadas de posicion
            const modalContentTop = rect.top;
            const modalContentLeft = rect.left+(modalContent.offsetWidth/2);

            // Se asignan la posicion al circulo
            circulo.style.top = modalContentTop + 'px';
            circulo.style.left = modalContentLeft + 'px';
            // Se asigna la forma de ancho y altura
            circulo.style.height=modalContent.offsetHeight+"px";
            circulo.style.width=modalContent.offsetWidth+"px";
            
            //console.log("Este es la altura del modal actual: "+myModalHeight);
            setTimeout(() => {
                abrirModal();
            }, 200); /* Esperar a que termine la animación */
            
        }
        
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


        function conectado(){
            if (navigator.onLine) {
                // El navegador está en línea, se puede enviar la solicitud al servidor
                return true;
              } else {
                // El navegador no está en línea, muestra un mensaje de alerta al usuario
                toast("No hay conexión a Internet. Por favor, revisa tu conexión y vuelve a intentarlo.", "toastColorError");
                return false;
              }
        }


        

        

//---------------------------------------------------Se agrega un observador a la tabla:


//-------------------------------------------------------fin del observador


//----------------------------------------------ANIMACIONES



        


let as=100;
  // agregar una fila a la tabla cuando se hace clic en el botón
  var btnPrueba = document.querySelector('#btnPrueba');
  btnPrueba.addEventListener('click', function(e) {
    e.preventDefault();

    /*var newRows = [{ id:1, marca: "Hyundai", modelo: "Elantra", año: 2022, cilindraje: 4, combustible: "Gasoline" }];
    const rowData = gridOptions.api.getRowData();
    rowData.push(newRows);
    */
   as+=1;
    var newRow = [{ id: as, marca: "NISSAN", modelo: "ZZZ", año: 2022, cilindraje: 4, combustible: "Gasoline" }];
    nuevaFilaAgGrid(newRow);
    


  });
        

        
        

    }



});

function toast(mensaje,colorClass){
    Toastify({
        text: mensaje+" ",
        duration: 3000, // duración en milisegundos
        gravity: "bottom", // posición en pantalla (top, bottom, left, right)
        position: "right", // alineación del mensaje (center, left, right)
        close:true,
        className: colorClass,
        //background: "radial-gradient(circle, #46b000, #46b0008a)" // color de fondo
        //"linear-gradient(to right, #00b09b, #96c93d)", // color de fondo
        }).showToast();
}


