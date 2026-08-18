// import React, { useEffect, useState } from "react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [showProfile, setShowProfile] = useState(false);
//   const [user, setUser] = useState(null);

//   const isLoggedIn = !!localStorage.getItem("token");

//   // Get logged-in user's details
//   const getUser = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/auth/getuser/",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//         }
//       );

//       const json = await response.json();

//       if (response.ok) {
//         setUser(json);
//       } else {
//         console.log(json);
//       }
//     } catch (error) {
//       console.error("Unable to fetch user:", error);
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       getUser();
//     }
//   }, [isLoggedIn]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setShowProfile(false);

//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
//       <div className="container-fluid">

//         {/* Logo */}
//         <Link className="navbar-brand" to="/home">
//           iNotebook
//         </Link>

//         {/* Mobile Toggle */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div
//           className="collapse navbar-collapse"
//           id="navbarSupportedContent"
//         >

//           {/* Navigation Links */}
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">

//             <li className="nav-item">
//               <Link
//                 className={`nav-link ${
//                   location.pathname === "/home"
//                     ? "active"
//                     : ""
//                 }`}
//                 to="/home"
//               >
//                 Home
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link
//                 className={`nav-link ${
//                   location.pathname === "/about"
//                     ? "active"
//                     : ""
//                 }`}
//                 to="/about"
//               >
//                 About
//               </Link>
//             </li>

//           </ul>

//           {/* Right Side */}
//           <div className="position-relative">

//             {isLoggedIn ? (
//               <>
//                 {/* Profile Button */}
//                 <button
//                   type="button"
//                   className="btn btn-outline-primary rounded-circle profile-button"
//                   onClick={() =>
//                     setShowProfile(!showProfile)
//                   }
//                 >
//                   <i className="fa-solid fa-user"></i>
//                 </button>

//                 {/* Profile Card */}
//                 {showProfile && (
//                   <div className="profile-dropdown shadow">

//                     <div className="text-center">

//                       <div className="profile-large-icon">
//                         <i className="fa-solid fa-user"></i>
//                       </div>

//                       <h5 className="mt-3 mb-1">
//                         {user ? user.name : "Loading..."}
//                       </h5>

//                       <p className="text-muted mb-3">
//                         {user
//                           ? user.email
//                           : "Loading email..."}
//                       </p>

//                     </div>

//                     <hr />

//                     <button
//                       type="button"
//                       className="btn btn-danger w-100"
//                       onClick={handleLogout}
//                     >
//                       <i className="fa-solid fa-right-from-bracket"></i>{" "}
//                       Logout
//                     </button>

//                   </div>
//                 )}

//               </>
//             ) : (<></>)
//             }

//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setUser(json);
      } else {
        console.log(json);
      }
    } catch (error) {
      console.error("Unable to fetch user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowProfile(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg notevault-navbar sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand notevault-brand" to="/home">
          <div className="notevault-logo">
            <i className="fa-solid fa-vault"></i>
          </div>

          <span>
            Note<span>Vault</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler notevault-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#notevaultNavbar"
          aria-controls="notevaultNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="notevaultNavbar">
          {/* Navigation */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
              <Link
                className={`nav-link notevault-link ${
                  location.pathname === "/home" ? "active" : ""
                }`}
                to="/home"
              >
                <i className="fa-solid fa-house me-1"></i>
                Home
              </Link>
            </li>
            </>
          ) : (
            <></>
          )}
            

            <li className="nav-item">
              <Link
                className={`nav-link notevault-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                <i className="fa-solid fa-circle-info me-1"></i>
                About
              </Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <>
              {/* Profile */}
              <div className="position-relative">
                <button
                  type="button"
                  className="notevault-profile-btn"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <div className="notevault-avatar">
                    <i className="fa-solid fa-user"></i>
                  </div>

                  <div className="notevault-user-name">
                    {user ? user.name : "User"}
                  </div>

                  <i
                    className={`fa-solid ${
                      showProfile ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  ></i>
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="notevault-profile-menu shadow">
                    <div className="notevault-profile-header">
                      <div className="notevault-big-avatar">
                        <i className="fa-solid fa-user"></i>
                      </div>

                      <div>
                        <h6>{user ? user.name : "Loading..."}</h6>

                        <small>{user ? user.email : "Loading..."}</small>
                      </div>
                    </div>

                    <hr />

                    <button
                      type="button"
                      className="notevault-logout"
                      onClick={handleLogout}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>

                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
