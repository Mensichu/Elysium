

//import Toastify from 'toastify-js';
//Vehiculos
//Al instante

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
        function cargarComboMarca(id){
            // Hace una llamada AJAX a la ruta '/productsa' para obtener la lista de marcas de vehículos
        $.ajax({
            url: '/comboMarca',
            method: 'GET',
            success: function(data) {
            // Almacena la lista de marcas de vehículos en un objeto en el archivo 'vehiculos.js'
            var marcas = data;

            console.log("Numero de marcas en el combo marca: "+marcas.length); // Imprime la lista de marcas de vehículos en la consola
            //Creamos el elemento temporal
            const fragmento = document.createDocumentFragment();
            for(i=0;i<marcas.length;i++){
                //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                const item = document.createElement("OPTION");
                item.innerHTML = marcas[i].Marca;
                item.value =marcas[i].Id;
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

            },
            error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error al obtener la lista de marcas de vehículos:', textStatus, errorThrown);
            }
        });
        }
        

        //Combo Modelo
        //Funcion solo cuando hubo un cambio en el comboMarca
        let comboMarcaSelecc= 0;
        comboMarca.addEventListener('click',(e)=>{
            cambioComboMarca();
            //console.log("Hiciste click en el combo marca!");
            
        });

        //Actualizamos combo Modelo
        function cambioComboMarca(){
            if(comboMarcaSelecc!=comboMarca.value){
                //console.log("Cambio");
                $.ajax({
                    url: '/comboModelo/'+comboMarca.value,
                    method: 'GET',
                    async:false,
                    success: function(data) {
                    // Almacena la lista de Modelos en un objeto en el archivo 'vehiculos.js'
                    var modelos = data;
        
                    //console.log("Numero de modelos en el combo modelo: "+modelos.length); // Imprime la lista de marcas de vehículos en la consola
                    
                    //Creamos el elemento temporal
                    const fragmento = document.createDocumentFragment();
                    for(i=0;i<modelos.length;i++){
                        //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                        const item = document.createElement("OPTION");
                        item.innerHTML = modelos[i].Modelo;
                        item.value =modelos[i].Id;
                        fragmento.appendChild(item);//Se utiliza fragmento para ahorrar el consumo en memoria
                    }
                    //Vaciamos el combo primero
                    for(i=comboModelo.options.length-1;i>=0;i--){
                        comboModelo.remove(i);
                    }
                    //Se agrega al combobox comboModelo
                    comboModelo.appendChild(fragmento);
                    //console.log("Termine de actualizar combomodelo!");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error al obtener la lista de marcas de vehículos:', textStatus, errorThrown);
                    }
                });    

            }
            comboMarcaSelecc= comboMarca.value;
            
        }

        //------------------------------ TABLA ModeloS

        const tablaModelos = document.getElementById("tablaModelos");
        cargarTablaModelos(0);
        function cargarTablaModelos(id){
            // Hace una llamada AJAX a la ruta '/tablaModelos' para obtener la lista de Modelos y sus marcas
            $.ajax({
                url: '/tablaModelos',
                method: 'GET',
                success: function(data) {
                // Almacena la lista de marcas de vehículos en un objeto en el archivo 'vehiculos.js'
                var Modelos = data;

                //console.log("Numeros de Modelos en la tabla: "+Modelos.length); // Imprime la lista de marcas de vehículos en la consola
                //Creamos el elemento temporal
                const fragmento = document.createDocumentFragment();
                for(i=0;i<Modelos.length;i++){
                    //Creamos la etiqueta option con su value y texto de cada marca al combobox de marcas
                    const item1 = document.createElement("TH");item1.innerHTML =Modelos[i].Marca;//item1.scope="row";
                    const item2 = document.createElement("TD");item2.innerHTML =Modelos[i].Modelo; 
                    const item3 = document.createElement("TD");item3.innerHTML =Modelos[i].Año;
                    const item4 = document.createElement("TD");item4.innerHTML =Modelos[i].Cilindraje;
                    const item5 = document.createElement("TD");item5.innerHTML =Modelos[i].Combustible?"DIESEL":"GAS";

                    const itemTR = document.createElement("TR");
                    itemTR.id=Modelos[i].Id;
                    itemTR.appendChild(item1);
                    itemTR.appendChild(item2);
                    itemTR.appendChild(item3);
                    itemTR.appendChild(item4);
                    itemTR.appendChild(item5);
                    itemTR.style.backgroundColor = '#ADB5BD';//Pone fondo gris a las filas
                    if(id!=0 && id == itemTR.id){
                        itemTR.classList.add('table-info');
                        itemTR.classList.add('cambio-tamaño');
                    }
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
                if(id!=0 && false){
                    // Cambia la fila a color Verde
                    filaSeleccionada.classList.remove('table-info');
                    filaSeleccionada.classList.add('cambioColor');
                    setTimeout(() => {
                        filaSeleccionada.classList.remove('cambioColor');
                        filaSeleccionada.classList.add('table-info');
                    }, 1200);
                }



                console.log("Termine de cargar tabla Modelos")
                },
                error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error al obtener la lista de marcas de vehículos:', textStatus, errorThrown);
                }
                
            });
        }




        tablaModelos.addEventListener('click',(e)=>{

            const idModeloSeleccionado = e.target.parentNode.id;
            console.log("'"+idModeloSeleccionado+"'");
            if(idModeloSeleccionado != null && idModeloSeleccionado!=''){
                idSeleccionar(idModeloSeleccionado);
                seleccionTabla(idModeloSeleccionado);
            }
        });
        
        //Animacion de mouse en tabla

        tablaModelos.addEventListener('mouseover',(e)=>{
            filaMouse = e.target.parentNode;
            filaMouse.classList.add("cambio-tamaño");

        });
        tablaModelos.addEventListener('mouseout',(e)=>{
            filaMouse = e.target.parentNode;
            if(!filaMouse.classList.contains("table-info"))filaMouse.classList.remove("cambio-tamaño");

        });



        let filaSeleccionada = tablaModelos.querySelector(".table-info");

        function idSeleccionar(id){
            //Primero removemos el table info de cada uno
            const hijos = tablaModelos.querySelectorAll(".table-info");
            //hijos es un vector en este caso de un elemento
            //mediante este foreach removera a cada elemento la clase table-info(seleccion)
            hijos.forEach(function(hijo){
                hijo.classList.remove("table-info");
                hijo.style.color = '#000000';
                hijo.classList.remove("cambio-tamaño");
            });
            filaSeleccionada = document.getElementById(id);
            if (filaSeleccionada.tagName==="TR"){
                filaSeleccionada.classList.add("table-info")
                filaSeleccionada.classList.add("cambio-tamaño");
                filaSeleccionada.style.color = '';
            };
        }


        function seleccionTabla(id){
            $.ajax({
                url: '/Modelo/'+id,
                method: 'GET',
                success: function(data) {
                console.log("Comenzo seleccion tabla")
                // Almacena los datos del modelo en un objeto en el archivo 'vehiculos.js'
                
                var modelo = data[0];
                
                //console.log("data seleccionado (debe ser 1): "+data.length);
                
                //Cargamos los datos en Datos del modelo
                //ComboMarca es un elemento tipo select que almacena varios elementos tipo option
                //console.log(comboMarca.options[comboMarca.selectedIndex].innerHTML);
                for(i=0;i<comboMarca.children.length;i++){
                    if(comboMarca.children[i].value == modelo.Marca){
                        //console.log(comboMarca.children[i].innerHTML)
                        comboMarca.selectedIndex=i;
                        cambioComboMarca();//Esto actualiza el combomodelo
                    }
                }

                for(i=0;i<comboModelo.children.length;i++){
                    if(comboModelo.children[i].value == modelo.Id){
                        //console.log(comboModelo.children[i].innerHTML)
                        comboModelo.selectedIndex=i;
                        
                    }
                }
                document.getElementById("Datos-Modelo").value=modelo.Modelo;
                document.getElementById("Datos-Alias").value=modelo.Alias;
                document.getElementById("Datos-Año").value=modelo.Año;
                document.getElementById("Datos-Cilindraje").value=modelo.Cilindraje;
                //Selecciona si es a Gas o Diesel
                var gasSeleccion = document.getElementById('btnradio1');
                var dieselSeleccion = document.getElementById('btnradio2');
                gasSeleccion.checked = !modelo.Combustible;
                dieselSeleccion.checked = modelo.Combustible;

                document.getElementById("Datos-CMotor").value=modelo.Consumo_Motor;
                document.getElementById("Datos-CCaja").value=modelo.Consumo_Caja;
                
                },
                error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error al obtener la lista de marcas de vehículos:', textStatus, errorThrown);
                }
            });
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
            if(e.target.parentNode.id=="fondo")cerrarModals();
        });






        //cerrar Modal1 al hacer clic externo
        modal1.addEventListener('click', (e)=>{
            console.log(e.target.parentNode)
            if(e.target.parentNode.id=="fondo")cerrarModals();
        });




        //cerrar Modal2 al hacer clic externo
        modal2.addEventListener('click', (e)=>{
            console.log(e.target.parentNode)
            if(e.target.parentNode.id=="fondo")cerrarModals();
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
            nuevaMarca();
            
        });

        cancelarMarca1.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });
        cancelarMarca2.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });

        function nuevaMarca(){
            console.log('Hola');
            // Guarda la marca texto para enviar como array data
            const data = {
                Marca: document.getElementById('textoNuevaMarca').value
            };
            //Una vez que tenemos el texto de nueva Marca, las enviamos mediante un httpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `/nuevaMarca`);
            // Agrega los encabezados necesarios si es necesario
            xhr.setRequestHeader('Content-Type', 'application/json');
            
            xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log("Me llego el id generado: "+response.id);
                //cargarlo en el combobox sin hacer una consulta extra
                //cargarComboMarca(response.id);
                //idSeleccionar(response.id)
                data.idMarca= response.id;
                nuevaMarcaCombo(data)
            } else {
                console.log('Error al modificar la marca');
            }
            };
            
            xhr.send(JSON.stringify(data));
			// Cerrar el cuadro modal
			cerrarModals();
            
        };

        const btnGuardarAliasMarca = document.getElementById('btn-GuardarAlias');

        btnGuardarAliasMarca.addEventListener('click', (e)=>{
            modificarAliasMarca();
        });

        function modificarAliasMarca() {
			// Recojemos el Alias de la Marca
            const data = obtenerDatos();
            console.log(data);
            //Una vez que tenemos el alias actual de la marca, las enviamos mediante un httpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', `/modificarAliasMarca/${data.Marca}`);
            // Agrega los encabezados necesarios si es necesario
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {
            if (xhr.status === 200) {
                //Una vez confirmado de parte del servidor
                const response = JSON.parse(xhr.responseText);
                //Enviamos los datos y retornan como la filaModificada (tr)
                //const filaModificada = datosAFila(data);
                //Enviamos a actualizar la fila existente mediante su id
                //actualizarFilaTabla(filaModificada);
                console.log(response);
            } else {
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
            if(filaSeleccionada != null && filaSeleccionada!='' && !validacion()){
                ejecutarAnimacion(abrirModal1,1);
                //abrirModal1();
            }else{

            }
            
        });

        confirmarGuardar.addEventListener('click',(e)=>{
            e.preventDefault();
            modificarModelo();
            
        });

        cancelarGuardar1.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });
        cancelarGuardar2.addEventListener('click',(e)=>{
            e.preventDefault();
            cerrarModals();
            
        });

        
        function modificarModelo() {
			// Recojemos los datos de: 'Datos del Modelo'
            const data = obtenerDatos();
            console.log(data);
            //Una vez que tenemos los datos del carro actuales, las enviamos mediante un httpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', `/modificarModelo/${data.Id}`);
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
            } else {
                console.log('Error al modificar el modelo');
            }
            };
            //Se envia los datos que se recogio de 'Datos de Modelo'
            xhr.send(JSON.stringify(data));
			// Cerrar el cuadro modal al finalizar la modificacion
			cerrarModals();
		}


        //---------------------------------------------- NUEVO modelo

        

        const nuevoBtn = document.getElementById("btn-Nuevo");
        const confirmarNuevo = document.getElementById("confirmarNuevo");
        const cancelarNuevo1 = document.getElementById("cancelarNuevo1");
        const cancelarNuevo2 = document.getElementById("cancelarNuevo2");


        nuevoBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(!validacion())ejecutarAnimacion(abrirModal2,2);
            //abrirModal2();
        });

        confirmarNuevo.addEventListener('click',(e)=>{
            e.preventDefault();
            nuevoModelo();
            
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
            // Recojemos los datos de: 'Datos del Modelo'
            const data = obtenerDatos();
            console.log(data);
            //Una vez que tenemos los datos del nuevo modelo, las enviamos mediante un httpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `/nuevoModelo`);
            // Agrega los encabezados necesarios si es necesario
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                //cargarTablaModelos(response.id);
                //Enviamos los datos y retornan como la filaNueva (tr)
                const filaNueva = datosAFila(data);
                //Enviamos esta fila tr a la tabla y la ubica de forma alfabetica
                nuevaFilaTabla(filaNueva);
                //seleccionTabla(response.id);
                console.log("Me llego el id generado: "+response.id);
                //idSeleccionar(response.id)
            } else {
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
        
        
        function obtenerFilaSeleccion(){
            const filaSeleccionada = document.querySelector('.table-info');
            if(filaSeleccionada != null){
                console.log("fila Seleccionada");
                console.log(filaSeleccionada.id);
                return filaSeleccionada;
            }
            return null;
        }

        function vaciarSeleccion(){
            const filas = document.querySelectorAll(".table-info");
            filas.forEach(function(fila){
                fila.classList.remove("table-info");
                fila.style.color = '#000000';
                fila.classList.remove("cambio-tamaño");
            });
            filaSeleccionada =null;

        }


        function nuevaMarcaCombo(marcaNueva){
            const nuevaMarcaOption = document.createElement("OPTION");
            nuevaMarcaOption.textContent = marcaNueva.Marca;
            nuevaMarcaOption.value =marcaNueva.idMarca;
            console.log("Marca: "+marcaNueva.idMarca)

            for (let i = 1; i < comboMarca.options.length; i++) {
                console.log('fila: '+i);
                const option = comboMarca.options[i];

                if (option.textContent.toUpperCase() >= nuevaMarcaOption.textContent.toUpperCase()) {
                    console.log(nuevaMarcaOption);
                    console.log(option);
                    comboMarca.insertBefore(nuevaMarcaOption, option);
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
            const item1 = document.createElement("TH");item1.textContent = data.MarcaNombre;
            const item2 = document.createElement("TD");item2.textContent = data.Modelo; 
            const item3 = document.createElement("TD");item3.textContent = data.Año;
            const item4 = document.createElement("TD");item4.textContent = data.Cilindraje;
            const item5 = document.createElement("TD");item5.textContent = data.Combustible?"DIESEL":"GAS";

            const itemTR = document.createElement("TR");
            itemTR.id=data.Id;
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
                Id: (filaSeleccionada!==null)?filaSeleccionada.id:0,// si es que el idSeleccionado no existe
                Marca: document.getElementById('comboMarca').value,
                MarcaNombre: comboMarca.options[comboMarca.selectedIndex].text,
                Modelo: document.getElementById('Datos-Modelo').value,
                Alias: document.getElementById("Datos-Alias").value,
                Año: document.getElementById("Datos-Año").value,
                Cilindraje: document.getElementById("Datos-Cilindraje").value,
                Consumo_Motor: document.getElementById("Datos-CMotor").value,
                Consumo_Caja: document.getElementById("Datos-CCaja").value,
                Combustible: document.getElementById('btnradio2').checked
              };

              return data;
        }


        function validacion(){
            const Datos = obtenerDatos();
            const valido = true;
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

        function animacionFilaAgregada(nuevaFila){

                // Cambia la fila a color Verde
                vaciarSeleccion();
                nuevaFila.classList.add('cambioColor');
                nuevaFila.style.color= '#ffffff';
                setTimeout(() => {
                    nuevaFila.classList.remove('cambioColor');
                    
                    nuevaFila.classList.add('table-info');
                }, 1200);

        }



        

        const btnPrueba = document.getElementById('btnPrueba');

        btnPrueba.addEventListener('click',(e)=>{
            //validacion();
            // crea un mensaje emergente
            Toastify({
                text: "Este es un mensaje emergente",
                duration: 3000, // duración en milisegundos
                gravity: "bottom", // posición en pantalla (top, bottom, left, right)
                position: "center", // alineación del mensaje (center, left, right)
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // color de fondo
                }).showToast();
        });


    }




});



