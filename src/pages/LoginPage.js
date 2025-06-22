import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${process.env.REACT_APP_API_URL}/api/login', formData);

      if (response.status === 200) {
        // Zapisz sesję w LocalStorage lub ciasteczku
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', response.data.username);
        
        navigate('/admin');  // Przekierowanie do strony admina
      }
    } catch (err) {
      setError('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Logowanie do panelu administratora</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Login</label>
          <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Hasło</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Zaloguj się</button>
      </form>
    </div>
  );
};

export default LoginPage;
