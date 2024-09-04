import { Router } from 'express';
import { Request, Response } from 'express';
import Driver from '../models/driver';

const router = Router();

// GET all drivers
router.get('/', async (req: Request, res: Response) => {
    try {
        const drivers = await Driver.findAll();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch drivers' });
    }
});

// GET a single driver by ID
router.get('/:driver_id', async (req: Request, res: Response) => {
    const { driver_id } = req.params;
    try {
        const driver = await Driver.findByPk(driver_id);
        if (driver) {
            res.status(200).json(driver);
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch driver' });
    }
});

// POST a new driver
router.post('/', async (req: Request, res: Response) => {
    const { driver_name, email, password, gender, dob, vehicle_type, vehicle_number, phone, active, is_deleted, status } = req.body;
    try {
        const newDriver = await Driver.create({
            driver_name,
            email,
            password,
            gender,
            dob,
            vehicle_type,
            vehicle_number,
            phone,
            active,
            is_deleted,
            status
        });
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create driver' });
    }
});

// PUT (update) a driver by ID
router.put('/:driver_id', async (req: Request, res: Response) => {
    const { driver_id } = req.params;
    const { driver_name, email, password, gender, dob, vehicle_type, vehicle_number, phone, active, is_deleted, status } = req.body;
    try {
        const driver = await Driver.findByPk(driver_id);
        if (driver) {
            await driver.update({
                driver_name,
                email,
                password,
                gender,
                dob,
                vehicle_type,
                vehicle_number,
                phone,
                active,
                is_deleted,
                status
            });
            res.status(200).json(driver);
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update driver' });
    }
});

// DELETE a driver by ID
router.delete('/:driver_id', async (req: Request, res: Response) => {
    const { driver_id } = req.params;
    try {
        const driver = await Driver.findByPk(driver_id);
        if (driver) {
            await driver.destroy();
            res.status(200).json({ message: 'Driver deleted successfully' });
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete driver' });
    }
});

export default router;
