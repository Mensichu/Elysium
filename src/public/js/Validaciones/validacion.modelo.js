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
    capacidad: /^[0-9\,\.]{1,3}$/ 
}



//---------------------------------------------------------------VEHICULOS

        const idElementos =[
            "Datos-Alias",
            "Datos-Modelo",
            "Datos-Año",
            "Datos-Cilindraje",
            "Datos-CMotor",
            "Datos-CCaja"]


        const formulario = document.querySelector('#formulario');
        const inputs = document.querySelectorAll('.form-input');


        inputs.forEach((input)=>{
            input.addEventListener('input',(e)=>{ validarVehiculos(e.target) });
            input.addEventListener('keyup',(e)=>{ validarVehiculos(e.target) });
            input.addEventListener('blur',(e)=> { validarVehiculos(e.target) });
        });


        function validarVehiculos(elemento){
            
            switch (elemento.name){
                case 'Alias':
                    return validarCampo(elemento,expresiones.alias);
                    
                case 'Modelo':
                    return validarCampo(elemento,expresiones.modelo);

                case 'Año':
                    return validarCampo(elemento,expresiones.ano);

                case 'Cilindraje':
                    return validarCampo(elemento,expresiones.cilindraje);

                case 'CapMotor':
                    return validarCampo(elemento,expresiones.capacidad);

                case 'CapCaja':
                    return validarCampo(elemento,expresiones.capacidad);

            }

        }

        function validarCampo(elemento,tipoDeDato){
            if(tipoDeDato.test(elemento.value)){
                //Año
                if(elemento.name== 'Año'){
                    if (elemento.value.length > 4) {
                        elemento.value = elemento.value.slice(0, 4);
                    }
                    let num = parseFloat(elemento.value);                    
                    if(num<1900 || num>2050){
                        validarElemento(elemento,false);
                        return false;
                    }
                }
                //Cilindraje
                if(elemento.name== 'Cilindraje'){
                    if (elemento.value.length > 4) {
                        elemento.value = elemento.value.slice(0, 4);
                    }
                    let num = parseFloat(elemento.value);
                    if(num<0 || num>10){
                        validarElemento(elemento,false);
                        return false;
                    }
                }
                //Capacidad
                if(elemento.name=='CapMotor' || elemento.name=='CapCaja'){
                    if (elemento.value.length > 2) {
                        elemento.value = elemento.value.slice(0, 2);
                    }
                    let num = parseFloat(elemento.value);
                    if(num<0 || num>20){
                        validarElemento(elemento,false);
                        return false;
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

        function validacionGuardar(){
            return validacionComboMarca() && 
                    validacionComboModelo() && 
                    validacionDatos()
        }

        function validacionNuevo(){
            const val1 = validacionComboMarca();
            const val2 = validacionNomAuto();
            const val3 = validacionDatos();
            return val1 && val2 && val3;
        }

        function validacionAlias(){
            const alias = document.getElementById("Datos-Alias");
            return validarVehiculos(alias);
        }

        function validacionNomAuto(){
            const modelo = document.getElementById("Datos-Modelo");
            return validarVehiculos(modelo);
        }

        function validacionComboMarca(){
            //Combo Marca
            const comboMarca = document.getElementById('comboMarca');
            if(comboMarca.value == null || comboMarca.value.trim()=="0"){
                comboMarca.classList.add('is-invalid');
                comboMarca.classList.remove('is-valid');
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
            if(comboModelo.value == null || comboModelo.value.trim()=="0"){
                comboModelo.classList.add('is-invalid');
                comboModelo.classList.remove('is-valid');
                //toast("Campo combo modelo no valido", "toastColorError");
                return false;
            }else{
                comboModelo.classList.add('is-valid');
                comboModelo.classList.remove('is-invalid');
                return true;
            }
        }

        function validacionDatos(){
            let validado= true;
            idElementos.forEach((idElemento)=>{
                let elemento = document.getElementById(idElemento);
                //Datos no requiere validar Alias para guardar o nuevo
                if(elemento.name!='Alias' && elemento.name!='Modelo' && !validarVehiculos(elemento)) {
                    toast("Ingrese correctamente el "+elemento.name+"!", "toastColorError");
                    validado = false;
                }

            });
            return validado;
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


