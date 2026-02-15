import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Reports() {

  const [attendance, setAttendance] = useState([]);

  const [report, setReport] = useState([]);


  // Fetch attendance
  const fetchAttendance = async () => {

    const res = await API.get("/attendance");

    setAttendance(res.data);

    generateReport(res.data);

  };


  useEffect(() => {

    fetchAttendance();

  }, []);


  // Generate report
  const generateReport = (data) => {

    const reportMap = {};

    data.forEach(record => {

      const studentName = record.student.name;
      const subjectName = record.subject.name;

      const key = `${studentName}-${subjectName}`;

      if (!reportMap[key]) {

        reportMap[key] = {
          student: studentName,
          subject: subjectName,
          present: 0,
          absent: 0,
          total: 0
        };

      }

      if (record.status === "present")
        reportMap[key].present++;

      else
        reportMap[key].absent++;

      reportMap[key].total++;

    });


    const finalReport = Object.values(reportMap).map(r => ({

      ...r,

      percentage:
        ((r.present / r.total) * 100).toFixed(2)

    }));


    setReport(finalReport);

  };


  return (

    <Layout>

      <h1 className="text-2xl font-bold mb-4">
        Attendance Reports
      </h1>


      <div className="bg-white p-6 shadow rounded-lg">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b">

              <th className="py-3 px-2">Student</th>
              <th className="py-3 px-2">Subject</th>
              <th className="py-3 px-2">Present</th>
              <th className="py-3 px-2">Absent</th>
              <th className="py-3 px-2">Total</th>
              <th className="py-3 px-2">Percentage</th>

            </tr>

          </thead>

          <tbody>

            {report.map((r, index) => (

              <tr key={index} className="border-b">

                <td className="py-3 px-2">
                  {r.student}
                </td>

                <td className="py-3 px-2">
                  {r.subject}
                </td>

                <td className="py-3 px-2 text-green-600">
                  {r.present}
                </td>

                <td className="py-3 px-2 text-red-600">
                  {r.absent}
                </td>

                <td className="py-3 px-2">
                  {r.total}
                </td>

                <td className="py-3 px-2 font-bold">
                  {r.percentage}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default Reports;
