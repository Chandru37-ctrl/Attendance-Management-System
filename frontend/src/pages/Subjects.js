import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Subjects() {

  const [subjects, setSubjects] = useState([]);

  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    subjectCode: "",
    department: "",
    teacher: ""
  });


  // Fetch subjects
  const fetchSubjects = async () => {

    const res = await API.get("/subjects");

    setSubjects(res.data);

  };


  // Fetch teachers (for dropdown)
  const fetchTeachers = async () => {

    const res = await API.get("/teachers");

    setTeachers(res.data);

  };


  useEffect(() => {

    fetchSubjects();
    fetchTeachers();

  }, []);


  // Handle input
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  // Add subject
  const addSubject = async () => {

    await API.post("/subjects", form);

    fetchSubjects();

  };


  // Delete subject
  const deleteSubject = async (id) => {

    await API.delete(`/subjects/${id}`);

    fetchSubjects();

  };


  return (

    <Layout>

      <h1 className="text-2xl font-bold mb-4">
        Subject Management
      </h1>


      {/* Add Subject Form */}

      <div className="bg-white p-6 shadow rounded-lg mb-6">

        <h2 className="font-bold mb-3">
          Add Subject
        </h2>

        <div className="grid grid-cols-4 gap-3">

          <input
            name="name"
            placeholder="Subject Name"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="subjectCode"
            placeholder="Subject Code"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            className="border p-2"
            onChange={handleChange}
          />


          {/* Teacher Dropdown */}

          <select
            name="teacher"
            className="border p-2"
            onChange={handleChange}
          >

            <option value="">
              Select Teacher
            </option>

            {teachers.map(teacher => (

              <option
                key={teacher._id}
                value={teacher._id}
              >
                {teacher.name}
              </option>

            ))}

          </select>

        </div>

        <button
          onClick={addSubject}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-3 rounded"
        >
          Add Subject
        </button>

      </div>


      {/* Subjects Table */}

      <div className="bg-white p-6 shadow rounded-lg">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b">

              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Code</th>
              <th className="py-3 px-2">Department</th>
              <th className="py-3 px-2">Teacher</th>
              <th className="py-3 px-2">Action</th>

            </tr>

          </thead>

          <tbody>

            {subjects.map(subject => (

              <tr key={subject._id} className="border-b hover:bg-gray-50">

                <td className="py-3 px-2">
                  {subject.name}
                </td>

                <td className="py-3 px-2">
                  {subject.subjectCode}
                </td>

                <td className="py-3 px-2">
                  {subject.department}
                </td>

                <td className="py-3 px-2">
                  {subject.teacher?.name || "Not Assigned"}
                </td>

                <td className="py-3 px-2">

                  <button
                    onClick={() => deleteSubject(subject._id)}
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

export default Subjects;
