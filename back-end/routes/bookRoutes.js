import express from 'express';
const router = express.Router();
import bookController from '../controllers/bookController.js';

router.post('/newBook', bookController.createNewBook);

export default router;
