import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidenav from "../Components/Sidenav";
import { fetchLeadById } from "../Features/leads/leadSlice";
import { useDispatch, useSelector } from "react-redux";

function LeadDetailsPage() {
  const { id } = useParams();

  console.log("leadId: ", id);

  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.leads);
  const lead = useSelector((state) => state.leads.leads);

  console.log("LeadDetailsPage - ", leads);

  useEffect(() => {
    dispatch(fetchLeadById(id));
  }, [dispatch, id]);

  return (
    <div className="" style={{ background: "#cff4fc" }}>
      <div className="container-fluid">
        <h1 className="text-center py-2 m-0 bg-info-subtle">
          Lead Details Page
        </h1>
        <div className="row">
          <div className="col-md-2">
            <Sidenav />
          </div>
          <div className="col-md-10 py-4" style={{ background: "#fff" }}>
            {status === "loading" ? (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">{lead?.name}</h2>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Sales Agent: {lead?.salesAgent?.name} (
                      {lead?.salesAgent?.email})
                    </h6>
                    <p>
                      <strong>Source:</strong> {lead?.source}
                    </p>
                    <p>
                      <strong>Status:</strong> {lead?.status}
                    </p>
                    <p>
                      <strong>Priority:</strong> {lead?.priority}
                    </p>
                    <p>
                      <strong>Time to Close:</strong> {lead?.timeToClose} days
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(lead?.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Tags:</strong>{" "}
                      {lead?.tags?.map((tag) => tag.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailsPage;
