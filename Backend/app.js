import express from 'express';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import connectDb from './db.js';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
connectDb();

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/dashboard', dashboardRoutes); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
