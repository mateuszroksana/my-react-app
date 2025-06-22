import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('${process.env.REACT_APP_API_URL}/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Błąd podczas pobierania zamówień:', error);
      setLoading(false);
    }
  };

  // Funkcja do oznaczania zamówienia jako zrealizowane
  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/complete`);
      fetchOrders();  // Odśwież listę zamówień po aktualizacji
    } catch (error) {
      console.error('Błąd podczas aktualizacji zamówienia:', error);
    }
  };

  if (loading) {
    return <p>Ładowanie zamówień...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Lista zamówień</h2>
      {orders.length === 0 ? (
        <p>Brak zamówień do wyświetlenia.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Imię i Nazwisko</th>
                <th>Email</th>
                <th>Adres</th>
                <th>Metoda płatności</th>
                <th>Produkty</th>
                <th>Łączna kwota</th>
                <th>Data zamówienia</th>
                <th>Status</th>
                <th>Akcja</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className={order.status === 'zrealizowane' ? 'table-success' : ''}>
                  <td>{index + 1}</td>
                  <td>{order.customerName}</td>
                  <td>{order.email}</td>
                  <td>{order.address}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <ul className="list-unstyled">
                      {order.products.map(product => (
                        <li key={product.productId}>
                          {product.name} - {product.quantity} szt. ({product.price} PLN)
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.totalCost} PLN</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>{order.status === 'zrealizowane' ? 'Zrealizowane' : 'Niezrealizowane'}</td>
                  <td>
                    {order.status !== 'zrealizowane' && (
                      <button className="btn btn-success btn-sm" onClick={() => handleCompleteOrder(order._id)}>
                        Zrealizuj
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
