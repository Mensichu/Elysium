const expresiones = {
    
    string30: /^[a-zA-Z0-9À-ÿ\s\,\.\-\_\'\"]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    nombre: /^[a-zA-Z0-9À-ÿ\s\/\.\-\_\'\"]{1,200}$/, // Letras y espacios, pueden llevar acentos.
    flotante: /^[0-9\,\.]{1,7}$/ ,
    porcentaje: /^[0-9]{1,3}$/ ,
    observacion: /^[a-zA-Z0-9\ \.\-\n]{1,200}$/, // Letras, numeros 

}



//---------------------------------------------------------------VEHICULOS

const idElementos =[
    "Datos-Marca",
    "Datos-Nom-Producto",
    "Datos-Nom-Impresion",
    "Datos-CostoSinIva",
    "Datos-Iva",
    "Datos-CostoConIva",
    "Datos-G1",
    "Datos-Pvp1",
    "Datos-G2",
    "Datos-Pvp2",
    "Datos-G3",
    "Datos-Pvp3",
    "Datos-Cantidad",
    "Datos-Minimo",
    "Datos-Cod1",
    "Datos-Cod2",
    "Datos-Cod3",
    "Datos-Obs",
]


const formulario = document.querySelector('#formulario');
const inputs = document.querySelectorAll('.form-input');


inputs.forEach((input)=>{
    input.addEventListener('input',(e)=>{ validarProducto(e.target,true) });
    input.addEventListener('keyup',(e)=>{ validarProducto(e.target,true) });
    input.addEventListener('blur',(e)=> { validarProducto(e.target,true) });
});


function validarProducto(elemento,cambiaPvp){
    switch (elemento.name){
        
        case 'Marca':
            if (elemento.value.length > 30) {
                elemento.value = elemento.value.slice(0, 30);
            }
            return validarCampo(elemento,expresiones.string30);

        case 'NomProducto':
            if (elemento.value.length > 200) {
                elemento.value = elemento.value.slice(0, 200);
            }
            return validarCampo(elemento,expresiones.nombre);

        case 'NomImpresion':
            if (elemento.value.length > 200) {
                elemento.value = elemento.value.slice(0, 200);
            }
            return validarCampo(elemento,expresiones.nombre);
        
        case 'CostoSinIva':
            if (elemento.value.length > 6) {//Valida que no exceda el length
                elemento.value = elemento.value.slice(0, 6);
            }
            return validarCampo(elemento,expresiones.flotante,cambiaPvp);
        
        case 'Iva':
            if (elemento.value.length > 6) {//Valida que no exceda el length
                elemento.value = elemento.value.slice(0, 6);
            }
            return validarCampo(elemento,expresiones.flotante);
        
        case 'CostoConIva':
            if (elemento.value.length > 6) {//Valida que no exceda el length
                elemento.value = elemento.value.slice(0, 6);
            }
            return validarCampo(elemento,expresiones.flotante,cambiaPvp);
        
        case 'Pvp1':
            return validarCampo(elemento,expresiones.flotante);

        case 'Pvp2':
            return validarCampo(elemento,expresiones.flotante);
                
        case 'Pvp3':
            return validarCampo(elemento,expresiones.flotante);
        
        case 'G1':
            if (elemento.value.length > 3) {//Cortamos antes de validar
                elemento.value = elemento.value.slice(0, 3);
            }
            return validarCampo(elemento,expresiones.porcentaje,cambiaPvp);
        
        case 'G2':
            if (elemento.value.length > 3) {//Cortamos antes de validar
                elemento.value = elemento.value.slice(0, 3);
            }
            return validarCampo(elemento,expresiones.porcentaje,cambiaPvp);
        
        case 'G3':
            if (elemento.value.length > 3) {//Cortamos antes de validar
                elemento.value = elemento.value.slice(0, 3);
            }
            return validarCampo(elemento,expresiones.porcentaje,cambiaPvp);

        case 'Cantidad':
            return validarCampo(elemento,expresiones.flotante);
        
        case 'Minimo':
            return validarCampo(elemento,expresiones.flotante);
        
        case 'Cod1':
            if (elemento.value.length > 30) {
                elemento.value = elemento.value.slice(0, 30);
            }
            return validarCampo(elemento,expresiones.string30,cambiaPvp);
        case 'Cod2':
            if (elemento.value.length > 30) {
                elemento.value = elemento.value.slice(0, 30);
            }
            return validarCampo(elemento,expresiones.string30);
        case 'Cod3':
            if (elemento.value.length > 30) {
                elemento.value = elemento.value.slice(0, 30);
            }
            return validarCampo(elemento,expresiones.string30);


        case 'Observacion':
            const noTieneObs = document.querySelector("#Datos-NoObs").checked;
            return noTieneObs?true:validarCampo(elemento,expresiones.observacion);

    }

}

function validarCampo(elemento,tipoDeDato,cambiaPvp){
    if(tipoDeDato.test(elemento.value)){
        //Marca
        if(elemento.name== 'Marca'){
            //nada
        }
        //Producto
        if(elemento.name== 'NomProducto'){
            //nada
        }
        //Impresion
        if(elemento.name== 'NomImpresion'){
            //nada
        }
        //CostoSinIva
        if(elemento.name== 'CostoSinIva'){
            if(cambiaPvp)cambiaCostoSinIva();
            if(!comprobarNumDosDecimales(elemento)){
                return false;
            }
        }
        //Iva
        if(elemento.name== 'Iva'){
            if(!comprobarNumDosDecimales(elemento)){
                return false;
            }
        }
        //CostoConIva
        if(elemento.name== 'CostoConIva'){
            if(cambiaPvp)cambiaCostoConIva();
            if(!comprobarNumDosDecimales(elemento)){
                return false;
            }
        }
        //Pvp1
        if(elemento.name== 'Pvp1'){
            if(!comprobarNumDosDecimales(elemento)){
                return false;
            }
        }
        //Pvp2
        if(elemento.name== 'Pvp2'){
            if(!comprobarNumDosDecimales(elemento)){
                return false;
            }
        }
        //Pvp3
        if(elemento.name== 'Pvp3'){
            if(!comprobarNumDosDecimales(elemento)){
                return false;
            }
        }
        //G1
        if(elemento.name== 'G1'){
            if(cambiaPvp)cambiaG1();
            if(!comprobarPorcentaje(elemento)){
                return false;
            }

        }
        //G2
        if(elemento.name== 'G2'){
            if(cambiaPvp)cambiaG();
            if(!comprobarPorcentaje(elemento)){
                return false;
            }

        }
        //G3
        if(elemento.name== 'G3'){
            if(cambiaPvp)cambiaG();
            if(!comprobarPorcentaje(elemento)){
                return false;
            }

        }
        //Cantidad
        if(elemento.name== 'Cantidad'){
            if(!comprobarNumDosDecimales(elemento)){
                return false;
            }
        }
        //Minimo
        if(elemento.name== 'Minimo'){
            if(!comprobarNumDosDecimales(elemento)){
                return false;
            }
        }
        if(elemento.name=='Cod1'||elemento.name=='Cod2'||elemento.name== 'Cod3'){
            //nada
        }
        if(elemento.name=='Cod1'){
            if(cambiaPvp)cambiaCod1();
        }
        //Observacion
        if(elemento.name=='Observacion'){
            if (elemento.value.length > 200) {
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

//Agrega el icono de valido y no valido
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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++VALIDACION COMBOS

const comboProveedor = document.getElementById('comboProveedor');
const comboSubgrupo = document.getElementById('comboSubgrupo');
const comboSeccion = document.getElementById('comboSeccion');
function validacionCombos(){
    const val1 = validacionCombo(comboProveedor,'un proveedor');
    const val2 = validacionCombo(comboSubgrupo,'un subgrupo');
    const val3 = validacionCombo(comboSeccion,'una seccion');
    return val1&&val2&&val3
}
function validacionCombo(combo,nombre){
    //Combo 
    if(combo.value == null || combo.value.trim()=="0"){
        combo.classList.add('is-invalid');
        combo.classList.remove('is-valid');
        toast("Seleccione "+nombre+"!", "toastColorError");
        return false;
    }else{
        combo.classList.add('is-valid');
        combo.classList.remove('is-invalid');
        return true;
    }
}


function validacionNuevo(){
    const val1 = validacionCombos();
    const val2 = validacionDatos();
    return val1&&val2;
}


function validacionDatos(){
    let validado= true;
    let band =0;
    let mensaje ="";
    idElementos.forEach((idElemento)=>{
        let elemento = document.getElementById(idElemento);
        
        if(!validarProducto(elemento,false)) {
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


function validacionGuardar(){
    const val1 = validacionCombos();
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


        


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MATEMATICAS HIJO


function comprobarNumDosDecimales(elemento){
    //Verficia que sea un numero
    const valor = parseFloat(elemento.value);
    if (isNaN(valor)) {
        // Si el valor no es un número válido, no hacemos nada
        return false;
    }
    //Redondeamos hacia abajo, para evitar incrementos al corregir
    const valorConDosDecimales = (Math.floor(valor*100)/100).toFixed(2);
    //Valida que sea 45.00 y no 45.000000
    const posicionDelPunto = elemento.value.indexOf('.');
    if (posicionDelPunto >= 0) {
        if(elemento.value.substring(posicionDelPunto + 1).length>2){
            elemento.value = valorConDosDecimales;
        }
    }
    //Si no hubo problemas retorna true
    return true;
}



function comprobarPorcentaje(elemento){
    //Verficia que sea un numero
    const valor = parseFloat(elemento.value);
    if (isNaN(valor)) {
        // Si el valor no es un número válido, no hacemos nada
        return false;
    }
    
    return true;
}



const costoSinIvaInput = document.getElementById('Datos-CostoSinIva');
const IvaInput = document.getElementById('Datos-Iva');
const costoConIvaInput = document.getElementById('Datos-CostoConIva');
const G1Input = document.getElementById('Datos-G1');
const G2Input = document.getElementById('Datos-G2');
const G3Input = document.getElementById('Datos-G3');
const pvp1Input = document.getElementById('Datos-Pvp1');
const pvp2Input = document.getElementById('Datos-Pvp2');
const pvp3Input = document.getElementById('Datos-Pvp3');

const cod1 = document.getElementById('Datos-Cod1');
const cod2 = document.getElementById('Datos-Cod2');
const cod3 = document.getElementById('Datos-Cod3');

function cambiaCostoSinIva(){
    //Calculo de iva y subtotalConIva
    const subtotalSinIva = parseFloat(costoSinIvaInput.value)
    const iva = 0.12*subtotalSinIva;
    const subtotalConIva = (subtotalSinIva+iva).toFixed(2)
        //Value
        IvaInput.value = iva.toFixed(2);
        costoConIvaInput.value=  subtotalConIva;
    //Calculamos el pvp
    calculoPVP(subtotalConIva);
    
}

function cambiaCostoConIva(){
    //Calculo de iva y subtotalSinIva
    const subtotalConIva = parseFloat(costoConIvaInput.value).toFixed(2)
    const subtotalSinIva = (subtotalConIva/1.12).toFixed(2)
    const iva = subtotalConIva-subtotalSinIva;
        //Value
        IvaInput.value = iva.toFixed(2);
        costoSinIvaInput.value=  subtotalSinIva;
    //Calculamos el pvp
    calculoPVP(subtotalConIva);
    
}


function cambiaG1(){
    G2Input.value=G1Input.value;
    G3Input.value=G1Input.value;
    cambiaG();
}

function cambiaG(){
    const subtotalConIva = parseFloat(costoConIvaInput.value).toFixed(2)
    calculoPVP(subtotalConIva);
}


function cambiaCod1(){
    cod2.value= cod1.value;
    cod3.value= cod1.value;
}

function calculoPVP(subtotalConIva){
    //Calculo de pvp1
    const g1 = parseFloat(G1Input.value)
    const pvp1 = subtotalConIva*(1+(g1/100))
        //Value
        pvp1Input.value = redondearA5o0(pvp1).toFixed(2);
        //Corrige a dos decimales si es necesario
        comprobarNumDosDecimales(pvp1Input);
    //Calculo de pvp2
    const g2 = parseFloat(G2Input.value)
    const pvp2 = subtotalConIva*(1+(g2/100))
        //Value
        pvp2Input.value = redondearA5o0(pvp2).toFixed(2);
    //Calculo de pvp3
    const g3 = parseFloat(G3Input.value)
    const pvp3 = subtotalConIva*(1+(g3/100))
        //Value
        pvp3Input.value = pvp3.toFixed(2);
}

function redondearA5o0(numero) {
    let numeroMultiplicado = Math.round(numero*2*100);
    let numeroRedondeado = Math.round(numeroMultiplicado / 10) * 10;
    return numeroRedondeado / (2*100);
}