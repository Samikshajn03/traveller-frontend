import React, { useState, useEffect } from 'react';
import '/src/styles/ContentBox.scss';

export default function AddTextboxes() {
    // Get the username from localStorage (it should be stored when the user logs in)
    const username = localStorage.getItem('username');  // Assuming 'username' is stored in localStorage

    // Initialize textboxes state
    const [textboxes, setTextboxes] = useState(() => {
        if (username) {
            const savedTextboxes = localStorage.getItem(`${username}-textboxes`);
            return savedTextboxes ? JSON.parse(savedTextboxes) : [];
        }
        return [];
    });

    // Add new textbox
    const addTextbox = () => {
        if (username) {
            setTextboxes((prevTextboxes) => {
                const newTextboxes = ["", ...prevTextboxes];
                localStorage.setItem(`${username}-textboxes`, JSON.stringify(newTextboxes));
                return newTextboxes;
            });
        }
    };

    // Handle text change in a textbox
    const handleTextChange = (e, index) => {
        if (username) {
            const updatedTextboxes = textboxes.map((textbox, i) =>
                i === index ? e.target.value : textbox
            );
            setTextboxes(updatedTextboxes);
            localStorage.setItem(`${username}-textboxes`, JSON.stringify(updatedTextboxes));
        }
    };

    // Delete a textbox
    const deleteTextbox = (index) => {
        if (username) {
            const updatedTextboxes = textboxes.filter((_, i) => i !== index);
            setTextboxes(updatedTextboxes);
            localStorage.setItem(`${username}-textboxes`, JSON.stringify(updatedTextboxes));
        }
    };

    return (
        <div className="add-textbox-container">
            <div className="textboxes">
                {textboxes.map((textbox, index) => (
                    <div key={index} className="textbox-container">
                        <input
                            type="text"
                            value={textbox}
                            onChange={(e) => handleTextChange(e, index)}
                            placeholder="Add Destination..."
                        />
                        <button
                            className="delete-button"
                            onClick={() => deleteTextbox(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="add-button" onClick={addTextbox}>
                +
            </div>
        </div>
    );
}
