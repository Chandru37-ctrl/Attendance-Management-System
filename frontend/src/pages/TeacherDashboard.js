import Layout from "../layouts/Layout";

function TeacherDashboard() {

  return (
    <Layout>

      <h1 className="text-2xl font-bold mb-4">
        Teacher Dashboard
      </h1>

      <div className="bg-white p-6 shadow rounded">

        <p>Welcome Teacher</p>

        <p>You can mark attendance and view reports.</p>

      </div>

    </Layout>
  );
}

export default TeacherDashboard;
