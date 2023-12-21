import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(values);
  }, [values]);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(
      (prev) => ({ ...prev, [event.target.name]: event.target.value }),
      () => {
        console.log(values);
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8800/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/team");
          } else {
            alert("No Record");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center  bg-#fcfcfc vh-100">
      <div className="p-3 bg-#141414 w-25 rounded">
        <h2>SIGN IN</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>EMAIL:</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-20"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>PASSWORD:</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-20"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            className="btn  w-100 rounded-20"
            style={{ backgroundColor: "#9088c8", color: "#fff" }}
          >
            Log in
          </button>

          <p>Login or Create New Account! </p>
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
