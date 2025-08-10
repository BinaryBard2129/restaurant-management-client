import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const galleryImages = [
  { src: 'https://i.postimg.cc/6qMYV56X/1-jpg.jpg' },
  { src: 'https://i.postimg.cc/J7pq20mw/2-jpg.avif' },
  { src: 'https://i.postimg.cc/L8Lj28d8/3-jpg.jpg' },
  { src: 'https://i.postimg.cc/prmn72Yx/4-jpg.webp' },
  { src: 'https://i.postimg.cc/s2KQgBTs/52407-chicken-shawarma-VAT-003-4x3-01-3189bab443d14bf282ffcc3b87bcf55a.jpg' },
  { src: 'https://i.postimg.cc/6pXf7vfv/AR-268494-Basic-Air-Fryer-Hot-Dogs-4x3-49aad2a82d284f8dab6d3c09243eeaea.jpg' },
  { src: 'https://i.postimg.cc/TwFrTLPh/7-jpg.jpg' },
  { src: 'https://i.postimg.cc/qvwyzZ7P/8-jpg.webp' },
  { src: 'https://i.postimg.cc/2jnq1Xc0/pick-HBu-Vr.jpg' },
  { src: 'https://i.postimg.cc/mZ99QrDN/10-jpg.jpg' }
];

const Gallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <section className="max-w-6xl mx-auto mt-12 px-4 py-12">
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
