
//Clientes
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Agentes
    const pagina = window.location.pathname;
    if(pagina == '/productos/clasificacion'){
        console.log("Cargo clasificacion");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA CLASIFICACION

document.querySelector('#fondo').classList.add('showNow');

let rowId = null;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBO TIPO
        
        //Funcion para cargar un combo dependiendo de su categoriaPadre
        async function cargarCombo(combo, id){
            try{
                //const data = await fetch('/comboAutos/'+comboMarca.value)
                const tipos = await fetch('/categorias/'+id)
                .then(response => response.json());
                //console.log("Numero de tipos en el combo tipo: "+tipos.length); 
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<tipos.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada marca al combobox de tipos
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
                console.log('Error al obtener comboTipo:', error);
            }
        }

        const comboTipo = document.getElementById('comboTipo');
        cargarCombo(comboTipo,0);
        
        const comboCategoria = document.getElementById('comboCategoria');
        comboTipo.addEventListener('click',()=>{
            cargarCombo(comboCategoria,comboTipo.value);
        })

        const comboGrupo = document.getElementById('comboGrupo');
        comboCategoria.addEventListener('click',()=>{
            cargarCombo(comboGrupo,comboCategoria.value);
        })

        const comboSubgrupo = document.getElementById('comboSubgrupo');
        comboGrupo.addEventListener('click',()=>{
            cargarCombo(comboSubgrupo,comboGrupo.value);
        })

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID
        let clasesFila='';

        // configurar la instancia de ag-Grid
        const gridOptions = {

            // each entry here represents one column
            columnDefs: [
                
                {headerName: "Tipo", 
                        field: "tipo",
                        minWidth: 150,maxWidth:200
                    },
                {headerName: "Categoria",
                        field: "categoria",sort: 'asc', floatingFilter:true, 
                        flex:1, minWidth: 150
                    },
                {headerName: "Grupo", 
                        field: "grupo", floatingFilter:true,
                        minWidth: 150,maxWidth:150
                    },
                {headerName: "Subgrupo", 
                        field: "subgrupo", 
                        minWidth: 150, maxWidth: 150}

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
                console.log('-----------------------------------------ON MODEL UPDATED');
                //console.log(event)
                //const selectedNodes = gridOptions.api.getSelectedNodes();
                //gridOptions.api.ensureNodeVisible(selectedNodes[0]);
                
                clasesFila='cambioColor';
                gridOptions.api.redrawRows();
                
                
            }
        },
        onCellValueChanged: (event) => {
            // Aquí va el código que se ejecutará cuando cambie el valor de una celda
            console.log('--------------------------------------------ON CELL VALUE CHANGED');
            //clasesFila='cambioColor';
            //gridOptions.api.redrawRows();
        },

        //getRowId: (params) => { return params.data.id; },

        //Usa el ancho maximo disponible
        //domLayout: 'autoHeight', Esto quita la virtualizacion y los setFocus

        rowHeight: 50, // altura de las filas en píxeles
        headerHeight: 40, // altura del encabezado en píxeles
        rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista

        rowGroupPanelShow: 'always',
        //popupParent: document.body,
        rowSelection: 'single', // allow rows to be selected
        animateRows: true, // have rows animate to new positions when sorted

        
        };

        // get div to host the grid
        const eGridDiv = document.getElementById("myGrid");
        // new grid instance, passing in the hosting DIV and Grid Options
        var grid = new agGrid.Grid(eGridDiv, gridOptions);


        //gridOptions.api.sizeColumnsToFit();
        
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID: ACTUALIZACION Y NUEVA FILA


        //---------------------------------------------------------------------Convierte los datos en una fila para AG-GRID
        function datosAFilaGrid(data,n) {
            //console.log(parseFloat(data.Auto.cilindraje));
            if (gridOptions.api) {
                /*
                comboTipo.options[i].value == id_Tipo){
                    //una vez encontrado mostramos en el comboTipo dicho tipo
                    comboTipo.selectedIndex=i;
                */
                return [{   tipo:       data.c1.toUpperCase(),
                            categoria:  data.c2.toUpperCase(),
                            grupo:      data.c3.toUpperCase(), 
                            subgrupo:   data.c4.toUpperCase()}];
            

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

        cargarTablaCategorias();
        async function cargarTablaCategorias(){
            try{
                
                const data = await fetch('/categoriasAll')
                .then(response => response.json());
                
                const categorias = clasificacionTabla(data);
                //mediante un for vamos cargando fila por fila
                for(i=0;i<categorias.length;i++){
                    let newRow = datosAFilaGrid(categorias[i]);
                    gridOptions.api.applyTransaction({ add: newRow });
                }
                
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los clientes:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }

            /*
            try{
                //pinCarga('cargando');
                // Hace una llamada fetch y trae el arreglo de datos para la tabla
                const data = await fetch('/categorias')
                .then(response => response.json());
                const categorias = data;
                console.log(categorias)
                //mediante un for vamos cargando fila por fila
                for(i=0;i<categorias.length;i++){
                    let newRow = datosAFilaGrid(categorias[i]);
                    gridOptions.api.applyTransaction({ add: newRow });
                }
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los clientes:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }
            */
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
            //console.log(data);
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
                document.getElementById("btnradio1").checked= !client.genero;
                document.getElementById("btnradio2").checked=  client.genero;
            }else{
                ocultarPersona(true);
                document.getElementById("Datos-Nombres").value='';
            }
            
            //Direccion y correo electronico
            const direccion = client.direccion;
            const correo = client.correo;
            //Telefonos
            const telefono1 = client.telefono1;
            const telefono2 = client.telefono2;
            const telefono3 = client.telefono3;
            const obs_placa = client.obs_cliente;

            mostrarDireccion(direccion!==null);
            mostrarCorreo(correo!==null);
            mostrarInputTelefono1(telefono1!==null);
            mostrarInputTelefono2(telefono2!==null);
            mostrarInputTelefono3(telefono3!==null);
            ocultarInputObs(obs_placa===null);

            document.getElementById("Datos-Direccion").value=(direccion===null?'':direccion.toUpperCase());
            document.getElementById("Datos-Correo").value=(correo===null?'':correo.toLowerCase());

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
            const direccionCheck= checkDireccion.checked;
            const correoCheck= checkCorreo.checked;

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
                genero: empresaCheck?false:document.getElementById('btnradio2').checked,
                
                direccion: direccionCheck?document.getElementById('Datos-Direccion').value.trim().toLowerCase():null,
                correo: correoCheck?document.getElementById('Datos-Correo').value.trim().toLowerCase():null,

                telefono1: telefono1Check?document.getElementById('Datos-Telefono1').value.trim().toLowerCase():null,
                telefono2: telefono2Check?document.getElementById('Datos-Telefono2').value.trim().toLowerCase():null,
                telefono3: telefono3Check?document.getElementById('Datos-Telefono3').value.trim().toLowerCase():null,

                obs_cliente: noObs?null:document.getElementById('Datos-Obs').value.trim().toLowerCase(),

            };
            
            return data;
        }

        
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BOTONES PRINCIPALES


