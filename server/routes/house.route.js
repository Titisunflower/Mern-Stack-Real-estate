import express from 'express';
import { createHouse, deleteHouse, updateHouse, getHouse, getHouses,getAllHouse } from '../controllers/house.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createHouse);
router.delete('/delete/:id', verifyToken, deleteHouse);
router.post('/update/:id', verifyToken, updateHouse);
router.get('/get/:id', getHouse);
router.get('/get', getHouses);
router.get('/housesall', getAllHouse);

export default router;
