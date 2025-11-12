// src/pages/Home.jsx

import Slideshow from '../components/Slideshow.jsx'
import { Link } from 'react-router-dom'

// --- Updated summary data ---

// Features updated to match your new WhyUs page
const whyUsFeatures = [
  { 
    icon: 'shield-check', 
    title: 'Certified Exam Preparation Centre', 
    text: 'A registration centre for International Examination Services.' 
  },
  { 
    icon: 'award', 
    title: 'Qualified & Experienced Tutor', 
    text: 'A trained Cambridge English tutor with 14 years of experience.' 
  },
  { 
    icon: 'air-vent', 
    title: 'Air Conditioned Smart Classroom', 
    text: 'Well-equipped with modern smart technology for effective learning.' 
  },
  { 
    icon: 'message-square-quote', 
    title: 'Public Speaking & Debates', 
    text: 'We build confidence by conducting speech and debate sessions.' 
  },
]

// Latest news item with the grammar fix
const latestNews = { 
  date: 'October 16, 2025', 
  title: 'Admissions Open for December Intake!', 
  img: 'https://placehold.co/600x400/e0e7ff/0A246A?text=New+Intake', 
  text: "New batch intake is now open. Don't miss your chance in achieving an International Qualification!" // <-- FIX APPLIED
}

// --- Helper Components for clean sections ---

function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-3">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

function CtaButton({ to, children }) {
  return (
    <Link 
      to={to} 
      className="inline-block bg-brand-blue text-white font-bold px-8 py-3 rounded-lg hover:bg-opacity-90 transition duration-300 text-lg"
    >
      {children}
    </Link>
  )
}

// --- Your Homepage Component ---

export default function Home() {
  return (
    <div className="page-content space-y-20">
      
      {/* Section 1: Slideshow */}
      <section>
        <Slideshow />
      </section>

      {/* Section 2: Welcome */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-brand-blue mb-4">
            Welcome to Cambridge English Academy Colombo
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Since 2018, CEAC has been a Certified Official Exam Preparation Centre for Cambridge English Qualifications. We are committed to providing high-quality education and exceptional preparation for our students.
          </p>
          <CtaButton to="/about">Learn More About Us</CtaButton>
        </div>
      </section>

      {/* Section 3: Why Choose Us (Summary) */}
      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader 
          title="Why Choose CEAC?" 
          subtitle="We provide an unparalleled learning environment designed for success."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsFeatures.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <i data-lucide={f.icon} className="h-10 w-10 text-brand-gold mb-4"></i>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <CtaButton to="/why-us">See All Our Features</CtaButton>
        </div>
      </section>

      {/* Section 4: Our Courses (Summary) */}
      <section className="container mx-auto px-4 sm:px-6 bg-gray-100 py-16 rounded-lg">
        <SectionHeader 
          title="Explore Our Courses"
          subtitle="From beginners to advanced qualifications, we have a course for every learner."
        />
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <i data-lucide="book-copy" className="h-10 w-10 text-brand-blue mx-auto mb-4"></i>
            <h3 className="text-xl font-bold text-brand-blue mb-2">English for Kids</h3>
            <p className="text-gray-600">Jolly Phonics, Beginners, and Pre-Starters.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <i data-lucide="award" className="h-10 w-10 text-brand-blue mx-auto mb-4"></i>
            <h3 className="text-xl font-bold text-brand-blue mb-2">Cambridge YLE Courses</h3>
            <p className="text-gray-600">Starters, Movers, and Flyers for young learners.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <i data-lucide="graduation-cap" className="h-10 w-10 text-brand-blue mx-auto mb-4"></i>
            <h3 className="text-xl font-bold text-brand-blue mb-2">KET, PET & FCE</h3>
            <p className="text-gray-600">Advanced qualifications for teens and adults.</p>

          </div>
        </div>
        <div className="text-center mt-12">
          <CtaButton to="/courses">View All Courses & Timetables</CtaButton>
        </div>
      </section>
      
      {/* Section 5: Latest News (Summary) */}
      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader 
          title="Latest News"
        />
        <div className="bg-white rounded-lg shadow-md overflow-hidden grid md:grid-cols-2">
          <img src={latestNews.img} className="w-full h-64 md:h-full object-cover" />
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="text-sm text-gray-500 mb-2">{latestNews.date}</p>
            <h3 className="text-2xl font-bold mb-3">{latestNews.title}</h3>
            <p className="text-gray-600 mb-6">{latestNews.text}</p>
            <Link to="/news" className="font-semibold text-brand-blue hover:underline">
              Read More News →
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}