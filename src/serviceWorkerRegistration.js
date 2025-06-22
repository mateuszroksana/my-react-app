// Funkcja rejestrująca service worker
export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js') // Rejestracja pliku service-worker.js
          .then((registration) => {
            console.log('Service Worker zarejestrowany: ', registration);
          })
          .catch((error) => {
            console.log('Błąd rejestracji Service Worker: ', error);
          });
      });
    }
  }
  
  // Funkcja do wyrejestrowania service workera (przydatne w trybie deweloperskim)
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
      });
    }
  }
  