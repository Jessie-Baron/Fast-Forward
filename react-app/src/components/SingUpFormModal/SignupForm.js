import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
      e.preventDefault();
      if (password === repeatPassword) {
        const data = await dispatch(signUp(firstName, lastName, bio, imageUrl, username, email, password));
        if (data) {
          setErrors(data)
        }
      }
    };

    const updatedFirstName = (e) => {
      setFirstName(e.target.value);
    };
    const updatedLastName = (e) => {
      setLastName(e.target.value);
    };
    const updatedBio = (e) => {
      setBio(e.target.value);
    };
    const updatedImageUrl = (e) => {
      setImageUrl(e.target.value);
    };

    const updateUsername = (e) => {
      setUsername(e.target.value);
    };

    const updateEmail = (e) => {
      setEmail(e.target.value);
    };

    const updatePassword = (e) => {
      setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
      setRepeatPassword(e.target.value);
    };

    if (user) {
      return <Redirect to='/' />;
    }

    return (
      <form className='signup-form'onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <center>
          <h2 className="modal-header">Sign Up</h2>
        </center>
        <div className="signup-scroll-content">
        <div className="signup-input">
          <input
            className="loginEmailInput"
            type='text'
            name='firstName'
            placeholder="First Name"
            onChange={updatedFirstName}
            value={firstName}
            required
          ></input>
        </div>
        <div id='lastname-input'className="signup-input">
          <input
            className="loginEmailInput"
            type='text'
            name='lastName'
            placeholder="Last Name"
            onChange={updatedLastName}
            value={lastName}
            required
          ></input>
        </div>
        <div className="signup-input" id='signup-textarea'>
          <textarea
            className="loginEmailInput"
            type='text'
            name='bio'
            placeholder="Tell us about yourself!"
            onChange={updatedBio}
            value={bio}
            required
          ></textarea>
        </div>
        <div className="signup-input">
          <input
            className="loginEmailInput"
            type='text'
            name='imageUrl'
            placeholder="Upload a Profile Picture!"
            onChange={updatedImageUrl}
            value={imageUrl}
            required
          ></input>
        </div>
        <div className="signup-input">
          <input
            className="loginEmailInput"
            type='text'
            name='username'
            placeholder="User Name"
            onChange={updateUsername}
            value={username}
            required
          ></input>
        </div>
        <div className="signup-input">
          <input
            className="loginEmailInput"
            type='text'
            name='email'
            placeholder="Email"
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        <div className="signup-input">
          <input
            className="loginEmailInput"
            type='password'
            name='password'
            placeholder="Password"
            onChange={updatePassword}
            value={password}
            required
          ></input>
        </div>
        <div className="signup-input">
          <input
            className="loginEmailInput"
            type='password'
            name='repeat_password'
            placeholder="Repeat Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        </div>
        <button className='signup-button' type='submit'>Sign Up</button>
      </form>
    );
  };

  export default SignUpForm;
