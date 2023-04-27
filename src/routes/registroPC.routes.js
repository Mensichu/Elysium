import {Router} from 'express'
import {createRegistro,getRegistro} from '../aSequelize/controllers/registroPC.controller'

const router = Router();

//router.get('/comboColor',getComboColor);

router.get('/registroPC',getRegistro)

router.post('/registroPC',createRegistro)


export default router