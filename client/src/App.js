import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/main/HomePage";
import AllBooksPage from "./pages/main/AllBooksPage";
import BookDetailsPage from "./pages/main/BookDetailsPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<AllBooksPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
