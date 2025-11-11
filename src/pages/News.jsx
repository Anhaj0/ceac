export default function News() {
  const cards = [
    { date: 'October 16, 2025', title: 'Admissions Open for December Intake!', img: 'https://placehold.co/600x400/e0e7ff/0A246A?text=New+Intake', text: "Don't miss your chance to achieve an International Qualification. New batches are starting soon..." },
    { date: 'October 10, 2025', title: 'Annual Awards Ceremony at BMICH', img: 'https://placehold.co/600x400/e0e7ff/0A246A?text=Awards', text: 'We will be celebrating the achievements of our talented students who sat for Cambridge International Examinations.' },
    { date: 'October 5, 2025', title: 'Student Success in Cambridge Exams', img: 'https://placehold.co/600x400/e0e7ff/0A246A?text=Success+Stories', text: 'Congratulations to our students for their outstanding results in the recent Cambridge English exams!' }
  ]

  return (
    <section id="news" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">News & Announcements</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={c.img} className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{c.date}</p>
              <h3 className="text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-gray-600 mb-4">{c.text}</p>
              <a href="#" className="font-semibold text-brand-blue hover:underline">Read More →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
