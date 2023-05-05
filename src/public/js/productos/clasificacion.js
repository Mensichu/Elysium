
//Clasificacion
window.addEventListener('load',()=>{
    //Solo se ejecuta cada vez que se recargue la pagina y sea Clasificacion
    const pagina = window.location.pathname;
    if(pagina == '/productos/clasificacion'){
        console.log("Cargo clasificacion");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINA CLASIFICACION

document.querySelector('#fondo').classList.add('showNow');

let rowId = null;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMBO
        
        //Funcion para cargar un combo dependiendo de su categoriaPadre
        async function cargarCombo(combo, id){
            try{
                const tipos = await fetch('/categorias/'+id)
                .then(response => response.json());
                //console.log("Numero de tipos en el combo: "+tipos.length); 
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<tipos.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada clasificacion al combobox correspondiente
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
                //Se agrega al combobox correspondiente
                combo.appendChild(fragmento);
                combo.selectedIndex=0;

            }catch(error){
                console.log('Error al obtener comboTipo:', error);
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
        async function cargarCombosClasificacion(c1_id,c2_id,c3_id,c4_id){
            await cargarCombo(comboTipo,-1);
            await cargarCombo(comboCategoria,comboTipo.value);
            await cargarCombo(comboGrupo,comboCategoria.value);
            await cargarCombo(comboSubgrupo,comboGrupo.value);
        }
        

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TABLA AG-GRID
        let clasesFila='';
        const myCellRenderer = params => '<span style="width: 10px;">' + params.value + '</span>';
        // configurar la instancia de ag-Grid
        const gridOptions = {

            // each entry here represents one column
            columnDefs: [
                
                {headerName: "Tipo", 
                        field: "tipo",
                        minWidth: 150,maxWidth:200, 
                        /*hideWhenNoChildren: true, */rowGroup:true, hide:true,
                    },
                {headerName: "Categoria",
                        field: "categoria",sort: 'asc', floatingFilter:true, 
                        flex:1, minWidth: 150,
                        rowGroup:true, hide:true
                    },
                {headerName: "Grupo", 
                        field: "grupo", floatingFilter:true,
                        minWidth: 150,maxWidth:150
                    },
                {headerName: "Subgrupo", 
                        field: "subgrupo", floatingFilter:true, sort: 'asc',
                        minWidth: 150, maxWidth: 150
                    },
                {headerName: "Producto", 
                    field: "producto", floatingFilter:true,
                    flex:1
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

            //Usa el ancho maximo disponible
            //domLayout: 'autoHeight', Esto quita la virtualizacion y los setFocus

            rowHeight: 50, // altura de las filas en píxeles
            headerHeight: 40, // altura del encabezado en píxeles
            rowBuffer: 10, // cantidad de filas adicionales para cargar en la vista
            // barra de grupos
            rowGroupPanelShow: 'always',
            //popupParent: document.body,
            rowSelection: 'single', // allow rows to be selected
            animateRows: true, // have rows animate to new positions when sorted


            // Esto permite los grupos sin que formen partes de la columnas
            groupDisplayType: 'groupRows',


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

                    clasesFila='cambioColor';
                    gridOptions.api.redrawRows();
                                        
                }
            },
            onCellValueChanged: (event) => {
                // Aquí va el código que se ejecutará cuando cambie el valor de una celda
                console.log('--------------------------------------------ON CELL VALUE CHANGED');
                
            },

            //getRowId: (params) => { return params.data.id; },

            
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

                return [{   tipo:       data.c1.toUpperCase(),
                            categoria:  data.c2.toUpperCase(),
                            grupo:      data.c3.toUpperCase(), 
                            subgrupo:   data.c4.toUpperCase(),
                            producto:   data.nom_producto!==undefined?data.nom_producto.toUpperCase():''}];
            

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
                //Descargamos las categorias con su id_subgrupo
                const data = await fetch('/categoriasAll')
                .then(response => response.json());
                //mediante un for vamos cargando fila por fila
                const filaSubgrupos = data;
                console.log(filaSubgrupos)
                for(i=0;i<filaSubgrupos.length;i++){
                    let newRow = datosAFilaGrid(filaSubgrupos[i]);
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
                    // carga los datos de data en los combos y textos de "Datos de clasificacion"
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

//------------------------------------------------------------------------------------Cargar Datos a DATOS DE CLASIFICACION

        async function cargarDatosDesdeSeleccion(data){
            
        }





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ OBTENER DATOS

        function obtenerDatos(){
            //Aun no se usa
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

                console.log(clasificacionTabla(data));
                
                //pinCarga('success');
            }catch(error){
                console.log('Error al obtener los clientes:', error);
                toast(error.message, "toastColorError");
                pinCarga('fallo');

            }

            
            

        });

        const listaIds=[];
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
                        filas.push({"c1":grupo.c1_name,"c2":grupo.c2_name,"c3":grupo.name,"c4":subgrupo.name,"id":subgrupo.id})    
                        listaIds.push(subgrupo.id)
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

            return filas
        }

          
          
    }
});


