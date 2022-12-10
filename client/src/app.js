import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import "./index.css";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Student from "./components/layouts/Student";
import Teacher from "./components/layouts/Teacher";
import AppContextProvider from "./contexts/AppContext";
import StudentForm from "./forms/StudentForm";
import TeacherForm from "./forms/TeacherForm";

const App = () => {
  return (
    <AppContextProvider>
      <div className="main">
        <BrowserRouter>
          {console.log("render")}
          <Navbar />
          <div style={{ flex: 1, width: "100%" }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/students" element={<Student />} />
              <Route path="/studentsform" element={<StudentForm />} />
              <Route path="/teachers" element={<Teacher />} />
              <Route path="/teachersform" element={<TeacherForm />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </AppContextProvider>
  );
};

export default App;
