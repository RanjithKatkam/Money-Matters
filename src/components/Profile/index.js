import Sidebar from "../Sidebar";
import Header from "../Header";
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

const Profile = () => {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const password = localStorage.getItem("password");
  const profileImg =
    email === "admin@gmail.com" ? imageUrls[0].url : imageUrls[1].url;
  return (
    <div className="dashboard-main-container">
      <Sidebar email={email} name={name} />
      <div className="dashboard-sub-container">
        <Header details={{ email, password }} type={"Profile"} />
        <div className="profile-main-container">
          <div className="profile-logo-container">
            <img
              className="profile-page-image"
              src={profileImg}
              alt="profile"
            />
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
