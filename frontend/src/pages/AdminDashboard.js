import Layout from "../layouts/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    subjects: 0,
    attendance: 0
  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    const students = await API.get("/students");
    const teachers = await API.get("/teachers");
    const subjects = await API.get("/subjects");
    const attendance = await API.get("/attendance");

    setStats({
      students: students.data.length,
      teachers: teachers.data.length,
      subjects: subjects.data.length,
      attendance: attendance.data.length
    });

  };

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>


      <div className="grid grid-cols-4 gap-6">

        <Card title="Students" value={stats.students} color="bg-blue-500" />

        <Card title="Teachers" value={stats.teachers} color="bg-green-500" />

        <Card title="Subjects" value={stats.subjects} color="bg-purple-500" />

        <Card title="Attendance" value={stats.attendance} color="bg-orange-500" />

      </div>

    </Layout>

  );
}

function Card({ title, value, color }) {

  return (

    <div className={`${color} text-white p-6 rounded-lg shadow`}>

      <h2 className="text-lg">
        {title}
      </h2>

      <p className="text-3xl font-bold">
        {value}
      </p>

    </div>

  );

}

export default AdminDashboard;
