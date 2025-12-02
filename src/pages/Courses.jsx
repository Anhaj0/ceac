// src/pages/Courses.jsx

export default function Courses() {

  const courseCategories = [
    {
      category: "English for Kids",
      courses: [
        { level: "Level 1", name: "English for Beginners", schedule: "Wednesdays 4:00 - 6:00 p.m." },
        { level: "Level 2", name: "Jolly Phonics", schedule: "Thursdays 4:00 - 6:00 p.m." },
        { level: "Level 3", name: "Pre-starters", schedule: "Saturdays 4:00 - 6:00 p.m." },
      ]
    },
    {
      category: "Cambridge Young Learners (YLE)",
      courses: [
        { level: "Pre A1", name: "Cambridge Starters", schedule: "Group 1: Fridays 4:00 - 6:00 p.m.\nGroup 2: Saturdays 9:30 - 11:30 a.m." },
        { level: "A1", name: "Cambridge Movers", schedule: "Group 1: Tuesdays 4:00 - 6:00 p.m.\nGroup 2: Saturdays 1:30 - 3:30 p.m." },
        { level: "A2", name: "Cambridge Flyers", schedule: "Group 1: Mondays 4:00 - 6:00 p.m.\nGroup 2: Saturdays 11:30 - 1:30 p.m." },
      ]
    },
    {
      category: "Cambridge General English",
      courses: [
        { level: "A2", name: "Cambridge KET", schedule: "Group 1: Sundays 1:30 - 3:30 p.m.\nGroup 2: Saturdays 7:30 - 9:30 a.m." },
        { level: "B1", name: "Cambridge PET", schedule: "Group 1: Sundays 11:30 - 1:30 p.m.\nGroup 3: Sundays 9:30 - 11:30 a.m." },
        { level: "B2", name: "Cambridge FCE", schedule: "Group 1: Sundays 3:30 - 5:30 p.m.\nGroup 2: Sundays 7:30 - 9:30 a.m." },
      ]
    },
    {
      category: "Special Courses for Ladies",
      courses: [
        { level: "A2", name: "Cambridge KET for Ladies", schedule: "Thursdays 9:15 - 11:15 a.m. (Housewives batch)" },
        { level: "Spoken", name: "Spoken English for Ladies", schedule: "Wednesdays 9:15 - 11:15 a.m." },
      ]
    }
  ];

  return (
    <section id="courses" className="page-content">
      {/* Blue Header */}
      <h2 className="text-4xl font-bold text-center mb-10 text-brand-blue">Our Courses & Schedule</h2>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        We offer a complete range of courses from beginner levels for kids to advanced Cambridge qualifications for teens and adults.
      </p>

      <div className="space-y-16">
        {courseCategories.map((category) => (
          <div key={category.category}>
            <h3 className="text-3xl font-bold mb-6 border-l-4 border-brand-gold pl-4 text-brand-blue">
              {category.category}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.courses.map((course) => (
                <div key={course.name} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                  <span className="block text-sm font-medium bg-blue-100 text-brand-blue w-fit px-3 py-1 rounded-full mb-3">
                    {course.level}
                  </span>
                  <h4 className="text-xl font-bold text-brand-blue mb-2">{course.name}</h4>
                  <div className="text-gray-600 mt-2 whitespace-pre-line">
                    {course.schedule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}