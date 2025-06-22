// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <main className="text-center">
        <h1>Witaj w sklepie z herbatami!</h1>
        <p>Znajdź najlepsze herbaty i zioła, które będą Ci towarzyszyć każdego dnia.</p>
        <div className="mt-4">
          <Link to="/teas" className="btn btn-primary mx-2">Zobacz nasze herbaty</Link>
          <Link to="/herbal-teas" className="btn btn-secondary mx-2">Herbaty ziołowe</Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
