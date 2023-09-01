//importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//instantiating dependencies and setting up middle-wares.
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MongoURI = process.env.CONNECTION_URI;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//importing routes.
import bookRouter from './routes/bookRoutes.js';

app.use('/api/books', bookRouter);

//Connecting to database and activating server.
mongoose
  .connect(MongoURI, { useNewUrlParser: true })
  .then(() => app.listen(PORT, () => console.log(`Server active on ${PORT}`)))
  .catch((err) => console.log(err));
