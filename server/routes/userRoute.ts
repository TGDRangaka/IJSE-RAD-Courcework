import express, { Request, Response } from 'express';
import userController from '../controller/userController';
import { getJwtToken } from '../util/utilMatters';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await userController.getAll();
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(500).json({ data: err });
    }
});

router.get('/dashboard', async (req: Request, res: Response) => {
    try {
        const result = await userController.getDashboarddata();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: err });
    }
});

router.get('/customers', async (req, res) => {
    try {
        const result = await userController.getCustomers();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ data: err });
    }
})

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
        const result = await userController.login(req.body.email, req.body.password);
        if (result) {
            res.cookie('accessToken', result.accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 3 * 60 * 60 * 1000 // 3 hours
            });

            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 72 * 60 * 60 * 1000 // 72 hours
            });

            res.status(200).json({
                success: true,
                user: result.user,
                cart: result.cart
            });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

router.post('/refresh', async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!);
        const newAccessToken = getJwtToken(decoded as any, '3h');

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(403).json({ success: false, message: 'Invalid refresh token' });
    }
});

export default router;
