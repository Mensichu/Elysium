import {Router} from 'express'
import {getPlacas,getComboAutosInfo,createPlaca,getTablaPlacas,getPlacasRepetidas,getPlacaById,updatePlaca, getPlacaByData} from '../aSequelize/controllers/placa.controller'

const router = Router();


//Marca
//router.get('/marcas',);


//router.get('/placas',getPlacas); no se usa aparentemente

router.get('/comboAutosInfo/:id',getComboAutosInfo)

router.post('/placa',createPlaca);

router.get('/tablaPlacas',getTablaPlacas);

router.get('/placasRepetidas',getPlacasRepetidas);

router.get('/placaByData/:id',getPlacaByData);

router.get('/placa/:id',getPlacaById);

router.put('/placa/:id',updatePlaca);

export default router