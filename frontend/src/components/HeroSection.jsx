import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Film, Landmark, Award, MapPin } from 'lucide-react';
import { SITE_META } from '../data/portfolioData';
import PortraitPlaceholder from './PortraitPlaceholder';

export default function HeroSection({ onJumpToSection }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % SITE_META.heroRoles.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    if (onJumpToSection) {
      onJumpToSection(id);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-18 lg:pb-24 border-b border-[#DEE2E8]"
    >
      {/* Subtle Original Decorative Architectural Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        aria-hidden="true"
      >
        <img
          src={SITE_META.heroBackdropUrl}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDF0F3]/65 via-[#EDF0F3]/75 to-[#EDF0F3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#646A73]">
              {SITE_META.heroEyebrow}
            </p>

            <div className="space-y-3">
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-[4.1rem] tracking-tight text-[#292B32] leading-[1.06]">
                {SITE_META.subjectName}
              </h1>

              {/* Animated Subtitle */}
              <div className="flex flex-wrap items-center gap-2 text-lg sm:text-2xl font-heading font-semibold text-[#292B32]">
                <span className="text-[#646A73] font-medium">A Legacy as</span>
                <span className="inline-flex items-center min-w-[180px] h-9">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={SITE_META.heroRoles[roleIndex]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="text-[#E91E63]"
                    >
                      {SITE_META.heroRoles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#646A73]">
                Telugu Actor &nbsp;|&nbsp; Comedian &nbsp;|&nbsp; Public Figure
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#646A73] max-w-xl leading-relaxed">
              {SITE_META.heroSummary}
            </p>

            {/* Primary Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('political-journey')}
                className="neu-btn-accent px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase inline-flex items-center justify-center gap-2.5 cursor-pointer"
              >
                Explore My Journey
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('cinema-journey')}
                className="neu-btn px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase inline-flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Film className="w-4 h-4 text-[#E91E63]" aria-hidden="true" />
                Discover My Films
              </button>
            </div>

            {/* Verified Quick Credentials Strip */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
              <div className="neu-card-sm px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg neu-inset flex items-center justify-center text-[#E91E63] shrink-0">
                  <Award className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-[#292B32]">1991 Nandi Award</p>
                  <p className="text-[11px] text-[#646A73]">Best Male Comedian • Mamagaru</p>
                </div>
              </div>

              <div className="neu-card-sm px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg neu-inset flex items-center justify-center text-[#E91E63] shrink-0">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-[#292B32]">Andole Constituency</p>
                  <p className="text-[11px] text-[#646A73]">3-Time MLA &amp; Former Labour Minister</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content: Large Studio Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative max-w-md mx-auto lg:ml-auto">
              <div className="neu-card p-3.5 sm:p-4 rounded-[1.75rem]">
                <div className="aspect-[4/4.6] rounded-[1.25rem] overflow-hidden border border-[#DEE2E8] bg-[#E3E7ED]">
                  <PortraitPlaceholder
                    variant="hero"
                    badge="Authentic Portrait • CC BY 3.0"
                    label="Babu Mohan — Telugu Actor & Public Figure"
                    imageUrl={SITE_META.heroPortraitUrl}
                    alt="Babu Mohan, Telugu actor, comedian, and public figure"
                    objectPosition="object-top"
                    priority={true}
                  />
                </div>
                <p className="text-[11px] text-[#646A73] text-center mt-2.5 px-2">
                  {SITE_META.heroPortraitCaption}
                </p>
              </div>

              {/* Subtle bottom-left floating editorial label */}
              <div className="hidden sm:flex items-center gap-2.5 neu-card-sm px-4 py-2.5 absolute -bottom-4 -left-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E91E63]" aria-hidden="true" />
                <span className="text-xs font-semibold text-[#292B32]">
                  Presentation Concept • Dual Career Showcase
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Two Visual Highlights Below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <button
            type="button"
            onClick={() => scrollTo('political-journey')}
            className="neu-card neu-card-hover p-6 sm:p-7 text-left flex items-start justify-between gap-4 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-[#E91E63] shrink-0">
                <Landmark className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E91E63]">
                  Section A • Public Life
                </p>
                <h2 className="font-heading font-bold text-lg sm:text-xl text-[#292B32] mt-0.5 group-hover:text-[#E91E63] transition-colors">
                  Political Journey
                </h2>
                <p className="text-sm text-[#646A73] mt-1.5 leading-relaxed">
                  Electoral milestones from 1998 to 2023 in Andole, legislative terms, and cabinet service as Minister for Labour.
                </p>
              </div>
            </div>
            <ArrowRight
              className="w-5 h-5 text-[#646A73] group-hover:text-[#E91E63] group-hover:translate-x-1 transition-all shrink-0 mt-1"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('cinema-journey')}
            className="neu-card neu-card-hover p-6 sm:p-7 text-left flex items-start justify-between gap-4 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-[#E91E63] shrink-0">
                <Film className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E91E63]">
                  Section B • Entertainment
                </p>
                <h2 className="font-heading font-bold text-lg sm:text-xl text-[#292B32] mt-0.5 group-hover:text-[#E91E63] transition-colors">
                  Cinema Journey
                </h2>
                <p className="text-sm text-[#646A73] mt-1.5 leading-relaxed">
                  Nandi Award-winning comedy legacy, searchable decade filmography, iconic characters, and archival film stills.
                </p>
              </div>
            </div>
            <ArrowRight
              className="w-5 h-5 text-[#646A73] group-hover:text-[#E91E63] group-hover:translate-x-1 transition-all shrink-0 mt-1"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

