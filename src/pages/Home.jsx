// src/pages/Home.jsx
import Slideshow from '../components/Slideshow.jsx'
import { Link } from 'react-router-dom'
import { newsImages } from '../data/images.js'; 
import { 
  ShieldCheck, 
  Award, 
  AirVent, 
  MessageSquareQuote, 
  BookCopy, 
  GraduationCap,
  Quote 
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Import Mr. Tariq Khan's image
import tariqKhanImg from '../assets/Mr. Tariq Khan.jpg'; 

const iconMap = {
  'shield-check': ShieldCheck,
  'award': Award,
  'air-vent': AirVent,
  'message-square-quote': MessageSquareQuote
};

const whyUsFeatures = [
  { icon: 'shield-check', title: 'Certified Exam Preparation Centre', text: 'A registration centre for International Examination Services.' },
  { icon: 'award', title: 'Qualified & Experienced Tutor', text: 'A trained Cambridge English tutor with 14 years of experience.' },
  { icon: 'air-vent', title: 'Air Conditioned Smart Classroom', text: 'Well-equipped with modern smart technology for effective learning.' },
  { icon: 'message-square-quote', title: 'Public Speaking & Debates', text: 'We build confidence by conducting speech and debate sessions.' },
]

const latestNews = { 
  date: 'October 16, 2025', 
  title: 'Admissions Open for December Intake!', 
  img: newsImages.newIntake,
  text: "Don't miss out your chance in achieving an International Qualification. New batches are starting soon..." 
}

// --- TESTIMONIAL DATA (All 6 Feedbacks) ---
const testimonials = [
  {
    id: 1,
    name: "Mr. Tariq Khan",
    title: "Head, Cambridge English at IES",
    image: tariqKhanImg,
    text: "With over 30 years in education, witnessing the growth of CEAC under Ms. Raeesha has been inspiring. CEAC has quickly established itself as a top Cambridge English Preparation Centre, consistently producing successful students."
  },
  {
    id: 2,
    name: "Amra Iynas (PET)",
    title: "Student",
    image: null,
    text: "Joining CEAC was transformative. I used to be afraid of making mistakes, but Mrs. Raeesha taught me to embrace learning with confidence. The focus on practical skills like debates and speeches prepared me for real life."
  },
  {
    id: 3,
    name: "Ashalina Rizkhan Fareed",
    title: "Student",
    image: null,
    text: "The teacher's fun methods helped me improve drastically. I went from being nervous to becoming a confident speaker, even joining the school media unit. The 'star reward' technique taught me discipline and punctuality."
  },
  {
    id: 4,
    name: "Mother of Humaidh, Hamza & Aamina",
    title: "Parent",
    image: null,
    text: "Cambridge English Academy is doing excellent work with a well-planned academic program. We are grateful to Mrs. Raeesha for her love and dedication. She provides academic education and instills moral values."
  },
  {
    id: 5,
    name: "Inuja Gihansith",
    title: "Student",
    image: null,
    text: "When I joined in 2021, I was nervous, but Mrs. Raeesha's guidance helped me grow so much. Learning English became an exciting adventure. I'm proud to have passed Starters, Movers, and Flyers with her help."
  },
  {
    id: 6,
    name: "M.N.F. Hazeena",
    title: "Student",
    image: null,
    text: "Ms. Raeesha is the heart and soul of CEAC. Her class was a safe haven where we could express ourselves freely. She encouraged me to read, write my first novel, and even land my first job as a librarian."
  }
];

// --- CUSTOM CAROUSEL COMPONENT ---
function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3); // Desktop: 3 cards
      else if (window.innerWidth >= 768) setItemsPerPage(2); // Tablet: 2 cards
      else setItemsPerPage(1); // Mobile: 1 card
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play logic (Corrected to not break at the end)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Calculate max index we can slide to without showing whitespace
        const maxIndex = testimonials.length - itemsPerPage;
        // If we are at the end, go back to 0, else go to next
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000); 
    return () => clearInterval(interval);
  }, [itemsPerPage]);

  const goToSlide = (index) => {
    // Prevent clicking a dot that would show empty space
    const maxIndex = testimonials.length - itemsPerPage;
    if (index > maxIndex) {
        setCurrentIndex(maxIndex);
    } else {
        setCurrentIndex(index);
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
      >
        {testimonials.map((t) => (
          <div 
            key={t.id} 
            className="flex-shrink-0 px-4"
            style={{ width: `${100 / itemsPerPage}%` }}
          >
            {/* Added h-full to make all cards same height */}
            <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col items-center text-center border-t-4 border-brand-gold relative">
              <div className="mb-6">
                <Quote className="h-12 w-12 text-brand-gold opacity-30" />
              </div>
              
              <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed text-sm sm:text-base">"{t.text}"</p>
              
              <div className="mt-auto flex flex-col items-center">
                 <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 mb-3 border-2 border-brand-blue flex-shrink-0">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-brand-blue bg-blue-50 font-bold text-xl">
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h4 className="font-bold text-lg text-brand-blue">{t.name}</h4>
                <p className="text-xs text-brand-gold font-bold uppercase tracking-wide">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation - Only show dots for valid start positions */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, idx) => {
            // Only render dot if it's a valid slide position
            if (idx > testimonials.length - itemsPerPage) return null;
            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-brand-blue w-6' : 'bg-gray-300 hover:bg-brand-gold'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            )
        })}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-brand-blue mb-3">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

function CtaButton({ to, children }) {
  return (
    <Link to={to} className="inline-block bg-brand-blue text-white font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition duration-300 text-lg shadow-md">
      {children}
    </Link>
  )
}

export default function Home() {
  return (
    <div className="page-content space-y-20">
      <section><Slideshow /></section>
      
      <section className="container mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-brand-blue mb-4">Welcome to Cambridge English Academy Colombo</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed text-justify md:text-center">
            Since 2018, CEAC has been a Certified Official Exam Preparation Centre for Cambridge English Qualifications. We are committed to providing high-quality education and exceptional preparation for our students.
          </p>
          <CtaButton to="/about">Learn More About Us</CtaButton>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="Why Choose CEAC?" subtitle="We provide an unparalleled learning environment designed for success." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsFeatures.map((f, idx) => {
            const IconComponent = iconMap[f.icon];
            return (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                {IconComponent && <IconComponent className="h-10 w-10 text-brand-gold mb-4" />}
                <h3 className="font-bold text-lg mb-2 text-brand-blue">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.text}</p>
              </div>
            )
          })}
        </div>
        <div className="text-center mt-12"><CtaButton to="/why-us">See All Our Features</CtaButton></div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 bg-gray-100 py-16 rounded-lg">
        <SectionHeader title="Explore Our Courses" subtitle="From beginners to advanced qualifications, we have a course for every learner." />
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookCopy className="h-10 w-10 text-brand-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-blue mb-2">English for Kids</h3>
            <p className="text-gray-600">Jolly Phonics, Beginners, and Pre-Starters.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="h-10 w-10 text-brand-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-blue mb-2">Cambridge YLE Courses</h3>
            <p className="text-gray-600">Starters, Movers, and Flyers for young learners.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <GraduationCap className="h-10 w-10 text-brand-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-blue mb-2">KET, PET & FCE</h3>
            <p className="text-gray-600">Advanced qualifications for teens and adults.</p>
          </div>
        </div>
        <div className="text-center mt-12"><CtaButton to="/courses">View All Courses & Timetables</CtaButton></div>
      </section>

      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="Latest News" />
        <div className="bg-white rounded-lg shadow-md overflow-hidden grid md:grid-cols-2">
          <div className="w-full h-auto p-4 bg-gray-50 flex items-center justify-center">
              <img 
                src={latestNews.img} 
                alt={latestNews.title} 
                className="w-full h-auto object-contain rounded-md shadow-sm" 
              />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="text-sm text-gray-500 mb-2">{latestNews.date}</p>
            <h3 className="text-2xl font-bold mb-3 text-brand-blue">{latestNews.title}</h3>
            <p className="text-gray-600 mb-6">{latestNews.text}</p>
            <Link to="/news" className="font-semibold text-brand-blue hover:underline">Read More News →</Link>
          </div>
        </div>
      </section>

      {/* --- FEEDBACK SLIDESHOW SECTION --- */}
      <section className="container mx-auto px-4 sm:px-6 py-12 bg-blue-50 rounded-xl my-16">
        <SectionHeader title="What People Say" subtitle="Words from our Chief Guest, Students, and Parents." />
        <FeedbackCarousel />
      </section>

    </div>
  )
}