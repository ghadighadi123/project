import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Validation from "./Validation";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = setErrors(Validation(values));
    // console.log(Validation(values));
    // console.log(values);
  };
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  return (
    <div className="d-flex justify-content-center align-items-center  bg-primary vh-100">
      <div className="p-3 bg-white w-25 rounded">
        <h2>Sign-In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-20"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log in
          </button>
          <p>Lorem ipsum dolor sit amet.</p>
          <Link
            to="/dashboard"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Brief Description"
            sx={{ gridColumn: "span 4" }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
