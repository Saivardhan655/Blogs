const express=require('express')
require('express-async-errors');
const app=express()
require('dotenv').config();
const router=require('./routes/auth')

app.use(express.json());
const connectDB=require('./db/connect')
const authRouter=require('./routes/auth')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/',(req,res)=>{
    res.status(200).send('index page');
})
app.use('/api/v1/auth',authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port=process.env.PORT || 3000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();