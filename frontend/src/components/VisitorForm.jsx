import React from "react";
function VisitorForm({
    visitorName,
    setVisitorName,
    email,
    setEmail,
    phone,
    setPhone,
    purpose,
    setPurpose,
    personToMeet,
    setPersonToMeet,
    visitDate,
    setVisitDate,
    status,
    setStatus,
    setPhoto,
    handleSubmit,
    editing
}) {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <h4>{editing? "Edit Visitor": "Add Visitor"}</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Visitor Name
                            </label>
                            <input 
                                type="text"
                                className="form-control"
                                value={visitorName}
                                onChange={(e)=>
                                    setVisitorName(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e)=>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Phone</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(e)=>
                                    setPhone(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Purpose</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={purpose}
                                onChange={(e)=>
                                    setPurpose(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Person To Meet</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={personToMeet}
                                onChange={(e)=>
                                    setPersonToMeet(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Visit Date</label>
                            <input 
                                type="date"
                                className="form-control"
                                value={visitDate}
                                onChange={(e)=>
                                    setVisitDate(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Status</label>
                            <select 
                                className="form-select"
                                value={status}
                                onChange={(e)=>
                                    setStatus(e.target.value)
                                }
                            >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Photo</label>
                            <input 
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e)=>
                                    setPhoto(e.target.files[0])
                                }
                            />
                        </div>

                    </div>
                    <button type="submit" className={
                        editing ? "btn btn-warning" : "btn btn-primary"
                    }>
                        {editing ? "Update Visitor" : "Add Visitor"}
                    </button>
                </form>
            </div>
        </div>
    );     
}

export default VisitorForm;