import { Router } from 'express';
import { Request, Response } from 'express';
import User from '../models/user';

const router = Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET a single user by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST a new user
router.post('/', async (req: Request, res: Response) => {
    const { username, email, password, gender, phone, profile_image, active, is_deleted } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password,
            gender,
            phone,
            profile_image,
            active,
            is_deleted,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// PUT (update) a user by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password, gender, phone, profile_image, active, is_deleted } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.update({
                username,
                email,
                password,
                gender,
                phone,
                profile_image,
                active,
                is_deleted,
            });
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// DELETE a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

export default router;
