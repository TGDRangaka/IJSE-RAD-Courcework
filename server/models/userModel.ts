import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress {
    no: string;
    street: string;
    city: string;
}

export interface ICreditCard {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
}

export enum EUserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    role: EUserRole;
    address?: IAddress | null;
    creditCard?: ICreditCard | null;
}

const UserSchema: Schema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: String, required: true, enum: EUserRole },
    address: {
        type: new Schema({
            no: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true }
        }),
        required: false,
        default: null
    },
    creditCard: {
        type: new Schema({
            number: { type: String, required: true },
            expiryMonth: { type: String, required: true },
            expiryYear: { type: String, required: true },
            cvv: { type: String, required: true }
        }),
        required: false,
        default: null
    }
});

export default mongoose.model<IUser>('User', UserSchema);
