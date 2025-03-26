import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidenav from "../Components/Sidenav";
import { fetchLeadById } from "../Features/leads/leadSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  addNewComment,
} from "../Features/comments/commentSlice";
import { useState } from "react";

function LeadDetailsPage() {
  const { id } = useParams();

  const [display, setDisplay] = useState(false);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.leads);
  const {
    comments,
    status: commentStatus,
    error: commentError,
  } = useSelector((state) => state.comments);

  const getSalesAgentInfo = JSON.parse(localStorage.getItem("user"));
  console.log("getSalesAgentInfo:- ", getSalesAgentInfo);

  useEffect(() => {
    dispatch(fetchLeadById(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const HandleAddNewComment = async (e) => {
    e.preventDefault();
    const newComment = {
      commentText: comment,
      author: getSalesAgentInfo?.id,
    };
    console.log("newComment: ", newComment);
    const resultAction = await dispatch(addNewComment({ newComment, id }));
    console.log("resultAction: ", resultAction);

    if (resultAction.payload?.message) {
      setDisplay(false);
      setComment("");
    } else {
      alert(resultAction.payload?.error || "Failed to add comment");
    }
  };

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
            <Link
              to="/dashboard"
              className="btn btn-outline-info fs-5 fw-medium mb-4"
            >
              Back to Dashboard
            </Link>
            <Link
              to={`/edit/lead/${id}`}
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
            <div className="py-4">
              <h1>Comments</h1>
              {commentStatus == "loading" ? (
                "loading..."
              ) : commentError ? (
                <p>{commentError}</p>
              ) : (
                <div>
                  <ul className="list-group">
                    {Array.isArray(comments) &&
                      comments?.map((comment) => (
                        <li key={comment._id} className="list-group-item">
                          <p>{comment?.commentText}</p>
                          <p>
                            <i class="bi bi-person-circle fs-4 me-2"></i>
                            {comment.author?.name || "Unknown"}
                          </p>
                          <p>{new Date(comment.createdAt).toLocaleString()}</p>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              <button
                onClick={() => setDisplay(true)}
                className="btn btn-outline-info float-end my-3"
              >
                <i class="bi bi-plus-square me-2"></i> Add Comment
              </button>
            </div>

            {display && (
              <div className="overlay">
                <div className="form-container">
                  <form onSubmit={HandleAddNewComment}>
                    <div className="mb-3">
                      <label htmlFor="comment" className="form-label fs-5">
                        Add a Comment
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="comment"
                        placeholder=""
                        value={comment}
                        required
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="submit"
                        className="col-md-5 mb-2 btn btn-info text-light"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDisplay(false);
                          setComment("");
                        }}
                        className="col-md-5 mb-2 btn btn-secondary text-light"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
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
