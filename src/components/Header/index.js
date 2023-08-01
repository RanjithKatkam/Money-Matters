import { Component } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import "./index.css";

class Header extends Component {
  state = {
    addTransaction: false,
    transactionName: "",
    transactionType: "credit",
    category: "Shopping",
    date: "",
    amount: "",
    userId: "",
  };

  componentDidMount() {
    this.renderUserDetails();
  }

  renderUserDetails = async () => {
    const { details } = this.props;
    const url = "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (
      responseData.get_user_id !== undefined &&
      responseData.get_user_id[0].id !== undefined
    ) {
      this.setState({ userId: responseData.get_user_id[0].id });
    }
  };

  onClickAddTransaction = async () => {
    const {
      transactionName,
      transactionType,
      category,
      date,
      amount,
      userId,
    } = this.state;
    if (transactionName !== "" && amount !== "" && date !== "") {
      const { details } = this.props;
      const { email } = details;
      let transactionDetails;
      if (email === "admin@gmail.com") {
        transactionDetails = {
          name: transactionName,
          type: transactionType,
          category: category,
          amount: amount,
          date: date,
        };
      } else {
        transactionDetails = {
          name: transactionName,
          type: transactionType,
          category: category,
          amount: amount,
          date: date,
          user_id: userId,
        };
      }

      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";
      let options;

      if (email === "admin@gmail.com") {
        options = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "admin",
          },
        };
      } else {
        options = {
          method: "POST",
          hostname: "bursting-gelding-24.hasura.app",
          path: "/api/rest/add-transaction",
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": userId,
          },
          body: JSON.stringify(transactionDetails),
        };
      }
      const response = await fetch(url, options);
      const responseData = await response.json();
      console.log(responseData);
    }
  };

  toggleTransaction = () => {
    this.setState((prev) => ({ addTransaction: !prev.addTransaction }));
  };

  onChangeTransactionName = (event) => {
    this.setState({ transactionName: event.target.value });
  };

  onChangeTransactionType = (event) => {
    this.setState({ transactionType: event.target.value });
  };

  onChangeCategory = (event) => {
    this.setState({ category: event.target.value });
  };

  onChangeDate = (event) => {
    this.setState({ date: event.target.value });
  };

  onChangeAmount = (event) => {
    this.setState({ amount: event.target.value });
  };

  render() {
    const { addTransaction } = this.state;
    const { type } = this.props;
    // console.log(transactionName, transactionType, amount, date, category);
    return (
      <>
        <div className="header-main-container">
          <h1 className="type-heading">{type}</h1>
          <button
            onClick={this.toggleTransaction}
            type="button"
            className="add-transaction-button"
          >
            <AiOutlinePlus /> Add Transaction
          </button>
        </div>
        {addTransaction && (
          <div className="popup-overlay">
            <form className="transaction-popup-container">
              <div className="heading-container">
                <h1 className="f1">Add Transaction</h1>
                <button
                  onClick={this.toggleTransaction}
                  className="logout-button"
                >
                  <RxCross2 size={26} />
                </button>
              </div>
              <p className="f2">Lorem ipsum dolor sit amet, consectetur </p>
              <label className="f3" htmlFor="transaction-name">
                Transaction Name
              </label>
              <input
                type="text"
                id="transaction-name"
                placeholder="Enter Name"
                className="f4"
                onChange={this.onChangeTransactionName}
              />
              <label className="f3" htmlFor="transaction-type">
                Transaction Type
              </label>
              <select
                onChange={this.onChangeTransactionType}
                className="f5"
                id="transaction-type"
              >
                <option defaultValue value="credit">
                  Credit
                </option>
                <option value="debit">Debit</option>
              </select>
              <label className="f3" htmlFor="category">
                Category
              </label>
              <select
                onChange={this.onChangeCategory}
                className="f5"
                id="category"
              >
                <option defaultValue value="Shopping">
                  Shopping
                </option>
                <option value="Transfer">Transfer</option>
                <option value="Service">Service</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
              </select>
              <label className="f3" htmlFor="amount">
                Amount
              </label>
              <input
                className="f4"
                type="text"
                id="amount"
                placeholder="Enter Your Amount"
                onChange={this.onChangeAmount}
              />
              <label className="f3" htmlFor="date">
                Date
              </label>
              <input
                className="f4"
                type="date"
                id="date"
                placeholder="Select Date"
                onChange={this.onChangeDate}
              />
              <button
                onClick={this.onClickAddTransaction}
                className="f6"
                type="submit"
              >
                Add Transaction
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default Header;
