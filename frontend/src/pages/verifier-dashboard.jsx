import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";
const Verifier = () => {
  return (
    <div className="admin-dashboard">
      <h6>Dashboard: LOANS </h6>
      <div className="dashboard-statistics">
        <span>
          <h2>200</h2>
          <p>Active Users</p>
        </span>
        <span>
          <h2>100</h2>
          <p>Borrowers</p>
        </span>
        <span>
          <h2>550,000</h2>
          <p>Cash Distributed</p>
        </span>
        <span>
          <h2>1,000,000</h2>
          <p>Cash Received</p>
        </span>
        <div className="statistic">
          <h2>450,000</h2>
          <p>Savings</p>
        </div>
        <div className="statistic">
          <h2>30</h2>
          <p>Repaid Loans</p>
        </div>
        <div className="statistic">
          <h2>10</h2>
          <p>Other Accounts</p>
        </div>
        <div className="statistic">
          <h2>50</h2>
          <p>Loans</p>
        </div>
      </div>
      <div className="recent-loans">
        <h2>Applied Loans</h2>
        <table>
          <thead>
            <tr>
              <th>User Recent Activity</th>
              <th>Customer name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="https://via.placeholder.com/50" alt="User Image" />
              </td>
              <td>Tom Cruise</td>
              <td>June 09, 2021</td>
              <td>
                <button>Pending</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="https://via.placeholder.com/50" alt="User Image" />
              </td>
              <td>Matt Damon</td>
              <td>June 09, 2021</td>
              <td>
                <button>Pending</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="https://via.placeholder.com/50" alt="User Image" />
              </td>
              <td>Robert Downey</td>
              <td>June 08, 2021</td>
              <td>
                <button>Pending</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="https://via.placeholder.com/50" alt="User Image" />
              </td>
              <td>Christian Bale</td>
              <td>June 08, 2021</td>
              <td>
                <button>Pending</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="https://via.placeholder.com/50" alt="User Image" />
              </td>
              <td>Henry Cavil</td>
              <td>June 08, 2021</td>
              <td>
                <button>Approved</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="https://via.placeholder.com/50" alt="User Image" />
              </td>
              <td>Chris Evans</td>
              <td>June 08, 2021</td>
              <td>
                <button>Approved</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="https://via.placeholder.com/50" alt="User Image" />
              </td>
              <td>Sam Smith</td>
              <td>June 08, 2021</td>
              <td>
                <button>Pending</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Verifier;
