export default function WhyUs() {
  const features = [
    { icon: 'shield-check', title: 'Certified Exam Centre', text: 'Recognized by International Examination Services.' },
    { icon: 'award', title: 'Qualified Teacher', text: '14 years of experience from a trained Cambridge tutor.' },
    { icon: 'book-marked', title: 'Cambridge ESOL Curriculum', text: 'Following the official, internationally accepted curriculum.' },
    { icon: 'air-vent', title: 'Air Conditioned Classrooms', text: 'Well-equipped and fully air-conditioned for comfort.' },
    { icon: 'gamepad-2', title: 'Activity Based Learning', text: 'Engaging and interactive teaching methods.' },
    { icon: 'volume-2', title: 'English Only Environment', text: 'Speaking in only English is allowed in the Academy.' },
    { icon: 'library', title: 'Library Facilities', text: 'To improve the reading skills of our students.' },
    { icon: 'video', title: 'CCTV in Operation', text: 'For the safety and security of our students.' },
    { icon: 'presentation', title: 'Multimedia & Projector', text: 'Using modern technology for effective teaching.' },
    { icon: 'microphone', title: 'Competitions & Events', text: 'Speech contests, Spell Master, and celebrating important days.' },
    { icon: 'bus', title: 'Educational Excursions', text: 'Annual trips to provide wider exposure.' },
    { icon: 'trophy', title: 'Annual Awards Ceremony', text: 'Appreciating student achievements at BMICH.' },
  ]

  return (
    <section id="why-us" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">Why Choose CEAC?</h2>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        We provide an unparalleled learning environment with state-of-the-art facilities designed for success.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <i data-lucide={f.icon} className="h-8 w-8 text-brand-gold flex-shrink-0"></i>
            <div>
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
