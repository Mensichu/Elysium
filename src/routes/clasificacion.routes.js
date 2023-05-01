import {Router} from 'express'
import {createCategoriaPadre,createCategoriaHijo,getCategorias, getCategoriasTabla,getCategoriasAll} 
        from '../aSequelize/controllers/producto.controller/productcategory.controller'

const router = Router();


router.post('/categoriaPadre',createCategoriaPadre);

router.post('/categoriaHijo',createCategoriaHijo);

router.get('/categorias/:id',getCategorias);

router.get('/categorias',getCategoriasTabla);

router.get('/categoriasAll',getCategoriasAll);

export default router