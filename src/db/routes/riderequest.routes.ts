import { Router, Request, Response } from 'express';
import RideRequest from '../models/riderequest'; // Adjust the path as needed

const router = Router();

// GET all ride requests (excluding soft-deleted ones)
router.get('/', async (req: Request, res: Response) => {
    try {
        const rideRequests = await RideRequest.findAll({ where: { is_deleted: false } });
        res.status(200).json(rideRequests);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch ride requests' });
    }
});

// GET a single ride request by ID (excluding soft-deleted ones)
router.get('/:request_id', async (req: Request, res: Response) => {
    const { request_id } = req.params;
    try {
        const rideRequest = await RideRequest.findOne({ where: { request_id, is_deleted: false } });
        if (rideRequest) {
            res.status(200).json(rideRequest);
        } else {
            res.status(404).json({ error: 'Ride request not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch ride request' });
    }
});

// POST a new ride request
router.post('/', async (req: Request, res: Response) => {
const { user_id, driver_id, service_type_id, receiver_id, booking_id, status } = req.body;
    try {
    const newRideRequest = await RideRequest.create({
        user_id,
        driver_id,
        service_type_id,
        receiver_id,
        booking_id,
        status,
        is_deleted: false // Explicitly set the default value for is_deleted
    });
    res.status(201).json(newRideRequest);
} catch (error) {
    console.error(error); // For debugging purposes
    res.status(500).json({ error: 'Failed to create ride request' });
}
});
//PUT (update) a ride request by ID
router.put('/:request_id', async (req: Request, res: Response) => {
    const { request_id } = req.params;
    const { user_id, driver_id, service_type_id, receiver_id, booking_id, status } = req.body;
    try {
        const rideRequest = await RideRequest.findByPk(request_id);
        if (rideRequest && !rideRequest.is_deleted) {
            await rideRequest.update({
                user_id,
                driver_id,
                service_type_id,
                receiver_id,
                booking_id,
                status,
               
            })
            res.status(200).json(rideRequest);
        } else {
            res.status(404).json({ error: 'Ride request not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to update ride request' });
    }
});

// DELETE (soft delete) a ride request by ID
router.delete('/:request_id', async (req: Request, res: Response) => {
    const { request_id } = req.params;
    try {
        const rideRequest = await RideRequest.findByPk(request_id);
        if (rideRequest && !rideRequest.is_deleted) {
            await rideRequest.update({ is_deleted: true });
            res.status(200).json({ message: 'Ride request soft deleted successfully' });
        } else {
            res.status(404).json({ error: 'Ride request not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to delete ride request' });
    }
});

export default router;
