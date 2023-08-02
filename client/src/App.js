// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error al obtener los elementos:', error));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de elementos</h1>
      <input type="text" placeholder="Filtrar por nombre" onChange={handleFilterChange} />
      <ul>
        {filteredItems.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
