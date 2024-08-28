// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
              
                <main className="p-8">
                    <Routes>
                        <Route path="/" element={<StudentForm />} />
                        <Route path="/students" element={<StudentList />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
