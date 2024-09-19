// frontend/src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Authpage from "./components/Authpage";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/fdsljk;" element={<StudentForm />} />
        <Route
          path="/auth"
          element={<Authpage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/students"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <StudentList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
