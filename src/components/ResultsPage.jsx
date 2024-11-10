import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import StarRating from './StarRating';

export const ResultsPage = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const searchQuery = new URLSearchParams(location.search).get('search') || '';

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`https://bazarapi-lwn9.onrender.com/api/items?search=${encodeURIComponent(searchQuery)}`);
                setProducts(response.data);
            } catch (e) {
                console.error("Error" + e);
            }
        };

        if (searchQuery) {
            fetchItems();
        }
    }, [searchQuery]);

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/items?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="container mt-4">
            <SearchBar onSearch={handleSearch} />
            <h5 className='h5'>Resultados de la busqueda de {searchQuery}: {products.length}</h5>
            <ul className="list-group mt-4">
                {products.map((product) => (
                    <li
                        key={product._id}
                        className="list-group-item shadow-sm d-flex align-items-center m-2"
                        onClick={() => navigate(`/items/${product.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={product.thumbnail} alt={product.title} className="img-thumbnail me-3 rounded-circle" style={{ width: '100px', height: '100px' }} />
                        <div className="flex-grow-1">
                            <div className='d-flex mb-3'>
                                <div className='p-2 bd-highlight'><h5 className="mb-1">{product.title}</h5></div>
                                <div className='ms-auto p-2 bd-highlight'><p>{product.category}</p></div>
                            </div>
                            <div className='d-flex'>
                                <p className="mb-1 text-muted">{product.description}</p>
                            </div>
                            <div className='d-flex mb-3'>
                                <div className='p-2 bd-highlight'><strong>${product.price}</strong></div>
                                <div className='ms-auto p-2 bd-highlight'><StarRating rating={product.rating} /></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsPage;
