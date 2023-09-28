import express from "express";
import {
    getClient,
    getClientbyId,
    createClient,
    updateClient,
    deleteClient,
    getClientbyMonth,
    getClientbyName
} from "../controllers/AutomationControllers.js";

const router = express.Router();

router.get('/clients',getClient);
router.get('/clients/:id',getClientbyId);
router.get('/clients/bulan/:bulan',getClientbyMonth);
router.get('/clients/nama/:nama',getClientbyName);
router.post('/clients',createClient);
router.patch('/clients/:id',updateClient);
router.delete('/clients/:id',deleteClient);
// router.post('/send-message',sendMessage);

export default router;