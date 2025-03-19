import React, { useEffect } from "react";
import Sidenav from "../Components/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, deleteLead } from "../Features/leads/leadSlice";
import {
  fetchSalesAgents,
  deleteSalesAgent,
} from "../Features/salesAgents/salesAgentSlice";
import { Link } from "react-router-dom";

function SettingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  const { leads, status, error } = useSelector((state) => state.leads);
  const {
    salesAgents,
    status: salesAgentStatus,
    error: salesAgentError,
  } = useSelector((state) => state.salesAgents);
  console.log("SettingPage leads", leads);
  console.log("SettingPage salesAgent", salesAgents);

  const handleDeleteLead = (id) => {
    dispatch(deleteLead(id));
  };

  const handleDeleteSalesAgent = (id) => {
    dispatch(deleteSalesAgent(id));
  };

  return (
    <div className="" style={{ background: "#cff4fc" }}>
      <div className="container-fluid">
        <h1 className="text-center py-2 m-0 bg-info-subtle">Settings</h1>
        <div className="row">
          <div className="col-md-2">
            <Sidenav />
          </div>
          <div className="col-md-10" style={{ background: "#fff" }}>
            {status === "loading" ? (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="p-4">
                <div>
                  <h2 className="mb-3">Leads</h2>
                  {leads?.leads?.map((lead, index) => (
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
                          <span className="badge mb-2 bg-info">
                            {lead.status}
                          </span>
                          <div>
                            <h5 className="card-title">{lead.name}</h5>
                            <h6 className="card-subtitle text-body-secondary">
                              Sales Agent: {lead.salesAgent.name}
                            </h6>
                          </div>
                          <div className="mt-4 d-flex justify-content-between">
                            <button className="btn btn-outline-info">
                              <i class="bi bi-pencil-square"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead._id)}
                              className="btn btn-outline-info"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="py-4">
                  <h2 className="mb-3">Sales Agents</h2>
                  <div className="row flex-wrap">
                    {salesAgents.map((salesAgent, index) => (
                      <div
                        key={
                          salesAgent._id
                            ? salesAgent._id
                            : `salesAgent-${index}`
                        }
                        className="col-md-3 mb-3"
                      >
                        <div className="card">
                          <div className="card-body d-flex justify-content-between">
                            <div>
                              <h5 className="card-title">{salesAgent.name}</h5>
                              <h6 className="card-subtitle text-body-secondary">
                                {salesAgent.email}
                              </h6>
                            </div>
                            <div className="">
                              <button
                                onClick={() =>
                                  handleDeleteSalesAgent(salesAgent._id)
                                }
                                className="btn btn-outline-info"
                              >
                                <i class="bi bi-trash3"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default SettingPage;
