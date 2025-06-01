import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
