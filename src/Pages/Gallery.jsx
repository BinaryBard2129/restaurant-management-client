import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const galleryImages = [
  { src: '/src/assets/gallery/1.jpg.jpeg' },
  { src: '/src/assets/gallery/2.jpg.avif' },
  { src: '/src/assets/gallery/3.jpg.jpeg' },
  { src: '/src/assets/gallery/4.jpg.webp' },
  { src: '/src/assets/gallery/52407-chicken-shawarma-VAT-003-4x3-01-3189bab443d14bf282ffcc3b87bcf55a.jpg' },
  { src: '/src/assets/gallery/AR-268494-BasicAirFryerHotDogs-4x3-49aad2a82d284f8dab6d3c09243eeaea.jpg' },
  { src: '/src/assets/gallery/7.jpg.jpg' },
  { src: '/src/assets/gallery/8.jpg.webp' },
  { src: '/src/assets/gallery/9.jpg.jpg' },
  { src: '/src/assets/gallery/10.jpg.jpeg' }
];

const Gallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-yellow-700">Our Gallery</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {galleryImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={`Gallery ${i + 1}`}
            className="rounded-lg cursor-pointer object-cover h-48 w-full hover:scale-105 transition"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={galleryImages}
        index={index}
      />
    </section>
  );
};

export default Gallery;
