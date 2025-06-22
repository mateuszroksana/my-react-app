import React, { useState, useEffect } from 'react';  // Importujemy useState i useEffect
import AdminProductForm from '../components/AdminProductForm'; // Komponent formularza do dodawania/edycji produktów

const AdminPage = () => {

  // Stan do formularza produktu
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('teas');  // Domyślnie ustawiamy 'teas'
  const [imageUrl, setImageUrl] = useState('');

  // Stan do przechowywania produktów i edytowania
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);
  const [error, setError] = useState('');

  // Funkcja do pobierania produktów z backendu
  const fetchProducts = async () => {
    try {
      // Pobieranie produktów herbat
      const teaResponse = await fetch('http://localhost:5000/api/teas');
      const teaData = await teaResponse.json();
      if (teaResponse.ok) {
        setProducts((prevProducts) => {
          const teaIds = new Set(prevProducts.map((product) => product._id)); // Zbiór istniejących ID
          const newTeas = teaData.filter((product) => !teaIds.has(product._id)); // Filtrujemy, by dodać tylko nowe herbaty
          return [...prevProducts, ...newTeas]; // Dodajemy nowe herbaty
        });
      } else {
        setError('Błąd pobierania herbat');
      }

      // Pobieranie produktów herbat ziołowych
      const herbalTeaResponse = await fetch('http://localhost:5000/api/herbal-teas');
      const herbalTeaData = await herbalTeaResponse.json();
      if (herbalTeaResponse.ok) {
        setProducts((prevProducts) => {
          const herbalTeaIds = new Set(prevProducts.map((product) => product._id)); // Zbiór istniejących ID
          const newHerbalTeas = herbalTeaData.filter((product) => !herbalTeaIds.has(product._id)); // Filtrujemy, by dodać tylko nowe herbaty ziołowe
          return [...prevProducts, ...newHerbalTeas]; // Dodajemy nowe herbaty ziołowe
        });
      } else {
        setError('Błąd pobierania herbat ziołowych');
      }
    } catch (error) {
      setError('Błąd podczas pobierania produktów');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();  // Wywołanie funkcji po załadowaniu komponentu
  }, []);  // Przekazujemy pustą tablicę, aby wywołać tylko raz przy załadowaniu komponentu

  // Funkcja do rozpoczęcia edycji produktu
  const handleEdit = (product) => {
    setIsEditing(true);
    setProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category);
    setImageUrl(product.imageUrl);  // Przypisanie danych produktu do formularza
  };

  // Funkcja do obsługi formularza dodawania/edycji
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !imageUrl) {
      setError('Wszystkie pola są wymagane!');
      return;
    }

    const newProduct = { name, price, description, category, imageUrl };

    try {
      const response = isEditing
        ? await fetch(`http://localhost:5000/api/admin/products/${productId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
          })
        : await fetch('http://localhost:5000/api/admin/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
          });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);  // Komunikat zwrócony z backendu
        setIsEditing(false);
        setProductId(null);
        setName('');
        setPrice('');
        setDescription('');
        setCategory('teas');
        setImageUrl('');
        
        // Jeśli edytujemy, zamieniamy stary produkt na nowy
        if (isEditing) {
          setProducts((prevProducts) => prevProducts.map(product =>
            product._id === productId ? data.product : product
          ));
        } else {
          // Jeśli dodajemy nowy produkt, dodajemy go do listy
          setProducts((prev) => [data.product, ...prev]);
        }
      } else {
        setError(data.message || 'Błąd podczas dodawania/edycji produktu');
      }
    } catch (error) {
      setError('Błąd podczas łączenia z serwerem');
      console.error('Błąd przy wysyłaniu:', error);
    }
  };

  // Funkcja do usuwania produktu
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Na pewno chcesz usunąć ten produkt?');

    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        if (response.ok) {
          setProducts(products.filter((product) => product._id !== id));  // Usuwamy produkt z listy
          setError('');
        } else {
          setError(data.message || 'Błąd przy usuwaniu produktu');
        }
      } catch (error) {
        setError('Błąd przy usuwaniu produktu');
      }
    }
  };

  return (
    <div>
      <h2>Panel Administratora</h2>

      {/* Komunikaty o błędach */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Lista produktów */}
      {/*<h3>Lista produktów</h3>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id}>
              <strong>{product.name}</strong> - {product.price} - {product.description}
              <button onClick={() => handleEdit(product)}>Edytuj</button>
              <button onClick={() => handleDelete(product._id)}>Usuń</button>
            </li>
          ))
        ) : (
          <p>Brak produktów do wyświetlenia.</p>
        )}
      </ul>*/}

      {/* Formularz do dodawania/edycji produktów */}
      <AdminProductForm
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        productId={productId}
        setProductId={setProductId}
        setProducts={setProducts}
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </div>
  );
};

export default AdminPage;
