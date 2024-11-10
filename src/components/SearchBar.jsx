// src/components/SearchBar.js
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(query);  // Llama a la función onSearch que ejecutará la búsqueda
        }
    };

    return (
        <div className="container mb-4">
            <div className="row">
                <div className="col-2">
                    <Link to="/">
                        <img src="/shopBag.png" alt="Bazar Icon" width="50" />
                    </Link>
                </div>
                <div className="col-10">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}  // Actualiza el query al cambiar el input
                        onKeyPress={handleKeyPress}  // Activa la búsqueda al presionar Enter
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
