import Sidebar from "../Sidebar";
import Header from "../Header";
import { BiUserCircle } from "react-icons/bi";
import "./index.css";

const Profile = () => {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  return (
    <div className="dashboard-main-container">
      <Sidebar email={email} name={name} />
      <div className="dashboard-sub-container">
        <Header type={"Profile"} />
        <div className="profile-main-container">
          <div className="profile-logo-container">
            <BiUserCircle size={150} />
          </div>
          <div className="profile-details-container">
            <div className="item1">
              <p className="heading">Your Name</p>
              <p className="profile-input">{name}</p>
            </div>
            <div className="item1">
              <p className="heading">User Name</p>
              <p className="profile-input">{name}</p>
            </div>
            <div className="item1">
              <p className="heading">Email</p>
              <p className="profile-input">{email}</p>
            </div>
            <div className="item1">
              <p className="heading">Password</p>
              <p className="profile-input">*************</p>
            </div>
            <div className="item1">
              <p className="heading">Date of Birth</p>
              <p className="profile-input">25 January 1990</p>
            </div>
            <div className="item1">
              <p className="heading">Present Address</p>
              <p className="profile-input">San Jose, California, USA</p>
            </div>
            <div className="item1">
              <p className="heading">Permanent Address</p>
              <p className="profile-input">San Jose, California, USA</p>
            </div>
            <div className="item1">
              <p className="heading">City</p>
              <p className="profile-input">San Jose</p>
            </div>
            <div className="item1">
              <p className="heading">Postal Code</p>
              <p className="profile-input">453456</p>
            </div>
            <div className="item1">
              <p className="heading">Country</p>
              <p className="profile-input">USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
