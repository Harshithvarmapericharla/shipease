import { Router, Request, Response } from 'express';
import Transaction from '../models/usertransactions'; // Adjust the path as needed

const router = Router();

// GET all transactions
router.get('/', async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// GET a single transaction by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByPk(id);
        if (transaction) {
            res.status(200).json(transaction);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to fetch transaction' });
    }
});

// POST a new transaction
router.post('/', async (req: Request, res: Response) => {
    const { user_id, wallet_balance_before, wallet_balance_after, amount, transaction_type, description, reference_id, transaction_date } = req.body;
    try {
        const newTransaction = await Transaction.create({
            user_id,
            wallet_balance_before,
            wallet_balance_after,
            amount,
            transaction_type,
            description,
            reference_id,
            transaction_date
        });
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

// PUT (update) a transaction by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, wallet_balance_before, wallet_balance_after, amount, transaction_type, description, reference_id, transaction_date } = req.body;
    try {
        const transaction = await Transaction.findByPk(id);
        if (transaction) {
            await transaction.update({
                user_id,
                wallet_balance_before,
                wallet_balance_after,
                amount,
                transaction_type,
                description,
                reference_id,
                transaction_date
            });
            res.status(200).json(transaction);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to update transaction' });
    }
});

// DELETE a transaction by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByPk(id);
        if (transaction) {
            await transaction.destroy();
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error); // For debugging purposes
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
});

export default router;
