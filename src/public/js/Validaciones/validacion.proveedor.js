const expresiones = {
    
    identificacion: /^[0-9]{10,15}$/, // Letras, numeros 
    proveedor: /^[a-zA-Z0-9À-ÿ\s\.\-\_\'\"]{1,200}$/, // Letras y espacios, pueden llevar acentos.
    representante: /^[a-zA-Z0-9À-ÿ\s]{1,200}$/, // Letras y espacios, pueden llevar acentos.
    cuenta_nombre: /^[a-zA-Z0-9À-ÿ\s\.\-\_\'\"]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    cuenta_numero: /^[a-zA-Z0-9À-ÿ\s\.\-\_\'\"]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    direccion: /^[a-zA-Z0-9À-ÿ\s\.\,\-\_\:]{1,100}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^[a-zA-Z0-9À-ÿ\s]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    observacion: /^[a-zA-Z0-9\ \.\-\n]{1,200}$/, // Letras, numeros 

}



//---------------------------------------------------------------VEHICULOS

        const idElementos =[
            "Datos-Identificacion",
            "Datos-Nom-Proveedor",
            "Datos-Representante",

            "Datos-Cuenta1-Nombre",
            "Datos-Cuenta1-Numero",
            "Datos-Cuenta2-Nombre",
            "Datos-Cuenta2-Numero",

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
            input.addEventListener('input',(e)=>{ validarProveedor(e.target) });
            input.addEventListener('keyup',(e)=>{ validarProveedor(e.target) });
            input.addEventListener('blur',(e)=> { validarProveedor(e.target) });
        });


        function validarProveedor(elemento){
            const tieneCuenta1 = !document.querySelector("#tieneCuenta1").checked;
            const tieneCuenta2 = !document.querySelector("#tieneCuenta2").checked;
            const c1Numero = document.querySelector('#Datos-Cuenta1-Numero').value;
            const c1Nombre = document.querySelector('#Datos-Cuenta1-Nombre').value;
            const c2Numero = document.querySelector('#Datos-Cuenta2-Numero').value;
            const c2Nombre = document.querySelector('#Datos-Cuenta2-Nombre').value;
            switch (elemento.name){
                
                case 'Identificacion':
                    return validarCampo(elemento,expresiones.identificacion);

                case 'Proveedor':
                    return validarCampo(elemento,expresiones.proveedor);

                case 'Representante':
                    return validarCampo(elemento,expresiones.representante);

                case 'Cuenta1-Nombre':
                    
                    if(!tieneCuenta1){
                        if(c1Nombre.length==0){
                            if(c1Numero.length==0){
                                return validarCampo(elemento,expresiones.cuenta_nombre)
                            }else{
                                validarElemento(elemento,true);
                                return true;
                            }
                        }
                        
                        return validarCampo(elemento,expresiones.cuenta_nombre)
                    }
                    return true;
                case 'Cuenta1-Numero':
                    if(!tieneCuenta1){
                        

                        if(c1Numero.length==0){
                            if(c1Nombre.length==0){
                                return validarCampo(elemento,expresiones.cuenta_numero)
                            }else{
                                validarElemento(elemento,true);
                                return true;
                            }
                        }
                        return validarCampo(elemento,expresiones.cuenta_numero)
                    }
                    return true;
                case 'Cuenta2-Nombre':
                    if(!tieneCuenta2){
                        

                        if(c2Nombre.length==0){
                            if(c2Numero.length==0){
                                return validarCampo(elemento,expresiones.cuenta_nombre)
                            }else{
                                validarElemento(elemento,true);
                                return true;
                            }
                        }
                        return validarCampo(elemento,expresiones.cuenta_nombre)
                    }
                    return true;
                case 'Cuenta2-Numero':
                    if(!tieneCuenta2){
                        

                        if(c2Numero.length==0){
                            if(c2Nombre.length==0){
                                return validarCampo(elemento,expresiones.cuenta_numero)
                            }else{
                                validarElemento(elemento,true);
                                return true;
                            }
                        }
                        return validarCampo(elemento,expresiones.cuenta_numero)
                    }
                    return true;

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
                if(elemento.name== 'Proveedor'){
                    if (elemento.value.length > 200) {
                        elemento.value = elemento.value.slice(0, 200);
                    }
                }
                //Nombres
                if(elemento.name== 'Representante'){
                    if (elemento.value.length > 200) {
                        elemento.value = elemento.value.slice(0, 200);
                    }
                }
                //Cuenta
                if(elemento.name== 'Cuenta1-Nombre' || elemento.name== 'Cuenta1-Numero' ||
                    elemento.name== 'Cuenta2-Nombre' || elemento.name== 'Cuenta2-Numero'){
                    if (elemento.value.length > 30) {
                        elemento.value = elemento.value.slice(0, 30);
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


        function validacionDatos(){
            let validado= true;
            let band =0;
            let mensaje ="";
            idElementos.forEach((idElemento)=>{
                let elemento = document.getElementById(idElemento);
                
                if(!validarProveedor(elemento,false)) {
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
/*
        function validacionDatos(){
            let validado= true;
            idElementos.forEach((idElemento)=>{
                let elemento = document.getElementById(idElemento);
                //Datos no requiere validar Alias para guardar o nuevo
                if(!validarProveedor(elemento)) {
                    toast("Ingrese correctamente el "+elemento.name+"!", "toastColorError");
                    validado = false;
                }

            });
            return validado;
        }
*/

        function validacionIdentificacion(){
            const identificacion = document.getElementById("Datos-Identificacion");
            return validarProveedor(identificacion);
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


