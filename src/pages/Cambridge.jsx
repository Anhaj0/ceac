import cambridgeLogo from '../assets/cambridge_prep_logo.jpg' // Make sure this image exists!
export default function Cambridge() {
  return (
    <section id="cambridge" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">Cambridge English Qualifications</h2>
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-brand-blue">A Mark of Genuine Excellence</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              CEAC is a proud and official preparation centre for Cambridge English Qualifications. The certificates are issued directly by the <strong>University of Cambridge, UK</strong>, providing students with a globally recognized British qualification.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This official status guarantees that our preparation is authentic, our curriculum is aligned with international standards, and the exams you take are real. A Cambridge certificate is a mark of excellence that opens doors to exciting opportunities.
            </p>
          </div>
          <div>
            <img src={cambridgeLogo} alt="We Prepare for Cambridge English Qualifications" className="rounded-lg" />
          </div>
        </div>
        <div className="mt-12">
          <h4 className="text-xl font-semibold text-center mb-6">We prepare students for qualifications including:</h4>
          <div className="flex justify-center flex-wrap gap-4">
            <span className="bg-blue-100 text-brand-blue font-medium px-4 py-2 rounded-full">YLE (Starters, Movers, Flyers)</span>
            <span className="bg-blue-100 text-brand-blue font-medium px-4 py-2 rounded-full">A2 Key (KET)</span>
            <span className="bg-blue-100 text-brand-blue font-medium px-4 py-2 rounded-full">B1 Preliminary (PET)</span>
            <span className="bg-blue-100 text-brand-blue font-medium px-4 py-2 rounded-full">B2 First (FCE)</span>
          </div>
        </div>
      </div>
    </section>
  )
}