import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = (e) => {
    //   e.preventDefault();
    //   signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       const user = userCredential.user; // Corrected this line
    //       console.log(user);
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       setError(true); // Set error state to true
    //       console.error(errorCode, errorMessage);
    //     });
  };

  return (
    <div className="login">
      <form onSubmit={handlelogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
        {error && <span>wrong email or password!</span>}
      </form>
    </div>
  );
};

export default Login;
