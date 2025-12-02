// src/pages/About.jsx
import cambridgePrepLogo from '../assets/cambridge_prep_logo.jpg';
import { teamData, guestMessages } from '../data/images.js'; // Import guestMessages

export default function About() {
  return (
    <section id="about" className="page-content">
       {/* Blue Header */}
      <h2 className="text-4xl font-bold text-center mb-10 text-brand-blue">About CEAC</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={cambridgePrepLogo} alt="Cambridge Prep Centre" className="rounded-lg shadow-lg" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-brand-blue">Our Mission</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Since 2018, Cambridge English Academy Colombo has been recognized by the International Examination Services as a Certified Official Exam Preparation Centre for Cambridge English Qualifications.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This prestigious recognition underscores our commitment to providing High-quality Education and Exceptional preparation for our students. We focus on nurturing students with motivation, discipline, high moral values, and positive attitudes.
          </p>
        </div>
      </div>

      {/* --- TEAM SECTION --- */}
      <div className="mt-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-brand-blue">Meet Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
              <div className="overflow-hidden h-80 bg-gray-100 border-2 border-brand-gold">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover team-image-zoom"
                  style={member.style} 
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-brand-blue">{member.name}</h4>
                <p className="text-gray-600 mt-1">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- NEW GUEST MESSAGES SECTION (Matches your sketch) --- */}
      <div className="mt-24 mb-12">
        <h3 className="text-3xl font-bold text-center mb-16 text-brand-blue">Messages from Our Guests of Honour</h3>
        <div className="space-y-12">
          {guestMessages.map((guest, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md border-l-8 border-brand-gold">
              
              {/* Header Part: Name/Title and Image Circle */}
              <div className="flex flex-col-reverse md:flex-row items-center md:justify-between mb-6">
                <div className="text-center md:text-left mt-4 md:mt-0 flex-1">
                  <h4 className="text-2xl font-bold text-brand-blue">{guest.name}</h4>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">{guest.title}</p>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="h-28 w-28 rounded-full border-4 border-brand-blue overflow-hidden shadow-sm">
                    <img 
                      src={guest.img} 
                      alt={guest.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>

              {/* Body Part: The Text (Summarized) */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <p className="text-gray-700 leading-relaxed italic text-lg">
                  "{guest.text}"
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  )
}