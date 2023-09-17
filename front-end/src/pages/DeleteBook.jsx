import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeletion = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/api/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Some error occurred, Please see console.");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner></Spinner> : ""}
      <div className="flex flex-col item-center border-2 border-sky-400-rounded-xl w-[600px] p-8 mx-auto">
        <h2 className="text-2xl">Are you sure you want to delete this book?</h2>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeletion}
        >
          Yes, Delete it!
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
