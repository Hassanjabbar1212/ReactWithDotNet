import React, { useState } from 'react';
const Registertion = () => {
    const [formData, setFormData] = useState({ username: '', password: '' , Name:'' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('/user/CreateUser', {
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
                return response.json();
            })
            .then(data => {
                // Handle successful response from the server
                console.log('Success:', data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Email"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="Name"
                    placeholder="Enter Name"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </main>

    )
}
export default Registertion