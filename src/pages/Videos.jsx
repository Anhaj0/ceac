// src/pages/Videos.jsx
import { useState } from 'react';
import { PlayCircle } from 'lucide-react';

export default function Videos() {
  const videos = [
    { 
      id: 'l3Gw_R1Dh1E', 
      title: 'Speech by Mrs. Raeesha Hassan, Founder/Directress of CEAC' 
    },
    { 
      id: 'wVXz-ewMkXg', 
      title: 'Speech by Mr. Tariq Khan, Head - Cambridge English at IES' 
    },
    { 
      id: 'GLU-5boUKsw', 
      title: 'Speech by Mrs. Zahara Ansary, Country Head - Cambridge University Press & Assessment' 
    },
    { 
      id: '_HJSUPlTt6A', 
      title: 'Annual Awards Ceremony 2025 at BMICH' 
    }
  ];

  return (
    <section id="videos" className="page-content">
      {/* Blue Header */}
      <h2 className="text-4xl font-bold text-center mb-10 text-brand-blue">Video Gallery</h2>
      
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        Watch highlights from our events, student success stories, and latest updates directly from our academy.
      </p>

      {/* Grid for videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video, index) => (
          <VideoCard key={index} id={video.id} title={video.title} />
        ))}
      </div>

      <div className="text-center mt-16">
        <a 
          href="https://www.youtube.com/@CambridgeEnglishAcademyColombo/videos" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-red-600 text-white font-bold px-8 py-3 rounded-full hover:bg-red-700 transition duration-300 text-lg shadow-md"
        >
          <PlayCircle className="mr-2 h-5 w-5" /> Visit Our YouTube Channel
        </a>
      </div>
    </section>
  )
}

// --- VIDEO CARD COMPONENT ---
function VideoCard({ id, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube Thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64 bg-black">
        {!isPlaying ? (
          // Thumbnail State
          <button 
            onClick={() => setIsPlaying(true)} 
            className="group relative w-full h-full block cursor-pointer"
          >
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:bg-white/30 transition-all transform group-hover:scale-110">
                 <PlayCircle className="h-12 w-12 text-white fill-current" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
               <p className="text-white font-semibold truncate">{title}</p>
            </div>
          </button>
        ) : (
          // Video Player State
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-brand-blue text-lg line-clamp-2">{title}</h3>
      </div>
    </div>
  )
}