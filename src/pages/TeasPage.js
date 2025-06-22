// src/pages/TeasPage.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const TeasPage = () => {
  const [teas, setTeas] = useState([]);  // Stan do przechowywania produktów herbat
  const [loading, setLoading] = useState(true);  // Stan ładowania
  const [error, setError] = useState(null);  // Stan do obsługi błędów

  useEffect(() => {
    const fetchTeas = async () => {
      try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/api/teas');  // Pobieramy dane z backendu
        const data = await response.json();

        console.log('Otrzymane dane:', data);  // Logowanie danych przed ustawieniem stanu

        if (Array.isArray(data)) {
          setTeas(data);  // Ustawienie danych herbat
        } else {
          setError('Błąd ładowania danych');
        }
      } catch (error) {
        setError('Błąd ładowania danych');
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeas();  // Wywołanie funkcji po załadowaniu komponentu
  }, []);

  if (loading) return <div>Ładowanie...</div>;  // Wyświetl komunikat ładowania
  if (error) return <div>{error}</div>;  // Wyświetl komunikat błędu

  return (
    <div>
      <main className="container mt-4">
        <h1>Nasze Herbaty</h1>
        <div className="row">
          {teas.length > 0 ? (
            teas.map((tea) => (
              <div className="col-md-4 mb-4" key={tea.id}>  {/* Używamy tea.id */}
                <ProductCard product={tea} />
              </div>
            ))
          ) : (
            <p>Brak produktów do wyświetlenia.</p>  // Komunikat, gdy brak danych
          )}
        </div>
      </main>
    </div>
  );
};

export default TeasPage;
