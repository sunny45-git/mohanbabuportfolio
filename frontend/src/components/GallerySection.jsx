import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Camera, Maximize2 } from 'lucide-react';
import PortraitPlaceholder from './PortraitPlaceholder';

const GALLERY_TABS = ['All Photos', 'Cinema', 'Politics', 'Events', 'Interviews'];

export default function GallerySection({ galleryData, onOpenLightbox }) {
  const [activeTab, setActiveTab] = useState('All Photos');

  const filteredPhotos = useMemo(() => {
    if (activeTab === 'All Photos') return galleryData;
    return galleryData.filter((item) => item.category === activeTab);
  }, [galleryData, activeTab]);

  return (
    <section id="gallery" className="py-16 sm:py-24 border-b border-[#DEE2E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-card-sm text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
            <Camera className="w-3.5 h-3.5" aria-hidden="true" />
            Visual Archive
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#292B32] tracking-tight">
            PHOTO GALLERY
          </h2>
          <p className="text-sm sm:text-base text-[#646A73]">
            Curated archival slots organized across cinema, public life, events, and interviews. Select any frame for lightbox preview.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div
          className="flex flex-wrap items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Photo gallery categories"
        >
          {GALLERY_TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer ${
                  active ? 'neu-pill-active' : 'neu-pill'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <motion.button
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28 }}
              type="button"
              onClick={() => onOpenLightbox(photo, filteredPhotos)}
              className="neu-card neu-card-hover p-3.5 text-left group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#DEE2E8] bg-[#E7EBEF] flex items-center justify-center">
                {photo.preserveAspect && photo.imageUrl ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="max-w-full max-h-full w-auto h-auto object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <PortraitPlaceholder
                    variant={
                      photo.category === 'Politics'
                        ? 'political'
                        : photo.category === 'Cinema'
                        ? 'poster'
                        : 'gallery'
                    }
                    badge={photo.tag || photo.category}
                    label={photo.title}
                    sublabel={photo.caption}
                    imageUrl={photo.imageUrl}
                    isDemoPlaceholder={Boolean(photo.isDemoPlaceholder)}
                    objectPosition={photo.objectPosition || 'object-center'}
                    alt={photo.title}
                  />
                )}
                <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/95 text-[#292B32] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
              <div className="pt-3.5 px-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E91E63]">
                    {photo.category}
                  </span>
                  <span className="text-[10px] text-[#646A73]">{photo.year}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-[#292B32] group-hover:text-[#E91E63] transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#646A73] line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

