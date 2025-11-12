export default function Courses() {
  return (
    <section id="courses" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">Our Courses</h2>
      <div className="space-y-12">
        {/* English for Beginners */}
        <div>
          <h3 className="text-3xl font-bold mb-6 border-l-4 border-brand-gold pl-4">
            English for Beginners
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">
                Play Group, Nursery &amp; Kindergarten
              </h4>
              <p className="text-gray-600 mt-2">Wednesday 3:30 - 5:30 p.m.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">
                Jolly Phonics (Kindergarten, Gr. 1 &amp; 2)
              </h4>
              <p className="text-gray-600 mt-2">Thursday 3:30 - 5:30 p.m.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">
                Pre-Starters (Gr. 1, 2 &amp; 3)
              </h4>
            </div>
          </div>
        </div>
        {/* Cambridge YLE */}
        <div>
          <h3 className="text-3xl font-bold mb-6 border-l-4 border-brand-gold pl-4">
            Cambridge YLE Courses (Grades 2-7)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">YLE Starters</h4>
              <p className="text-gray-600 mt-2">Group 1: Fridays 3.30 - 5.30 p.m.</p>
              <p className="text-gray-600">Group 2: Saturdays 9.30 - 11.30 a.m.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">YLE Movers</h4>
              <p className="text-gray-600 mt-2">Group 1: Tuesdays 3.30 - 5.30 p.m.</p>
              <p className="text-gray-600">Group 2: Saturdays 1.30 - 3.30 p.m.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">YLE Flyers</h4>
              <p className="text-gray-600 mt-2">Group 1: Mondays 3.30 - 5.30 p.m.</p>
              <p className="text-gray-600">Group 2: Saturdays 11.30 - 1.30 p.m.</p>
            </div>
          </div>
        </div>
        {/* KET, PET & FCE */}
        <div>
          <h3 className="text-3xl font-bold mb-6 border-l-4 border-brand-gold pl-4">
            KET, PET &amp; FCE (Grades 6-13 &amp; School Leavers)
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">KET Group 1</h4>
              <p className="text-gray-600 mt-2">Sundays 1.30 - 3.30 p.m.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">PET Group 1</h4>
              <p className="text-gray-600 mt-2">Sundays 11.30 - 1.30 p.m.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">FCE Group 1</h4>
              <p className="text-gray-600 mt-2">Sundays 3.30 - 5.30 p.m.</p>
            </div>
          </div>
        </div>
        {/* Special Courses */}
        <div>
          <h3 className="text-3xl font-bold mb-6 border-l-4 border-brand-gold pl-4">
            Special Courses
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-brand-blue">
                Certificate Course in Spoken English for Ladies
              </h4>
              <p className="text-gray-600 mt-2">Wednesdays 9.15 - 11.15 a.m.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}