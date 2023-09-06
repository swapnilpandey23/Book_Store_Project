import express from 'express';
const router = express.Router();
import bookController from '../controllers/bookController.js';

router.post('/newBook', bookController.createNewBook);
router.get('/allBooks', bookController.getAllBooks);
router.get('/:id', bookController.getOneBook);
router.put('/updateBook/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
