import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidenav from "../Components/Sidenav";
import { fetchLeadById } from "../Features/leads/leadSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../Features/comments/commentSlice";

function LeadDetailsPage() {
  const { id } = useParams();

  console.log("leadId: ", id);

  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.leads);
  const comments = useSelector((state) => state.comments);

  console.log("LeadDetailsPage comments- ", comments);
  console.log("LeadDetailsPage - ", leads);

  useEffect(() => {
    dispatch(fetchLeadById(id));
    fetchComments(id);
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
          <div className="col-md-10 p-4" style={{ background: "#fff" }}>
            <Link to="/" className="btn btn-outline-info fs-5 fw-medium mb-4">
              Back to Dashboard
            </Link>
            <Link
              to="/"
              className="float-end btn btn-outline-info fs-5 fw-medium mb-4"
            >
              <i class="bi bi-pencil-fill"></i> Lead
            </Link>
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
                <div className="">
                  <div className="">
                    <h2 className="display-6 fw-medium">{leads?.name}</h2>
                    <p className="fs-5">
                      <strong>Sales Agent:</strong> {leads?.salesAgent?.name} (
                      {leads?.salesAgent?.email})
                    </p>
                    <p className="fs-5">
                      <strong>Source:</strong> {leads?.source}
                    </p>
                    <p className="fs-5">
                      <strong>Status:</strong> {leads?.status}
                    </p>
                    <p className="fs-5">
                      <strong>Priority:</strong> {leads?.priority}
                    </p>
                    <p className="fs-5">
                      <strong>Time to Close:</strong> {leads?.timeToClose} days
                    </p>
                    <p className="fs-5">
                      <strong>Created At:</strong>{" "}
                      {new Date(leads?.createdAt).toLocaleString()}
                    </p>
                    <p className="fs-5">
                      <strong>Tags:</strong>{" "}
                      {leads?.tags?.map((tag) => tag.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* comments  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailsPage;
