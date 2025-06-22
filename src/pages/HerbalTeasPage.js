// src/pages/HerbalPage.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const HerbalTeasPage = () => {
  const [herbalTeas, setHerbalTeas] = useState([]);  // Stan do przechowywania herbat ziołowych
  const [loading, setLoading] = useState(true);  // Stan ładowania
  const [error, setError] = useState(null);  // Stan do obsługi błędów

  useEffect(() => {
    const fetchHerbalTeas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/herbal-teas');  // Pobieramy dane z backendu
        const data = await response.json();

        console.log('Otrzymane dane:', data);  // Logowanie danych przed ustawieniem stanu

        if (Array.isArray(data)) {
          setHerbalTeas(data);  // Ustawiamy dane herbat ziołowych
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

    fetchHerbalTeas();  // Wywołanie funkcji po załadowaniu komponentu
  }, []);

  if (loading) return <div>Ładowanie...</div>;  // Wyświetl komunikat ładowania
  if (error) return <div>{error}</div>;  // Wyświetl komunikat błędu

  return (
    <div>
      <main className="container mt-4">
        <h1>Nasze Herbaty Ziołowe</h1>
        <div className="row">
          {herbalTeas.length > 0 ? (
            herbalTeas.map((tea) => (
              <div className="col-md-4 mb-4" key={tea.id}> {/* Używamy tea.id */}
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

export default HerbalTeasPage;
