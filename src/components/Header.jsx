// src/components/Header.jsx

import { NavLink, Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0
  })

  // Timer ref for delayed closing of Gallery dropdown
  const closeTimer = useRef(null)

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

  useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons()
  })

  // Class for NavLinks
  const getLinkClass = ({ isActive }) =>
    `nav-link font-medium py-4 ${
      isActive ? 'text-brand-blue font-semibold' : 'text-gray-600'
    } hover:text-brand-blue transition duration-300`

  // Class for Gallery Button
  const isGalleryActive =
    location.pathname === '/gallery' || location.pathname === '/videos'
  const galleryButtonClass = `
    nav-link flex items-center py-4 transition duration-300 
    ${isGalleryActive ? 'text-brand-blue font-semibold' : 'text-gray-600 font-medium'} 
    hover:text-brand-blue
  `

  // --- GALLERY HOVER LOGIC WITH TIMER ---

  // Open dropdown (and cancel any pending close)
  const openGallery = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setGalleryOpen(true)
  }

  // Start delayed close (so user has time to move into dropdown)
  const closeGallery = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setGalleryOpen(false)
    }, 220) // tweak delay if you want more/less tolerance
  }

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
            className="h-20 sm:h-24"
          />
          <span className="font-bold text-brand-blue text-sm sm:text-xl leading-tight">
            Cambridge English Academy Colombo
          </span>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <div className="hidden lg:block">
          <ul
            ref={navRef}
            className="flex items-center space-x-6 text-sm relative"
            // only reset underline here, don't touch dropdown
            onMouseLeave={handleMouseLeave}
          >
            <div className="nav-magic-line" style={{ ...underlineStyle }} />

            <li>
              <NavLink
                to="/"
                className={getLinkClass}
                onMouseEnter={handleMouseEnter}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={getLinkClass}
                onMouseEnter={handleMouseEnter}
              >
                Our Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/timetable"
                className={getLinkClass}
                onMouseEnter={handleMouseEnter}
              >
                Timetable
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className={getLinkClass}
                onMouseEnter={handleMouseEnter}
              >
                News
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cambridge"
                className={getLinkClass}
                onMouseEnter={handleMouseEnter}
              >
                Cambridge English
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/why-us"
                className={getLinkClass}
                onMouseEnter={handleMouseEnter}
              >
                Why Choose Us
              </NavLink>
            </li>

            {/* GALLERY + DROPDOWN */}
            <li
              className="relative"
              onMouseEnter={(e) => {
                openGallery()
                handleMouseEnter(e)
              }}
              onMouseLeave={closeGallery}
            >
              <button
                className={galleryButtonClass}
                aria-current={isGalleryActive ? 'page' : undefined}
              >
                Gallery <i data-lucide="chevron-down" className="ml-1 h-4 w-4" />
              </button>

              {galleryOpen && (
                <ul
                  className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-20"
                  onMouseEnter={openGallery}   // keep it open while over dropdown
                  onMouseLeave={closeGallery}   // close after delay when leaving
                >
                  <li>
                    <NavLink
                      to="/gallery"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setGalleryOpen(false)}
                    >
                      Photo Gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/videos"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setGalleryOpen(false)}
                    >
                      Video Gallery
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink
                to="/about"
                className={getLinkClass}
                onMouseEnter={handleMouseEnter}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={getLinkClass}
                onMouseEnter={handleMouseEnter}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2">
          <i data-lucide="menu" className="h-6 w-6" />
        </button>
      </nav>

      {/* --- MOBILE MENU --- */}
      {open && (
        // ADDED 'mobile-menu-enter' HERE
        <div className="lg:hidden bg-white border-t relative z-10 mobile-menu-enter">
          <ul
            className="flex flex-col items-center space-y-2 py-4 text-lg"
            onClick={() => {
              setOpen(false)
              setGalleryOpen(false)
            }}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                Our Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/timetable"
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                Timetable
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                News
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cambridge"
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                Cambridge English
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/why-us"
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                Why Choose Us
              </NavLink>
            </li>

            <li className="relative w-full text-center">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setGalleryOpen((v) => !v)
                }}
                className={`nav-link flex items-center justify-center w-full transition duration-300 ${
                  isGalleryActive ? 'nav-link-active' : ''
                }`}
              >
                Gallery <i data-lucide="chevron-down" className="ml-1 h-4 w-4" />
              </button>
              {galleryOpen && (
                <ul className="w-full bg-gray-50 py-1">
                  <li>
                    <NavLink
                      to="/gallery"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    >
                      Photo Gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/videos"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    >
                      Video Gallery
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}