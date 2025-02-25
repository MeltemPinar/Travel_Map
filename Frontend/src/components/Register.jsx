import axios from "axios";
import "./register.css";
import { useRef, useState } from "react";

const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/users/register", newUser);
      console.log("USEEER", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      console.log("ERRRROOR", err.message);
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <span>Pin</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {success && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <button className="registerCancel" onClick={() => setShowRegister(false)}>
        Cancel
      </button>
    </div>
  );
};

export default Register;
