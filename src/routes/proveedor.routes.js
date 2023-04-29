import {Router} from 'express'
import {createProveedor,updateProveedor,getProveedor,getTablaProveedores,getProveedoresRepetidos} from '../aSequelize/controllers/pedido.controller/proveedor.controller'

const router = Router();

router.post('/proveedor',createProveedor);

router.put('/proveedor/:id',updateProveedor);

router.get('/proveedor/:id',getProveedor);

router.get('/proveedores',getTablaProveedores)

router.get('/proveedoresRepetidos',getProveedoresRepetidos);

export default router