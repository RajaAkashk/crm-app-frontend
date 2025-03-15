import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalesAgents } from "./salesAgentSlice";

const SalesAgentView = () => {
  const dispatch = useDispatch();

  const { salesAgents, status, error } = useSelector(
    (state) => state.salesAgents
  );

  console.log("salesAgents", salesAgents);

  useEffect(() => {
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="d-flex flex-wrap">
        {salesAgents.map((agent) => (
          <div key={agent.id} className="col-md-3 p-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{agent.name}</h5>
                {agent.leads?.map((lead) => (
                  <h6
                    key={lead.id}
                    className="card-subtitle text-body-secondary"
                  >
                    Sales Agent: {lead.salesAgent?.name || "N/A"}
                  </h6>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesAgentView;
