import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationButton from './NotificationButton';


const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');  // Pobierz nazwę użytkownika

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Black or Green</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Jeśli użytkownik to admin, pokaż linki admina */}
            {isLoggedIn && username === 'admin' ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/orders">Zamówienia</Link> {/* Nowy link do zamówień */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/products">Produkty</Link> {/* Nowy link do produktów */}
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Wyloguj</button>
                </li>
              </>
            ) : (
              <>
                {/* Standardowe linki dla zwykłych użytkowników */}
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teas">Herbaty</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/herbal-teas">Herbaty Ziołowe</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Koszyk</Link>
                </li>
                <li className="nav-item">
                  <NotificationButton />
                </li>
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">Admin</Link> {/* Link admina widoczny dla zalogowanych */}
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={handleLogout}>Wyloguj</button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Zaloguj</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
