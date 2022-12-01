import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './FastForwards.css'
import * as fastForwardActions from "../store/fastForward";
import NavBar from "./NavBar";


const UploadClip = () => {
    const [clip, setClip] = useState(null);
    const [clipLoading, setClipLoading] = useState(false);
    const [caption, setCaption] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()




    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("clip", clip);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setClipLoading(true);
        setHasSubmitted(true);

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
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }

        const fastForward = {
            caption,
            url: res2.url
        }

        await dispatch(fastForwardActions.fetchPostFastForward(fastForward))
            .then(history.push('/'))
    }

    const updateClip = (e) => {
        const file = e.target.files[0];
        setClip(file);
    }

    const handleClick = event => {
        event.currentTarget.disabled = true;
      };


    return (
        <div className="upload-page">
            <div className="upload-headline-wrapper">
                <h3 className="upload-title">Upload Video</h3>
                <h4 className="upload-subtitle">Post a video to your account</h4>
            </div>
            <form className="upload-form" onSubmit={handleSubmit}>
                <div className="form-fields">
                <div className="upload-block">
                    <h4 className="upload-header-text">Select video to upload</h4>
                        <i id='cloud-icon' class="fa-solid fa-cloud-arrow-up"></i>

                        <br />
                        <center>
                        <ul className="upload-list">
                        <h5 className="upload-sub-text">MP4 or WebM</h5>
                        <h5 className="upload-sub-text">720x1280 resolution or higher</h5>
                        <h5 className="upload-sub-text">Up to 10 minutes</h5>
                        <h5 className="upload-sub-text">Less than 2 GB</h5>
                        </ul>
                        </center>
                    <input
                        type="file"
                        className="file-drop"
                        accept="clip/*"
                        encType="multipart/form-data"
                        onChange={updateClip}
                    />
                </div>
                <div className='caption-block'>
                    <label className="caption-label">Caption</label>
                    <input
                        type="text"
                        className="caption-input"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div className="submit-buttons">
                <button className='submit-button-upload' onClick={handleClick}type="submit">Submit</button>
                {(clipLoading) && <p>Loading...</p>}
                </div>
            </form>
        </div>
    )
}

export default UploadClip;
