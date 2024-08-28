// frontend/src/components/StudentList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://club-registration-backend.vercel.app/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const deleteStudent = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await axios.delete(`https://club-registration-backend.vercel.app/api/students/${id}`);
                setStudents(students.filter(student => student._id !== id));
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    const downloadPDF = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students/download/pdf', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'students.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const downloadExcel = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students/download/excel', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'students.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading Excel:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">Student List</h1>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-secondary text-white">
                            <th className="w-1/6 px-4 py-2 text-left">Name</th>
                            <th className="w-1/12 px-4 py-2 text-left">Year</th>
                            <th className="w-1/12 px-4 py-2 text-left">Branch</th>
                            <th className="w-1/12 px-4 py-2 text-left">Section</th>
                            <th className="w-1/12 px-4 py-2 text-left">Gender</th>
                            <th className="w-1/6 px-4 py-2 text-left">Mobile No.</th>
                            <th className="w-1/4 px-4 py-2 text-left">Email</th>
                            <th className="w-1/12 px-4 py-2 text-left">Payment</th>
                            <th className="w-1/12 px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={index} className="border-t hover:bg-gray-100">
                                    <td className="px-4 py-2">{student.name}</td>
                                    <td className="px-4 py-2">{student.year}</td>
                                    <td className="px-4 py-2">{student.branch}</td>
                                    <td className="px-4 py-2">{student.section}</td>
                                    <td className="px-4 py-2">{student.gender}</td>
                                    <td className="px-4 py-2">{student.mobileNo}</td>
                                    <td className="px-4 py-2">{student.email}</td>
                                    <td className="px-4 py-2">{student.payment}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => deleteStudent(student._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-md transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
                <button
                    onClick={downloadPDF}
                    className="bg-primary text-white py-2 px-6 rounded-md shadow-md hover:bg-primary-dark transition duration-200"
                >
                    Download PDF
                </button>
                <button
                    onClick={downloadExcel}
                    className="bg-primary text-white py-2 px-6 rounded-md shadow-md hover:bg-primary-dark transition duration-200"
                >
                    Download Excel
                </button>
            </div>
        </div>
    );
}

export default StudentList;
