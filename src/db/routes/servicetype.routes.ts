import { Router, Request, Response } from 'express';
import ServiceType from '../models/servicetype'; // Adjust the path as needed

const router = Router();

// GET all service types
router.get('/', async (req: Request, res: Response) => {
    try {
        const serviceTypes = await ServiceType.findAll();
        res.status(200).json(serviceTypes);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch service types' });
    }
});

// GET a single service type by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const serviceType = await ServiceType.findByPk(id);
        if (serviceType) {
            res.status(200).json(serviceType);
        } else {
            res.status(404).json({ error: 'Service type not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch service type' });
    }
});

// POST a new service type
router.post('/', async (req: Request, res: Response) => {
    const { service_name } = req.body;
    try {
        const newServiceType = await ServiceType.create({ service_name });
        res.status(201).json(newServiceType);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to create service type' });
    }
});

// PUT (update) a service type by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { service_name } = req.body;
    try {
        const serviceType = await ServiceType.findByPk(id);
        if (serviceType) {
            await serviceType.update({ service_name });
            res.status(200).json(serviceType);
        } else {
            res.status(404).json({ error: 'Service type not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to update service type' });
    }
});

// DELETE a service type by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const serviceType = await ServiceType.findByPk(id);
        if (serviceType) {
            await serviceType.destroy();
            res.status(200).json({ message: 'Service type deleted successfully' });
        } else {
            res.status(404).json({ error: 'Service type not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to delete service type' });
    }
});

export default router;
