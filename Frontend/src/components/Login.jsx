import axios from "axios";
import "./login.css";
import { useRef, useState } from "react";

const Login = ({ setShowLogin, setCurrentUsername, myStorage }) => {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      setCurrentUsername(res.data.username);
      myStorage.setItem("user", res.data.username);
      setShowLogin(false);
    } catch (err) {
      console.log("HATAAA", err);
      setError(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="logo">
        <span>Pin</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginbtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <button className="loginCancel" onClick={() => setShowLogin(false)}>
        Login Cancel
      </button>
    </div>
  );
};

export default Login;
