import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Database is connected..");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
    }
};
