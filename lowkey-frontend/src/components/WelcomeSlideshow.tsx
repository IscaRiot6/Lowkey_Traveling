import { useState, useEffect } from 'react';
import '../styles/components/WelcomeSlideshow.css';
import slide1 from '../assets/WelcomePage/slide1.svg';
import slide2 from '../assets/WelcomePage/slide2.svg';
import slide3 from '../assets/WelcomePage/slide3.svg';
import slide4 from '../assets/WelcomePage/slide4.svg';

const images = [slide1, slide2, slide3, slide4];

function WelcomeSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='slideshow-container'>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className='slideshow-image'
      />
    </div>
  );
}

export default WelcomeSlideshow;
