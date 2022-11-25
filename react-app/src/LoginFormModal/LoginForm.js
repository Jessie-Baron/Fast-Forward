import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom";
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)).then(
      history.push("/home")
    );
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const signInDemo = async (e) => {
    // e.preventDefault()
    // setErrors([]);
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password")).then(
      history.push("/home")
    );
    if (data) {
      setErrors(data);
    }
  };

  // if (user) {
  //   return <Redirect to="/" />;
  // }

  return (
    <form className="loginForm" onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <center>
        <h2>Welcome back.</h2>
        </center>
        <div>
          <label className="loginEmail" htmlFor="email">
            Email
          </label>
        </div>
        <input
          className="loginEmailInput"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <div>
          <label className="loginPassword" htmlFor="password">
            Password
          </label>
        </div>
        <input
          className="loginPasswordInput"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div>
        <button className="loginBt" type="submit">
          Login
        </button>
        <button onClick={signInDemo}>
          Demo
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
