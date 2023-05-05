const expresiones = {
    
    identificacion: /^[0-9]{10,15}$/, // Letras, numeros 
    apellidos: /^[a-zA-Z0-9À-ÿ\s\.\-\_\'\"]{1,200}$/, // Letras y espacios, pueden llevar acentos.
    nombres: /^[a-zA-Z0-9À-ÿ\s]{1,200}$/, // Letras y espacios, pueden llevar acentos.
    direccion: /^[a-zA-Z0-9À-ÿ\s\.\,\-\_\:]{1,100}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^[a-zA-Z0-9À-ÿ\s]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    //password: /^.{4,12}$/, // 4 a 12 digitos.
    observacion: /^[a-zA-Z0-9\ \.\-\n]{1,200}$/, // Letras, numeros 


}



//---------------------------------------------------------------CLIENTES

        const idElementos =[
            "Datos-Identificacion",
            "Datos-Apellidos",
            "Datos-Nombres",
            "Datos-Direccion",
            "Datos-Correo",
            "Datos-Telefono1",
            "Datos-Telefono2",
            "Datos-Telefono3",
            "Datos-Obs",
        ]


        const formulario = document.querySelector('#formulario');
        const inputs = document.querySelectorAll('.form-input');


        inputs.forEach((input)=>{
            input.addEventListener('input',(e)=>{ validarClients(e.target) });
            input.addEventListener('keyup',(e)=>{ validarClients(e.target) });
            input.addEventListener('blur',(e)=> { validarClients(e.target) });
        });


        function validarClients(elemento){
            
            switch (elemento.name){
                
                case 'Identificacion':
                    return validarCampo(elemento,expresiones.identificacion);

                case 'Apellidos':
                    return validarCampo(elemento,expresiones.apellidos);

                case 'Nombres':
                    const noEmpresa = document.querySelector("#Datos-NoEmpresa").checked;
                    return noEmpresa?true:validarCampo(elemento,expresiones.nombres);

                case 'Direccion':
                    const tieneDireccion = !document.querySelector("#tieneDireccion").checked;
                    return tieneDireccion?true:validarCampo(elemento,expresiones.direccion);

                case 'Correo':
                    const tieneCorreo = !document.querySelector("#tieneCorreo").checked;
                    return tieneCorreo?true:validarCampo(elemento,expresiones.correo);

                case 'Telefono1':
                    const tieneTelef1 = !document.querySelector("#tieneTelefono1").checked;
                    return tieneTelef1?true:validarCampo(elemento,expresiones.telefono);
                
                case 'Telefono2':
                    const tieneTelef2 = !document.querySelector("#tieneTelefono2").checked;
                    return tieneTelef2?true:validarCampo(elemento,expresiones.telefono);
                
                case 'Telefono3':
                    const tieneTelef3 = !document.querySelector("#tieneTelefono3").checked;
                    return tieneTelef3?true:validarCampo(elemento,expresiones.telefono);

                case 'Observacion':
                    const noTieneObs = document.querySelector("#Datos-NoObs").checked;
                    return noTieneObs?true:validarCampo(elemento,expresiones.observacion);

            }

        }

        function validarCampo(elemento,tipoDeDato){
            if(tipoDeDato.test(elemento.value)){
                //Identificacion
                if(elemento.name== 'Identificacion'){
                    if (elemento.value.length > 13) {
                        elemento.value = elemento.value.slice(0, 13);
                    }
                }
                //Apellidos
                if(elemento.name== 'Apellidos'){
                    if (elemento.value.length > 200) {
                        elemento.value = elemento.value.slice(0, 200);
                    }
                }
                //Nombres
                if(elemento.name== 'Nombres'){
                    if (elemento.value.length > 200) {
                        elemento.value = elemento.value.slice(0, 200);
                    }
                }
                //Telefonos
                if(elemento.name== 'Telefono1' || elemento.name== 'Telefono2' || elemento.name== 'Telefono3'){
                    if (elemento.value.length > 30) {
                        elemento.value = elemento.value.slice(0, 30);
                    }
                }
                //Correo
                if(elemento.name== 'Correo'){
                    if (elemento.value.length > 100) {
                        elemento.value = elemento.value.slice(0, 100);
                    }
                }
                //Direccion
                if(elemento.name== 'Direccion'){
                    if (elemento.value.length > 100) {
                        elemento.value = elemento.value.slice(0, 100);
                    }
                }
                //Observacion
                if(elemento.name=='Observacion'){
                    if (elemento.value.length > 100) {
                        elemento.value = elemento.value.slice(0, 200);
                    }
                }
                validarElemento(elemento,true);
                return true;
            }else{
                validarElemento(elemento,false);
                return false;
            }
        }

        function validarElemento(elemento,valido){
            if(valido){
                elemento.classList.remove('is-invalid');
                elemento.classList.add('is-valid');
                elemento.parentNode.classList.remove('is-invalid');
                elemento.parentNode.classList.add('is-valid');
            }else{
                elemento.classList.add('is-invalid');
                elemento.classList.remove('is-valid');
                elemento.parentNode.classList.add('is-invalid');
                elemento.parentNode.classList.remove('is-valid');
            }
        }

        function validacionComboTipo(){
            //Combo Tipo
            const comboTipo = document.getElementById('comboTipo');
            if(comboTipo.value == null || comboTipo.value.trim()=="0"){
                comboTipo.classList.add('is-invalid');
                comboTipo.classList.remove('is-valid');
                toast("Seleccione un tipo!", "toastColorError");
                return false;
            }else{
                comboTipo.classList.add('is-valid');
                comboTipo.classList.remove('is-invalid');
                return true;
            }
        }


        function validacionNuevo(){
            const val1 = validacionComboTipo();
            const val2 = validacionDatos();
            const val3 = validacionIdentificacion();
            return val1&&val2&&val3;
        }

        /*
        function validacionDatos(){
            let validado= true;
            idElementos.forEach((idElemento)=>{
                let elemento = document.getElementById(idElemento);
                //Datos no requiere validar Identificacion para guardar o nuevo
                if(elemento.name!='Identificacion' && !validarClients(elemento)) {
                    toast("Ingrese correctamente el "+elemento.name+"!", "toastColorError");
                    validado = false;
                }

            });
            return validado;
        }
        */
       
        function validacionDatos(){
            let validado= true;
            let band =0;
            let mensaje ="";
            idElementos.forEach((idElemento)=>{
                let elemento = document.getElementById(idElemento);
                
                if(elemento.name!='Identificacion' && !validarClients(elemento)) {
                    mensaje = mensaje +' - '+elemento.name+''
                    band=1;
                }
        
            });
            if(band==1){
                toast("Ingrese correctamente los sgts. campos: \n"+mensaje+"!", "toastColorError");
                validado = false;
                band=0;
            }
            return validado;
        }


        function validacionIdentificacion(){
            const identificacion = document.getElementById("Datos-Identificacion");
            return validarClients(identificacion);
        }

        
        function validacionGuardar(){
            const val1 = validacionComboTipo();
            const val2 = validacionDatos();
            return val1&&val2;
        }


        function validacionVaciar(){
            const invalidClass = document.querySelectorAll('.is-invalid');
            const validClass = document.querySelectorAll('.is-valid')

            invalidClass.forEach((invalid)=>{
                invalid.classList.remove('is-invalid');
            });

            validClass.forEach((valid)=>{
                valid.classList.remove('is-valid');
            });
        }


