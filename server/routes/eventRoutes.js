import { Router } from 'express';
import event from '../controllers/eventController.js';

const router = Router();

// Define your routes here
router.get('/', event.getAllEvents);

router.get('/:id', event.getEventById);

router.post('/', event.createEvent);

router.put('/:id', event.updateEvent);

router.delete('/:id', event.deleteEvent);

export default router;
