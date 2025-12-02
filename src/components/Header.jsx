import { NavLink, Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Menu } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0
  })

  // Timer refs for delayed closing
  const galleryTimer = useRef(null)
  const moreTimer = useRef(null)

  const location = useLocation()
  const navRef = useRef(null)
  const activeLinkRef = useRef(null)

  // Helper: move magic underline to a specific element
  const moveUnderlineToElement = (el) => {
    if (!navRef.current || !el) return
    const navRect = navRef.current.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    setUnderlineStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1
    })
  }

  // Logic for magic underline on route change
  useEffect(() => {
    if (!navRef.current) return

    // Only look at top-level nav items
    const activeLink = navRef.current.querySelector(
      '.nav-link[aria-current="page"]'
    )

    if (activeLink) {
      activeLinkRef.current = activeLink
      moveUnderlineToElement(activeLink)
    } else {
      setUnderlineStyle({ left: 0, width: 0, opacity: 0 })
    }
  }, [location])

  const handleMouseEnter = (e) => {
    const el = e.currentTarget
    moveUnderlineToElement(el)
  }

  const handleMouseLeave = () => {
    if (activeLinkRef.current) {
      moveUnderlineToElement(activeLinkRef.current)
    } else {
      setUnderlineStyle({ left: 0, width: 0, opacity: 0 })
    }
  }

  // Class for NavLinks
  const getLinkClass = ({ isActive }) =>
    `nav-link font-medium py-4 ${isActive ? 'text-brand-blue font-semibold' : 'text-gray-600'
    } hover:text-brand-blue transition duration-300`

  // Dropdown Button Classes
  const getDropdownButtonClass = (isActive) => `
    nav-link flex items-center py-4 transition duration-300 
    ${isActive ? 'text-brand-blue font-semibold' : 'text-gray-600 font-medium'} 
    hover:text-brand-blue
  `

  // --- DROPDOWN LOGIC ---

  const openDropdown = (setter, timerRef) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setter(true)
  }

  const closeDropdown = (setter, timerRef) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setter(false)
    }, 220)
  }

  const isGalleryActive = location.pathname === '/gallery' || location.pathname === '/videos'
  const isMoreActive = ['/why-us', '/about', '/contact'].includes(location.pathname)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={logo}
          alt=""
          className="absolute top-1/2 right-4 transform -translate-y-1/2 h-40 w-40 opacity-5 -rotate-12"
        />
      </div>

      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center relative z-10">
        <Link to="/" className="nav-link flex items-center space-x-3">
          <img
            src={logo}
            alt="Cambridge English Academy Colombo Logo"
            className="h-16 w-auto"
          />
          <span className="font-bold text-[#002147] text-lg leading-tight hidden sm:block">
            Cambridge English Academy Colombo
          </span>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <div className="hidden lg:block">
          <ul
            ref={navRef}
            className="flex items-center space-x-6 text-sm relative"
            onMouseLeave={handleMouseLeave}
          >
            <div className="nav-magic-line" style={{ ...underlineStyle }} />

            <li><NavLink to="/" className={getLinkClass} onMouseEnter={handleMouseEnter} end>Home</NavLink></li>
            <li><NavLink to="/courses" className={getLinkClass} onMouseEnter={handleMouseEnter}>Our Courses</NavLink></li>
            <li><NavLink to="/timetable" className={getLinkClass} onMouseEnter={handleMouseEnter}>Timetable</NavLink></li>
            <li><NavLink to="/news" className={getLinkClass} onMouseEnter={handleMouseEnter}>News</NavLink></li>
            <li><NavLink to="/cambridge" className={getLinkClass} onMouseEnter={handleMouseEnter}>Cambridge English</NavLink></li>

            {/* GALLERY DROPDOWN */}
            <li
              className="relative"
              onMouseEnter={(e) => {
                openDropdown(setGalleryOpen, galleryTimer)
                handleMouseEnter(e)
              }}
              onMouseLeave={() => closeDropdown(setGalleryOpen, galleryTimer)}
            >
              <button className={getDropdownButtonClass(isGalleryActive)} aria-current={isGalleryActive ? 'page' : undefined}>
                Gallery <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {galleryOpen && (
                <ul
                  className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-20"
                  onMouseEnter={() => openDropdown(setGalleryOpen, galleryTimer)}
                  onMouseLeave={() => closeDropdown(setGalleryOpen, galleryTimer)}
                >
                  <li><NavLink to="/gallery" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setGalleryOpen(false)}>Photo Gallery</NavLink></li>
                  <li><NavLink to="/videos" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setGalleryOpen(false)}>Video Gallery</NavLink></li>
                </ul>
              )}
            </li>

            {/* MORE DROPDOWN */}
            <li
              className="relative"
              onMouseEnter={(e) => {
                openDropdown(setMoreOpen, moreTimer)
                handleMouseEnter(e)
              }}
              onMouseLeave={() => closeDropdown(setMoreOpen, moreTimer)}
            >
              <button className={getDropdownButtonClass(isMoreActive)} aria-current={isMoreActive ? 'page' : undefined}>
                More <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {moreOpen && (
                <ul
                  className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-20"
                  onMouseEnter={() => openDropdown(setMoreOpen, moreTimer)}
                  onMouseLeave={() => closeDropdown(setMoreOpen, moreTimer)}
                >
                  <li><NavLink to="/why-us" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setMoreOpen(false)}>Why Choose Us</NavLink></li>
                  <li><NavLink to="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setMoreOpen(false)}>About Us</NavLink></li>
                  <li><NavLink to="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setMoreOpen(false)}>Contact Us</NavLink></li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/login"
                className="bg-[#002147] text-white px-6 py-2 rounded-full hover:bg-[#003366] transition duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2">
          <Menu className="h-6 w-6 text-[#002147]" />
        </button>
      </nav>

      {/* --- MOBILE MENU --- */}
      {open && (
        <div className="lg:hidden bg-white border-t relative z-10 mobile-menu-enter">
          <ul className="flex flex-col items-center space-y-2 py-4 text-lg" onClick={() => setOpen(false)}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} end>Home</NavLink></li>
            <li><NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Our Courses</NavLink></li>
            <li><NavLink to="/timetable" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Timetable</NavLink></li>
            <li><NavLink to="/news" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>News</NavLink></li>
            <li><NavLink to="/cambridge" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Cambridge English</NavLink></li>

            {/* Mobile Gallery */}
            <li className="w-full text-center">
              <button onClick={(e) => { e.stopPropagation(); setGalleryOpen(!galleryOpen); }} className="nav-link flex items-center justify-center w-full">
                Gallery <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${galleryOpen ? 'rotate-180' : ''}`} />
              </button>
              {galleryOpen && (
                <ul className="bg-gray-50 py-2 w-full">
                  <li><NavLink to="/gallery" className="block py-2 hover:bg-gray-100">Photo Gallery</NavLink></li>
                  <li><NavLink to="/videos" className="block py-2 hover:bg-gray-100">Video Gallery</NavLink></li>
                </ul>
              )}
            </li>

            {/* Mobile More */}
            <li className="w-full text-center">
              <button onClick={(e) => { e.stopPropagation(); setMoreOpen(!moreOpen); }} className="nav-link flex items-center justify-center w-full">
                More <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && (
                <ul className="bg-gray-50 py-2 w-full">
                  <li><NavLink to="/why-us" className="block py-2 hover:bg-gray-100">Why Choose Us</NavLink></li>
                  <li><NavLink to="/about" className="block py-2 hover:bg-gray-100">About Us</NavLink></li>
                  <li><NavLink to="/contact" className="block py-2 hover:bg-gray-100">Contact Us</NavLink></li>
                </ul>
              )}
            </li>

            <li className="pt-4">
              <Link to="/login" className="bg-[#002147] text-white px-8 py-3 rounded-full font-bold shadow-md">
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}