import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import PortraitPlaceholder from './PortraitPlaceholder';

export default function AboutSection({ aboutData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-[#DEE2E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neu-card p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Editorial Portrait & Verified Quick Facts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="neu-card-sm p-3 rounded-2xl">
                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#DEE2E8]">
                  <PortraitPlaceholder
                    variant="hero"
                    badge="Public Life • CC BY 3.0"
                    label="Babu Mohan during a public media interaction"
                    imageUrl={aboutData.portraitUrl}
                    alt={aboutData.portraitCaption}
                    objectPosition="object-top"
                  />
                </div>
                <p className="text-[11px] text-[#646A73] mt-2 px-1">
                  {aboutData.portraitCaption}
                </p>
              </div>

              <div className="neu-inset rounded-2xl p-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E91E63]">
                  Verified Profile Summary
                </p>
                <dl className="space-y-2.5">
                  {aboutData.quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 text-xs sm:text-sm border-b border-[#DEE2E8]/80 pb-2 last:border-b-0 last:pb-0"
                    >
                      <dt className="font-semibold text-[#646A73]">{fact.label}</dt>
                      <dd className="font-semibold text-[#292B32] sm:text-right">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right Column: Two-Column Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  Biography
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#292B32] tracking-tight">
                  {aboutData.heading}
                </h2>
                <p className="text-base sm:text-lg text-[#646A73]">
                  {aboutData.subheading}
                </p>
              </div>

              <p className="font-editorial italic text-lg sm:text-xl text-[#292B32]/90 leading-relaxed border-l-3 border-[#E91E63] pl-4">
                {aboutData.summary}
              </p>

              <p className="text-sm sm:text-base text-[#646A73] leading-relaxed">
                {aboutData.extendedParagraphs[0]}
              </p>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden space-y-4 text-sm sm:text-base text-[#646A73] leading-relaxed"
                  >
                    {aboutData.extendedParagraphs.slice(1).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-expanded={expanded}
                  className="neu-btn px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-2 cursor-pointer"
                >
                  {expanded ? (
                    <>
                      Show Less
                      <ChevronUp className="w-4 h-4 text-[#E91E63]" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Read More
                      <ChevronDown className="w-4 h-4 text-[#E91E63]" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

