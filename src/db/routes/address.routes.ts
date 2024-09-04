import { Router, Request, Response } from 'express';
import Address from '../models/address'; // Adjust the path as needed

const router = Router();

// GET all addresses
router.get('/', async (req: Request, res: Response) => {
    try {
        const addresses = await Address.findAll();
        res.status(200).json(addresses);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch addresses' });
    }
});

// GET a single address by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const address = await Address.findByPk(id);
        if (address) {
            res.status(200).json(address);
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch address' });
    }
});

// POST a new address
router.post('/', async (req: Request, res: Response) => {
    const { house_number, apartment, landmark, type, user_id, city, state, zipcode, country, alternative_phone_number } = req.body;
    try {
        const newAddress = await Address.create({
            house_number,
            apartment,
            landmark,
            type,
            user_id,
            city,
            state,
            zipcode,
            country,
            alternative_phone_number
        });
        res.status(201).json(newAddress);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to create address' });
    }
});

// PUT (update) an address by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { house_number, apartment, landmark, type, user_id, city, state, zipcode, country, alternative_phone_number } = req.body;
    try {
        const address = await Address.findByPk(id);
        if (address) {
            await address.update({
                house_number,
                apartment,
                landmark,
                type,
                user_id,
                city,
                state,
                zipcode,
                country,
                alternative_phone_number
            });
            res.status(200).json(address);
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to update address' });
    }
});

// DELETE an address by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const address = await Address.findByPk(id);
        if (address) {
            await address.destroy();
            res.status(200).json({ message: 'Address deleted successfully' });
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to delete address' });
    }
});

export default router;
