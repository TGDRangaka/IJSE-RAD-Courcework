import User, { EUserRole, IUser } from '../models/userModel';
import Cart from '../controller/cartController';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import { getJwtToken } from '../util/utilMatters';
import userModel from '../models/userModel';
import itemModel from '../models/itemModel';
import OrderModel from '../models/orderModel';

dotenv.config();
const authToken: string = process.env.AUTH_TOKEN || 'slkdfjaslnvlksdlkjflksndlkmalkjskjsoiweoiuouewoijlkdfklasjdfkj';

class UserController {
    async getAll(): Promise<IUser[]> {
        return User.find();
    }

    async getCustomers() {
        return await User.find({ role: EUserRole.USER });
    }

    async getDashboarddata() {
        const totalCustomers = await userModel.find({ role: EUserRole.USER });
        const totItems = await itemModel.find({ isActive: true });
        const totOrders = await OrderModel.find();

        return {
            totCustomers: totalCustomers.length,
            totItems: totItems.length,
            totOrders: totOrders.length,
        }
    }

    async register(user: IUser): Promise<{ user: IUser; cart: any; store: any | null }> {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            const data = await new User(user).save();
            const cart = await Cart.save({ userId: data._id, items: [] } as any);
            const store = null; // Assuming store is null when registering a user
            return { user: data, cart: cart, store: store };
        } catch (err) {
            throw err;
        }
    }

    async update(id: string, user: Partial<IUser>) {
        await User.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    async delete(id: string) {
        await User.findByIdAndDelete(id);
    }

    async login(username: string, password: string)
        : Promise<{
            user: IUser;
            cart: any;
            accessToken: string;
            refreshToken: string;
        }> {
        try {
            const user = await User.findOne({ email: username });
            if (!user) throw new Error('Authentication failed');

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) throw new Error('Authentication failed')

            const accessToken = getJwtToken(user, '3h');
            const refreshToken = getJwtToken(user, '72h');

            const cart = await Cart.getCart(user._id as string);
            return { user: user, cart: cart, accessToken, refreshToken };
        } catch (err) {
            throw err;
        }
    }
}

export default new UserController();
