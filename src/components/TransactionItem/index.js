import { Component } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { GoStop } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import "./index.css";

class TransactionItem extends Component {
  state = {
    isDeleteClicked: false,
    isEditClicked: false,
    transactionName: "",
    transactionType: "credit",
    category: "Shopping",
    date: "",
    amount: "",
  };

  onClickEdit = () => {
    this.setState((prev) => ({ isEditClicked: !prev.isEditClicked }));
  };

  onClickDelete = () => {
    this.setState((prev) => ({ isDeleteClicked: !prev.isDeleteClicked }));
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

  deleteTransaction = async () => {
    const { details, renderTransactions } = this.props;
    const { id, user_id } = details;
    const transactionId = { id: id.toString() };

    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction";
    const options = {
      method: "DELETE",
      hostname: "bursting-gelding-24.hasura.app",
      path: "/api/rest/delete-transaction",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": user_id,
      },
      body: JSON.stringify(transactionId),
    };
    const response = await fetch(url, options);
    console.log(response);
    this.setState((prev) => ({ isDeleteClicked: !prev.isDeleteClicked }));
    renderTransactions();
  };

  updateTransaction = async () => {
    const { details, renderTransactions } = this.props;
    const { id, user_id } = details;
    const transactionId = { id: id.toString() };
    const {
      transactionName,
      transactionType,
      category,
      date,
      amount,
    } = this.state;
    if (transactionName !== "" && amount !== "" && date !== "") {
      const transactionDetails = {
        name: transactionName,
        type: transactionType,
        category: category,
        amount: amount,
        date: date,
        id: transactionId,
      };

      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";
      const options = {
        method: "POST",
        hostname: "bursting-gelding-24.hasura.app",
        path: "/api/rest/update-transaction",
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": user_id,
        },
        body: JSON.stringify(transactionDetails),
      };
      const response = await fetch(url, options);
      console.log(response);
      this.setState((prev) => ({ isEditClicked: !prev.isEditClicked }));
      renderTransactions();
    }
  };

  render() {
    const { isEditClicked, isDeleteClicked } = this.state;
    const { details } = this.props;
    const { type, amount, date, transaction_name, category } = details;
    const formatDate = (isoDate) => {
      const date = new Date(isoDate);

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = date.getDate();
      const month = months[date.getMonth()];
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM";
      const formattedDate = `${day} ${month}, ${
        hours % 12 || 12
      }.${minutes.toString().padStart(2, "0")} ${amOrPm}`;

      return formattedDate;
    };

    const isoDate = date;
    const formattedDate = formatDate(isoDate);

    return (
      <>
        <li className="card-item-lst">
          <div className="div">
            <img
              src={
                type === "credit"
                  ? "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690831843/Group_326_afol0y.png"
                  : "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690831834/Group_328_cbgdyr.png"
              }
              alt="item"
            />
            <p className="transaction-name">{transaction_name}</p>
          </div>
          <p className="category">{category}</p>
          <p className="date">{formattedDate}</p>
          {type === "credit" ? (
            <p className="credit">{`+$${amount}`}</p>
          ) : (
            <p className="debit">{`-$${amount}`}</p>
          )}
          <button onClick={this.onClickEdit} className="logout-button">
            <AiOutlineEdit size={25} color={"#2D60FF"} />
          </button>
          <button onClick={this.onClickDelete} className="logout-button">
            <MdOutlineDeleteOutline size={25} color="red" />
          </button>
        </li>
        {isDeleteClicked && (
          <div className="popup-overlay">
            <div className="popup-container">
              <div className="icon-logout-container">
                <GoStop size={30} color="#D97706" />
              </div>
              <div>
                <p className="are">Are you sure you want to Delete?</p>
                <p className="lorem">
                  This transaction will be deleted immediately. You can’t undo
                  this action.
                </p>
                <div className="logout-popup-buttons">
                  <button className="logout" onClick={this.deleteTransaction}>
                    Yes, Delete
                  </button>
                  <button className="cancel" onClick={this.onClickDelete}>
                    No, Leave it
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isEditClicked && (
          <div className="popup-overlay">
            <form
              onSubmit={this.updateTransaction}
              className="transaction-popup-container"
            >
              <div className="heading-container">
                <h1 className="f1">Update Transaction</h1>
                <button onClick={this.onClickEdit} className="logout-button">
                  <RxCross2 size={26} />
                </button>
              </div>
              <p className="f2">You can update your transaction here</p>
              <label className="f3" htmlFor="transaction-name">
                Transaction Name
              </label>
              <input
                type="text"
                id="transaction-name"
                placeholder={transaction_name}
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
                <option value="credit">Credit</option>
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
                <option value="Shopping">Shopping</option>
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
                placeholder={amount}
                onChange={this.onChangeAmount}
              />
              <label className="f3" htmlFor="date">
                Date
              </label>
              <input
                className="f4"
                type="date"
                id="date"
                placeholder={date}
                onChange={this.onChangeDate}
              />
              <button className="f6" type="submit">
                Add Transaction
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default TransactionItem;
