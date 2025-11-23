// src/components/Footer.jsx
import { NavLink } from 'react-router-dom'
import { Facebook, Instagram, Youtube } from 'lucide-react'

// Custom WhatsApp SVG Component
const WhatsAppIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
  </svg>
);

export default function Footer() {
  const link = 'nav-link hover:text-white'
  
  const facebookUrl = "https://www.facebook.com/share/1RKfHYGn8h/";
  const instagramUrl = "https://www.instagram.com/cambridgeenglishacademycolombo?utm_source=qr&igsh=NTZmYXZ1MzV2OXNu";
  const youtubeUrl = "https://youtube.com/@cambridgeenglishacademycolombo?si=lRsag41iFwOE0Rkd";
  const whatsappUrl = "https://wa.me/94769144511"; 

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">Cambridge English Academy</h3>
            <p className="text-gray-400">Your partner in mastering the English language. Join us to build a confident future.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            {/* UPDATED: Increased text size to text-lg */}
            <ul className="space-y-2 text-gray-400 text-lg">
              <li><NavLink to="/about" className={link}>About Us</NavLink></li>
              <li><NavLink to="/courses" className={link}>Courses</NavLink></li>
              <li><NavLink to="/contact" className={link}>Contact</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              {/* UPDATED: Increased icon size from w-6 to w-8 */}
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook className="h-8 w-8" />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram className="h-8 w-8" />
              </a>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube className="h-8 w-8" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <WhatsAppIcon className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>© 2025 Cambridge English Academy Colombo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}