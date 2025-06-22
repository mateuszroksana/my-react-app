import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          {/* Kontakt */}
          <div className="col-md-3">
            <h5>Kontakt</h5>
            <p>Email: kontakt@blackorgreen.pl</p>
            <p>Telefon: +48 123 456 789</p>
          </div>

          {/* Regulamin */}
          <div className="col-md-3">
            <h5>Regulamin</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/regulamin" className="text-white">Regulamin sklepu</Link>
              </li>
            </ul>
          </div>

          {/* Polityka prywatności */}
          <div className="col-md-3">
            <h5>Polityka</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/polityka-prywatnosci" className="text-white">Polityka prywatności</Link>
              </li>
            </ul>
          </div>

          {/* Zwroty i reklamacje */}
          <div className="col-md-3">
            <h5>Zwroty</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/zwroty" className="text-white">Zwroty i reklamacje</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Black or Green. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
};

export default Footer;
