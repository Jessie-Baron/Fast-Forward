import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [clip, setClip] = useState(null);
  const [clipLoading, setClipLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
    const formData = new FormData();
    formData.append("clip", clip);

    if (password === repeatPassword) {

      setClipLoading(true);
      setHasSubmitted(true);

      console.log(formData)
      const res = await fetch('/api/clips', {
        method: "POST",
        body: formData,
      });

      const res2 = await res.json();

      if (res.ok) {
        setClipLoading(false);
      }
      else {
        setClipLoading(false);
        setHasSubmitted(false)
        // error handling
            }

      const user = {
        firstName,
        lastName,
        bio,
        imageUrl: res2.url,
        username,
        email,
        password
      }

      const data = await dispatch(signUp(user));
      if (data) {
        setErrors(data)
      }
    }
    else {
      setErrors(["Passwords must match"])
      console.log(errors)
      return;
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
  const updateImageUrl = (e) => {
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

  const updateClip = (e) => {
    const file = e.target.files[0];
    setClip(file);
  }

  return (
    <form className='signup-form' onSubmit={onSignUp}>
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
        <div id='lastname-input' className="signup-input">
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
        <center>
        <h5 className="upload-signup-header">Upload a Profile Picture!</h5>
        </center>
        <div className="signup-input">
          <input
            type="file"
            className="file-drop"
            accept="clip/*"
            encType="multipart/form-data"
            onChange={updateClip}
            required
          />
        </div>
      </div>
      <div className="submit-buttons-signup">
        <button className='submit-button-signup' type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SignUpForm;
