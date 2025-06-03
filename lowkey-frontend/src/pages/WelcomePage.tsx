import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css';
import TravelIllustration from '../assets/adventure-1-82.svg';

function WelcomePage() {
  return (
    <div className='welcome-container'>
      <header className='welcome-header'>
        <h1>🌍 Traveling Lowkey</h1>
        <p>Plan and discover your next quiet adventure.</p>
        <img
          src={TravelIllustration}
          alt='Travel illustration'
          className='welcome-img'
        />
      </header>

      <nav className='welcome-nav'>
        <Link to='/home'>Browse Destinations</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>

      <footer className='welcome-footer'>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact Us</Link>
      </footer>
    </div>
  );
}

export default WelcomePage;
