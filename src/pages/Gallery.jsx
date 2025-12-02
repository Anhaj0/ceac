// src/pages/Gallery.jsx
import { galleryData } from '../data/images.js';

export default function Gallery() {

    // 1. Group the photos by their "year" property
    const groupedPhotos = galleryData.reduce((acc, photo) => {
        const year = photo.year || 'General'; // Default to 'General' if no year
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(photo);
        return acc;
    }, {});

    // 2. Sort years descending (newest first: 2025, then 2024...)
    const sortedYears = Object.keys(groupedPhotos).sort((a, b) => b - a);

    return (
        <section id="gallery" className="page-content">
            {/* Blue Header */}
            <h2 className="text-4xl font-bold text-center mb-10 text-brand-blue">Our Photo Gallery</h2>

            <div className="mb-16">
                {/* Blue Sub-header */}
                <h3 className="text-3xl font-bold text-center mb-8 text-brand-blue">Academy Life & Events</h3>

                {/* Loop through the years */}
                {sortedYears.map((year) => (
                    <div key={year} className="mb-12">
                        {/* The Year Label */}
                        <h4 className="text-2xl font-bold text-brand-blue border-b-2 border-brand-gold inline-block mb-6">
                            {year} Annual Awards Ceremony at BMICH
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {groupedPhotos[year].map((photo, index) => (
                                <div key={index} className="rounded-lg shadow-lg overflow-hidden group">
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}