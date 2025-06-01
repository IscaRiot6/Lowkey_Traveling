import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../api/userApi';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { loginUser } = userApi();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username: form.username, password: form.password });
      login({ id: res.token, email: form.username }); // or adjust structure if your backend returns more
      navigate('/dashboard'); // or wherever your protected route is
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="button" onClick={toggleVisibility}>
        {showPassword ? '🙈 Hide' : '👁️ Show'}
      </button>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;
