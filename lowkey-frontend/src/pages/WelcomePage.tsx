import { Link } from 'react-router-dom';
import '../styles/pages/WelcomePage.css';
// import slide1 from '../assets/WelcomePage/slide1.svg';
import WelcomeSlideshow from '../components/WelcomeSlideshow';

function WelcomePage() {
  return (
    <div className='welcome-container'>
      <header className='welcome-header'>
        <h1>🌍 Traveling Lowkey</h1>
        <p>Plan and discover your next quiet adventure.</p>
        <WelcomeSlideshow />
        {/* <img src={slide1} alt='Travel illustration' className='welcome-img' /> */}
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
