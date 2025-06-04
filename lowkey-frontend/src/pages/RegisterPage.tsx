import { useState } from 'react';
import userApi from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/RegisterPage.css';

const RegisterPage = () => {
  const { registerUser } = userApi(); // <-- HERE inside component
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate('/login');
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
    }
  };

  return (
    <div className='register-wrapper'>
      <form onSubmit={handleSubmit} className='register-form'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
          className='register-input'
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          className='register-input'
        />

        <input
          type={showPassword ? 'text' : 'password'}
          name='password'
          placeholder='Password'
          onChange={handleChange}
          className='register-input'
        />
        <input
          type={showPassword ? 'text' : 'password'}
          name='confirmPassword'
          placeholder='Confirm Password'
          onChange={handleChange}
          className='register-input'
        />

        <div className='register-buttons'>
          <button
            type='button'
            onClick={toggleVisibility}
            className='register-toggle'
          >
            {showPassword ? '🙈 Hide' : '👁️ Show'}
          </button>

          <button type='submit' className='register-button'>
            Register
          </button>
        </div>
        {error && <p className='register-error'>{error}</p>}
        <div className='register-footer'>
          Already a user?{' '}
          <a href='/login' className='register-link'>
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
