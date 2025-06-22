// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const reviews = [
  {
    id: 1,
    name: "Anna K.",
    text: "Herbaty z Black or Green są niesamowite! Aromaty i smaki przewyższają moje oczekiwania.",
  },
  {
    id: 2,
    name: "Michał R.",
    text: "Szybka dostawa i świetna jakość. Polecam każdemu, kto ceni sobie dobre herbaty.",
  },
  {
    id: 3,
    name: "Ewa Z.",
    text: "Ziołowe mieszanki pomogły mi się zrelaksować po ciężkim dniu. Fantastyczny sklep!",
  }
];

const faqs = [
  {
    question: "Jakie rodzaje herbat oferujecie?",
    answer: "Oferujemy szeroki wybór herbat czarnych, zielonych, białych oraz ziół i mieszanki ziołowe.",
  },
  {
    question: "Czy herbata jest pakowana próżniowo?",
    answer: "Tak, nasze herbaty są pakowane próżniowo, aby zachować świeżość i aromat.",
  },
  {
    question: "Jak długo trwa wysyłka zamówienia?",
    answer: "Zamówienia wysyłamy zwykle w ciągu 1-2 dni roboczych. Czas dostawy zależy od wybranej formy przesyłki.",
  }
];

const HomePage = () => {
  return (
    <div>
      <main className="text-center mb-5">
        <h1 className="mb-3">Witaj w sklepie z herbatami!</h1>

        <p className="lead px-3 px-md-0 mb-4">
          Odkryj świat wyjątkowych smaków i aromatów!<br />
          W Black or Green znajdziesz najwyższej jakości herbaty – od klasycznych czarnych i zielonych po unikalne mieszanki ziołowe.<br />
          Każda filiżanka to chwila relaksu i przyjemności, którą warto celebrować.<br />
          Dołącz do grona naszych zadowolonych klientów i zamów już dziś – poczuj różnicę w każdym łyku!
        </p>

        <div className="mb-5">
          <Link to="/teas" className="btn btn-primary mx-2">Zobacz nasze herbaty</Link>
          <Link to="/herbal-teas" className="btn btn-secondary mx-2">Herbaty ziołowe</Link>
        </div>

        {/* Opinie klientów */}
        <section className="mb-5 container">
          <h2 className="mb-4">Co mówią nasi klienci</h2>
          <div className="row justify-content-center">
            {reviews.map(({ id, name, text }) => (
              <div key={id} className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <p className="card-text">"{text}"</p>
                    <h6 className="card-subtitle text-muted mt-3">- {name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sekcja Q&A */}
        <section className="container">
          <h2 className="mb-4">Najczęściej zadawane pytania</h2>
          <div className="accordion" id="faqAccordion">
            {faqs.map(({ question, answer }, index) => (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded={index === 0}
                    aria-controls={`collapse${index}`}
                  >
                    {question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{answer}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
