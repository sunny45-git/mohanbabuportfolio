import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ExternalLink, X, Calendar } from 'lucide-react';
import PortraitPlaceholder from './PortraitPlaceholder';

export default function MediaSection({ mediaData }) {
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <section id="media" className="py-16 sm:py-24 border-b border-[#DEE2E8]">
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
            <Newspaper className="w-3.5 h-3.5" aria-hidden="true" />
            Press &amp; Broadcast
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#292B32] tracking-tight">
            MEDIA &amp; INTERVIEWS
          </h2>
          <p className="text-sm sm:text-base text-[#646A73]">
            Structured showcase slots for television interviews, print features, public addresses, and film press. Marked as demo placeholders until official media links are supplied.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaData.map((item) => (
            <article
              key={item.id}
              className="neu-card neu-card-hover p-4 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#DEE2E8]">
                  <PortraitPlaceholder
                    variant="media"
                    badge="Demo Placeholder"
                    label={item.type}
                    sublabel="Awaiting Verified Press Link"
                    imageUrl={item.thumbnailUrl}
                    isDemoPlaceholder={true}
                    alt={`${item.type} placeholder thumbnail`}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-semibold uppercase tracking-wider text-[#E91E63]">
                      {item.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#646A73]">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#292B32] leading-snug">
                    {item.headline}
                  </h3>
                  <p className="text-xs font-medium text-[#646A73]">
                    Source: {item.source}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMedia(item)}
                className="neu-btn w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Read More
                <ExternalLink className="w-3.5 h-3.5 text-[#E91E63]" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Placeholder Detail Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 bg-[#292B32]/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selectedMedia.headline}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#F5F7FA] rounded-2xl p-6 sm:p-7 shadow-2xl border border-white/70 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E91E63]">
                    {selectedMedia.type} • Demo Placeholder
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#292B32] mt-1">
                    {selectedMedia.headline}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMedia(null)}
                  aria-label="Close article preview"
                  className="neu-btn w-9 h-9 rounded-xl flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="neu-inset rounded-xl p-4 space-y-2 text-sm text-[#646A73]">
                <p>
                  <strong className="text-[#292B32]">Source:</strong> {selectedMedia.source}
                </p>
                <p>
                  <strong className="text-[#292B32]">Publication Date:</strong> {selectedMedia.date}
                </p>
                <p className="leading-relaxed pt-1">{selectedMedia.summary}</p>
              </div>

              <p className="text-xs text-[#646A73]">
                No external article URL or publication date is fabricated in this demo. Authorized press links can be published via the Admin Dashboard.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

