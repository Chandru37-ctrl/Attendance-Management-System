import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";


function AdminAnalytics() {

  const [attendance, setAttendance] = useState([]);

  const [barData, setBarData] = useState([]);

  const [pieData, setPieData] = useState([]);


  useEffect(() => {

    fetchAttendance();

  }, []);


  const fetchAttendance = async () => {

    const res = await API.get("/attendance");

    const data = res.data;

    setAttendance(data);

    generateBarData(data);

    generatePieData(data);

  };


  // Bar chart (student percentage)
  const generateBarData = (data) => {

    const studentMap = {};

    data.forEach(record => {

      const name = record.student.name;

      if (!studentMap[name]) {

        studentMap[name] = {
          present: 0,
          total: 0
        };

      }

      if (record.status === "present")
        studentMap[name].present++;

      studentMap[name].total++;

    });


    const result = Object.keys(studentMap).map(name => ({

      name,

      percentage:
        (
          (studentMap[name].present /
            studentMap[name].total) *
          100
        ).toFixed(0)

    }));


    setBarData(result);

  };


  // Pie chart (present vs absent)
  const generatePieData = (data) => {

    let present = 0;
    let absent = 0;

    data.forEach(record => {

      if (record.status === "present")
        present++;
      else
        absent++;

    });


    setPieData([
      { name: "Present", value: present },
      { name: "Absent", value: absent }
    ]);

  };


  const COLORS = ["#22c55e", "#ef4444"];


  return (

    <Layout>

      <h1 className="text-2xl font-bold mb-6">
        Analytics Dashboard
      </h1>


      <div className="grid grid-cols-2 gap-6">


        {/* Bar Chart */}

        <div className="bg-white p-6 shadow rounded-lg">

          <h2 className="font-bold mb-3">
            Student Attendance %
          </h2>

          <BarChart width={500} height={300} data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="percentage" fill="#3b82f6" />

          </BarChart>

        </div>


        {/* Pie Chart */}

        <div className="bg-white p-6 shadow rounded-lg">

          <h2 className="font-bold mb-3">
            Overall Attendance
          </h2>

          <PieChart width={400} height={300}>

            <Pie
              data={pieData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={100}
              dataKey="value"
            >

              {pieData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Legend />

            <Tooltip />

          </PieChart>

        </div>

      </div>

    </Layout>

  );

}

export default AdminAnalytics;
