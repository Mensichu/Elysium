import {Router} from 'express'
import {createRelacionPA,deleteRelacionPA,
        getProductosRelacion,getAutosRelacion,
        getProductoRelacionById,getAutoRelacionById} from '../aSequelize/controllers/relacion.controller/relacionPA.controller'

const router = Router();

//router.get('/comboColor',getComboColor);

router.post('/createRelacionPA',createRelacionPA)

router.delete('/deleteRelacionPA/:id',deleteRelacionPA)

router.get('/productosRelacion',getProductosRelacion)

router.get('/autosRelacion',getAutosRelacion)

router.get('/productoRelacionById/:id',getProductoRelacionById)

router.get('/autoRelacionById/:id',getAutoRelacionById)

export default router