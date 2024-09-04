import { Router, Request, Response } from 'express';
import ReceiverDetails from '../models/receiverdetails';

const router = Router();

// GET all receiver details
router.get('/', async (req: Request, res: Response) => {
    try {
        const receiverDetails = await ReceiverDetails.findAll();
        res.status(200).json(receiverDetails);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch receiver details' });
    }
});

// GET a single receiver detail by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const receiverDetail = await ReceiverDetails.findByPk(id);
        if (receiverDetail) {
            res.status(200).json(receiverDetail);
        } else {
            res.status(404).json({ error: 'Receiver detail not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch receiver detail' });
    }
});

// POST a new receiver detail
router.post('/post', async (req: Request, res: Response) => {
    const { receiver_name, receiver_phone_number, user_id } = req.body;
    try {
        const newReceiverDetail = await ReceiverDetails.create({
            receiver_name,
            receiver_phone_number,
            user_id
        });
        res.status(201).json(newReceiverDetail);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to create receiver detail' });
    }
});

// PUT (update) a receiver detail by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { receiver_name, receiver_phone_number, user_id } = req.body;
    try {
        const receiverDetail = await ReceiverDetails.findByPk(id);
        if (receiverDetail) {
            await receiverDetail.update({
                receiver_name,
                receiver_phone_number,
                user_id
            });
            res.status(200).json(receiverDetail);
        } else {
            res.status(404).json({ error: 'Receiver detail not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to update receiver detail' });
    }
});

// DELETE a receiver detail by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const receiverDetail = await ReceiverDetails.findByPk(id);
        if (receiverDetail) {
            await receiverDetail.destroy();
            res.status(200).json({ message: 'Receiver detail deleted successfully' });
        } else {
            res.status(404).json({ error: 'Receiver detail not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to delete receiver detail' });
    }
});

export default router;
