import React from "react"


function TextInput() {
    return(
        <div className="make-post">
            <input className="text-field" placeholder="Anything New?" />
            <button className="text-button">Post</button>
        </div>
    )
}

export default TextInput;