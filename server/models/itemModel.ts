import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    rating: number;
    discount?: number;
    image: string;
    category: string;
    isActive: boolean;
    sold: number;
}

const itemSchema = new Schema<IItem>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    sold: { type: Number, required: true, default: 0 }
});

export default mongoose.model<IItem>("Item", itemSchema);
