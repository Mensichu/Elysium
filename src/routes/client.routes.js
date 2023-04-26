import {Router} from 'express'
import {createClient,updateClient,getClient,getTablaClients,getComboTipos} from '../aSequelize/controllers/client.controller'

const router = Router();

//router.get('/comboColor',getComboColor);

router.post('/client',createClient);

router.put('/client/:id',updateClient);

router.get('/client/:id',getClient);

router.get('/clients',getTablaClients)

router.get('/comboTipos',getComboTipos)

export default router