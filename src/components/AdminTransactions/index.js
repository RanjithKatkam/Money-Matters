import "./index.css";

const sampleNames = [
  { name: "Rahul" },
  { name: "Ranjith" },
  { name: "Rakesh" },
  { name: "Ramesh" },
  { name: "Jeshwin" },
  { name: "Ramya" },
  { name: "Ravi" },
  { name: "Jaya" },
  { name: "Samrat" },
  { name: "Vivek" },
  { name: "Veda" },
  { name: "Abhi" },
  { name: "Jane" },
  { name: "Jayanth" },
  { name: "Kiran" },
  { name: "Yash" },
  { name: "Ivan" },
  { name: "Eshwar" },
  { name: "Dinesh" },
  { name: "Priyanth" },
  { name: "Santhosh" },
  { name: "Ajay" },
  { name: "Barghavi" },
];

const imageUrls = [
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907711/Ellipse_103_bkkf4b.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907711/Ellipse_103_10_ijnnlg.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907711/Ellipse_103_8_uyvsoz.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907711/Ellipse_103_9_edp81o.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907711/Ellipse_103_11_cp36tk.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907711/Ellipse_103_6_e1vw1n.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907711/Ellipse_103_7_owgtfk.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907693/Ellipse_103_5_zg0eiy.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907693/Ellipse_103_3_dyr82z.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907693/Ellipse_103_1_cjay60.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907693/Ellipse_103_2_lx2q9r.png",
  },
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690907693/Ellipse_103_4_ibpfpe.png",
  },
];

const AdminTransactions = (props) => {
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
  const randomIndex = Math.floor(Math.random() * sampleNames.length);
  const randomImgIndex = Math.floor(Math.random() * imageUrls.length);
  const name = sampleNames[randomIndex].name;
  const img = imageUrls[randomImgIndex].url;

  return (
    <li className="card-item-lst">
      <div className="div-1x">
        <img
          src={
            type === "credit"
              ? "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690831843/Group_326_afol0y.png"
              : "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690831834/Group_328_cbgdyr.png"
          }
          alt="item"
        />
        <img className="img1x" src={img} alt="profile" />
        <p className="name-person-1x">{name}</p>
      </div>
      <p className="transaction-name-1x">{transaction_name}</p>
      <p className="category-1x">{category}</p>
      <p className="date-1x">{formattedDate}</p>
      {type === "credit" ? (
        <p className="credit-1x">{`+$${amount}`}</p>
      ) : (
        <p className="debit-1x">{`-$${amount}`}</p>
      )}
    </li>
  );
};

export default AdminTransactions;
