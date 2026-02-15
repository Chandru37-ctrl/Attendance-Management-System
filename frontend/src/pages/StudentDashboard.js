import Layout from "../layouts/Layout";

function StudentDashboard() {

    return (
        <Layout>

            <h1 className="text-2xl font-bold mb-4">
                Student Dashboard
            </h1>

            <div className="bg-white p-6 shadow rounded">

                <p>Welcome Student</p>

                <p>View your attendance and reports.</p>

            </div>

        </Layout>
    );
}

export default StudentDashboard;
