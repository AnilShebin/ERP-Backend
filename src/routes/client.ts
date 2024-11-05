import { Router } from 'express';
import { addClient, getClient, updateClient, deleteClient, listAllClients } from '../controllers/client';

const router = Router();

router.post('/', addClient);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/', listAllClients);

export default router;