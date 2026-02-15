import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function MyAttendance() {

  const [attendance, setAttendance] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const userName = localStorage.getItem("name"); // student name


  // Fetch subjects
  const fetchSubjects = async () => {

    const res = await API.get("/subjects");

    setSubjects(res.data);

  };


  // Fetch attendance
  const fetchAttendance = async () => {

    const res = await API.get("/attendance");

    setAttendance(res.data);

  };


  useEffect(() => {

    fetchAttendance();
    fetchSubjects();

  }, []);


  return (

    <Layout>

      <h1 className="text-2xl font-bold mb-4">
        My Attendance
      </h1>


      {/* Subject dropdown */}

      <div className="bg-white p-4 shadow rounded-lg mb-4">

        <select
          className="border p-2 w-full"
          value={selectedSubject}
          onChange={(e) =>
            setSelectedSubject(e.target.value)
          }
        >

          <option value="">
            All Subjects
          </option>

          {subjects.map(subject => (

            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>

          ))}

        </select>

      </div>


      {/* Attendance table */}

      <div className="bg-white p-6 shadow rounded-lg">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b">

              <th className="py-3 px-2">Subject</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Date</th>

            </tr>

          </thead>

          <tbody>

            {attendance
              .filter(a =>
                a.student?.name === userName // show only this student
              )
              .filter(a =>
                selectedSubject
                  ? a.subject._id === selectedSubject
                  : true
              )
              .map(a => (

                <tr key={a._id} className="border-b">

                  <td className="py-3 px-2">
                    {a.subject.name}
                  </td>

                  <td className={`py-3 px-2 ${
                    a.status === "present"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {a.status}
                  </td>

                  <td className="py-3 px-2">
                    {new Date(a.date).toLocaleDateString()}
                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default MyAttendance;
