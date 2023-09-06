//importing required dependencies
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//instantiating dependencies and setting up middleware.
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MongoURI = process.env.CONNECTION_URI;

//enabling body-parser as the middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//enabling cors policy for resource sharing. app.use(cors()) would be enable for all, in following manner you can customize the cors policy.
app.use(
  cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['content-type'],
  })
);

//importing routes.
import bookRouter from './routes/bookRoutes.js';

//enabling routes as middleware.
app.use('/api/books', bookRouter);

//Connecting to database and activating server.
mongoose
  .connect(MongoURI, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server and Database active on port : ${PORT}`)
    )
  )
  .catch((err) => console.log(err));
