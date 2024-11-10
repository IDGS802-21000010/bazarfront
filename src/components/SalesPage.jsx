import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SalesPage = () => {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/");
    }

    useEffect(() => {
        const fetchSales = async () => {

            try {
                // Realiza una solicitud GET para obtener las ventas
                const response = await axios.get('https://bazarapi-lwn9.onrender.com/api/sales');
                setSales(response.data);
            } catch (err) {
                console.log('Error al cargar las ventas:' + err);
            }
        };

        fetchSales();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Historial de Ventas</h2>
            <ul className="list-group mt-4">
                {sales.map((sale) => (
                    <li key={sale._id} className="list-group-item mb-3 p-3 shadow-sm rounded">
                        <div className="d-flex justify-content-between">
                            <h5 className="mb-1">{sale.title}</h5>
                            <p><strong>Precio:</strong> ${sale.price}</p>
                        </div>
                        <div className="mt-2">
                            <p className="mb-1"><strong>ID Producto:</strong> {sale.id}</p>
                            <p className="mb-1"><strong>Cantidad:</strong> {sale.quantity}</p>
                            <p className="mb-1"><strong>Fecha de compra:</strong> {new Date(sale.date).toLocaleString()}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="text-center mt-4 mb-4">
                <button className="btn btn-info" onClick={handleHome}>Volver</button>
            </div>
        </div>
    );
};

export default SalesPage;
