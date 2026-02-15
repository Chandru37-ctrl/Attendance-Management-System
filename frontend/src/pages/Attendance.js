import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Attendance() {

    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);

    const [selectedSubject, setSelectedSubject] = useState("");

    const [attendance, setAttendance] = useState({});

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");



    // Fetch subjects
    const fetchSubjects = async () => {

        const res = await API.get("/subjects");

        setSubjects(res.data);

    };


    // Fetch students
    const fetchStudents = async () => {

        const res = await API.get("/students");

        setStudents(res.data);

        const uniqueDepartments = [
             ...new Set(res.data.map(s => s.department))
            ];
        
        setDepartments(uniqueDepartments);

    };


    useEffect(() => {

        fetchSubjects();
        fetchStudents();

    }, []);


    // Handle attendance change
    const handleAttendanceChange = (studentId, status) => {

        setAttendance({
            ...attendance,
            [studentId]: status
        });

    };


    // Save attendance
    const saveAttendance = async () => {

        try {

            const teacherId = subjects.find(
                s => s._id === selectedSubject
            )?.teacher?._id;

            for (const studentId in attendance) {

                await API.post("/attendance", {
                    student: studentId,
                    subject: selectedSubject,
                    teacher: teacherId,
                    status: attendance[studentId]
                });

            }

            alert("Attendance saved successfully");

        } catch (error) {

            alert("Error saving attendance");

        }

    };


    return (

  <Layout>

    <h1 className="text-2xl font-bold mb-4">
      Mark Attendance
    </h1>


    {/* Department dropdown */}

    <div className="bg-white p-6 shadow rounded-lg mb-4">

      <select
        className="border p-2 w-full"
        value={selectedDepartment}
        onChange={(e) =>
          setSelectedDepartment(e.target.value)
        }
      >

        <option value="">
          Select Department
        </option>

        {departments.map(dep => (

          <option key={dep} value={dep}>
            {dep}
          </option>

        ))}

      </select>

    </div>


    {/* Subject dropdown */}

    <div className="bg-white p-6 shadow rounded-lg mb-6">

      <select
        className="border p-2 w-full"
        value={selectedSubject}
        onChange={(e) =>
          setSelectedSubject(e.target.value)
        }
      >

        <option value="">
          Select Subject
        </option>

        {subjects.map(subject => (

          <option
            key={subject._id}
            value={subject._id}
          >
            {subject.name}
          </option>

        ))}

      </select>

    </div>


    {/* Students list */}

    {selectedSubject && selectedDepartment && (

      <div className="bg-white p-6 shadow rounded-lg">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b">

              <th className="py-3 px-2">
                Student Name
              </th>

              <th className="py-3 px-2">
                Department
              </th>

              <th className="py-3 px-2">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {students
              .filter(student =>
                student.department === selectedDepartment
              )
              .map(student => (

                <tr key={student._id} className="border-b">

                  <td className="py-3 px-2">
                    {student.name}
                  </td>

                  <td className="py-3 px-2">
                    {student.department}
                  </td>

                  <td className="py-3 px-2">

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleAttendanceChange(student._id, "present")
                        }
                        className={`px-4 py-1 rounded font-medium ${
                          attendance[student._id] === "present"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        Present
                      </button>

                      <button
                        onClick={() =>
                          handleAttendanceChange(student._id, "absent")
                        }
                        className={`px-4 py-1 rounded font-medium ${
                          attendance[student._id] === "absent"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        Absent
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>


        <button
          onClick={saveAttendance}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-4 rounded"
        >
          Save Attendance
        </button>

      </div>

    )}

  </Layout>

);


}

export default Attendance;
