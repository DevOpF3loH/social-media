import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const signUserOut = async () => {
    await signOut(auth);
  };

  const navbarOpen = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <div className={isNavExpanded ? "navbar expanded" : "navbar"}>
      <h1 className="navtitle">Niambie...</h1>
      <div className="navright">
        <div className="links">
          <ul>
            <li>
              <Link to="/" onClick={navbarOpen}>
                Home
              </Link>
            </li>
            {!user ? (
              <li>
                <Link to="/login" onClick={navbarOpen}>
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/createpost" onClick={navbarOpen}>
                  Create Post
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="user">
          <button className="hamburger" onClick={navbarOpen}>
            <MenuIcon />
          </button>
          {user && (
            <>
              <p>{user?.displayName}</p>
              <img src={user?.photoURL || ""} alt="logo img" />
              <button className="logoutbutton" onClick={signUserOut}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
