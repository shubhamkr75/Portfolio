import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js'
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use('/users',userRoutes);
app.listen(PORT,()=> console.log(`server running on port: http://localhost/${PORT}`));
app.get('/',(req,res)=>{
    res.send("this is a get method");
});