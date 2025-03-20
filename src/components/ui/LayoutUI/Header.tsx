import React from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../../../contexts/UserContext";
import { userLogout } from "../../../api/auth";
import { SERVER_BASE_URL } from "../../../constants/Constants";
import logo from "../../../assets/img/logo-white.png";

const Header: React.FC = () => {
  const userContext = User();
  const { userInfo, isUserLoggedIn, removeUser } = userContext || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    removeUser?.();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
      </nav>

      <div className="header__logo">
        <img src={logo} alt="Natours logo" />
      </div>

      <nav className="nav nav--user">
        {isUserLoggedIn ? (
          <>
            <button className="nav__el nav__el--logout" onClick={handleLogout}>
              Log out
            </button>
            <Link className="nav__el" to="/me">
              <img
                className="nav__user-img"
                src={`${SERVER_BASE_URL}/img/users/${userInfo?.photo}`}
                alt={userInfo?.name?.split(" ")[0]}
              />
              <span>{userInfo?.name?.split(" ")[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <Link to="/signup" className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
