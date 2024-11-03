import mongoose, { Schema } from 'mongoose';

const topicSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Use singular "Product" for the model name and plural "products" for the collection
const ProductModel = mongoose.models.Product || mongoose.model("Product", topicSchema); 
export default ProductModel;
