import { useState, useEffect } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { editComment } from "../store/comment";
import * as fastForwardDetailsActions from "../store/fastForwardDetails"

function CommentEditForm({comment, setCommentBody, commentBody, setEditId, fastForwardId}) {

  const userId = useSelector((state) => state.session.user.id);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    if (!commentBody) {
      setValidationErrors([]);
      return;
    }
    console.log("uE running");
    const errors = [];
    if (!commentBody.length) errors.push("Please enter your comment");
  }, [commentBody]);

  const onSubmit = async (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    // Create a new object for the song form information.
    const commentForm = {body: commentBody};


    await dispatch(editComment(comment.id, commentForm, fastForwardId))
    setEditId(-1)


    // Reset the form state.
    setCommentBody("");
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
    <label>
      <textarea
      className="edit-text"
      id="edit-form-text"
        type="text"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        required
      />
    </label>
    <button type="submit">Respond</button>
  </form>
);
}

export default CommentEditForm;
