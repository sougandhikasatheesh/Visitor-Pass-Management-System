import Navbar from "../components/Navbar";
function Dashboard(){
    const user=JSON.parse(localStorage.getItem("user"));
    return(
    <>
    <Navbar/>
        <div className="container mt-5">
            <h2>Welcome,{user?.name}</h2>
            <p className="text-muted">Visitor pass Management Dashboard</p>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4>
                                Visitors
                            </h4>
                            <p>Manage visitor details</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4>Appointemnts</h4>
                            <p>
                                Manage appointments
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default Dashboard;