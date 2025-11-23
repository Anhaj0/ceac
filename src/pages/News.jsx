// src/pages/News.jsx
import { useState } from 'react';
import { newsImages } from '../data/images.js';
import { X } from 'lucide-react';

export default function News() {
  const [selectedNews, setSelectedNews] = useState(null);

  const cards = [
    { 
      id: 1,
      date: 'October 16, 2025', 
      title: 'Admissions Open for December Intake!', 
      img: newsImages.newIntake, 
      text: "Don't miss out your chance in achieving an International Qualification. New batches are starting soon...",
      fullContent: "We are excited to announce that admissions are now open for our December intake. Secure your child's spot today to ensure they get the best start in their English education journey. Our comprehensive programs are designed to cater to various skill levels, ensuring every student receives the attention they need to succeed."
    },
    { 
      id: 2,
      date: '2025', 
      title: '2025 Awarding Ceremony', 
      img: newsImages.awarding2025,
      text: "Celebrating the achievements of our learners at the 2025 Awarding Ceremony.",
      fullContent: "Our 2025 Awarding Ceremony recognised the hard work and dedication of our students across all levels. Certificates and special awards were presented to outstanding performers, with parents and teachers joining in to celebrate their success."
    },
  ];

  const gridCols =
    cards.length === 1
      ? 'grid-cols-1'
      : cards.length === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section id="news" className="page-content relative">
      <h2 className="text-4xl font-bold text-center mb-10 text-brand-blue">
        News & Announcements
      </h2>

      <div className="max-w-5xl mx-auto px-4">
        <div className={`grid gap-8 ${gridCols}`}>
          {cards.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 group"
              onClick={() => setSelectedNews(c)}
            >
              {/* Image now fills the width of the card */}
              <div className="w-full overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-auto block"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{c.date}</p>
                <h3 className="text-xl font-bold mb-3 text-brand-blue group-hover:text-brand-gold transition-colors duration-300">
                  {c.title}
                </h3>
                <p className="text-gray-600 mb-4">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            <div className="w-full bg-gray-50 p-6 flex justify-center">
              <img
                src={selectedNews.img}
                alt={selectedNews.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-md"
              />
            </div>

            <div className="p-8">
              <p className="text-sm text-gray-500 mb-2">{selectedNews.date}</p>
              <h3 className="text-3xl font-bold mb-4 text-brand-blue">
                {selectedNews.title}
              </h3>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>{selectedNews.fullContent || selectedNews.text}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
