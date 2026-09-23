import React, { useState } from "react"; // <-- Added { useState }

function Contact() {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false); // Second state variable

    return (
        <div>
            <h1>Contact</h1>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            {/* Button to toggle visibility */}
            <button onClick={() => setIsVisible(!isVisible)}>
                Toggle Help
            </button>

            {/* Conditionally rendered help text */}
            {isVisible && <p>Help: Type your message in the input box.</p>}
        </div>
    )
}

export default Contact;
