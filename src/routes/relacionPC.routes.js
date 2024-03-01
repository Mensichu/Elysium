import {Router} from 'express'
import {createRelacionPC,deleteRelacionPC,
    getClientesRelacion,getPlacasRelacion,getClienteRelacionById,getPlacaRelacionById} from '../aSequelize/controllers/relacion.controller/relacionPC.controller'

const router = Router();

//router.get('/comboColor',getComboColor);

router.post('/createRelacionPC',createRelacionPC)

router.delete('/deleteRelacionPC/:id',deleteRelacionPC)

router.get('/clientesRelacion',getClientesRelacion)

router.get('/placasRelacion',getPlacasRelacion)

router.get('/clienteRelacionById/:id',getClienteRelacionById)

router.get('/placaRelacionById/:id',getPlacaRelacionById)

export default router