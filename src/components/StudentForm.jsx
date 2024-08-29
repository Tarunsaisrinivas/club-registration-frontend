import React, { useState } from "react";
import axios from "axios";
import { IoCopyOutline } from "react-icons/io5";

function StudentForm() {
  const [student, setStudent] = useState({
    name: "",
    year: "",
    branch: "",
    regno: "",
    collegeName: "",
    gender: "",
    mobileNo: "",
    email: "",
    payment: "",
    transactionId: "",
  });

  const email = "8121702286@ybl";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      alert("UPI ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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

    let studentData = { ...student };

    if (student.payment === "Cash") {
      delete studentData.transactionId;
    }

    try {
      // Send the student data to the backend
      await axios.post(
        "https://srkrcodigclub-backend.vercel.app/api/students/add",
        studentData
      );

      // Alert the user that the student was added successfully
      alert("Student added successfully!");

      // Reset the form fields after successful submission
      setStudent({
        name: "",
        year: "",
        branch: "",
        regno: "",
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
        Hackathon Registration
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
          Registration Number
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="regno"
          value={student.regno}
          onChange={handleChange}
          placeholder="Enter Registration Number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
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
        </select>
      </div>

      {student.payment === "Online" && (
        <>
          <div className="mb-4">
            <div className="mb-4">
              <label className="block text-gray-700">QR CODE</label>
              <img
                src="./QRCODE.jpg"
                alt="Payment Proof"
                className="w-2/4 m-auto h-auto rounded-md mb-2"
              />
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-2xl p-2">
                <input
                  type="text"
                  value="8121702286@ybl"
                  readOnly
                  className="flex-grow px-2 py-2 bg-transparent border-none focus:outline-none text-gray-800"
                />
                <button
                  onClick={handleCopy}
                  className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  title="Copy to Clipboard"
                >
                  <IoCopyOutline className="w-5 h-5" />
                </button>
              </div>
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
