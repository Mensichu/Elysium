

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
                    item.innerHTML = marcas[i].nom_marca;
                    item.value =marcas[i].id;
                    fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                }
    
                //Vaciamos el combo primero
                for(i=comboMarca.options.length-1;i>=0;i--){
                    comboMarca.remove(i);
                }
    
                //Se agrega al combobox comboMarca
                comboMarca.appendChild(fragmento);
                console.log("El i que envio es: "+id)
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
            if(conectado())cambioComboMarca();
            //console.log("Hiciste click en el combo marca!");
            
        });

        //Actualizamos combo Modelo
        async function cambioComboMarca(){
            if(comboMarcaSelecc!=comboMarca.value){
                try{
                    console.log('llega a cambioComboMarca(): '+comboMarca.value);                
                        console.log("Cambio");
                        const data = await fetch('/comboAutos/'+comboMarca.value)
                        .then(response => response.json());

                        // Almacena la lista de Modelos en un objeto en el archivo 'vehiculos.js'
                        var modelos = data;
                        //console.log(data)
                        //console.log("Numero de modelos en el combo modelo: "+modelos.length); // Imprime la lista de marcas de vehículos en la consola
                        
                        //Creamos el elemento temporal
                        const fragmento = document.createDocumentFragment();
                        for(i=0;i<modelos.length;i++){
                            //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                            const item = document.createElement("OPTION");
                            item.innerHTML = modelos[i].nom_auto;
                            item.value =modelos[i].id;
                            fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                        }
                        //Vaciamos el combo primero
                        for(i=comboModelo.options.length-1;i>=0;i--){
                            comboModelo.remove(i);
                        }
                        //Se agrega al combobox comboModelo
                        comboModelo.appendChild(fragmento);
                        //console.log("Termine de actualizar combomodelo!");
                        
                    
                        comboMarcaSelecc= comboMarca.value;
                
                }catch(error){
                    console.log('Error al obtener comboModelo:', error);
                }
            }else{
                console.log('no cambio de marca,no hay necesidad de actualizar el combo modelo')
            }
            console.log('termine cambioComboMarca()')
            
            
            
            
        }

        //------------------------------ TABLA ModeloS

        const tablaModelos = document.getElementById("tablaModelos");
        cargarTablaModelos();
        async function cargarTablaModelos(){
            try{
                // Hace una llamada AJAX a la ruta '/tablaModelos' para obtener la lista de Modelos y sus marcas
                const data = await fetch('/tablaAutos')
                .then(response => response.json());
                // Almacena la lista de marcas de vehículos en un objeto en el archivo 'vehiculos.js'
                var Modelos = data;
                console.log(data)
                //console.log("Numeros de Modelos en la tabla: "+Modelos.length); // Imprime la lista de marcas de vehículos en la consola
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<Modelos.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                    const item1 = document.createElement("TH");item1.innerHTML =Modelos[i].Marca.nom_marca;//item1.scope="row";
                    const item2 = document.createElement("TD");item2.innerHTML =Modelos[i].nom_auto; 
                    const item3 = document.createElement("TD");item3.innerHTML =Modelos[i].ano;
                    const item4 = document.createElement("TD");item4.innerHTML =Modelos[i].cilindraje;
                    const item5 = document.createElement("TD");item5.innerHTML =Modelos[i].combustible?"DIESEL":"GAS";

                    const itemTR = document.createElement("TR");
                    itemTR.id=Modelos[i].id;
                    itemTR.appendChild(item1);
                    itemTR.appendChild(item2);
                    itemTR.appendChild(item3);
                    itemTR.appendChild(item4);
                    itemTR.appendChild(item5);
                    itemTR.style.backgroundColor = '#ADB5BD';//Pone fondo gris a las filas

                    fragmento.appendChild(itemTR);

                }
                //Se agrega a la tabla Modelos
                // Obtiene una lista de todos los nodos hijos del elemento padre
                var nodosHijos = tablaModelos.childNodes;
                
                // Recorre la lista de nodos hijos y elimina cada nodo hijo de uno en uno
                for (var i = nodosHijos.length - 1; i >= 0; i--) {
                    tablaModelos.removeChild(nodosHijos[i]);
                }

                tablaModelos.appendChild(fragmento);

                const filaSeleccionada = tablaModelos.querySelector(".table-info");
                
                console.log("Termine de cargar tabla Modelos")
            }catch(error){
                console.log('Error al obtener el auto:', error);
            }
            
                
                
            
        }




        tablaModelos.addEventListener('click',(e)=>{
            //Solo ejecuta si esta conectado a internet
            if(conectado()){
                const idModeloSeleccionado = e.target.parentNode.id;
                console.log("id auto: '"+idModeloSeleccionado+"'");
                if(idModeloSeleccionado != null && idModeloSeleccionado!=''){
                    idSeleccionar(idModeloSeleccionado);
                    seleccionTabla(idModeloSeleccionado);
                }
            }
        });
        
        



        let filaSeleccionada = tablaModelos.querySelector(".table-info");

        function idSeleccionar(id){
            //Primero removemos el table info de cada uno
            const hijos = tablaModelos.querySelectorAll(".table-info");
            //hijos es un vector en este caso de un elemento
            //mediante este foreach removera a cada elemento la clase table-info(seleccion)
            hijos.forEach(function(hijo){
                hijo.classList.remove("table-info");
                hijo.classList.remove("cambio-tamaño");
            });
            filaSeleccionada = document.getElementById(id);
            if (filaSeleccionada.tagName==="TR"){
                filaSeleccionada.classList.add("table-info")
                filaSeleccionada.classList.add("cambio-tamaño");
            };
        }

        function obtenerFilaSeleccion(){
            const filaSeleccionada = document.querySelector('.table-info');
            if(filaSeleccionada != null){
                console.log("fila Seleccionada");
                console.log(filaSeleccionada.id);
                return filaSeleccionada;
            }
            return null;
        }


        async function seleccionTabla(id) {
            try{
                const data = await fetch('/auto/'+id)
                .then(response => response.json());

                console.log("Comenzo seleccionTabla()")
                // carga los datos de data en los combos y textos de "Datos del Modelo"
                await cargarDatosDesdeSeleccion(data);
                console.log('termino seleccionTabla()')
                
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
        document.getElementById("Datos-Modelo").value=modelo.nom_auto;
        document.getElementById("Datos-Alias").value=modelo.Marca.alias;
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
                await cambioComboMarca();//Esto actualiza el combomodelo
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
                console.log('exito');
                break;
                
            }
        }
    }

