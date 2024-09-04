import { Router, Request, Response } from 'express';
import DriverDocs from '../models/driver_documents'; // Adjust the path as needed

const router = Router();

// GET all driver documents
router.get('/', async (req: Request, res: Response) => {
    try {
        const driverDocs = await DriverDocs.findAll();
        res.status(200).json(driverDocs);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch driver documents' });
    }
});

// GET a single driver document by ID
router.get('/:doc_id', async (req: Request, res: Response) => {
    const { doc_id } = req.params;
    try {
        const driverDoc = await DriverDocs.findByPk(doc_id);
        if (driverDoc) {
            res.status(200).json(driverDoc);
        } else {
            res.status(404).json({ error: 'Driver document not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch driver document' });
    }
});

// POST a new driver document
router.post('/', async (req: Request, res: Response) => {
    const { driver_id, doc_type, front_image, back_image, doc_number, status } = req.body;
    try {
        const newDriverDoc = await DriverDocs.create({
            driver_id,
            doc_type,
            front_image,
            back_image,
            doc_number,
            status
        });
        res.status(201).json(newDriverDoc);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to create driver document' });
    }
});

// PUT (update) a driver document by ID
router.put('/:doc_id', async (req: Request, res: Response) => {
    const { doc_id } = req.params;
    const { driver_id, doc_type, front_image, back_image, doc_number, status } = req.body;
    try {
        const driverDoc = await DriverDocs.findByPk(doc_id);
        if (driverDoc) {
            await driverDoc.update({
                driver_id,
                doc_type,
                front_image,
                back_image,
                doc_number,
                status
            });
            res.status(200).json(driverDoc);
        } else {
            res.status(404).json({ error: 'Driver document not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to update driver document' });
    }
});

// DELETE a driver document by ID
router.delete('/:doc_id', async (req: Request, res: Response) => {
    const { doc_id } = req.params;
    try {
        const driverDoc = await DriverDocs.findByPk(doc_id);
        if (driverDoc) {
            await driverDoc.destroy();
            res.status(200).json({ message: 'Driver document deleted successfully' });
        } else {
            res.status(404).json({ error: 'Driver document not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to delete driver document' });
    }
});

export default router;
