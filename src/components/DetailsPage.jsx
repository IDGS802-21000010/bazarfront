import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import StarRating from './StarRating';

const DetailsPage = () => {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const [product, setProduct] = useState(null);
    const [purchaseStatus, setPurchaseStatus] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`https://bazarapi-lwn9.onrender.com/api/items/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.log('Producto no encontrado: ' + err);
            }
        };

        fetchItemDetails();
    }, [id]);

    const handlePurchase = async () => {
        try {
            const response = await axios.post('https://bazarapi-lwn9.onrender.com/api/addSale', {
                item_id: product._id,
                quantity: 1,
                date: new Date().toISOString(),
            });

            if (response.data.success) {
                setPurchaseStatus('Compra realizada con éxito');
            } else {
                setPurchaseStatus('Error al realizar la compra');
            }
        } catch (err) {
            setPurchaseStatus('Error al conectar con el servidor: ' + err);
        }
    };

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/items?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="container mt-4">
            <SearchBar onSearch={handleSearch} />
            {product && (
                <>
                    {product.images && product.images.length > 0 && (
                        <Carousel className="mb-4">
                            {product.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100 rounded-circle"
                                        src={image}
                                        alt={`Imagen ${index + 1}`}
                                        style={{ maxHeight: '250px', objectFit: 'contain' }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                    <div className='justify-content-center align-items-center text-center'>
                        <h1 className='h1'>{product.title}</h1>
                        <p><strong>{product.category}</strong></p>
                        <h4>{product.description}</h4>
                        <div className='row mb-3 mt-3'>
                            <div className='col'><h4>${product.price}</h4></div>
                            <div className='col'><h4><StarRating rating={product.rating} /></h4></div>
                        </div>
                        {purchaseStatus && <p className="mt-3 fs-4 text-warning">{purchaseStatus}</p>}
                        <button className="btn btn-success" onClick={handlePurchase}>Comprar</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailsPage;
