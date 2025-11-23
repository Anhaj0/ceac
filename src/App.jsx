import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import Timetable from './pages/Timetable.jsx'
import News from './pages/News.jsx'
import Cambridge from './pages/Cambridge.jsx'
import WhyUs from './pages/WhyUs.jsx'
import Videos from './pages/Videos.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Gallery from './pages/Gallery.jsx'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/news" element={<News />} />
            <Route path="/cambridge" element={<Cambridge />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App