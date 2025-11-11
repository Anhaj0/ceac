import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import WhyUs from './pages/WhyUs.jsx'
import Courses from './pages/Courses.jsx'
import Cambridge from './pages/Cambridge.jsx'
import Timetable from './pages/Timetable.jsx'
import News from './pages/News.jsx'
import Gallery from './pages/Gallery.jsx'
import Videos from './pages/Videos.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  useEffect(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons()
  })

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-12 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cambridge" element={<Cambridge />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
