import Book from "../models/bookModel.js";

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

const getAllBooks = async (_req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ count: books.length, books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error.Message });
  }
};

const getOneBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById({ _id: id });
    if (!book) {
      res.status(404).send("Book not found!");
    }
    res.status(200).json({ Count: book.length, Data: book });
  } catch (error) {
    console.log(error.Message);
    res.status(500).json({ Error: error.Message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      // 400 -  Bad request code.
      res.status(400).json({
        Alert: `One or multiple fields missing, kindly input all the data.`,
      });
    } else {
      const book = await Book.findByIdAndUpdate({ _id: id }, req.body);
      if (!book) {
        res.status(404).send("Book not found!");
      }
      res.status(201).json({ Data: book });
    }
  } catch (error) {
    console.log(error.Message);
    res.status(500).send({ Error: error.Message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete({ _id: id });
    if (!book) {
      res.status(404).send(`Book not found!`);
    }
    res.status(200).json({ Deleted: book });
  } catch (err) {
    console.log(err.Message);
    res.status(500).send({ Error: err.Message });
  }
};

export default {
  createNewBook,
  getAllBooks,
  getOneBook,
  updateBook,
  deleteBook,
};
