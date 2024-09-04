import { Router, Request, Response } from 'express';
import Booking from '../models/booking'; // Adjust the path as needed

const router = Router();

// GET all bookings
router.get('/', async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// GET a single booking by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByPk(id);
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
});

// POST a new booking
router.post('/', async (req: Request, res: Response) => {
    const { user_id, service_id, pickup_address, dropoff_address } = req.body;
    try {
        const newBooking = await Booking.create({
            user_id,
            service_id,
            pickup_address,
            dropoff_address,
        });
        res.status(201).json(newBooking);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

// PUT (update) a booking by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, service_id, pickup_address, dropoff_address } = req.body;
    try {
        const booking = await Booking.findByPk(id);
        if (booking) {
            await booking.update({
                user_id,
                service_id,
                pickup_address,
                dropoff_address,
            });
            res.status(200).json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to update booking' });
    }
});

// DELETE a booking by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByPk(id);
        if (booking) {
            await booking.destroy();
            res.status(200).json({ message: 'Booking deleted successfully' });
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

export default router;
