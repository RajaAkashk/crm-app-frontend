import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalesAgents, addNewAgent } from "./salesAgentSlice";

const SalesAgentView = () => {
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { salesAgents, status, error } = useSelector(
    (state) => state.salesAgents
  );

  useEffect(() => {
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error}</p>;

  const AddNewSalesAgent = async (e) => {
    e.preventDefault();
    const newAgent = {
      name: name,
      email: email,
    };
    const resultAction = await dispatch(addNewAgent(newAgent));
    console.log("resultAction: ", resultAction);
    
    if (addNewAgent.fulfilled.match(resultAction)) {
      setDisplay(false);
      setName("");
      setEmail("");
    } else {
      alert(resultAction.payload?.error || "Failed to add sales agent");
    }
  };

  return (
    <div className="p-4">
      {/* Sales Agent List */}
      <div className="d-flex flex-wrap">
        {Array.isArray(salesAgents) &&
          salesAgents.map((agent) => (
            <div key={agent._id} className="col-md-3 p-2">
              <div className="card">
                <div className="card-body">
                  <p className="card-title">
                    <strong>Name: </strong>
                    {agent.name}
                  </p>
                  <p className="card-title">
                    <strong>Email: </strong>
                    {agent.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => setDisplay(true)}
        className="btn btn-outline-info float-end"
      >
        <i className="bi bi-plus-square me-2"></i>Add New Agent
      </button>

      {display && (
        <div className="overlay">
          <div className="form-container">
            <form onSubmit={AddNewSalesAgent}>
              <div className="mb-3">
                <label htmlFor="agentName" className="form-label">
                  Agent Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="agentName"
                  placeholder="Enter a Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="agentEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="agentEmail"
                  placeholder="Enter an Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-100 mb-2 btn btn-info text-light"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setDisplay(false);
                  setName("");
                  setEmail("");
                }}
                className="w-100 mb-2 btn btn-secondary text-light"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesAgentView;
