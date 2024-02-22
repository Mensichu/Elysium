import {Router} from 'express'
import {createClient,updateClient,getClient,getTablaClients,getComboTipos,getClientsRepetidos, getClientByData} from '../aSequelize/controllers/client.controller'
import {createPagination,getAllPaginations} from '../aSequelize/controllers/pagination.controller'

const router = Router();

//router.get('/comboColor',getComboColor);

router.post('/client',createClient);

router.put('/client/:id',updateClient);

router.get('/client/:id',getClient);

router.get('/clientByData/:id',getClientByData);

router.get('/tablaClients',getTablaClients)

router.get('/comboTipos',getComboTipos)

router.get('/clientsRepetidos',getClientsRepetidos);

//Pagination

router.post('/pagination',createPagination);

router.get('/paginations',getAllPaginations);

export default router