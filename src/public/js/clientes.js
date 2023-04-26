
//Agentes
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Agentes
    const pagina = window.location.pathname;
    if(pagina == '/clientes'){
        console.log("Cargo clientes");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA PLACAS

document.querySelector('#fondo').classList.add('showNow');

let rowId = null;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBO TIPO
        const comboTipo = document.getElementById('comboTipo');
        cargarComboTipo();
        //Combo Tipo
        async function cargarComboTipo(){
            try{
                let tipos = await fetch('/comboTipos')
                .then(response => response.json());

                console.log("Numero de tipos en el combo tipo: "+tipos.length); 
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<tipos.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada marca al combobox de tipos
                    const item = document.createElement("OPTION");
                    item.textContent = tipos[i].tipo.toUpperCase();
                    item.value =tipos[i].id;
                    fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                }

                //Vaciamos el combo primero
                for(i=comboTipo.options.length-1;i>=0;i--){
                    comboTipo.remove(i);
                }

                //Se agrega al combobox comboMarca
                comboTipo.appendChild(fragmento);
                

            }catch(error){
                console.log('Error al obtener comboTipo:', error);
            }
        }




        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID
        let clasesFila='';

        // configurar la instancia de ag-Grid
        const gridOptions = {

            // each entry here represents one column
            columnDefs: [
                {headerName: "Id", 
                        field: "id", hide: true
                    },
                {headerName: "Tipo", 
                        field: "tipo",
                        minWidth: 30,maxWidth:100
                    },
                {headerName: "Identidad",
                        field: "identidad",sort: 'asc', floatingFilter:true, 
                        width: 150
                    },
                {headerName: "Nombre", 
                        field: "nombre", floatingFilter:true,
                        flex: 1, minWidth: 150
                    },
                {headerName: "Sexo", 
                        field: "sexo", 
                        minWidth: 20, maxWidth: 90}

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
                    /*
                    if(rowId === params.data.id){

                        params.node.setSelected(true);
                        seleccionTabla(params.data.id,false);
                        return clasesFila;
                    }
                    */
                }
                return '';
            },

            onModelUpdated: (event) => {
                if(true || rowId!==null){
                    console.log('-----------------------------------------CHINGONNKNKN');
                    //console.log(event)
                    //const selectedNodes = gridOptions.api.getSelectedNodes();
                    //gridOptions.api.ensureNodeVisible(selectedNodes[0]);
                    
                    clasesFila='cambioColor';
                    gridOptions.api.redrawRows();
                    
                    botonesModoNuevo(false);
                    guardarBtn.disabled=true;
                    
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
        function datosAFilaGrid(data) {
            console.log('datosAFilaGrid')
            console.log(data);
            //console.log(parseFloat(data.Auto.cilindraje));
            if (gridOptions.api) {
                console.log('pase por aqui')
                /*
                comboTipo.options[i].value == id_Tipo){
                    //una vez encontrado mostramos en el comboTipo dicho tipo
                    comboTipo.selectedIndex=i;
                */
                return [{ id: data.id,
                            tipo: comboTipo.options[comboTipo.selectedIndex].textContent.toUpperCase(),//data.TipoDeIdentificacion.tipo.toUpperCase(), 
                            identidad: data.identificacion.toUpperCase(), 
                            nombre: data.apellidos_empresa.toUpperCase()+(data.nombres!=null?' '+data.nombres.toUpperCase():''), 
                            sexo: data.sexo? 'M':'H'}];
            

            }
        }


        //---------------------------------------------------------------------Actualiza la fila a la tabla AG-GRID
        function actualizarFilaAgGrid(data) {
            const filaActualizada = datosAFilaGrid(data); //n es el tipo de fila: 1 o 2
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
            const filaNueva = datosAFilaGrid(data); //n es el tipo de fila: 0
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

        cargarTablaClientes();
        async function cargarTablaClientes(){
            try{
                //pinCarga('cargando');
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const data = await fetch('/Clients')
                .then(response => response.json());
                const Clients = data;
                //mediante un for vamos cargando fila por fila
                for(i=0;i<Clients.length;i++){
                    let newRow = datosAFilaGrid(Clients[i],0);
                    gridOptions.api.applyTransaction({ add: newRow });
                }
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los clientes:', error);
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
                    const data = await fetch('/client/'+id)
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

        //------------------------------------------------------------------------------------Cargar Datos a DATOS DEL MODELO

        async function cargarDatosDesdeSeleccion(data){
            var client = data;
            console.log(data);
            seleccionComboTipo(client.tipo);
            //En la db esta todo en minusculas, pero en el front end esta en mayuscula
            
            //Cargamos el resto de datos
            document.getElementById("Datos-Identificacion").value=client.identificacion.toUpperCase();
            document.getElementById("Datos-Apellidos").value=client.apellidos_empresa.toUpperCase();
            //Valida si es una persona o una empresa
            if(client.nombres!==null){
                ocultarPersona(false);
                document.getElementById("Datos-Nombres").value=client.nombres.toUpperCase();
                //Selecciona si es H o M
                document.getElementById("btnradio1").checked= !client.sexo;
                document.getElementById("btnradio2").checked=  client.sexo;
            }else{
                ocultarPersona(true);
                document.getElementById("Datos-Nombres").value='';
            }
            
            //Direccion y correo electronico
            document.getElementById("Datos-Direccion").value=client.direccion.toUpperCase();
            document.getElementById("Datos-Correo").value=client.correo.toUpperCase();

            
            const obs_placa = client.obs_cliente;
            const telefono1 = client.telefono1;
            const telefono2 = client.telefono2;
            const telefono3 = client.telefono3;

            mostrarInputTelefono1(telefono1!==null);
            mostrarInputTelefono2(telefono2!==null);
            mostrarInputTelefono3(telefono3!==null);
            ocultarInputObs(obs_placa===null);

            document.getElementById("Datos-Telefono1").value=(telefono1===null?'':telefono1);
            document.getElementById("Datos-Telefono2").value=(telefono2===null?'':telefono2);
            document.getElementById("Datos-Telefono3").value=(telefono3===null?'':telefono3);
            document.getElementById("Datos-Obs").value=  (obs_placa===null?'':obs_placa);
        }




        //-----------------------------------------------------Seteamos el comboTipo desde su Id
        async function seleccionComboTipo(id_Tipo){
            //ComboMarca es un elemento tipo select que almacena varios elementos tipo option
            //Buscamos en el comboMarca .value(id de cada marca) el que corresponda al id_marca del auto seleccionado
            for(i=0;i<comboTipo.options.length;i++){
                if(comboTipo.options[i].value == id_Tipo){
                    //una vez encontrado mostramos en el comboTipo dicho tipo
                    comboTipo.selectedIndex=i;
                    break;
                }
            }
        }



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ OBTENER DATOS

        function obtenerDatos(){
            const empresaCheck= checkEmpresa.checked;
            const telefono1Check= checkTelefono1.checked;
            const telefono2Check= checkTelefono2.checked;
            const telefono3Check= checkTelefono3.checked;
            const noObs = document.getElementById('Datos-NoObs').checked

            const idSeleccionado = getSelectedRowId();
            const data = {
                id: (idSeleccionado!==null)?idSeleccionado:0,// si es que el idSeleccionado no existe
                identificacion: document.getElementById('Datos-Identificacion').value.trim(),
                tipo: comboTipo.value,
                apellidos_empresa: document.getElementById('Datos-Apellidos').value.trim().toLowerCase(),
                nombres: empresaCheck?null:document.getElementById('Datos-Nombres').value.trim().toLowerCase(),
                sexo: document.getElementById('btnradio2').checked,
                
                telefono1: telefono1Check?document.getElementById('Datos-Telefono1').value.trim().toLowerCase():null,
                telefono2: telefono2Check?document.getElementById('Datos-Telefono2').value.trim().toLowerCase():null,
                telefono3: telefono3Check?document.getElementById('Datos-Telefono3').value.trim().toLowerCase():null,

                obs_cliente: noObs?null:document.getElementById('Datos-Obs').value.trim().toLowerCase(),

                direccion: document.getElementById('Datos-Direccion').value.trim().toLowerCase(),
                correo: document.getElementById('Datos-Correo').value.trim().toLowerCase(),

            };
            
            return data;
        }

        function botonesModoNuevo(bloquear){
            const modoActual = nuevoBtn.textContent;
            const bg_new = document.getElementById('datosModeloCard')
            if(bloquear && modoActual!='Agregar'){
                //Bloqueado
                //mostrarTextoModelo(true);
                //guardarNomAutoBtn.disabled=true;
                guardarBtn.disabled=true;
                nuevoBtn.textContent = 'Agregar';
                bg_new.classList.add('bg_new');
                nuevoBtn.classList.add('btn-success');
                nuevoBtn.classList.remove('btn-outline-success');
                toast("Ingrese la nueva placa a agregar", "toastColorInfo");
            }else if(!bloquear && modoActual!='Nuevo'){
                //Desbloqueado
                //mostrarTextoModelo(false);
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
            document.getElementById("Datos-Identificacion").value='';
            document.getElementById("Datos-Apellidos").value='';
            document.getElementById("Datos-Nombres").value='';
            document.getElementById("Datos-Direccion").value='';
            document.getElementById("Datos-Correo").value='';
            document.getElementById("Datos-Telefono1").value='';
            document.getElementById("Datos-Telefono2").value='';
            document.getElementById("Datos-Telefono3").value='';
            document.getElementById("Datos-Obs").value='';
            ocultarPersona(true);
            mostrarInputTelefono1(false);
            mostrarInputTelefono2(false);
            mostrarInputTelefono3(false);
            ocultarInputObs(true);
        }



        //----------------------------------------------------------------------PERSONA/EMPRESA
        function ocultarPersona(ocultar){
            checkEmpresa.checked=ocultar;
            if(ocultar){
                document.querySelector("#formPersona").style.display='none';
                document.querySelector("#noTieneApellidoLabel").textContent='Empresa';
                //document.querySelector("#empresaApellidoLabel").textContent='Empresa';
                document.querySelector("#Datos-Apellidos").placeholder='Empresa';
            }else{
                document.querySelector("#formPersona").style.display='block';
                document.querySelector("#noTieneApellidoLabel").textContent='Persona';
                //document.querySelector("#empresaApellidoLabel").textContent='Apellido';
                document.querySelector("#Datos-Apellidos").placeholder='Apellidos';
            }
        }
        

        //-------------------------BTN No tiene clave
        const checkEmpresa = document.getElementById('Datos-NoEmpresa');
        checkEmpresa.addEventListener('change',()=>{
            ocultarPersona(checkEmpresa.checked);
            
        });

        
        //----------------------------------------------------------------------TELEFONOS
        const checkTelefono1 = document.getElementById('tieneTelefono1');
        checkTelefono1.addEventListener('change',()=>{
            mostrarInputTelefono1(checkTelefono1.checked);
        });
        function mostrarInputTelefono1(mostrar){
            checkTelefono1.checked=mostrar;
            if(mostrar){
                document.querySelector("#formTelefono1").style.display='block';
            }else{
                document.querySelector("#formTelefono1").style.display='none';
            }
        }

        const checkTelefono2 = document.getElementById('tieneTelefono2');
        checkTelefono2.addEventListener('change',()=>{
            mostrarInputTelefono2(checkTelefono2.checked);
        });
        function mostrarInputTelefono2(mostrar){
            checkTelefono2.checked=mostrar;
            if(mostrar){
                document.querySelector("#formTelefono2").style.display='block';
            }else{
                document.querySelector("#formTelefono2").style.display='none';
            }
        }

        const checkTelefono3 = document.getElementById('tieneTelefono3');
        checkTelefono3.addEventListener('change',()=>{
            mostrarInputTelefono3(checkTelefono3.checked);
        });
        function mostrarInputTelefono3(mostrar){
            checkTelefono3.checked=mostrar;
            if(mostrar){
                document.querySelector("#formTelefono3").style.display='block';
            }else{
                document.querySelector("#formTelefono3").style.display='none';
            }
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
                if(numeroModal == 1)textoP.textContent='Guardar cambios a placa existente';
                if(numeroModal == 2)textoP.textContent='Guardar como una nueva placa';
                modalBody.insertBefore(textoP,modalBody.firstChild);
            }

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
                // Guardar cambios al modelo
                if(btnConfirmar.value==1)modificarCliente();
                // Nuevo modelo
                if(btnConfirmar.value==2)nuevoCliente();

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

/*
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
        //Si devuelve true significa que encontro una modelo año cil igual
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


        async function nuevoCliente(){
            const data = obtenerDatos();

            if(false && await placasRepetidas(0,data.nom_placa)){
                //Si devuelve true significa que encontro una modelo año cil igual
                toast("La Placa ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                pinCarga('cargando');
                await fetch('/client',{
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
                    toast("Modelo agregado", "toastColorSuccess");
                    pinCarga('success');
                    rowId=res.id;
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

        async function modificarCliente(){
            const data = obtenerDatos();

            if(false && await placasRepetidas(data.id,data.nom_placa)){
                //Si devuelve true significa que encontro una placa igual
                toast("La placa ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                await fetch(`/client/${data.id}`,{
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
                        const res = await response.json();
                        actualizarFilaAgGrid(res);
                        toast("Cliente guardado", "toastColorSuccess");
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



        var btnPrueba = document.querySelector('#btnPrueba');
        btnPrueba.addEventListener('click', async function(e) {
            e.preventDefault();
            
            console.log(JSON.stringify(obtenerDatos()));
            const data = obtenerDatos();
            nuevaFilaAgGrid(data)

        });



    }
});


