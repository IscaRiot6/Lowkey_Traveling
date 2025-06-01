import { Link } from 'react-router-dom'

function WelcomePage() {
  return (
    <div>
      <h1>Welcome to Traveling Lowkey 🌍</h1>
      <nav>
        <Link to="/destinations">Browse Destinations</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </div>
  );
}

export default WelcomePage