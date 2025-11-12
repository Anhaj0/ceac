import { NavLink } from 'react-router-dom'

export default function Footer() {
  const link = 'nav-link hover:text-white'
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
            <ul className="space-y-2 text-gray-400">
              <li><NavLink to="/about" className={link}>About Us</NavLink></li>
              <li><NavLink to="/courses" className={link}>Courses</NavLink></li>
              <li><NavLink to="/contact" className={link}>Contact</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-white"><i data-lucide="facebook" className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><i data-lucide="instagram" className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><i data-lucide="youtube" className="h-6 w-6" /></a>
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