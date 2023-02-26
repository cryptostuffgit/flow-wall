import { on } from "events";
import React, { useState } from "react"


function TextInput({onClick}) {

    const [text, setText] = useState('')


    return(
        <div className="make-post">
            <input onChange={(e) => setText(e.target.value)} className="text-field" placeholder="Anything New?" />
            <button onClick={() => {onClick(text)}} className="text-button">Post</button>
        </div>
    )
}

export default TextInput;