import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Slideshow() {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  const slides = [
    {
      bg: 'https://placehold.co/1200x450/0A246A/ffffff?text=Slide+1',
      title: 'Achieve an International Qualification',
      text: 'Register your child to obtain a Globally Recognized British Qualification.',
      cta: { text: 'Explore Our Courses', href: '/courses', variant: 'gold' }
    },
    {
      bg: 'https://placehold.co/1200x450/DAA520/000000?text=Slide+2',
      title: 'Admissions in Progress for December',
      text: "New batch intake is now open. Don't miss your chance to join!",
      cta: { text: 'Contact Us Today', href: '/contact', variant: 'blue' }
    },
    {
      bg: 'https://placehold.co/1200x450/e0e7ff/0A246A?text=Slide+3',
      title: 'Conducted by Mrs. Raeesha Hassan',
      text: 'A Qualified Cambridge English Tutor with 14 years of teaching experience.',
      cta: { text: 'Learn More About Us', href: '/about', variant: 'gold' }
    }
  ]

  const start = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, 5000)
  }

  useEffect(() => {
    start()
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons()
  })

  return (
    <div className="slideshow-container">
      {slides.map((s, i) => {
        const baseBtn = 'nav-link font-bold px-8 py-3 rounded-lg transition duration-300 text-lg'
        const colorBtn = s.cta.variant === 'gold'
          ? 'bg-brand-gold text-brand-blue hover:bg-opacity-90'
          : 'bg-brand-blue text-white hover:bg-opacity-90'
        const btnClass = `${baseBtn} ${colorBtn}`

        return (
          <div
            key={i}
            className={`slide ${i === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.bg})` }}
          >
            <div className="slide-content">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{s.title}</h1>
              <p className="text-md md:text-xl mb-8 max-w-3xl mx-auto">{s.text}</p>

              <Link to={s.cta.href} className={btnClass}>
                {s.cta.text}
              </Link>
            </div>
          </div>
        )
      })}

      <div className="slideshow-dots">
        {slides.map((_, i) => (
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