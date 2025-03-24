import React from "react";
import Sidenav from "../Components/Sidenav";
import { fetchLeads } from "../Features/leads/leadSlice";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function ReportPage() {
  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads({ salesAgent: "", status: "" }));
  }, [dispatch]);

  // Helper function to get last week's leads
  const getLeadsClosedLastWeek = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return (
      Array.isArray(leads) &&
      leads?.filter(
        (lead) =>
          lead.status === "Closed" && new Date(lead.updatedAt) >= oneWeekAgo
      )
    );
  };

  // 1. Leads Closed Last Week
  const closedLastWeek = getLeadsClosedLastWeek();
  const closedLastWeekData = {
    labels:
      Array.isArray(closedLastWeek) && closedLastWeek.map((lead) => lead.name),
    datasets: [
      {
        label: "Leads Closed",
        data: Array.isArray(leads) && leads?.map((lead) => lead.timeToClose),
        backgroundColor: "rgba(14, 230, 230, 0.6)",
      },
    ],
  };

  // 2. Total Leads in Pipeline (by Status)
  const leadStatusCounts =
    Array.isArray(leads) &&
    leads?.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

  const pipelineData = {
    labels: Object.keys(leadStatusCounts),
    datasets: [
      {
        label: "Total Leads",
        data: Object.values(leadStatusCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // 3. Leads by Sales Agent
  const leadsByAgent =
    Array.isArray(leads) &&
    leads
      ?.filter((lead) => lead.status === "Closed")
      .reduce((acc, lead) => {
        acc[lead.salesAgent.name] = (acc[lead.salesAgent.name] || 0) + 1;
        return acc;
      }, {});

  const salesAgentData = {
    labels: Object.keys(leadsByAgent),
    datasets: [
      {
        label: "Closed Leads by Agent",
        data: Object.values(leadsByAgent),
        backgroundColor: "#42A5F5",
      },
    ],
  };

  // 4. Lead Status Distribution
  const statusDistributionData = {
    labels: Object.keys(leadStatusCounts),
    datasets: [
      {
        label: "Lead Status",
        data: Object.values(leadStatusCounts),
        backgroundColor: [
          "#FF6384",
          "#42A5F5",
          "#FFCE56",
          "#33ffc1",
          "#33bbff",
        ],
      },
    ],
  };

  return (
    <div className="" style={{ background: "#cff4fc" }}>
      <div className="container-fluid">
        <h1 className="text-center py-2 m-0 bg-info-subtle">Report</h1>
        <div className="row">
          <div className="col-md-2">
            <Sidenav />
          </div>
          <div className="col-md-10 p-4" style={{ background: "#fff" }}>
            <h2>Reports & Visualization</h2>
            {status === "loading" ? (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <div className="my-5 d-flex flex-wrap">
                  <div className="col-md-6">
                    <h3>Leads Closed Last Week</h3>
                    <div className="p-3">
                      <Bar data={closedLastWeekData} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h3>Total Leads in Pipeline</h3>
                    <div className="p-3">
                      <Bar data={pipelineData} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h3>Leads by Sales Agent</h3>
                    <div className="p-3">
                      <Bar data={salesAgentData} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h3>Lead Status Distribution</h3>
                    <div className="p-3">
                      <Pie data={statusDistributionData} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
