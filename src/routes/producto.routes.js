import {Router} from 'express'
import {createProducto,updateProducto,createSeccion,getProducto,getProductos,getComboSeccion} from '../aSequelize/controllers/producto.controller/producto.controller'

const router = Router();

router.get('/productosTabla',getProductos);

router.get('/producto/:id',getProducto);

router.get('/comboSeccion',getComboSeccion);

router.post('/producto',createProducto);

router.put('/producto/:id',updateProducto);

router.post('/seccion',createSeccion);


export default router