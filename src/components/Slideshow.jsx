// src/components/Slideshow.jsx
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { slideshowData } from '../data/images.js'; 

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

export default function Slideshow() {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)
  const isMobile = useIsMobile(); 

  const start = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % slideshowData.length)
    }, 5000)
  }
  useEffect(() => { start(); return () => clearInterval(intervalRef.current) }, [])

  return (
    <div className="slideshow-container">
      <div 
        className="slides-wrapper"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slideshowData.map((s, i) => {
          // UPDATED: changed rounded-lg to rounded-full for pill shape
          const baseBtn = 'nav-link font-bold px-8 py-3 rounded-full transition duration-300 text-lg shadow-md'
          const colorBtn = s.cta.variant === 'gold'
            ? 'bg-brand-gold text-brand-blue hover:bg-opacity-90'
            : 'bg-brand-blue text-white hover:bg-opacity-90'
          const btnClass = `${baseBtn} ${colorBtn}`
          
          const bgImage = isMobile ? s.bgImageMobile : s.bgImageDesktop;

          return (
            <div key={i} className="slide">
              <div className="slide-bg" style={{ backgroundImage: `url(${bgImage})` }} />
              <div className="slide-content">
                <Link to={s.cta.href} className={btnClass}>
                  {s.cta.text}
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <div className="slideshow-dots">
        {slideshowData.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => { setIndex(i); start() }}
          />
        ))}
      </div>
    </div>
  )
}