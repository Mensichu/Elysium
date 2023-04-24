const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{1,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    alias: /^[a-zA-Z0-9\ \_\-]{1,16}$/, // Letras, numeros, guion y guion_bajo
    modelo: /^[a-zA-Z0-9\ \_\-]{1,32}$/, // Letras, numeros, guion y guion_bajo
    ano: /^\d{4,6}$/, // 7 a 14 numeros.
    cilindraje: /^[0-9\,\.]{1,6}$/ ,
    capacidad: /^[0-9\,\.]{1,3}$/ ,

    placa: /^[a-zA-Z0-9]{1,10}$/, // Letras, numeros 
    color: /^[a-zA-Z0-9\#]{1,10}$/, // Letras, numeros, Numeral
    clave: /^[a-zA-Z0-9]{1,10}$/, // Letras, numeros
    observacion: /^[a-zA-Z0-9\ \.\-\n]{1,100}$/, // Letras, numeros 
    //observacion: /^(?:[a-zA-Z0-9.-]{1,50})?$/, // Letras, numeros 


}



//---------------------------------------------------------------VEHICULOS

        const idElementos =[
            "Datos-Placa",
            "Datos-Color1",
            "Datos-Color2",
            "Datos-Clave",
            "Datos-Obs"]


        const formulario = document.querySelector('#formulario');
        const inputs = document.querySelectorAll('.form-input');


        inputs.forEach((input)=>{
            input.addEventListener('input',(e)=>{ validarPlacas(e.target) });
            input.addEventListener('keyup',(e)=>{ validarPlacas(e.target) });
            input.addEventListener('blur',(e)=> { validarPlacas(e.target) });
        });


        function validarPlacas(elemento){
            
            switch (elemento.name){
                
                case 'Placa':
                    return validarCampo(elemento,expresiones.placa);

                case 'Color1':
                    return validarCampo(elemento,expresiones.color);

                case 'Color2':
                    return validarCampo(elemento,expresiones.color);

                case 'Clave':
                    const noTieneClave = document.querySelector("#Datos-NoClave").checked;
                    return noTieneClave?true:validarCampo(elemento,expresiones.clave);

                case 'Observacion':
                    const noTieneObs = document.querySelector("#Datos-NoObs").checked;
                    return noTieneObs?true:validarCampo(elemento,expresiones.observacion);

            }

        }

        function validarCampo(elemento,tipoDeDato){
            if(tipoDeDato.test(elemento.value)){
                //Placa
                if(elemento.name== 'Placa'){
                    if (elemento.value.length > 10) {
                        elemento.value = elemento.value.slice(0, 10);
                    }
                }
                //Color1
                if(elemento.name== 'Color1' || elemento.name== 'Color2'){
                    if (elemento.value.length > 10) {
                        elemento.value = elemento.value.slice(0, 10);
                    }
                }
                 
                //Clave
                if(elemento.name=='Clave'){
                        if (elemento.value.length > 10) {
                            elemento.value = elemento.value.slice(0, 10);
                        }
                }
                //Observacion
                if(elemento.name=='Observacion'){
                    if (elemento.value.length > 100) {
                        elemento.value = elemento.value.slice(0, 100);
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



        function validacionComboMarca(){
            //Combo Marca
            const comboMarca = document.getElementById('comboMarca');
            if(comboMarca.value == null || comboMarca.value.trim()=="0"){
                comboMarca.classList.add('is-invalid');
                comboMarca.classList.remove('is-valid');
                toast("Seleccione una marca!", "toastColorError");
                return false;
            }else{
                comboMarca.classList.add('is-valid');
                comboMarca.classList.remove('is-invalid');
                return true;
            }
        }

        function validacionComboModelo(){
            //Combo Modelo
            const comboModelo = document.getElementById('comboModelo');
            //Cuando una marca 
            if(comboModelo.value == null || comboModelo.value.trim()=="" || comboModelo.value.trim()=="0"){
                comboModelo.classList.add('is-invalid');
                comboModelo.classList.remove('is-valid');
                toast("Seleccione un modelo!", "toastColorError");
                return false;
            }else{
                comboModelo.classList.add('is-valid');
                comboModelo.classList.remove('is-invalid');
                return true;
            }
        }


        function validacionNuevo(){
            const val1 = validacionComboMarca();
            const val2= validacionComboModelo();
            const val3 = validacionDatos();
            const val4 = validacionPlaca();
            return val1&&val2&&val3&&val4;
        }


        function validacionDatos(){
            let validado= true;
            idElementos.forEach((idElemento)=>{
                let elemento = document.getElementById(idElemento);
                //Datos no requiere validar Alias para guardar o nuevo
                if(elemento.name!='Placa' && !validarPlacas(elemento)) {
                    toast("Ingrese correctamente el "+elemento.name+"!", "toastColorError");
                    validado = false;
                }

            });
            return validado;
        }


        function validacionPlaca(){
            const placa = document.getElementById("Datos-Placa");
            return validarPlacas(placa);
        }

        function validacionGuardar(){
            const val1 = validacionComboMarca();
            const val2= validacionComboModelo();
            const val3 = validacionDatos();
            return val1&&val2&&val3;
        }

        /*
        

        

        function validacionAlias(){
            const alias = document.getElementById("Datos-Alias");
            return validarVehiculos(alias);
        }

        function validacionNomAuto(){
            const modelo = document.getElementById("Datos-Modelo");
            return validarVehiculos(modelo);
        }

        

        
        */
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

