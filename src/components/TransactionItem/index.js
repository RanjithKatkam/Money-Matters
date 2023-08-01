import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import "./index.css";

const TransactionItem = (props) => {
  const { details } = props;
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
      <button className="logout-button">
        <AiOutlineEdit size={25} color={"#2D60FF"} />
      </button>
      <button className="logout-button">
        <MdOutlineDeleteOutline size={25} color="red" />
      </button>
    </li>
  );
};

export default TransactionItem;
