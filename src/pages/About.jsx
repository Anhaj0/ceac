// src/pages/About.jsx
import cambridgePrepLogo from '../assets/cambridge_prep_logo.jpg';
import { teamData } from '../data/images.js'; 

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

      <div className="mt-20">
         {/* Blue Header */}
        <h3 className="text-3xl font-bold text-center mb-12 text-brand-blue">Meet Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
              {/* UPDATED: Added border-2 border-brand-gold */}
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
    </section>
  )
}