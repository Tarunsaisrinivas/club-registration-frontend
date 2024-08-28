import React, { useState } from "react";
import axios from "axios";

function StudentForm() {
  const [student, setStudent] = useState({
    name: "",
    year: "",
    branch: "",
    section: "",
    collegeName: "",
    gender: "",
    mobileNo: "",
    email: "",
    payment: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNo") {
      if (value.length <= 10) {
        setStudent({ ...student, [name]: value });
      }
    } else {
      setStudent({
        ...student,
        [name]:
          name === "collegeName" || name === "name"
            ? value.toUpperCase()
            : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a copy of the student object to modify
    let studentData = { ...student };

    // If payment method is "Cash", remove the transactionId from the student data
    if (student.payment === "Cash") {
      delete studentData.transactionId;
    }

    try {
      // Send the student data to the backend
      await axios.post("https://srkrcodigclub-backend.vercel.app/api/students/add", studentData);

      // Alert the user that the student was added successfully
      alert("Student added successfully!");

      // Reset the form fields after successful submission
      setStudent({
        name: "",
        year: "",
        branch: "",
        section: "",
        collegeName: "",
        gender: "",
        mobileNo: "",
        email: "",
        payment: "",
        transactionId: "",
      });
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Error adding data:", error);

      // Alert the user about the error
      alert("Error adding data");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white shadow-md rounded"
    >
      <h1 className="text-2xl font-bold mb-4 text-primary">
        Student Registration
      </h1>
      <div className="mb-4">
        <label className="block text-gray-700">
          Student Name (As per SSC in Capital)
          <span className="text-red-500">*</span>
        </label>
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
        <label className="block text-gray-700">
          Year (I/II/III/IV)
          <span className="text-red-500">*</span>
        </label>
        <select
          name="year"
          value={student.year}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Select Year
          </option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Branch<span className="text-red-500">*</span>
        </label>
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
        <label className="block text-gray-700">
          College Name<span className="text-red-500">*</span>
        </label>
        <input
          name="collegeName"
          value={student.collegeName}
          onChange={handleChange}
          placeholder="College Name"
          className="w-full px-3 uppercase py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Section (A/B/C/D/E)
          <span className="text-red-500">*</span>
        </label>
        <select
          name="section"
          value={student.section}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Select Section
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Gender (M/F)
          <span className="text-red-500">*</span>
        </label>
        <select
          name="gender"
          value={student.gender}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Student Mobile No. (Length of 10)
          <span className="text-red-500">*</span>
        </label>
        <input
          name="mobileNo"
          type="number"
          maxLength={10}
          value={student.mobileNo}
          onChange={handleChange}
          placeholder="Mobile No."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Student E-Mail Id<span className="text-red-500">*</span>
        </label>
        <input
          name="email"
          type="email"
          value={student.email}
          onChange={handleChange}
          placeholder="E-Mail Id"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Payment (Online or Cash)<span className="text-red-500">*</span>
        </label>
        <select
          name="payment"
          value={student.payment}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Select Payment
          </option>
          <option value="Online">Online</option>
          <option value="Cash">Cash</option>
        </select>
      </div>

      {student.payment === "Online" && (
        <>
          <div className="mb-4">
            <div className="mb-4">
              <label className="block text-gray-700">QR CODE</label>
              <img
                src="./qr.png"
                alt="Payment Proof"
                className="w-2/4 m-auto h-auto rounded-md mb-2"
              />
            </div>
            <label className="block text-gray-700">
              Transaction ID <span className="text-red-500">*</span>
            </label>
            <input
              name="transactionId"
              value={student.transactionId}
              onChange={handleChange}
              placeholder="Transaction ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required={student.payment === "Online"}
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}

export default StudentForm;
