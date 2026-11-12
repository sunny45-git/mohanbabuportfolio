import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PortraitPlaceholder from './PortraitPlaceholder';

export default function LightboxModal({
  activePhoto,
  photos,
  onClose,
  onSelectPhoto,
}) {
  const currentIndex = activePhoto
    ? photos.findIndex((p) => p.id === activePhoto.id)
    : -1;

  const goPrev = () => {
    if (!photos.length || currentIndex < 0) return;
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIdx]);
  };

  const goNext = () => {
    if (!photos.length || currentIndex < 0) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIdx]);
  };

  useEffect(() => {
    if (!activePhoto) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <AnimatePresence>
      {activePhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#292B32]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-[#F5F7FA] rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/60 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E91E63]">
                  {activePhoto.category} • {activePhoto.tag}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#292B32]">
                  {activePhoto.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close lightbox preview"
                className="neu-btn w-10 h-10 rounded-xl flex items-center justify-center text-[#292B32] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#DEE2E8] bg-[#E7EBEF] flex items-center justify-center">
              {activePhoto.preserveAspect && activePhoto.imageUrl ? (
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              ) : (
                <PortraitPlaceholder
                  variant={
                    activePhoto.category === 'Politics'
                      ? 'political'
                      : activePhoto.category === 'Cinema'
                      ? 'poster'
                      : 'gallery'
                  }
                  badge={activePhoto.tag}
                  label={activePhoto.title}
                  sublabel={activePhoto.caption}
                  imageUrl={activePhoto.imageUrl}
                  isDemoPlaceholder={Boolean(activePhoto.isDemoPlaceholder)}
                  objectPosition={activePhoto.objectPosition || 'object-center'}
                  alt={activePhoto.title}
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <p className="text-sm text-[#646A73]">{activePhoto.caption}</p>

              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                <span className="text-xs font-medium text-[#646A73] mr-1">
                  {currentIndex + 1} / {photos.length}
                </span>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="neu-btn w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next image"
                  className="neu-btn w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

