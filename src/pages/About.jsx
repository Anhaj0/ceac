import team from '../assets/cambridge_prep_logo.jpg' // Make sure this image exists!
export default function About() {
  return (
    <section id="about" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">About CEAC</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={team} alt="Our Team" className="rounded-lg shadow-lg" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-brand-blue">Our Mission</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Since 2018, Cambridge English Academy Colombo has been recognized by the International Examination Services as a Certified Official Exam Preparation Centre for Cambridge English Qualifications in Sri Lanka.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This prestigious recognition underscores our commitment to providing High-quality Education and Exceptional preparation for our students. We focus on nurturing students with motivation, discipline, high moral values, and positive attitudes.
          </p>
        </div>
      </div>
      <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-center mb-8">Conducted By</h3>
        <div className="text-center">
          <h4 className="text-2xl font-bold text-brand-blue">MRS. RAEESHA HASSAN</h4>
          <p className="text-lg text-gray-700 mt-2">A Qualified Cambridge English Tutor, a Trained English Teacher with 14 years of Teaching Experience.</p>
        </div>
      </div>
    </section>
  )
}