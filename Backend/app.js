require('dotenv').config();
require('express-async-errors');
const helmet=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const rateLimiter=require('express-rate-limit')

const express = require('express');
const app = express();

const connectDB=require('./db/connect')
const authenticateUser=require('./middleware/authentication')

const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header for JWT
  credentials: true, // Allows cookies and authorization headers (e.g., JWT)
};

// Apply CORS middleware
app.use(cors(corsOptions));


const authRouter=require('./routes/auth')
const postRouter=require('./routes/posts')
const userRouter=require('./routes/user')
const singleuserpost=require('./routes/singleuserdata')
const singleBlog=require('./routes/singlepost')
const imagesPostRoutes = require('./routes/images_post');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs:15 *60*1000,
  max:100,
})
)
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
// extra packages

// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/posts',authenticateUser,postRouter)
app.use('/api/v1/user',authenticateUser,userRouter)
app.use('/api/v1',authenticateUser,singleuserpost)
app.use('/api/v1/blog',authenticateUser,singleBlog)
app.use('/api/v1/blogs',authenticateUser,imagesPostRoutes)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI environment variable is not defined.');
      return;
    }
    
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

start();
