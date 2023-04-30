import {Router} from 'express'
import {createCategoriaPadre,createCategoriaHijo,getCategorias} 
        from '../aSequelize/controllers/producto.controller/productcategory.controller'

const router = Router();


router.post('/categoriaPadre',createCategoriaPadre);

router.post('/categoriaHijo',createCategoriaHijo);

router.get('/categorias/:id',getCategorias);

export default router