import React from 'react';
import { Link } from 'react-router-dom';

const BankTransferInstructions = () => {
  return (
    <div className="container mt-4">
      <h2>Instrukcje dotyczące płatności przelewem</h2>
      <p>Dziękujemy za złożenie zamówienia!</p>
      <p>Aby zrealizować płatność przelewem, prosimy o przelanie całkowitej kwoty na poniższe konto bankowe:</p>

      <div className="card p-3 my-3">
        <h5>Dane do przelewu:</h5>
        <p><strong>Odbiorca:</strong> Sklep z Herbatą Sp. z o.o.</p>
        <p><strong>Numer konta:</strong> 12 3456 7890 1234 5678 9012 3456</p>
        <p><strong>Tytuł przelewu:</strong> Imię i Nazwisko</p>
        <p><strong>Kwota:</strong> (kwota z zamówienia)</p>
      </div>

      <p>Po zaksięgowaniu płatności wyślemy potwierdzenie na Twój adres e-mail.</p>
      <Link to="/" className="btn btn-primary mt-3">Powrót do strony głównej</Link>
    </div>
  );
};

export default BankTransferInstructions;
