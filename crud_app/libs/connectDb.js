import mongoose from 'mongoose';

const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDb.");
    } catch (error) {
        console.log("Database Connection Error!", error);
    }
}

export default connectMongoDB;