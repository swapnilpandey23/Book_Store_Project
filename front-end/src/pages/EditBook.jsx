import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  {
    /* useNavigate(), To reroute to home page after create book operation. */
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => {
        console.log(res.data.book);
        setTitle(res.data.book.title);
        setAuthor(res.data.book.author);
        setPublishYear(res.data.book.publishYear);

        setLoading(false);
      })
      .catch((error) => {
        alert("Error occurred, Please check console.");
        console.log(error.message);
      });
  }, []);
  {
    /* Function to handle create book operation. */
  }
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/books/updateBook/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Error while saving new book, refer to console.");
      });
  };
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1>Edit Book</h1>
      {loading ? <Spinner></Spinner> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
