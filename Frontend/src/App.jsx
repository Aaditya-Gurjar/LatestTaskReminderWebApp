import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

function App() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
    startTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/task/createTask", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from API:", response.data);

      // Check if success is true, then show success message
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Task Created Successfully',
          text: response.data.message, // Display success message from the response
          showConfirmButton: false,
          timer: 1500, // Auto close after 1.5 seconds
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
        });
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while submitting the form. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="relative w-full h-full flex items-center justify-center bg-cover bg-center p-4 sm:p-10">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center text-white space-y-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Task Reminder System
          </h1>
          <p className="text-lg sm:text-xl italic">
            Get reminders of your tasks on mail
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 p-6 sm:p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="text-black mt-2 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="text-black mt-2 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-black mt-2 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="text-black mt-2 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
