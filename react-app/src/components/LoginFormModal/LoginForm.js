import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom";
import './LoginForm.css'
import SignupFormModal from "../SingUpFormModal";
import setShowModal from "./index"

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
      history.push("/")
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
      history.push("/")
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
      <div className='outer-login'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <center>
          <h2 className="modal-header">Log in to FastForward</h2>
        </center>
        <div className='inner-login'>
          <div className="login-input">
          <input
            className="loginEmailInput"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
            required
          />
          </div>
          <div>
            <div className="login-input2">
            <input
              className="loginPasswordInput"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              required
            />
            </div>
          </div>
          {/* <button className='demos' onClick={signInDemo}>
            <img className="facebook" src='https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/640px-Facebook_f_logo_%282021%29.svg.png' alt='facebook' />
            <div className="demo-text">Continue with FaceBook</div>
          </button>
          <button className='demos' onClick={signInDemo}>
            <img className="google" src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' alt='googele' />
            <div className="demo-text">Continue with Google</div>
          </button>
          <button className='demos' onClick={signInDemo}>
            <img className="insta" src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png' alt='insta' />
            <div className="demo-text">Continue with Instagram</div>
          </button> */}
          <div className="signin-buttons">
            <button id="login" className="loginBt" type="submit">
              Login
            </button>
            <button className='demo-btn' onClick={signInDemo}>
              Demo
            </button>
          </div>
        </div>
        <hr className="login-divider"/>
        <center>
        <h4 className="signup-text">Don’t have an account? <SignupFormModal onClick={setShowModal(false)} className='signup-text-navi'>Sign Up</SignupFormModal></h4>
        </center>
      </div>
    </form>
  );
};

export default LoginForm;
