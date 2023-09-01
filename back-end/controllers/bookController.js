import Book from '../models/bookModel.js';

const createNewBook = async (req, res) => {
  try {
    //Validating the entries from the user.
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      // 400 -  Bad request code.
      res.status(400).json({
        Alert: `One or multiple fields missing, kindly input all the data.`,
      });
    }
    //Creating new book object to be saved in database.
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = new Book(newBook); //Creating the object of new book in db.
    const savedBook = await book.save(); //Saving the created object.
    return res.status(201).json(savedBook); //201 - Record Created code.
  } catch (error) {
    console.log(error);
    // 500 - Internal error code.
    return res.status(500).json({ Message: `Internal Server Error.` });
  }
};

export default {
  createNewBook,
};
