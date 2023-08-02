import Sidebar from "../Sidebar";
import TransactionsHeader from "../TransactionsHeader";
import AllTransactions from "../AllTransactions";

const Transactions = () => {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const password = localStorage.getItem("password");

  return (
    <div className="dashboard-main-container">
      <Sidebar email={email} name={name} />
      <div className="dashboard-sub-container">
        <TransactionsHeader password={password} email={email} />
        <AllTransactions details={{ email, password }} />
      </div>
    </div>
  );
};

export default Transactions;
