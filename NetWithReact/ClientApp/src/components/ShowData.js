import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ShowData = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/user/Get');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleEdit = async (id) => {
        try {
            const response = await fetch(`/user/Edit/${id}`, {
                method: 'Get', 
                headers: {
                    'Content-Type': 'application/json',
                },
                // You can send additional data in the request body if needed
                // For example: body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to edit item');
            }
            const data = await response.json();
            navigate('/Edit', { state: { editData: data } });
        } catch (error) {
            console.error('Error editing item:', error);
        }
    };

    return (
        <main>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Data</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Email</th>
                        <th style={headerStyle}>Name</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td style={cellStyle}>{item.username}</td>
                            <td style={cellStyle}>{item.name}</td> <td style={cellStyle}>
                                <button onClick={() => handleEdit(item.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

// Define inline styles
const headerStyle = {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    padding: '10px',
    border: '1px solid #dddddd',
};

const cellStyle = {
    padding: '10px',
    border: '1px solid #dddddd',
};

export default ShowData;
