import { useState, useEffect } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { editComment } from "../store/comment";
import * as fastForwardActions from "../store/fastForward";
import { editFastForwardDetails } from "../store/fastForwardDetails";

function CaptionEditForm({setCaptionBody, captionBody, setShowEdit, fastForwardId}) {
  console.log(fastForwardId, "this is the fastForwardId")
  const userId = useSelector((state) => state.session.user.id);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    if (!captionBody) {
      setValidationErrors([]);
      return;
    }
    console.log("uE running");
    const errors = [];
    if (!captionBody.length) errors.push("Please enter your comment");
  }, [captionBody]);

  const onSubmit = async (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    // Create a new object for the caption form information.
    const captionForm = {caption: captionBody};


    await dispatch(fastForwardActions.fetchEditFastForward(fastForwardId, captionForm))
    await dispatch(fastForwardActions.fetchAllFastForwards())
    setShowEdit(false)


    // Reset the form state.
    setCaptionBody("");
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
        value={captionBody}
        onChange={(e) => setCaptionBody(e.target.value)}
        required
      />
    </label>
    <button type="submit">Respond</button>
  </form>
);
}

export default CaptionEditForm;
