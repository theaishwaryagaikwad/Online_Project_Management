import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://gaikwadaishwarya2002:lQMSUckkbXt5ogSf@cluster0.kymkgu6.mongodb.net/ProjectManagement?retryWrites=true&w=majority&appName=Cluster');
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;
