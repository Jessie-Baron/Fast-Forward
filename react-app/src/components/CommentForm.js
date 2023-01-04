import { useState, useEffect } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { createComment } from "../store/comment";
import * as fastForwardActions from "../store/fastForward";
import LoginFormModal from "./LoginFormModal";
import SignupFormModal from "./SingUpFormModal";
import '../components/LoginFormModal/LoginForm.css'

function CommentForm(fastForwardId) {
  const user = useSelector((state) => state.session.user);
  const fastId = (Object.values(fastForwardId)[0])
  const [body, setBody] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!body) {
      setValidationErrors([]);
      return;
    }
    const errors = [];
    if (!body.length) errors.push("Please enter your comment");
  }, [body]);

  const onSubmit = async (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();
    setHasSubmitted(true);

    // Create a new object for the song form information.
    const commentForm = { body };

    await dispatch(createComment(fastId, commentForm))
    await dispatch(fastForwardActions.fetchAllFastForwards())

    // Reset the form state.
    setBody("");
    setValidationErrors([]);
    setHasSubmitted(false);
  };

  return (
    <form id="form1" noValidate onSubmit={onSubmit}>
      <ul>
        {validationErrors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      {user && <label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required={true}
        />
      </label>}
      {user && <button className={!body || body.length > 300 ? 'comment-button' : 'comment-button-active'} disabled={!body || body.length > 300} type="submit">Respond</button>}
      {!user && <div className="comment-signin-wrapper"><NavLink to='/' className="signin-text-comments">Please log in to comment</NavLink></div>}
    </form>
  );
}

export default CommentForm;
