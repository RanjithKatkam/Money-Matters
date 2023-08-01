import { useEffect } from "react";
import SideBar from "../Sidebar";
import Header from "../Header";
import CreditDebitCard from "../CreditDebitCard";
import LastThreeTransactions from "../LastThreeTransactions";
import LastSevenDaysReport from "../LastSevenDaysReport";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Dashboard() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const password = localStorage.getItem("password");

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  if (!email) {
    return <div>Loading...</div>;
  }
  return (
    <div className="dashboard-main-container">
      <SideBar email={email} name={name} />
      <div className="dashboard-sub-container">
        <Header details={{ email, password }} type={"Accounts"} />
        <div className="dashboard-body-container">
          <CreditDebitCard details={{ email, password }} />
          <h1 className="last-transaction">Last Transaction</h1>
          <LastThreeTransactions details={{ email, password }} />
          <h1 className="last-transaction">Debit & Credit Overview</h1>
          <LastSevenDaysReport details={{ email, password }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
