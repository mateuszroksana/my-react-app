import React, { useState, useEffect } from 'react';

const AdminProductForm = () => {
  const [products, setProducts] = useState([]);  // Lista produktów
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('teas');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState('');

  // Pobieranie produktów po załadowaniu komponentu
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teas');  // Pobieramy herbaty
      const herbalResponse = await fetch('http://localhost:5000/api/herbal-teas');  // Pobieramy herbaty ziołowe

      const teas = await response.json();
      const herbalTeas = await herbalResponse.json();

      setProducts([...teas, ...herbalTeas]);  // Łączymy produkty w jedną listę
    } catch (error) {
      console.error('Błąd podczas pobierania produktów:', error);
    }
  };

  // Funkcja obsługująca dodawanie i edycję produktu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !imageUrl) {
      setError('Wszystkie pola muszą być wypełnione');
      return;
    }

    const newProduct = { name, price, description, category, imageUrl };

    try {
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:5000/api/admin/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });
      } else {
        response = await fetch('http://localhost:5000/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });
      }

      const data = await response.json();
      if (response.ok) {
        setName('');
        setPrice('');
        setDescription('');
        setImageUrl('');
        setCategory('teas');
        setError('');
        setIsEditing(false);
        setProductId('');
        fetchProducts();  // Odśwież listę po dodaniu/edycji
      } else {
        setError(data.message || 'Wystąpił błąd');
      }
    } catch (error) {
      setError('Błąd podczas wysyłania danych');
    }
  };

  // Funkcja do wczytywania produktu do edycji
  const handleEdit = (product) => {
    setIsEditing(true);
    setProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImageUrl(product.imageUrl);
    setCategory(product.category || 'teas');
  };

  // Funkcja do usuwania produktu
  const handleDelete = async (id, category) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category }),
        });

        if (response.ok) {
          fetchProducts();  // Odśwież listę po usunięciu
        } else {
          const data = await response.json();
          setError(data.message || 'Błąd podczas usuwania produktu');
        }
      } catch (error) {
        setError('Błąd podczas usuwania produktu');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Edytuj produkt' : 'Dodaj nowy produkt'}</h2>

      {/* Formularz */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nazwa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cena"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Opis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="URL zdjęcia"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="teas">Herbaty</option>
            <option value="herbal-teas">Herbaty Ziołowe</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Zaktualizuj produkt' : 'Dodaj produkt'}
        </button>
      </form>

      {/* Wyświetlanie błędów */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tabela z produktami */}
      <h3>Lista produktów</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nazwa</th>
              <th>Cena</th>
              <th>Opis</th>
              <th>Kategoria</th>
              <th>Zdjęcie</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price} PLN</td>
                <td>{product.description}</td>
                <td>{product.category === 'herbal-teas' ? 'Herbaty Ziołowe' : 'Herbaty'}</td>
                <td>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>
                    Edytuj
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id, product.category)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductForm;
