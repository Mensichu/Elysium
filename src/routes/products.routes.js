
import {Router} from 'express';

import {createNewProduct, deleteProductById, getComboMarca, getComboModeloById, getModeloById, 
    getTablaModelos, updateModeloById, createNewModelo,createNewMarca, updateAliasMarca,
    getCountProducts, getProductById, getProducts, updateProductById} from '../controllers/products.controller'

const path = require('path');

const router = Router();


router.get('/', (req,res)=>{
    //res.sendFile(path.resolve(__dirname,'../public/index.html'));
    res.render('links/add');

});

router.get('/agentes', (req,res)=>{
    res.render('links/agentes');
});

router.get('/vehiculos', (req,res)=>{
    res.render('links/vehiculos');
    //console.log(req.nav);
});

router.get('/vehiculos/placas', (req,res)=>{
    res.render('links/placas');
    //console.log(req.nav);
});

router.get('/vehiculos/autos', (req,res)=>{
    res.render('links/autos');
    //console.log(req.nav);
});

router.get('/pagos', (req,res)=>{
    res.render('links/pagos');
    //console.log(req.nav);
});

router.get('/products', getProducts);

router.post('/products', createNewProduct);

router.get('/products/count', getCountProducts);

router.get('/products/:id', getProductById);

router.delete('/products/:id', deleteProductById);

router.put('/products/:id', updateProductById);


console.log("Products.routes");


//-------------------------ComboMarca

router.get('/comboMarca', getComboMarca);

//-------------------------ComboModelo

router.get('/comboModelo/:id', getComboModeloById);


//-------------------------Tabla de Modelos

router.get('/tablaModelos/', getTablaModelos);

//-------------------------Seleccion de un modelo en Tabla de Modelos

router.get('/modelo/:id', getModeloById);

//-------------------------Modificar un Modelo

router.put('/modificarModelo/:id', updateModeloById);

//--------------------------Crear nuevo Modelo

router.post('/nuevoModelo', createNewModelo);

//--------------------------Crear nueva Marca

router.post('/nuevaMarca', createNewMarca);

//--------------------------Crear nueva Marca

router.put('/modificarAliasMarca/:id', updateAliasMarca);


export default router;