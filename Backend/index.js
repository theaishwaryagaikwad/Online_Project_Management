import express from 'express';
import bodyParser from 'body-parser';
import connectDb from './db.js'; 
import routerAPI from './routes/api.js'; 
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDb();

app.use(bodyParser.json());
app.use(express.json());

app.use('/api', routerAPI);

app.listen(PORT, () => {
    console.log(`Server is running on port ${8000}`);
});
