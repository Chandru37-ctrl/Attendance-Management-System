import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Teachers() {

  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    teacherId: "",
    department: ""
  });


  // Fetch teachers
  const fetchTeachers = async () => {

    const res = await API.get("/teachers");

    setTeachers(res.data);

  };


  useEffect(() => {

    fetchTeachers();

  }, []);


  // Handle input
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  // Add teacher
  const addTeacher = async () => {

    await API.post("/teachers", form);

    fetchTeachers();

  };


  // Delete teacher
  const deleteTeacher = async (id) => {

    await API.delete(`/teachers/${id}`);

    fetchTeachers();

  };


  return (

    <Layout>

      <h1 className="text-2xl font-bold mb-4">
        Teacher Management
      </h1>


      {/* Add teacher form */}

      <div className="bg-white p-6 shadow rounded-lg mb-6">

        <h2 className="font-bold mb-2">
          Add Teacher
        </h2>

        <div className="grid grid-cols-4 gap-2">

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
            name="teacherId"
            placeholder="Teacher ID"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            className="border p-2"
            onChange={handleChange}
          />

        </div>

        <button
          onClick={addTeacher}
          className="bg-blue-500 text-white px-4 py-2 mt-3"
        >
          Add Teacher
        </button>

      </div>


      {/* Teacher table */}

      <div className="bg-white p-6 shadow rounded-lg">

  <table className="w-full text-left">

    <thead>

      <tr className="border-b">

        <th className="py-3 px-2 font-semibold">Name</th>
        <th className="py-3 px-2 font-semibold">Email</th>
        <th className="py-3 px-2 font-semibold">ID</th>
        <th className="py-3 px-2 font-semibold">Department</th>
        <th className="py-3 px-2 font-semibold">Action</th>

      </tr>

    </thead>

    <tbody>

      {teachers.map(teacher => (

        <tr key={teacher._id} className="border-b hover:bg-gray-50">

          <td className="py-3 px-2">{teacher.name}</td>

          <td className="py-3 px-2">{teacher.email}</td>

          <td className="py-3 px-2">{teacher.teacherId}</td>

          <td className="py-3 px-2">{teacher.department}</td>

          <td className="py-3 px-2">

            <button
              onClick={() => deleteTeacher(teacher._id)}
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

export default Teachers;
