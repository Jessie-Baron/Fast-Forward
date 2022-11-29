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

    return (
        <>
            <form className="upload-form" onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="clip/*"
                    encType="multipart/form-data"
                    onChange={updateClip}
                />
                <label>
                    <textarea
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
                {(clipLoading) && <p>Loading...</p>}
            </form>
        </>
    )
}

export default UploadClip;
