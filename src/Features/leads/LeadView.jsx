import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLeads } from "./leadSlice";
import { useState } from "react";
import Select from "react-select";
import { fetchTags } from "../tags/tagSlice";
import { fetchSalesAgents } from "../salesAgents/salesAgentSlice";
import { Link } from "react-router-dom";

function LeadView() {
  const [display, setDisplay] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("Website");
  const [assignedAgent, setAssignedAgent] = useState("");
  const [leadStatus, setLeadStatus] = useState("New");
  const [selectedTags, setTags] = useState([]);
  const [timeToClose, setTimeToClose] = useState("");
  const [priority, setPriority] = useState("Medium");

  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.leads);
  console.log("leads", leads.leads);

  const { salesAgents } = useSelector((state) => state.salesAgents);
  const { tags } = useSelector((state) => state.tags);
  console.log("leadTags", tags);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchSalesAgents());
    dispatch(fetchTags());
  }, [dispatch]);

  const tagOptions =
    Array.isArray(tags) &&
    tags.map((tag) => ({
      value: tag.name,
      label: tag.name,
    }));

  console.log("tagOptions", tagOptions);

  const handleMultiSelectChange = (selectedTag) => {
    setTags(selectedTag);
    console.log("selectedTag", selectedTag);
  };

  const newLeads =
    Array.isArray(leads.leads) &&
    leads.leads.reduce((acc, curr) => {
      if (curr.status === "New") {
        return acc + 1;
      }
      return acc;
    }, 0);

  const contractedLeads =
    Array.isArray(leads.leads) &&
    leads.leads.reduce((acc, curr) => {
      if (curr.status === "Contracted") {
        return acc + 1;
      }
      return acc;
    }, 0);

  const qualifiedLeads =
    Array.isArray(leads.leads) &&
    leads.leads.reduce((acc, curr) => {
      if (curr.status === "Qualified") {
        return acc + 1;
      }
      return acc;
    }, 0);

  const handleNewLeadSubmit = async (e) => {
    e.preventDefault();
    const newLead = {
      leadName,
      leadSource,
      assignedAgent,
      leadStatus,
      tags: selectedTags.map((tag) => tag.value),
      timeToClose,
      priority,
    };

    const resultAction = await dispatch(addNewLead(newLead));
    if (addNewLead.fulfilled.match(resultAction)) {
      setDisplay(false);
      setLeadName("");
      setLeadSource("Website");
      setAssignedAgent("");
      setLeadStatus("New");
      setTags([]);
      setTimeToClose("");
      setPriority("Medium");
    } else {
      alert(resultAction.payload?.error || "Failed to add lead");
    }
  };

  {
    error && <p>Error Occured,{error}</p>;
  }

  return (
    <div className="p-4">
      <div className="py-4">
        {Array.isArray(leads.leads) && leads.leads.length > 0 ? (
          <>
            {" "}
            <h2 className="mb-3">Lead Status</h2>
            <div>
              <div>
                <p>
                  <strong className="fs-5 me-2"> New:</strong>
                  <span className=" text-body-secondary fs-5 ">
                    {newLeads} {newLeads > 1 ? "Leads" : "Lead"}
                  </span>
                </p>

                <p>
                  <strong className="fs-5 me-2"> Contracted:</strong>
                  <span className=" text-body-secondary fs-5 ">
                    {contractedLeads} {contractedLeads > 1 ? "Leads" : "Lead"}
                  </span>
                </p>

                <p>
                  <strong className="fs-5 me-2"> Qualified:</strong>
                  <span className=" text-body-secondary fs-5 ">
                    {qualifiedLeads} {qualifiedLeads > 1 ? "Leads" : "Lead"}
                  </span>
                </p>
              </div>
            </div>{" "}
          </>
        ) : (
          "Loading..."
        )}
      </div>

      <div>
        {status === "loading" ? (
          <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : null}

        {Array.isArray(leads.leads) && leads.leads.length > 0 ? (
          <div>
            <div className="pb-3 d-flex flex-wrap justify-content-between">
              <div>
                <h2>Leads</h2>
              </div>
              <div>
                <button className="btn btn-outline-info ms-2">New Lead</button>
                <button className="btn btn-outline-info ms-2">
                  Comtracted Lead
                </button>
                <button className="btn btn-outline-info ms-2">
                  Qualfied Lead
                </button>
              </div>
            </div>

            {leads.leads.map((lead, index) => (
              <div
                key={lead._id ? lead._id : `lead-${index}`}
                className="col-md-3"
              >
                <Link
                  to={`lead/${lead._id}`}
                  className="card"
                  style={{ textDecoration: "none" }}
                >
                  <div className="card-body">
                    <span className="badge mb-2 bg-info">New</span>
                    <h5 className="card-title">{lead.name}</h5>
                    <h6 className="card-subtitle text-body-secondary">
                      Sales Agent: {lead.salesAgent.name}
                    </h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          "Loading..."
        )}

        <button
          onClick={() => setDisplay(true)}
          className="btn btn-outline-info float-end"
        >
          <i class="bi bi-plus-square me-2"></i>Add Lead
        </button>
      </div>

      {display && (
        <div className="overlay">
          <div className="form-container">
            <form onSubmit={handleNewLeadSubmit}>
              <h2 className="text-center mb-4">Add New Lead</h2>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Lead Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter lead name"
                    value={leadName}
                    required
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Lead Source</label>
                  <select
                    className="form-control"
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                  >
                    <option>Website</option>
                    <option>Referral</option>
                    <option>Cold Call</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Assigned Sales Agent</label>
                  <select
                    className="form-control"
                    value={assignedAgent}
                    onChange={(e) => setAssignedAgent(e.target.value)}
                  >
                    <option value="">Select an agent</option>
                    {salesAgents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Lead Status</label>
                  <select
                    className="form-control"
                    value={leadStatus}
                    onChange={(e) => setLeadStatus(e.target.value)}
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Proposal Sent</option>
                    <option>Closed</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Tags</label>
                  <Select
                    options={tagOptions}
                    isMulti
                    value={tags}
                    onChange={handleMultiSelectChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Time to Close (Days)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={timeToClose}
                    required
                    onChange={(e) => setTimeToClose(e.target.value)}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-control"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-100 mb-2 btn btn-info text-light"
              >
                Submit
              </button>
              <button
                type="button"
                className="w-100 mb-2 btn btn-secondary text-light"
                onClick={() => setDisplay(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadView;
