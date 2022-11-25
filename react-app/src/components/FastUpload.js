import { useState } from "react";
import './FastForwards.css'
import NavBar from "./NavBar";


const UploadClip = () => {
    const [clip, setClip] = useState(null);
    const [clipLoading, setClipLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("clip", clip);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setClipLoading(true);

        const res = await fetch('/api/clips', {
            method: "POST",
            body: formData,
        });
        console.log(res)
        if (res.ok) {
            await res.json();
            setClipLoading(false);
        }
        else {
            setClipLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
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
                    onChange={updateClip}
                />
                <button type="submit">Submit</button>
                {(clipLoading) && <p>Loading...</p>}
            </form>
        </>
    )
}

export default UploadClip;
