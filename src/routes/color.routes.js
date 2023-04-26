import {Router} from 'express'
import {getComboColor, createColor} from '../aSequelize/controllers/auto.controller/color.controller'

const router = Router();

router.get('/comboColor',getComboColor);

router.post('/color',createColor);

export default router