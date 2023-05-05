import {Router} from 'express'
import {createProducto,updateProducto,createSeccion,getProducto,getComboProductos,getProductoSubgrupo,getProductos,getComboSeccion} from '../aSequelize/controllers/producto.controller/producto.controller'

const router = Router();

router.get('/productosTabla',getProductos);

router.get('/producto/:id',getProducto);

router.get('/productoSubgrupo',getProductoSubgrupo);

router.get('/comboProductos/:id',getComboProductos);

router.get('/comboSeccion',getComboSeccion);

router.post('/producto',createProducto);

router.put('/producto/:id',updateProducto);

router.post('/seccion',createSeccion);


export default router