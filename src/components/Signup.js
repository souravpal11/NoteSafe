import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "name") {
      // Allow only letters and spaces
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);

        props.showAlert("Account Created Successfully", "success");

        navigate("/home");
      } else {
        props.showAlert(json.error, "danger");
      }
    } catch (error) {
      console.error(error);

      props.showAlert("Unable to connect to server", "danger");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <i className="fa-solid fa-user-plus"></i>
          </div>

          <h2>Create Account</h2>

          <p>Create your account to start managing your notes</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your name"
              pattern="[A-Za-z\s]+"
              title="Name can contain only letters and spaces"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter password"
              minLength={4}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              placeholder="Confirm password"
              minLength={4}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 auth-button"
            disabled={
              credentials.name.length < 2 ||
              credentials.email.length < 5 ||
              credentials.password.length < 5 ||
              credentials.cpassword.length < 5
            }
          >
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span> <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     cpassword: "",
//   });

//   const navigate = useNavigate();

//   const onChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { name, email, password, cpassword } = credentials;

//     // Check password
//     if (password !== cpassword) {
//       alert("Password and Confirm Password do not match");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/auth/createuser",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name,
//             email,
//             password,
//           }),
//         }
//       );

//       const json = await response.json();

//       console.log(json);

//       if (json.success) {
//         // Save authentication token
//         localStorage.setItem("token", json.authToken);

//         // Redirect to home
//         navigate("/home");
//       } else {
//         alert(json.error);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong. Please check if your backend server is running.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label
//             htmlFor="exampleInputName1"
//             className="form-label"
//           >
//             Name
//           </label>

//           <input
//             type="text"
//             className="form-control"
//             id="exampleInputName1"
//             onChange={onChange}
//             name="name"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email address
//           </label>

//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             onChange={onChange}
//             name="email"
//             required
//           />

//           <div id="emailHelp" className="form-text">
//             We'll never share your email with anyone else.
//           </div>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>

//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             onChange={onChange}
//             name="password"
//             minLength={5}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="cpassword" className="form-label">
//             Confirm Password
//           </label>

//           <input
//             type="password"
//             className="form-control"
//             id="cpassword"
//             onChange={onChange}
//             name="cpassword"
//             minLength={5}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
