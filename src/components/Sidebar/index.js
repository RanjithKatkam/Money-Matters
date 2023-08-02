import { useState } from "react";
import { Link } from "react-router-dom";
import ReactContext from "../../ReactContext";
import { AiFillHome } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./index.css";

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
  {
    url:
      "https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690800147/Avatar_mmgh4c.png",
  },
];

function SideBar({ email, name }) {
  const navigate = useNavigate();
  const [isPopup, setPopup] = useState(false);
  const transactionType =
    email === "admin@gmail.com" ? "All Transactions" : "Transactions";
  const profileImg =
    email === "admin@gmail.com" ? imageUrls[0].url : imageUrls[1].url;

  const onClickLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("password");
    navigate("/login");
  };

  const openPopup = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <ReactContext.Consumer>
      {(value) => {
        const { activeTab, onChangeActiveTab } = value;

        const onChangeDashboard = () => {
          onChangeActiveTab("Dashboard");
        };

        const onChangeTransactions = () => {
          onChangeActiveTab("Transactions");
        };

        const onChangeProfile = () => {
          onChangeActiveTab("Profile");
        };

        return (
          <div className="sidebar-main-container">
            <div className="sidebar-logo-container">
              <img
                alt="logo"
                src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1690738822/Group_tkdib7.jpg"
              />
              <h1 className="sidebar-money">Money</h1>
              <h1 className="sidebar-matters">Matters</h1>
            </div>
            <ul className="list-container">
              <Link className="link" to="/">
                <li
                  onClick={onChangeDashboard}
                  className={
                    activeTab === "Dashboard" ? "active list-item" : "list-item"
                  }
                >
                  <AiFillHome
                    color={activeTab === "Dashboard" ? "#2D60FF" : "#5B73A0"}
                    size={25}
                  />
                  <p
                    className={
                      activeTab === "Dashboard"
                        ? "active-item-name"
                        : "item-name"
                    }
                  >
                    Dashboard
                  </p>
                </li>
              </Link>
              <Link className="link" to="/transactions">
                <li
                  onClick={onChangeTransactions}
                  className={
                    activeTab === "Transactions"
                      ? "active list-item"
                      : "list-item"
                  }
                >
                  <BiTransfer
                    color={activeTab === "Transactions" ? "#2D60FF" : "#5B73A0"}
                    size={25}
                  />
                  <p
                    className={
                      activeTab === "Transactions"
                        ? "active-item-name"
                        : "item-name"
                    }
                  >
                    {transactionType}
                  </p>
                </li>
              </Link>
              <Link className="link" to="/profile">
                <li
                  onClick={onChangeProfile}
                  className={
                    activeTab === "Profile" ? "active list-item" : "list-item"
                  }
                >
                  <CgProfile
                    color={activeTab === "Profile" ? "#2D60FF" : "#5B73A0"}
                    size={25}
                  />
                  <p
                    className={
                      activeTab === "Profile" ? "active-item-name" : "item-name"
                    }
                  >
                    Profile
                  </p>
                </li>
              </Link>
            </ul>
            <hr />
            <div className="profile-container">
              <img src={profileImg} alt="profile" className="profile-img" />
              <div className="details-container">
                <div className="name-logout-container">
                  <h1 className="user-name">{name}</h1>{" "}
                  <button
                    onClick={openPopup}
                    type="button"
                    className="logout-button"
                  >
                    <FiLogOut color="#5B73A0" size={20} />
                  </button>
                </div>
                <p className="user-email">{email}</p>
              </div>
            </div>
            {isPopup && (
              <div className="popup-overlay">
                <div className="popup-container">
                  <div className="icon-logout-container">
                    <RiLogoutCircleRLine size={30} color="#D97706" />
                  </div>
                  <div>
                    <p className="are">Are you sure you want to Logout?</p>
                    <p className="lorem">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </p>
                    <div className="logout-popup-buttons">
                      <button className="logout" onClick={onClickLogout}>
                        Yes, Logout
                      </button>
                      <button className="cancel" onClick={closePopup}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ReactContext.Consumer>
  );
}

export default SideBar;
