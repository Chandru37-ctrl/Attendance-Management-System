import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Students() {

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    year: ""
  });


  // Fetch students
  const fetchStudents = async () => {

    const res = await API.get("/students");

    setStudents(res.data);

  };


  useEffect(() => {

    fetchStudents();

  }, []);


  // Handle input
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  // Add student
  const addStudent = async () => {

    await API.post("/students", form);

    fetchStudents();

  };


  // Delete student
  const deleteStudent = async (id) => {

    await API.delete(`/students/${id}`);

    fetchStudents();

  };


  return (

    <Layout>

      <h1 className="text-2xl font-bold mb-4">
        Student Management
      </h1>


      {/* Add student form */}

      <div className="bg-white p-6 shadow rounded-lg mb-6">

        <h2 className="font-bold mb-2">
          Add Student
        </h2>

        <div className="grid grid-cols-5 gap-2">

          <input
            name="name"
            placeholder="Name"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="studentId"
            placeholder="Student ID"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="year"
            placeholder="Year"
            className="border p-2"
            onChange={handleChange}
          />

        </div>

        <button
          onClick={addStudent}
          className="bg-blue-500 text-white px-4 py-2 mt-3"
        >
          Add Student
        </button>

      </div>


      {/* Student table */}

      <div className="bg-white p-6 shadow rounded-lg">

  <table className="w-full text-left">

    <thead>

      <tr className="border-b">

        <th className="py-3 px-2 font-semibold">Name</th>
        <th className="py-3 px-2 font-semibold">Email</th>
        <th className="py-3 px-2 font-semibold">ID</th>
        <th className="py-3 px-2 font-semibold">Department</th>
        <th className="py-3 px-2 font-semibold">Year</th>
        <th className="py-3 px-2 font-semibold">Action</th>

      </tr>

    </thead>

    <tbody>

      {students.map(student => (

        <tr key={student._id} className="border-b hover:bg-gray-50">

          <td className="py-3 px-2">{student.name}</td>

          <td className="py-3 px-2">{student.email}</td>

          <td className="py-3 px-2">{student.studentId}</td>

          <td className="py-3 px-2">{student.department}</td>

          <td className="py-3 px-2">{student.year}</td>

          <td className="py-3 px-2">

            <button
              onClick={() => deleteStudent(student._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>


    </Layout>

  );

}

export default Students;
