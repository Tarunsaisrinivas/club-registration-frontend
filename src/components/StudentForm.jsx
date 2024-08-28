import React, { useState } from 'react';
import axios from 'axios';

function StudentForm() {
    const [student, setStudent] = useState({
        name: '',
        year: '',
        branch: '',
        section: 'A',
        gender: 'M',
        mobileNo: '',
        email: '',
        payment: 'Online'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: name === 'name' ? value.toUpperCase() : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/students/add', student);
            alert('Student added successfully!');
            setStudent({
                name: '',
                year: 'I',
                branch: '',
                section: 'A',
                gender: 'M',
                mobileNo: '',
                email: '',
                payment: 'Online'
            });
        } catch (error) {
            alert('Error adding student');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4 text-primary">Student Registration</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Student Name (As per SSC in Capital)</label>
                <input
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Student Name"
                    className="w-full px-3 capitalize py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Year (I/II/III/IV)</label>
                <select
                    name="year"
                    value={student.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                >
                    <option value="" disabled>Select Year</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Branch</label>
                <input
                    name="branch"
                    value={student.branch}
                    onChange={handleChange}
                    placeholder="Branch"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Section (A/B/C/D/E)</label>
                <select
                    name="section"
                    value={student.section}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Gender (M/F)</label>
                <select
                    name="gender"
                    value={student.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                >
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Student Mobile No. (Length of 10)</label>
                <input
                    name="mobileNo"
                    type='number'
                    maxLength="10"
                    value={student.mobileNo}
                    onChange={handleChange}
                    placeholder="Mobile No."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Student E-Mail Id</label>
                <input
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="E-Mail Id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Payment (Online or Cash)</label>
                <select
                    name="payment"
                    value={student.payment}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                >
                    <option value="Online">Online</option>
                    <option value="Cash">Cash</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md">Submit</button>
        </form>
    );
}

export default StudentForm;
