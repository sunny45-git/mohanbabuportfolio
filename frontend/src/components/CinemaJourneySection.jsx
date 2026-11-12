import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Search,
  Award,
  Sparkles,
  Calendar,
  Maximize2,
  Clapperboard,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  CINEMA_INTRO,
  MEMORABLE_PERFORMANCES,
  CINEMA_MILESTONES,
} from '../data/portfolioData';
import PortraitPlaceholder from './PortraitPlaceholder';

const DECADE_FILTERS = [
  { id: 'all', label: 'All Movies' },
  { id: '1990-1999', label: '1990–1999' },
  { id: '2000-2009', label: '2000–2009' },
  { id: '2010-2019', label: '2010–2019' },
  { id: '2020-onwards', label: '2020 onwards' },
];

export default function CinemaJourneySection({
  filmographyData,
  awardsData,
  galleryData,
  onOpenLightbox,
}) {
  const [decadeFilter, setDecadeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return filmographyData.filter((film) => {
      const matchesDecade =
        decadeFilter === 'all' || film.decade === decadeFilter;
      const matchesSearch =
        !q ||
        film.title.toLowerCase().includes(q) ||
        film.role.toLowerCase().includes(q) ||
        film.language.toLowerCase().includes(q) ||
        String(film.year).includes(q) ||
        (film.description && film.description.toLowerCase().includes(q));
      return matchesDecade && matchesSearch;
    });
  }, [filmographyData, decadeFilter, searchQuery]);

  const cinemaGallery = galleryData.filter(
    (item) => item.category === 'Cinema' || item.category === 'Interviews'
  );

  return (
    <section
      id="cinema-journey"
      className="py-16 sm:py-24 border-b border-[#DEE2E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-card-sm text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
            <Film className="w-3.5 h-3.5" aria-hidden="true" />
            Section B • Cinema Journey
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#292B32] tracking-tight">
            {CINEMA_INTRO.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#646A73]">
            {CINEMA_INTRO.subtitle}
          </p>
        </motion.div>

        {/* A. Cinema Introduction (Editorial Style) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="neu-card p-6 sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
                Editorial Introduction
              </p>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] leading-snug">
                A Household Voice of Telugu Cinema Comedy
              </h3>
              <p className="font-editorial italic text-lg sm:text-xl text-[#292B32]/90 leading-relaxed border-l-3 border-[#E91E63] pl-4">
                {CINEMA_INTRO.lead}
              </p>
              <p className="text-sm sm:text-base text-[#646A73] leading-relaxed">
                {CINEMA_INTRO.body}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="neu-card-sm p-3 rounded-2xl">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#DEE2E8]">
                  <PortraitPlaceholder
                    variant="poster"
                    badge="Telugu Cinema Hub • CC BY-SA 4.0"
                    label="Ramanaidu Studios, Film Nagar, Hyderabad"
                    imageUrl={CINEMA_INTRO.imageUrl}
                    alt={CINEMA_INTRO.imageCaption}
                    objectPosition="object-center"
                  />
                </div>
                <p className="text-[11px] text-[#646A73] mt-2 px-1">
                  {CINEMA_INTRO.imageCaption}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* B. Filmography Database */}
        <div className="space-y-7">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
                Selected Verified Credits
              </p>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] mt-1">
                Filmography Archive
              </h3>
              <p className="text-xs sm:text-sm text-[#646A73] mt-1">
                Featuring verified Telugu film appearances; unconfirmed character credits are explicitly marked pending archival verification.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full lg:w-80">
              <label htmlFor="filmography-search" className="sr-only">
                Search movies by title, year, or character
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#646A73] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="filmography-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title, role, or year..."
                  className="w-full neu-inset rounded-xl pl-11 pr-4 py-3 text-sm text-[#292B32] placeholder:text-[#646A73]/80 focus:outline-none focus:ring-2 focus:ring-[#E91E63]/40"
                />
              </div>
            </div>
          </div>

          {/* Decade Filter Pills */}
          <div
            className="flex flex-wrap items-center gap-2.5"
            role="tablist"
            aria-label="Filter filmography by decade"
          >
            {DECADE_FILTERS.map((filter) => {
              const active = decadeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDecadeFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer ${
                    active ? 'neu-pill-active' : 'neu-pill'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
            <span className="ml-auto text-xs font-medium text-[#646A73]">
              Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          {/* Movie Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovies.map((film) => (
                <article
                  key={film.id}
                  className="neu-card neu-card-hover p-4 sm:p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#DEE2E8]">
                      <PortraitPlaceholder
                        variant="poster"
                        badge={`${film.year} • Poster Demo Placeholder`}
                        label={film.title}
                        sublabel={`${film.language} Cinema • Official Studio Poster Pending`}
                        imageUrl={film.posterUrl || '/images/decor-cinema-reel.jpg'}
                        isDemoPlaceholder={true}
                        alt={`${film.title} (${film.year}) poster placeholder`}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-bold text-lg text-[#292B32]">
                          {film.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E91E63]/10 text-[#E91E63] shrink-0">
                          {film.year}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#EDF0F3] border border-[#DEE2E8] font-medium text-[#292B32]">
                          {film.language}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#646A73]">
                          {film.verifiedCharacter ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                          ) : (
                            <Info className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                          )}
                          <span className="font-medium text-[#292B32]">Role:</span>{' '}
                          {film.role}
                        </span>
                      </div>

                      <p className="text-sm text-[#646A73] leading-relaxed">
                        {film.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="neu-card p-10 text-center space-y-3">
              <Clapperboard className="w-10 h-10 text-[#646A73] mx-auto" aria-hidden="true" />
              <h4 className="font-heading font-bold text-lg text-[#292B32]">
                No Matching Verified Film Entries
              </h4>
              <p className="text-sm text-[#646A73] max-w-md mx-auto">
                Try clearing your search term or switching decade filters. Complete verified archival filmography records can be added via the Admin Dashboard.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setDecadeFilter('all');
                }}
                className="neu-btn px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* C. Memorable Performances */}
        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
              Signature Roles
            </p>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] mt-1">
              Memorable Comedy Performances
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MEMORABLE_PERFORMANCES.map((perf) => (
              <div
                key={perf.id}
                className="neu-card neu-card-hover p-4 flex flex-col justify-between space-y-3.5"
              >
                <div className="space-y-3">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#DEE2E8]">
                    <PortraitPlaceholder
                      variant="poster"
                      badge={`${perf.year} • Still Demo Placeholder`}
                      label={perf.movie}
                      sublabel={`Character: ${perf.character}`}
                      imageUrl={perf.imageUrl || '/images/decor-cinema-reel.jpg'}
                      isDemoPlaceholder={true}
                      alt={`${perf.movie} (${perf.year}) performance still placeholder`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading font-bold text-base text-[#292B32]">
                        {perf.movie}
                      </h4>
                      <span className="text-xs font-semibold text-[#E91E63]">
                        {perf.year}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#646A73] mt-0.5">
                      Character: <span className="text-[#292B32]">{perf.character}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-[#646A73] mt-2 leading-relaxed">
                      {perf.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* D. Awards and Recognitions */}
        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
              State Honours &amp; Distinctions
            </p>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] mt-1">
              Awards &amp; Recognitions
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {awardsData.map((award) => (
              <motion.div
                key={award.id}
                whileHover={{ y: -3 }}
                className="neu-card p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-5 border-l-4 border-l-[#E91E63]"
              >
                {award.imageUrl ? (
                  <div className="w-full sm:w-40 shrink-0">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#DEE2E8]">
                      <PortraitPlaceholder
                        variant="gallery"
                        badge="Nandi Heritage"
                        label={award.name}
                        imageUrl={award.imageUrl}
                        alt={award.imageCaption || award.name}
                        objectPosition="object-center"
                      />
                    </div>
                    {award.imageCaption && (
                      <p className="text-[10px] text-[#646A73] mt-1.5 leading-snug">
                        {award.imageCaption}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="w-13 h-13 rounded-2xl neu-inset flex items-center justify-center text-[#E91E63] shrink-0">
                    <Award className="w-6 h-6" aria-hidden="true" />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#E91E63] text-white text-xs font-bold">
                      {award.year}
                    </span>
                    <span className="text-xs font-semibold text-[#646A73]">
                      {award.organization}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-lg sm:text-xl text-[#292B32]">
                    {award.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#292B32]">
                    Category: {award.category} {award.film ? `• Film: ${award.film}` : ''}
                  </p>
                  <p className="text-sm text-[#646A73] leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Graceful Archival Placeholder State for Unverified / Additional Awards */}
            <div className="neu-inset rounded-2xl p-6 sm:p-7 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl neu-card-sm flex items-center justify-center text-[#646A73] shrink-0">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#646A73]">
                  Archival Verification Policy
                </p>
                <h4 className="font-heading font-bold text-base sm:text-lg text-[#292B32]">
                  Additional Verified Records Will Be Added
                </h4>
                <p className="text-sm text-[#646A73] leading-relaxed">
                  To uphold historical accuracy, no unverified awards or honours are displayed in this demo. Additional felicitations, lifetime achievements, and citations will be published once confirmed by Babu Mohan&apos;s office.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* E. Cinema Career Highlights */}
        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
              Career Progression
            </p>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] mt-1">
              Cinema Career Highlights
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CINEMA_MILESTONES.map((step, idx) => (
              <div key={step.id} className="neu-card p-6 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E91E63]">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    {step.era}
                  </span>
                  <span className="text-xs font-heading font-extrabold text-[#646A73]/50">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-[#292B32]">
                  {step.title}
                </h4>
                <p className="text-sm text-[#646A73] leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* F. Cinema Photo Gallery */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
                Silver Screen &amp; Studio Archive
              </p>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] mt-1">
                Cinema Photo Gallery
              </h3>
            </div>
            <p className="text-xs text-[#646A73]">
              Click any frame to open lightbox preview
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cinemaGallery.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => onOpenLightbox(photo, cinemaGallery)}
                className="neu-card neu-card-hover p-3 text-left group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#DEE2E8]">
                  <PortraitPlaceholder
                    variant="poster"
                    badge={photo.tag}
                    label={photo.title}
                    sublabel={photo.caption}
                    imageUrl={photo.imageUrl}
                    isDemoPlaceholder={Boolean(photo.isDemoPlaceholder)}
                    objectPosition={photo.objectPosition || 'object-center'}
                    alt={photo.title}
                  />
                  <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/90 text-[#292B32] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="pt-3 px-1">
                  <p className="font-heading font-bold text-sm text-[#292B32] group-hover:text-[#E91E63] transition-colors">
                    {photo.title}
                  </p>
                  <p className="text-xs text-[#646A73] mt-0.5 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

