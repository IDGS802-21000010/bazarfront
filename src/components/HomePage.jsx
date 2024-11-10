import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/items?search=${encodeURIComponent(searchQuery)}`);  // Redirige con la query de búsqueda
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();  // Llama la búsqueda al presionar "Enter"
        }
    };

    return (
        <div className="p-4 d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
            <div className="mb-4">
                <img src="/shopBag.png" alt="Bazar Icon" width="100" />
            </div>
            <div className="mt-4 mb-4">
                <h1 className="h1">Bazar Online</h1>
            </div>
            <div className="mt-4 mb-4" style={{ width: "100%", maxWidth: "400px" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}  // Actualiza el estado del query
                    onKeyPress={handleKeyPress}  // Llama a la búsqueda cuando se presiona "Enter"
                />
            </div>
            <div style={{ width: "100%", maxWidth: "400px" }}>
                <button type="button" className="btn btn-primary w-100" onClick={handleSearch}>Buscar</button>
            </div>
        </div>
    );
};

export default HomePage;