//--------------------------------------------- Modales

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
            console.log(e.target.parentNode)
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
                nom_marca: document.getElementById('textoNuevaMarca').value
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

        function nuevaMarca2(){
            // Guarda la marca texto para enviar como array data
            const data = {
                nom_marca: document.getElementById('textoNuevaMarca').value
            };
            //Una vez que tenemos el texto de nueva Marca, las enviamos mediante un httpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `/marca`);
            // Agrega los encabezados necesarios si es necesario
            xhr.setRequestHeader('Content-Type', 'application/json');
            
            xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log("Me llego el id generado: "+response.id);
                data.id= response.id;
                nuevaMarcaCombo(data)
                toast("Marca agregado", "toastColorSuccess");
            } else {
                toast("Error con el servidor", "toastColorError");
                console.log('Error al modificar la marca');
            }
            };
            
            xhr.send(JSON.stringify(data));
			// Cerrar el cuadro modal
			cerrarModals();
            
        };

        const btnGuardarAliasMarca = document.getElementById('btn-GuardarAlias');

        btnGuardarAliasMarca.addEventListener('click', (e)=>{
            //Alias
            const alias = document.getElementById("Datos-Alias");
            if(!conectado() ||alias.value==null || alias.value.trim()==""){
                alias.classList.add('is-invalid');
                alias.classList.remove('is-valid');
                //toast
                toast("Llene el campo alias", "toastColorError");
            }else{
                alias.classList.add('is-valid');
                alias.classList.remove('is-invalid');
                
                modificarAliasMarca();
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

        function modificarAliasMarca2() {
			// Recojemos el Alias de la Marca
            const data = obtenerDatos();
            console.log(data);
            //Una vez que tenemos el alias actual de la marca, las enviamos mediante un httpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', `/marcaAlias/${data.id_marca}`);
            // Agrega los encabezados necesarios si es necesario
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {
            if (xhr.status === 200) {
                //Una vez confirmado de parte del servidor
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                toast("Alias de marca actualizado", "toastColorSuccess");
            } else {
                toast("Error con el servidor", "toastColorError");
                console.log('Error al modificar el alias de la marca');
            }
            };
            //Se envia los datos que se recogio de 'Datos de Modelo'
            xhr.send(JSON.stringify(data));
			// Cerrar el cuadro modal al finalizar la modificacion
			cerrarModals();
		}
//---------------------------------------------- MODIFICAR modelo

        

        const guardarBtn = document.getElementById("btn-Guardar");
        const confirmarGuardar = document.getElementById("confirmarGuardar");
        const cancelarGuardar1 = document.getElementById("cancelarGuardar1");
        const cancelarGuardar2 = document.getElementById("cancelarGuardar2");



        guardarBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(filaSeleccionada != null && filaSeleccionada!=''){
                if(validacion()){
                    ejecutarAnimacion(abrirModal1,1);
                }else{
                    //toast
                    toast("Llene todos los campos en rojo!", "toastColorError");
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
            .then(res =>{
                const filaModificada = datosAFila(data);
                actualizarFilaTabla(filaModificada);
                toast("Modelo guardado", "toastColorSuccess");
                cerrarModals();
            }).catch(error =>{
                console.log(error)
                toast("Error con el servidor", "toastColorError");
            });
        }
        
        function modificarModelo2() {
            try{
                // Recojemos los datos de: 'Datos del Modelo'
                const data = obtenerDatos();
                console.log(data);
                //Una vez que tenemos los datos del carro actuales, las enviamos mediante un httpRequest
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', `/auto/${data.id}`);
                // Agrega los encabezados necesarios si es necesario
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onload = function() {
                if (xhr.status === 200) {
                    //Una vez confirmado de parte del servidor
                    const response = JSON.parse(xhr.responseText);
                    //Enviamos los datos y retornan como la filaModificada (tr)
                    const filaModificada = datosAFila(data);
                    //Enviamos a actualizar la fila existente mediante su id
                    actualizarFilaTabla(filaModificada);
                    console.log(response);
                    toast("Modelo guardado", "toastColorSuccess");
                } else {
                    toast("Error con el servidor", "toastColorError");
                    console.log('Error al modificar el modelo');
                }
                };
                //Se envia los datos que se recogio de 'Datos de Modelo'
                xhr.send(JSON.stringify(data));
                // Cerrar el cuadro modal al finalizar la modificacion
                cerrarModals();
            }catch(error){
                toast("Error con el servidor", "toastColorError");
            }
			
			
		}


        //---------------------------------------------- NUEVO modelo

        

        const nuevoBtn = document.getElementById("btn-Nuevo");
        const confirmarNuevo = document.getElementById("confirmarNuevo");
        const cancelarNuevo1 = document.getElementById("cancelarNuevo1");
        const cancelarNuevo2 = document.getElementById("cancelarNuevo2");


        nuevoBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(validacion()){
                ejecutarAnimacion(abrirModal2,2)
            }else{
                //toast
                toast("Llene todos los campos en rojo!", "toastColorError");
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
                const filaNueva = datosAFila(data);
                nuevaFilaTabla(filaNueva);
                toast("Modelo agregado", "toastColorSuccess");
                cerrarModals();
            }).catch(error =>{
                console.log(error)
                toast("Error con el servidor", "toastColorError");
            })
        }

        function nuevoModelo2(){
            // Recojemos los datos de: 'Datos del Modelo'
            const data = obtenerDatos();
            console.log(data);
            //Una vez que tenemos los datos del nuevo modelo, las enviamos mediante un httpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `/auto`);
            // Agrega los encabezados necesarios si es necesario
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response)
                //Enviamos los datos y retornan como la filaNueva (tr)
                data.id = response.id
                const filaNueva = datosAFila(data);
                //Enviamos esta fila tr a la tabla y la ubica de forma alfabetica
                nuevaFilaTabla(filaNueva);
                //seleccionTabla(response.id);
                console.log("Me llego el id generado: "+response.id);
                toast("Modelo agregado", "toastColorSuccess");
            } else {
                toast("Error con el servidor", "toastColorError");
                console.log('Error al agregar nuevo modelo');
            }
            };
            
            xhr.send(JSON.stringify(data));
			// Cerrar el cuadro modal
			cerrarModals();
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
        
        
        

        function vaciarSeleccion(){
            const filas = document.querySelectorAll(".table-info");
            filas.forEach(function(fila){
                fila.classList.remove("table-info");
                fila.classList.remove("cambio-tamaño");
            });
            filaSeleccionada =null;

        }


        function nuevaMarcaCombo(marcaNueva){
            const nuevaMarcaOption = document.createElement("OPTION");
            nuevaMarcaOption.textContent = marcaNueva.nom_marca;
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

        function nuevaFilaTabla(filaNueva){
            const tabla = document.getElementById("table");//obtiene la tabla con id table
            const tbody = tabla.getElementsByTagName("tbody")[0];//obtiene el tbody contenido en table
            const filas = tbody.getElementsByTagName("tr");//devuelve un vector de filas tr
            for (let i = 0; i < filas.length; i++) {
                console.log('fila: '+i);
                //Marca
                let marcaTabla = filas[i].getElementsByTagName("th")[0].innerText;
                let marcaNuevo = filaNueva.getElementsByTagName("th")[0].innerText;
                //Modelo
                let modeloTabla = filas[i].getElementsByTagName("td")[0].innerText;
                let modeloNuevo = filaNueva.getElementsByTagName("td")[0].innerText;

                if (marcaTabla.toUpperCase() >= marcaNuevo.toUpperCase()) {
                    console.log('marca');
                    if(modeloTabla.toUpperCase() >= modeloNuevo.toUpperCase()){
                        console.log('modelo');
                        tbody.insertBefore(filaNueva, filas[i]);
                        break;
                    }
                }
            }
        }


        function actualizarFilaTabla(filaActualizada){
            const tabla = document.getElementById("table");//obtiene la tabla con id table
            const tbody = tabla.getElementsByTagName("tbody")[0];//obtiene el tbody contenido en table
            const filas = tbody.getElementsByTagName("tr");//devuelve un vector de filas tr
            for (let i = 0; i < filas.length; i++) {
                let idFila = filas[i].id;
                if(idFila == filaActualizada.id){
                    console.log("id Fila: "+idFila);
                    filas[i].childNodes[0].textContent='';
                    filas[i].childNodes[0].textContent=filaActualizada.childNodes[0].textContent;
                    filas[i].childNodes[1].textContent=filaActualizada.childNodes[1].textContent;
                    filas[i].childNodes[2].textContent=filaActualizada.childNodes[2].textContent;
                    filas[i].childNodes[3].textContent=filaActualizada.childNodes[3].textContent;
                    filas[i].childNodes[4].textContent=filaActualizada.childNodes[4].textContent;
                    return true;
                }                
            }
            return false;

        }


        function datosAFila(data){
            const item1 = document.createElement("TH");item1.textContent = data.Marca.nom_marca;
            const item2 = document.createElement("TD");item2.textContent = data.nom_auto; 
            const item3 = document.createElement("TD");item3.textContent = data.ano;
            const item4 = document.createElement("TD");item4.textContent = data.cilindraje;
            const item5 = document.createElement("TD");item5.textContent = data.combustible?"DIESEL":"GAS";

            const itemTR = document.createElement("TR");
            itemTR.id=data.id;
            itemTR.appendChild(item1);
            itemTR.appendChild(item2);
            itemTR.appendChild(item3);
            itemTR.appendChild(item4);
            itemTR.appendChild(item5);
            return itemTR;
        }


        function obtenerDatos(){
            const comboMarca = document.getElementById('comboMarca');
            const data = {
                id: (filaSeleccionada!==null)?filaSeleccionada.id:0,// si es que el idSeleccionado no existe
                id_marca: document.getElementById('comboMarca').value,
                Marca: {nom_marca: comboMarca.options[comboMarca.selectedIndex].text},
                nom_auto: document.getElementById('Datos-Modelo').value,
                alias: document.getElementById("Datos-Alias").value,
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



        function validacion(){
            const Datos = obtenerDatos();
            let valido = true;
            console.log(Datos);
            //Combo Marca
            const comboMarca = document.getElementById('comboMarca');
            if(comboMarca.value == null || comboMarca.value.trim()=="0"){
                comboMarca.classList.add('is-invalid');
                comboMarca.classList.remove('is-valid');
                valido = false
            }else{
                comboMarca.classList.add('is-valid');
                comboMarca.classList.remove('is-invalid');
            }
            //Alias
            const alias = document.getElementById("Datos-Alias");
            if(alias.value==null || alias.value.trim()==""){
                alias.classList.add('is-invalid');
                alias.classList.remove('is-valid');
                valido = false
            }else{
                alias.classList.add('is-valid');
                alias.classList.remove('is-invalid');
            }
            //Combo Modelo
            const comboModelo = document.getElementById('comboModelo');
            if(comboModelo.value == null || comboModelo.value.trim()=="0"){
                comboModelo.classList.add('is-invalid');
                comboModelo.classList.remove('is-valid');
                //toast("Campo combo modelo no valido", "toastColorError");
                valido = false
            }else{
                comboModelo.classList.add('is-valid');
                comboModelo.classList.remove('is-invalid');
            }
            //Modelo
            const modelo = document.getElementById("Datos-Modelo");
            if(modelo.value==null || modelo.value.trim()==""){
                modelo.classList.add('is-invalid');
                modelo.classList.remove('is-valid');
                valido = false
            }else{
                modelo.classList.add('is-valid');
                modelo.classList.remove('is-invalid');
            }
            //Modelo
            const año = document.getElementById("Datos-Año");
            if(año.value==null || año.value.trim()=="" || año.value< 1900 || año.value> 2050){
                año.classList.add('is-invalid');
                año.classList.remove('is-valid');                
                valido = false
            }else{
                año.classList.add('is-valid');
                año.classList.remove('is-invalid');
            }
            //Cilindraje
            const cilindraje = document.getElementById("Datos-Cilindraje");
            if(cilindraje.value==null || cilindraje.value.trim()=="" || cilindraje.value< 0.0 || cilindraje.value> 10){
                cilindraje.classList.add('is-invalid');
                cilindraje.classList.remove('is-valid');
                valido = false
            }else{
                cilindraje.classList.add('is-valid');
                cilindraje.classList.remove('is-invalid');
            }
            //capacidad Motor
            const capacidadMotor = document.getElementById("Datos-CMotor");
            if(capacidadMotor.value==null || capacidadMotor.value.trim()=="" || capacidadMotor.value< 0 || capacidadMotor.value> 20){
                capacidadMotor.classList.add('is-invalid');
                capacidadMotor.classList.remove('is-valid');
                valido = false
            }else{
                capacidadMotor.classList.add('is-valid');
                capacidadMotor.classList.remove('is-invalid');
            }
            //capacidad Motor
            const capacidadCaja = document.getElementById("Datos-CCaja");
            if(capacidadCaja.value==null || capacidadCaja.value.trim()=="" || capacidadCaja.value< 0 || capacidadCaja.value> 20){
                capacidadCaja.classList.add('is-invalid');
                capacidadCaja.classList.remove('is-valid');
                valido = false
            }else{
                capacidadCaja.classList.add('is-valid');
                capacidadCaja.classList.remove('is-invalid');
            }

            return valido;
        }


//---------------------------------------------------Se agrega un observador a la tabla:

        // Seleccionar la tabla a observar
        const tabla = document.getElementById("table");

        // Crear un observador de mutaciones
        var observador = new MutationObserver(function(mutaciones) {
            //foreach
            mutaciones.forEach(function(mutacion) {
                //Muestra el tipo de observacion y el nombre de la etiqueta que activo la observacion EJ: th tr td
                //console.log('NodeName Tipo :: '+mutacion.target.nodeName+' '+mutacion.type);
                // si el tipo de observacion es de childList
                if(mutacion.type === "childList"){
                    // Verificar si se ha agregado una fila a la tabla
                    if (mutacion.addedNodes.length > 0) {
                        // Obtenemos las filas agregada para este caso solo uno [0] 
                        let nuevaFila = mutacion.addedNodes[0];
                        //console.log('nuevaFila')
                        // Como este se encarga unicamente de detectar filas nuevas detectara elementos TR
                        if (nuevaFila.nodeName === "TR") {
                            console.log("Se ha agregado la siguiente fila a la tabla:", nuevaFila);
                            //Ejectua la animacion mandandole la nuevaFila (tr)
                            animacionFilaAgregada(nuevaFila);
                        }
                    }
                    
                    // Verificar si se ha modificado una fila en la tabla
                    // Obtener la fila que se modifico mediante target
                    let modificadaFila = mutacion.target;
                    // Si este elemento es tipo th
                    if (modificadaFila.nodeName === "TH") {
                        // si la observacion es de tipo TH quiere decir que fue por una modificacion
                        console.log("Se ha modificado la siguiente fila a la tabla:", modificadaFila);
                        animacionFilaAgregada(modificadaFila.parentNode);
                    }
                    

                }
                

            });
        });

        // Configurar el observador para que observe cambios en el cuerpo de la tabla
        var opcionesObservador = { characterData: true, childList: true, subtree: true };
        observador.observe(tabla.getElementsByTagName("tbody")[0], opcionesObservador);


//-------------------------------------------------------fin del observador


//----------------------------------------------ANIMACIONES


        //Animacion de mouse en tabla

        tablaModelos.addEventListener('mouseover',(e)=>{
            filaMouse = e.target.parentNode;
            filaMouse.classList.add("cambio-tamaño");

        });
        tablaModelos.addEventListener('mouseout',(e)=>{
            filaMouse = e.target.parentNode;
            if(!filaMouse.classList.contains("table-info"))filaMouse.classList.remove("cambio-tamaño");

        });

        //Animacion al agregar filas

        function animacionFilaAgregada(nuevaFila){

                // Cambia la fila a color Verde
                vaciarSeleccion();
                nuevaFila.classList.add('cambioColor');
                setTimeout(() => {
                    nuevaFila.classList.remove('cambioColor');
                    
                    nuevaFila.classList.add('table-info');
                }, 1200);

        }

       

        async function validarCedula(identidad) {
            console.log('entre')
            const url = 'https://srienlinea.sri.gob.ec/verificador-de-identidad/rest/validarIdentidad';
            const data = {
              tipoIdentificacion: 'R',
              identificacion: identidad,
              codigoPais: '593',
            };
            const response = await fetch(url, {
              method: 'POST',
              //mode: 'no-cors',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + 'MDkwMTY5MzQ3MzAwMToyMjIyTFVKQw=='
              },
              body: JSON.stringify(data),
            });
            console.log(response);
            const result = await response.json();
            return result;
          }
        

        const btnPrueba = document.getElementById('btnPrueba');

        btnPrueba.addEventListener('click',(e)=>{
            console.log('voy')
            const estado= validarCedula('0901693473001');
            console.log(estado)
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

    }




});



