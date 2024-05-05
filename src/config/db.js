import mongoose from 'mongoose';

const connectDB = async () => {
  const connection =
    process.env.MONGODB_URL ||
    'mongodb+srv://wdelcant:InPgnuKk0wQhGIdJ@cluster0.vhykl.mongodb.net/Ecommerce';

  try {
    await mongoose.connect(connection);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
