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
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>First Name</label>
          <input
            type='text'
            name='firstName'
            onChange={updatedFirstName}
            value={firstName}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type='text'
            name='lastName'
            onChange={updatedLastName}
            value={lastName}
          ></input>
        </div>
        <div>
          <label>Tell us about yourself!</label>
          <textarea
            type='text'
            name='bio'
            onChange={updatedBio}
            value={bio}
          ></textarea>
        </div>
        <div>
          <label>Upload a Profile Picture!</label>
          <input
            type='text'
            name='imageUrl'
            onChange={updatedImageUrl}
            value={imageUrl}
          ></input>
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    );
  };

  export default SignUpForm;
