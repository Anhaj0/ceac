import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { useState, useEffect } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => { if (window.lucide?.createIcons) window.lucide.createIcons() })

  const linkClass = ({ isActive }) =>
    isActive
      ? 'nav-link nav-link-active hover:text-brand-blue transition duration-300'
      : 'nav-link hover:text-brand-blue transition duration-300'

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link to="/" className="nav-link">
          <img src={logo} alt="Cambridge English Academy Colombo Logo" className="h-14" />
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center space-x-6 text-sm">
          <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
          <li><NavLink to="/courses" className={linkClass}>Our Courses</NavLink></li>
          <li><NavLink to="/timetable" className={linkClass}>Timetable</NavLink></li>
          <li><NavLink to="/news" className={linkClass}>News</NavLink></li>
          <li><NavLink to="/cambridge" className={linkClass}>Cambridge English</NavLink></li>
          <li><NavLink to="/why-us" className={linkClass}>Why Choose Us</NavLink></li>
          <li><NavLink to="/gallery" className={linkClass}>Photo Gallery</NavLink></li>
          <li><NavLink to="/videos" className={linkClass}>Video Gallery</NavLink></li>
          <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
          <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
        </ul>

        {/* Mobile */}
        <button onClick={() => setOpen(v => !v)} className="lg:hidden p-2">
          <i data-lucide="menu" className="h-6 w-6"></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t">
          <ul className="flex flex-col items-center space-y-2 py-4 text-lg" onClick={() => setOpen(false)}>
            <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
            <li><NavLink to="/courses" className={linkClass}>Our Courses</NavLink></li>
            <li><NavLink to="/timetable" className={linkClass}>Timetable</NavLink></li>
            <li><NavLink to="/news" className={linkClass}>News</NavLink></li>
            <li><NavLink to="/cambridge" className={linkClass}>Cambridge English</NavLink></li>
            <li><NavLink to="/why-us" className={linkClass}>Why Choose Us</NavLink></li>
            <li><NavLink to="/gallery" className={linkClass}>Photo Gallery</NavLink></li>
            <li><NavLink to="/videos" className={linkClass}>Video Gallery</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
          </ul>
        </div>
      )}
    </header>
  )
}
