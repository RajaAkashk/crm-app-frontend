import React, { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchLeadById, updateLead } from "../Features/leads/leadSlice";
import { addNewTag, fetchTags } from "../Features/tags/tagSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesAgents } from "../Features/salesAgents/salesAgentSlice";
import Select from "react-select";

function EditLeadPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leads, status, error } = useSelector((state) => state.leads);
  console.log("EditLeadPage leads", leads);
  const { salesAgents } = useSelector((state) => state.salesAgents);
  console.log("EditLeadPage salesAgents", salesAgents);
  const { tags } = useSelector((state) => state.tags);
  console.log("EditLeadPage fetch Tags:- ", tags);

  const [tagFormDisplay, setTagFormDisplay] = useState(false);
  const [tagName, setTagName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    salesAgent: "",
    source: "",
    status: "",
    tags: "",
    timeToClose: "",
    priority: "",
  });

  useEffect(() => {
    dispatch(fetchLeadById(id));
    dispatch(fetchSalesAgents());
    dispatch(fetchTags());
  }, [dispatch, id]);

  useEffect(() => {
    if (leads && Object.keys(leads).length) {
      setFormData({
        name: leads.name || "",
        source: leads.source || "",
        salesAgent: leads.salesAgent._id || "",
        status: leads.status || "",
        tags: leads.tags.map((tag) => tag._id) || "",
        timeToClose: leads.timeToClose || "",
        priority: leads.priority || "",
      });
    }
  }, [leads]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("setFormData", formData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit from editLeadPage:", formData);
    console.log("Submitting with ID:", id);
    dispatch(updateLead({ id, formData }));
  };

  const options =
    Array.isArray(salesAgents) &&
    salesAgents.map((agent) => ({ value: agent._id, label: agent.name }));

  console.log("setFormData", formData);
  console.log("options", options);

  // Handle Add Tag
  const handleNewTagSubmit = async (e) => {
    e.preventDefault();
    const newTag = { name: tagName };
    await dispatch(addNewTag(newTag));
    console.log("newTag :- ", newTag);
    setTagFormDisplay(false);
    setTagName("");
  };
  const tagsOptions =
    Array.isArray(tags) &&
    tags?.map((tag) => ({ value: tag._id, label: tag.name }));

  return (
    <div className="" style={{ background: "#cff4fc" }}>
      <div className="container-fluid">
        <h1 className="text-center py-2 m-0 bg-info-subtle">Edit Lead Page</h1>
        <div className="row">
          <div className="col-md-2">
            <Sidenav />
          </div>
          <div className="col-md-10 p-4" style={{ background: "#fff" }}>
            <Link to="/" className="btn btn-outline-info fs-5 fw-medium mb-4">
              Back to Dashboard
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Lead Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Sales Agent</label>

                  <Select
                    value={
                      options.find(
                        (option) => option.value === formData.salesAgent
                      ) || null
                    }
                    options={options}
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        salesAgent: selectedOption.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tags</label>

                  <Select
                    value={
                      tagsOptions.filter((option) =>
                        formData.tags.includes(option.value)
                      ) || null
                    }
                    isMulti
                    options={tagsOptions}
                    onChange={(selectedOptions) =>
                      setFormData({
                        ...formData,
                        tags: selectedOptions.map((option) => option.value),
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Source</label>

                  <select
                    className="form-control"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                  >
                    <option value={"Referral"}>Referral</option>
                    <option value={"Website"}>Website</option>
                    <option value={"Lead"}>Lead</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="New">New</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Contracted">Contracted</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-control"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Time to Close (days)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="timeToClose"
                    value={formData.timeToClose}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-outline-info">
                  Update Lead
                </button>
                <button
                  onClick={() => setTagFormDisplay(true)}
                  type="button"
                  className="float-end btn btn-outline-info"
                >
                  <i class="bi bi-plus-square me-2"></i>Add Tag
                </button>
              </form>
            )}
            {tagFormDisplay && (
              <div className="overlay">
                <div className="form-container">
                  <form onSubmit={handleNewTagSubmit}>
                    <h2 className="text-center text-info mb-3">Add New Tag</h2>
                    <label className="form-label fs-5" htmlFor="tagName">
                      Enter Tag Name:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => setTagName(e.target.value)}
                      id="tagName"
                    />
                    <div className="d-flex justify-content-between pt-4">
                      <button className="btn btn-outline-info" type="submit">
                        Submit
                      </button>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => {
                          setTagFormDisplay(false);
                          setTagName("");
                        }}
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

export default EditLeadPage;
