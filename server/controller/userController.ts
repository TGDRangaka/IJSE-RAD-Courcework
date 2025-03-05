import User, { IUser } from '../models/userModel';
import Cart from '../controller/cartController';

class UserController {
    async getAll(): Promise<IUser[]> {
        return User.find();
    }

    async register(user: IUser): Promise<{ user: IUser; cart: any; store: any | null }> {
        try {
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

    async login(username: string, password: string): Promise<{ user: IUser; cart: any; } | Error> {
        try {
            const user = await User.findOne({ email: username, password: password });
            if (user) {
                const cart = await Cart.getCart(user._id as string);
                return { user: user, cart: cart };
            } else {
                throw new Error('User not found');
            }
        } catch (err) {
            throw err;
        }
    }
}

export default new UserController();
