import React, { useState } from "react";
import { useCookies } from "react-cookie";
import logo from "./pic/OGTodo-logos_white.png";
const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make Sure Passwords match!");
      return;
    }
    const response = await fetch(
      `https://ogtodoserverlast.vercel.app/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload();
    }
  };

  function hanle() {
    window.location = "/";
  }
  return (
    <div className="con-auth">
      <img className="logo-auth" src={logo} alt="OGTodo logo" onClick={hanle} />
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogIn ? "Please Login" : "Please SignUp !"}</h2>
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
            {!isLogIn && (
              <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <input
              type="submit"
              className="create"
              onClick={(e) => handleSubmit(e, isLogIn ? "login" : "Signup")}
            />
            {error && <p className="error">{error}</p>}
          </form>
          <div className="auth-options">
            <button
              onClick={() => viewLogin(false)}
              // style={{ backgroundColor: !isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}
            >
              Sign Up
            </button>
            <button
              // style={{ backgroundColor: isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}
              onClick={() => viewLogin(true)}
            >
              Login
            </button>
          </div>
          <p style={{ padding: "15px" }}>
            By registering, You agree to the Terms, Conditions and Policies of
            OGTodo & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
