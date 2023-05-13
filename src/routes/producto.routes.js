import {Router} from 'express'
import {createProducto,updateProducto,createSeccion,getProducto,getComboProductos,getProductoSubgrupo,getTablaProductos,getComboSeccion} from '../aSequelize/controllers/producto.controller/producto.controller'

const router = Router();

router.post('/producto',createProducto);

router.put('/producto/:id',updateProducto);

router.get('/tablaProductos',getTablaProductos);

router.get('/producto/:id',getProducto);

router.get('/comboProductos/:id',getComboProductos);

router.get('/comboSeccion',getComboSeccion);

router.post('/seccion',createSeccion);

//router.get('/productoSubgrupo',getProductoSubgrupo);

export default router