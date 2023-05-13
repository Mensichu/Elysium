import {Router} from 'express'
import {createProveedor,updateProveedor,getProveedor,getTablaProveedores,getProveedoresRepetidos,
    getComboProveedor} from '../aSequelize/controllers/pedido.controller/proveedor.controller'

const router = Router();

router.post('/proveedor',createProveedor);

router.put('/proveedor/:id',updateProveedor);

router.get('/proveedor/:id',getProveedor);

router.get('/tablaProveedores',getTablaProveedores)

router.get('/comboProveedor',getComboProveedor)

router.get('/proveedoresRepetidos',getProveedoresRepetidos);



export default router