import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    // Fetch items
    useEffect(() => {
        axios.get("http://localhost:5000/api/items")
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    // Add item
    const addItem = () => {
        axios.post("http://localhost:5000/api/items", { name: newItem })
            .then(response => setItems([...items, response.data]))
            .catch(error => console.error(error));
        setNewItem("");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Simple App</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add a new item"
            />
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
