import React from "react";
function VisitorTable({
    visitors,
    user,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    exportCSV,
    editVisitor,
    deleteVisitor,
    setSelectedVisitor,
    updateVisitorStatus
}){
    const filteredVisitors=visitors.filter((visitor)=>{
        const matchesSearch=visitor.visitorName
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus= filterStatus==="All"|| visitor.status===filterStatus;
        return matchesSearch && matchesStatus;
        
    });
    return (
        <>
        <div className="row mb-3">
            <div className="col-md-6">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Search by Visitor Name"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                />
            </div>
            <div className="col-md-3">
                <select 
                    className="form-select"
                    value={filterStatus}
                    onChange={(e)=> setFilterStatus(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
        </div>
        <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-success" onClick={exportCSV}>
                Export file
            </button>
        </div>
        <table className="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>
                        Visitor Name
                    </th>
                    <th>
                        Photo
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Phone
                    </th>
                    <th>
                        Purpose
                    </th>
                    <th>
                        Person To Meet
                    </th>
                    <th>
                        Visit Date
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredVisitors.map((visitor)=>(
                    <tr key={visitor._id}>
                        <td>
                            {visitor.visitorName}
                        </td>
                        <td>
                            {visitor.photo?(
                                <img
                                src={`http://localhost:4000/uploads/${visitor.photo}`}
                                alt="Visitor"
                                width="60"
                                height="60"
                                style={{
                                    objectFit: "cover",
                                    borderRadius:"50%"
                                }}
                                />
                            ):(
                                "No Photo"
                            )}
                        </td>
                        <td>
                            {visitor.email}
                        </td>
                        <td>
                            {visitor.phone}
                        </td>
                        <td>
                            {visitor.purpose}
                        </td>
                        <td>
                            {visitor.personToMeet}
                        </td>
                        <td>
                            {new Date (visitor.visitDate).toLocaleDateString()}
                        </td>
                        <td>
                            {visitor.status}
                        </td>
                        <td>
                            {(user?.role==="Admin"|| user?.role==="Employee") &&(
                                <button className="btn btn-warning btn-sm me-2"
                                onClick={()=>editVisitor(visitor)}
                                >Edit</button>
                            )}
                            {user?.role==="Admin" && (
                                <button className="btn btn-danger btn-sm me-2"
                                onClick={()=>deleteVisitor(visitor._id)}>Delete</button>
                            )}
                            <button className="btn btn-success btn-sm me-2"
                                onClick={()=>setSelectedVisitor(visitor)}>QR</button>
                            <button className="btn btn-info btn-sm"
                                onClick={()=>updateVisitorStatus(visitor)}>
                                    {visitor.status === "Checked In"
                                        ? "Check Out"
                                        : visitor.status === "Checked Out"
                                        ? "Completed"
                                        : "Check In"}
                                </button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
        </>
    );
}
export default VisitorTable;
