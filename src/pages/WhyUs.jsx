// src/pages/WhyUs.jsx
import { 
  ShieldCheck, 
  Award, 
  BookMarked, 
  AirVent, 
  Gamepad2, 
  Volume2, 
  Library, 
  Video, 
  Presentation, 
  Star, 
  Bus, 
  Trophy, 
  MessageSquareQuote, 
  TrendingUp, 
  ClipboardCheck 
} from 'lucide-react';

export default function WhyUs() {
  
  // Mapping strings to actual components
  const iconMap = {
    'shield-check': ShieldCheck,
    'award': Award,
    'book-marked': BookMarked,
    'air-vent': AirVent,
    'gamepad-2': Gamepad2,
    'volume-2': Volume2,
    'library': Library,
    'video': Video,
    'presentation': Presentation,
    'star': Star,
    'bus': Bus,
    'trophy': Trophy,
    'message-square-quote': MessageSquareQuote,
    'trending-up': TrendingUp,
    'clipboard-check': ClipboardCheck
  };

  const features = [
    { 
      icon: 'shield-check', 
      title: 'Certified Cambridge English Exam Preparation Centre', 
      text: 'Cambridge English Qualifications Registration Centre for International Examination Services.' 
    },
    { 
      icon: 'award', 
      title: 'Qualified Teacher', 
      text: 'A Qualified Cambridge English Tutor, A Trained English Teacher with 14 Years of Teaching Experience.' 
    },
    { 
      icon: 'book-marked', 
      title: 'Cambridge ESOL Curriculum', 
      text: 'Following the official, internationally accepted curriculum.' 
    },
    { 
      icon: 'air-vent', 
      title: 'Air Conditioned Smart Classroom', 
      text: 'Well-equipped, fully air-conditioned, and includes smart technology for modern teaching.' 
    },
    { 
      icon: 'gamepad-2', 
      title: 'Activity Based Learning', 
      text: 'Engaging and interactive teaching methods that make learning fun and effective.' 
    },
    { 
      icon: 'volume-2', 
      title: 'English Only Environment', 
      text: 'Speaking in only English is allowed in the Academy to boost fluency.' 
    },
    { 
      icon: 'library', 
      title: 'Library Facilities', 
      text: 'To improve the reading skills of our students.' 
    },
    { 
      icon: 'video', 
      title: 'CCTV in Operation', 
      text: 'For the safety and security of our students.' 
    },
    { 
      icon: 'presentation', 
      title: 'Multimedia & Projector', 
      text: 'Using modern technology for effective teaching.' 
    },
    { 
      icon: 'star', 
      title: 'English Competitions and Events', 
      text: 'We conduct speech contests, Spell Master contests, and all the other English competitions. We also have two term tests per year.' 
    },
    { 
      icon: 'bus', 
      title: 'Educational Excursions', 
      text: 'Annual trips to provide wider exposure.' 
    },
    { 
      icon: 'trophy', 
      title: 'Annual Awards Ceremony', 
      text: 'Appreciating student achievements at BMICH.' 
    },
    { 
      icon: 'message-square-quote', 
      title: 'Public Speaking & Debates', 
      text: 'Improving our students’ public speaking skill by Conducting Speeches & Debate sessions.' 
    },
    { 
      icon: 'trending-up',
      title: 'Presentation Skills & Confidence', 
      text: 'Improving skills & confidence by giving students opportunities to present their own Power Point Presentations.' 
    },
    { 
      icon: 'clipboard-check', 
      title: 'Exam Preparation Sessions', 
      // UPDATED: Polished grammar here
      text: 'Conducting exam preparation sessions covering Reading, Writing, Listening & Speaking skills before students sit for Cambridge International Examinations.' 
    },
  ]

  return (
    <section id="why-us" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10 text-brand-blue">Why Choose CEAC?</h2>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">We provide an unparalleled learning environment with state-of-the-art facilities designed for success.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => {
          const IconComponent = iconMap[f.icon];
          return (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
              {IconComponent && <IconComponent className="h-8 w-8 text-brand-gold flex-shrink-0 mt-1" />}
              <div>
                <h3 className="font-bold text-lg text-brand-blue">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}