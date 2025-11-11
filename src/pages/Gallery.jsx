export default function Gallery() {
  const imgs = Array.from({ length: 8 }).map((_, i) => `https://placehold.co/400x400/e0e7ff/0A246A?text=Image+${i+1}`)
  return (
    <section id="gallery" className="page-content">
      <h2 className="text-4xl font-bold text-center mb-10">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {imgs.map((src, i) => (
          <div key={i} className="gallery-item rounded-lg shadow-md">
            <img src={src} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