//-------------------------BTN nueva categoria

        const agregarCategoriaBtn = document.getElementById("btn-Categoria");

        agregarCategoriaBtn.addEventListener('click',async (e)=>{
            e.preventDefault();
            const name = document.getElementById('Datos-Categoria').value.toLowerCase();
            const parentCategoryId = comboTipo.value;
            await nuevaCategoria(comboCategoria, name, parentCategoryId)
            document.getElementById('Datos-Categoria').value="";
        });

    
//-------------------------BTN nuevo Grupo

        const agregarGrupoBtn = document.getElementById("btn-Grupo");

        agregarGrupoBtn.addEventListener('click',async (e)=>{
            e.preventDefault();
            const name = document.getElementById('Datos-Grupo').value.toLowerCase();
            const parentCategoryId = comboCategoria.value;
            await nuevaCategoria(comboGrupo,name, parentCategoryId)
            document.getElementById('Datos-Grupo').value="";
        });



//-------------------------BTN nuevo Subgrupo

        const agregarSubgrupoBtn = document.getElementById("btn-Subgrupo");

        agregarSubgrupoBtn.addEventListener('click',async (e)=>{
            e.preventDefault();
            const name = document.getElementById('Datos-Subgrupo').value.toLowerCase();
            const parentCategoryId = comboGrupo.value;
            await nuevaCategoria(comboSubgrupo,name, parentCategoryId)
            document.getElementById('Datos-Subgrupo').value="";
        });




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES PRINCIPALES



        //--------------------------------------------- PLACAS REPETIDOS

        async function clientesRepetidos(id, identificacion){
            //No se usa pinCarga cargando
            const queryParams = new URLSearchParams({id:id, identificacion:identificacion});

            const res = await fetch(`/clientsRepetidos?${queryParams.toString()}`)
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


        
        //-----------------------------------------------------Seteamos el combo desde su Id

        function seleccionCombo(combo, id){
            for(i=0;i<combo.options.length;i++){
                if(combo.options[i].value == id){
                    combo.selectedIndex=i;
                    break;
                }
            }
        }



        //---------------------------------------------- NUEVO CLIENTE

        async function nuevaCategoria(combo, name, parentCategoryId){
            const data = {name:name,parentCategoryId:parentCategoryId};

            if(false && await clientesRepetidos(0,data.identificacion)){
                //Si devuelve true significa que encontro una identificacion
                toast("El cliente ya existe!", "toastColorError");
                pinCarga('fallo');
            }else{
                pinCarga('cargando');
                await fetch('/categoriaHijo',{
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
                    //Actualiza el combo
                    await cargarCombo(combo, parentCategoryId);
                    seleccionCombo(combo, res.id)
                    toast("Categoria creada", "toastColorSuccess");
                    pinCarga('success');
                }).catch(error =>{
                    toast(error.message, "toastColorError");
                    pinCarga('fallo');
                })
                
            }
            
        }





        var btnPrueba = document.querySelector('#btnPrueba');
        btnPrueba.addEventListener('click', async function(e) {
            e.preventDefault();
            
            try{
                
                const data = await fetch('/categoriasAll')
                .then(response => response.json());

                clasificacionTabla(data);
                
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los clientes:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }

            
            

        });


        function clasificacionTabla(data){
            let filas=[];
            let c1=[],c2=[],c3=[],c4=[];
            data.forEach(tipo =>{
                if(null === tipo.parentCategoryId){
                    c1.push({"id":tipo.id,"parentCategoryId":tipo.parentCategoryId,"name":tipo.name})
                    
                }
            });
            //console.log('Este es c1: ');
            //console.log(c1);
            let band=0;
            c1.forEach(tipo =>{
                data.forEach(categoria =>{
                    if(categoria.parentCategoryId==tipo.id){
                        c2.push({"id":categoria.id,"c1":categoria.parentCategoryId,"c1_name":tipo.name,"name":categoria.name})
                        band=1;
                    }
                });
                if(band==0){
                    //console.log('No encontro ninguno de:');
                    //console.log(tipo.name);
                    filas.push({"c1":tipo.name,"c2":"","c3":"","c4":""})
                }
                band=0;
            });
            //console.log('Este es c2: ');
            //console.log(c2);
            band=0;
            c2.forEach(categoria =>{
                data.forEach(grupo =>{
                    if(grupo.parentCategoryId==categoria.id){
                        c3.push({"id":grupo.id,
                                    "c2":grupo.parentCategoryId, "c2_name":categoria.name,
                                    "c1":categoria.c1,"c1_name":categoria.c1_name,
                                    "name":grupo.name})
                        band=1;
                    }
                });
                if(band==0){
                    //console.log('No encontro ninguno de:');
                    //console.log(categoria.name);
                    filas.push({"c1":categoria.c1_name,"c2":categoria.name,"c3":"","c4":""})
                }
                band=0;
            });
            //console.log('Este es c3: ');
            //console.log(c3);
            band=0;
            c3.forEach(grupo =>{
                data.forEach(subgrupo =>{
                    if(subgrupo.parentCategoryId==grupo.id){
                        c4.push({"id":subgrupo.id,
                                    "c3":subgrupo.parentCategoryId, "c3_name":grupo.name,
                                    "c2":grupo.c2,"c2_name":grupo.c2_name,
                                    "c1":grupo.c1,"c1_name":grupo.c1_name,
                                    "name":subgrupo.name})
                        band=1;
                        filas.push({"c1":grupo.c1_name,"c2":grupo.c2_name,"c3":grupo.name,"c4":subgrupo.name})    
                    }
                });
                if(band==0){
                    //console.log('No encontro ninguno de:');
                    //console.log(grupo.name);
                    filas.push({"c1":grupo.c1_name,"c2":grupo.c2_name,"c3":grupo.name,"c4":""})
                }
                band=0;
            });
            //console.log('Este es c4: ');
            //console.log(c4);

            //console.log('ESTA ES LA TABLA FINAL:')
            //console.log(filas);
            return filas
        }

          
          
    }
});


