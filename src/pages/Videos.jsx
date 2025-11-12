export default function Videos() {
  const items = [
    { title: 'Student Testimonials' },
    { title: 'A Day at CEAC' },
    { title: 'Message from the Director' },
  ]
  return (
    <section id="videos" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">Video Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it, i) => (
          <div key={i} className="gallery-item bg-white rounded-lg shadow-md">
            <img src={`https://placehold.co/600x350/333333/ffffff?text=Video+${i+1}`} className="w-full h-48 object-cover" />
            <div className="gallery-overlay"><i data-lucide="play-circle" className="h-16 w-16"></i></div>
            <h3 className="p-4 font-semibold text-lg">{it.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}