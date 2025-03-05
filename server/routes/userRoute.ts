import express, { Request, Response } from 'express';
import userController from '../controller/userController';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await userController.getAll();
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(500).json({ data: err });
    }
});

router.post('/register', async (req: Request, res: Response) => {
    try {
        const result = await userController.register(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, err: err });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await userController.update(req.params.id, req.body);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, err: err });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await userController.delete(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, err: err });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const result = await userController.login(req.body.username, req.body.password);
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(200).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

export default router;
