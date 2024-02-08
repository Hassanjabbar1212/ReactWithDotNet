import React, { useState, useEffect } from 'react';

const Edit = ({ location }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(location.state.editData);

    useEffect(() => {
        setFormData(location.state.editData);
    }, [location.state.editData]);

    const handleEditClick = () => {
        setIsEditing(!isEditing); // Toggle the edit state
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = () => {
        // Send updated data to the controller
        fetch('/user/UpdateData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Handle successful response from the server
                console.log('Data updated successfully');
                setIsEditing(false); // Exit edit mode
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <input
                type="text"
                name="editableContent"
                value={formData.editableContent}
                onChange={handleInputChange}
                disabled={!isEditing} // Disable input when not editing
            />
            <button onClick={handleEditClick}>
                {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
                <button onClick={handleSaveClick}>Save</button>
            )}
        </div>
    );
};

export default Edit;
