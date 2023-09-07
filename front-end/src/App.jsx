//Below is the comment line to ignore the error of React imported but never used (suggested by es-lint extension).
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBooks from "./pages/createBooks";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route
        path="/books/newBook"
        element={<CreateBooks></CreateBooks>}
      ></Route>
      <Route
        path="/books/delete/:id"
        element={<DeleteBook></DeleteBook>}
      ></Route>
      <Route path="/books/edit/:id" element={<EditBook></EditBook>}></Route>
      <Route path="/books/details/:id" element={<ShowBook></ShowBook>}></Route>
    </Routes>
  );
};
export default App;
