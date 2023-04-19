import {Router} from 'express'
import {getPlacas} from '../aSequelize/controllers/placa.controller'

const router = Router();


//Marca
//router.get('/marcas',);


router.get('/placas',getPlacas);



export default router