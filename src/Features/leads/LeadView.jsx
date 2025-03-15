import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLeads } from "./leadSlice";

function LeadView() {
  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.leads);
  console.log("leads", leads.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const newLeads =
    Array.isArray(leads.leads) &&
    leads.leads.reduce((acc, curr) => {
      if (curr.status == "New") {
        return acc + 1;
      }
      return acc;
    }, 0);

  const contractedLeads =
    Array.isArray(leads.leads) &&
    leads.leads.reduce((acc, curr) => {
      if (curr == "Contracted") {
        return acc + 1;
      }
      return acc;
    }, 0);

  const qualifiedLeads =
    Array.isArray(leads.leads) &&
    leads.leads.reduce((acc, curr) => {
      if (curr == "Qualified") {
        return acc + 1;
      }
      return acc;
    }, 0);

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

            {leads.leads.map((lead) => (
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <span className="badge mb-2 bg-info">New</span>
                    <h5 className="card-title">{lead.name}</h5>
                    <h6 className="card-subtitle text-body-secondary">
                      Sales Agent: {lead.salesAgent.name}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "Loading..."
        )}

        <button className="btn btn-outline-info float-end">
          <i class="bi bi-plus-square me-2"></i>Add Lead
        </button>
      </div>
    </div>
  );
}

export default LeadView;
