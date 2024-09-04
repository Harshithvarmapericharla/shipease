import { Router, Request, Response } from 'express';
import Restaurant from '../models/restaurant';

const router = Router();

// GET all restaurants
router.get('/', async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
});

// GET a single restaurant by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
});

// POST a new restaurant
router.post('/', async (req: Request, res: Response) => {
    const { name, location, phone, rating, opening_time, closing_time, image_id } = req.body;
    try {
        const newRestaurant = await Restaurant.create({
            name,
            location,
            phone,
            rating,
            opening_time,
            closing_time,
            image_id
        });
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});

// PUT (update) a restaurant by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, location, phone, rating, opening_time, closing_time, image_id } = req.body;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (restaurant) {
            await restaurant.update({
                name,
                location,
                phone,
                rating,
                opening_time,
                closing_time,
                image_id
            });
            res.status(200).json(restaurant);
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to update restaurant' });
    }
});

// DELETE a restaurant by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (restaurant) {
            await restaurant.destroy();
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
});

export default router;
