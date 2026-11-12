import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Landmark,
  MapPin,
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  HeartHandshake,
  Megaphone,
  Building2,
} from 'lucide-react';
import {
  POLITICAL_BIO,
  ANDOLE_CONSTITUENCY,
  MINISTERIAL_CAREER,
  PUBLIC_SERVICE_ITEMS,
  POLITICAL_FEATURED_PHOTOS,
} from '../data/portfolioData';
import PortraitPlaceholder from './PortraitPlaceholder';

const SERVICE_ICONS = {
  'Public Appearances': Megaphone,
  'Community Activities': Users,
  'Public Initiatives': Building2,
  'Social Service Activities': HeartHandshake,
};

export default function PoliticalJourneySection({
  timelineData,
  galleryData,
  onOpenLightbox,
}) {
  const [selectedYearId, setSelectedYearId] = useState(
    timelineData?.[0]?.id || 'pt-1998'
  );

  const activeMilestone =
    timelineData.find((m) => m.id === selectedYearId) || timelineData[0];

  const politicalGallery = galleryData.filter(
    (item) =>
      (item.category === 'Politics' || item.category === 'Events') &&
      !POLITICAL_FEATURED_PHOTOS.some((fp) => fp.id === item.id)
  );

  return (
    <section
      id="political-journey"
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
            <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
            Section A • Political Journey
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#292B32] tracking-tight">
            {POLITICAL_BIO.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#646A73]">
            {POLITICAL_BIO.subtitle}
          </p>
        </motion.div>

        {/* A. Political Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="neu-card p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="neu-card-sm p-3 rounded-2xl">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#DEE2E8]">
                  <PortraitPlaceholder
                    variant="political"
                    badge="Legislative Heritage • CC BY-SA 3.0"
                    label="Telangana Legislative Assembly, Hyderabad"
                    imageUrl={POLITICAL_BIO.portraitUrl}
                    alt={POLITICAL_BIO.portraitCaption}
                    objectPosition="object-center"
                  />
                </div>
                <p className="text-[11px] text-[#646A73] mt-2 px-1">
                  {POLITICAL_BIO.portraitCaption}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
                  Political Introduction
                </p>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32]">
                  From Popular Cinema to Elected Public Representation
                </h3>
              </div>

              <p className="font-editorial italic text-lg sm:text-xl text-[#292B32]/90 leading-relaxed border-l-3 border-[#E91E63] pl-4">
                {POLITICAL_BIO.leadParagraph}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-[#646A73] leading-relaxed">
                {POLITICAL_BIO.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* B. Interactive Political Timeline */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
                Verified Electoral Record (1998 – 2023)
              </p>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] mt-1">
                Political Timeline — Andole Constituency
              </h3>
            </div>
            <p className="text-xs text-[#646A73]">
              Select any election year to inspect verified milestone details.
            </p>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="hidden lg:block neu-card p-7 space-y-7">
            <div className="relative">
              {/* Connecting track */}
              <div
                className="absolute top-6 left-6 right-6 h-0.5 bg-[#DEE2E8]"
                aria-hidden="true"
              />
              <div className="grid grid-cols-7 gap-3 relative z-10">
                {timelineData.map((item) => {
                  const isSelected = item.id === activeMilestone?.id;
                  const isWin = item.outcome.toLowerCase().includes('elected') || item.outcome.toLowerCase().includes('re-elected');
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedYearId(item.id)}
                      className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                    >
                      <span
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-bold text-sm transition-all ${
                          isSelected
                            ? 'neu-pill-active scale-105'
                            : 'neu-card-sm text-[#292B32] group-hover:text-[#E91E63]'
                        }`}
                      >
                        {item.year}
                      </span>
                      <span
                        className={`mt-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isWin
                            ? 'bg-emerald-500/10 text-emerald-700'
                            : 'bg-[#E7EBEF] text-[#646A73]'
                        }`}
                      >
                        {isWin ? 'Won' : 'Contested'}
                      </span>
                      <span className="mt-1 text-xs font-medium text-[#646A73] line-clamp-1">
                        {item.party.match(/\(([^)]+)\)/)?.[1] || item.party}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeMilestone && (
              <motion.div
                key={activeMilestone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="neu-inset rounded-2xl p-6 flex items-start justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-[#E91E63] text-white text-xs font-bold">
                      {activeMilestone.year}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#292B32]">
                      {activeMilestone.party}
                    </span>
                    <span className="text-xs text-[#646A73]">
                      • {activeMilestone.constituency} Constituency
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-xl text-[#292B32]">
                    {activeMilestone.title}
                  </h4>
                  <p className="text-sm sm:text-base text-[#646A73] leading-relaxed">
                    {activeMilestone.summary}
                  </p>
                </div>

                <div className="shrink-0 neu-card-sm px-4 py-3 text-right">
                  <p className="text-[11px] uppercase tracking-wider text-[#646A73]">
                    Outcome
                  </p>
                  <p className="font-heading font-bold text-sm text-[#292B32] mt-0.5">
                    {activeMilestone.outcome}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Mobile & Tablet Vertical Timeline */}
          <div className="lg:hidden relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DEE2E8]">
            {timelineData.map((item) => {
              const isWin = item.outcome.toLowerCase().includes('elected') || item.outcome.toLowerCase().includes('re-elected');
              return (
                <div key={item.id} className="relative neu-card-sm p-5">
                  <span
                    className={`absolute -left-[1.28rem] top-6 w-3.5 h-3.5 rounded-full border-2 border-[#EDF0F3] ${
                      isWin ? 'bg-[#E91E63]' : 'bg-[#646A73]'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-heading font-extrabold text-base text-[#E91E63]">
                      {item.year}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        isWin
                          ? 'bg-emerald-500/10 text-emerald-700'
                          : 'bg-[#E7EBEF] text-[#646A73]'
                      }`}
                    >
                      {item.outcome}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#292B32]">
                    {item.party} • {item.constituency}
                  </p>
                  <h4 className="font-heading font-bold text-base text-[#292B32] mt-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#646A73] mt-1.5 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* C. Andole Constituency & D. Ministerial Career */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* C. Andole Constituency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 neu-card p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl neu-inset flex items-center justify-center text-[#E91E63]">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E91E63]">
                    Constituency Profile
                  </p>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#292B32]">
                    {ANDOLE_CONSTITUENCY.title}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="neu-card-sm p-3.5">
                  <p className="text-[11px] uppercase tracking-wider text-[#646A73]">District &amp; State</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#292B32] mt-1">
                    {ANDOLE_CONSTITUENCY.district}
                  </p>
                </div>
                <div className="neu-card-sm p-3.5">
                  <p className="text-[11px] uppercase tracking-wider text-[#646A73]">Classification</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#292B32] mt-1">
                    {ANDOLE_CONSTITUENCY.constituencyCode}
                  </p>
                </div>
                <div className="neu-card-sm p-3.5">
                  <p className="text-[11px] uppercase tracking-wider text-[#646A73]">Parliament Segment</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#292B32] mt-1">
                    {ANDOLE_CONSTITUENCY.lokSabha}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#646A73] leading-relaxed">
                {ANDOLE_CONSTITUENCY.overview}
              </p>

              {/* Constituency Visuals: Official Map + Historic Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="neu-card-sm p-2.5 rounded-xl">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#DEE2E8] bg-white">
                    <PortraitPlaceholder
                      variant="political"
                      badge="AC No. 36 Highlighted"
                      label="Andole Constituency Map"
                      imageUrl={ANDOLE_CONSTITUENCY.mapUrl}
                      alt="Telangana Assembly Constituencies Map with 36-Andole highlighted"
                      objectPosition="object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-[#646A73] mt-1.5 px-1">
                    36 – Andole Highlighted (Wikimedia Commons, CC BY-SA 4.0)
                  </p>
                </div>

                <div className="neu-card-sm p-2.5 rounded-xl">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#DEE2E8]">
                    <PortraitPlaceholder
                      variant="political"
                      badge="Constituency Landmark"
                      label="Andole Historic Gateway"
                      imageUrl={ANDOLE_CONSTITUENCY.landmarkUrl}
                      alt="Historic gateway landmark in Andole, Sangareddy district"
                      objectPosition="object-center"
                    />
                  </div>
                  <p className="text-[11px] text-[#646A73] mt-1.5 px-1">
                    Historic Gateway, Andole (Wikimedia Commons, CC BY-SA 4.0)
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#292B32] mb-2">
                  Mandals in Constituency
                </p>
                <div className="flex flex-wrap gap-2">
                  {ANDOLE_CONSTITUENCY.mandals.map((mandal) => (
                    <span
                      key={mandal}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#EDF0F3] border border-[#DEE2E8] text-[#292B32]"
                    >
                      {mandal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Electoral History Table */}
            <div className="neu-inset rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#292B32] mb-3">
                Electoral History in Andole
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {ANDOLE_CONSTITUENCY.electoralRecord.map((rec) => (
                  <div
                    key={rec.year}
                    className="bg-[#F5F7FA] rounded-lg p-2.5 border border-[#DEE2E8] text-center"
                  >
                    <p className="text-[11px] font-bold text-[#292B32]">{rec.year}</p>
                    <p className="text-[11px] text-[#646A73] mt-0.5">{rec.party}</p>
                    <span
                      className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        rec.result === 'Won'
                          ? 'bg-emerald-500/12 text-emerald-700'
                          : 'bg-[#E7EBEF] text-[#646A73]'
                      }`}
                    >
                      {rec.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* D. Ministerial Career */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5 neu-card p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl neu-inset flex items-center justify-center text-[#E91E63]">
                  <Briefcase className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E91E63]">
                    Cabinet Governance
                  </p>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#292B32]">
                    Ministerial Career
                  </h3>
                </div>
              </div>

              <div className="neu-card-sm p-2.5 rounded-xl">
                <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#DEE2E8]">
                  <PortraitPlaceholder
                    variant="political"
                    badge="Legislative Heritage"
                    label="Jubilee Hall Legislative Complex"
                    imageUrl={MINISTERIAL_CAREER.imageUrl}
                    alt={MINISTERIAL_CAREER.imageCaption}
                    objectPosition="object-center"
                  />
                </div>
                <p className="text-[11px] text-[#646A73] mt-1.5 px-1">
                  {MINISTERIAL_CAREER.imageCaption}
                </p>
              </div>

              <div className="neu-card-sm p-5 space-y-3 border-l-4 border-l-[#E91E63]">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E91E63]">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {MINISTERIAL_CAREER.tenure}
                </span>
                <h4 className="font-heading font-extrabold text-xl text-[#292B32]">
                  {MINISTERIAL_CAREER.office}
                </h4>
                <p className="text-sm font-medium text-[#292B32]">
                  {MINISTERIAL_CAREER.government}
                </p>
                <p className="text-xs text-[#646A73]">
                  {MINISTERIAL_CAREER.administration}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#646A73] leading-relaxed">
                {MINISTERIAL_CAREER.summary}
              </p>
            </div>

            <div className="neu-inset rounded-xl p-4 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E91E63] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-[#646A73] leading-relaxed">
                {MINISTERIAL_CAREER.verificationNote}
              </p>
            </div>
          </motion.div>
        </div>

        {/* E. Public Service */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
              Civic Outreach &amp; Engagement
            </p>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] mt-1">
              Public Service &amp; Community Presence
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PUBLIC_SERVICE_ITEMS.map((item) => {
              const Icon = SERVICE_ICONS[item.category] || ChevronRight;
              return (
                <div
                  key={item.id}
                  className="neu-card neu-card-hover p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl neu-inset flex items-center justify-center text-[#E91E63]">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E91E63]">
                      {item.category}
                    </p>
                    <h4 className="font-heading font-bold text-base text-[#292B32]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#646A73] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <p className="text-[11px] font-medium text-[#646A73] pt-3 border-t border-[#DEE2E8]">
                    {item.status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* F. Political Gallery */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
                Archival Visual Showcase
              </p>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#292B32] mt-1">
                Political &amp; Official Function Gallery
              </h3>
            </div>
            <p className="text-xs text-[#646A73]">
              Click any photograph to view full resolution in lightbox
            </p>
          </div>

          {/* Featured Political Photographs (Preserving Original Quality & Aspect Ratios) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {POLITICAL_FEATURED_PHOTOS.map((photo, index) => (
              <motion.button
                key={photo.id}
                type="button"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={() =>
                  onOpenLightbox(photo, [...POLITICAL_FEATURED_PHOTOS, ...politicalGallery])
                }
                className={`${
                  index === 0 ? 'md:col-span-7' : 'md:col-span-5'
                } neu-card p-4 sm:p-5 text-left group cursor-pointer flex flex-col justify-between`}
              >
                <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-[#DEE2E8] bg-[#E7EBEF] flex items-center justify-center p-2">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="max-w-full max-h-full w-auto h-auto rounded-xl object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] bg-[#292B32]/80 text-white backdrop-blur-xs">
                    {photo.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 w-8 h-8 rounded-xl bg-white/95 text-[#292B32] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="pt-4 px-1 space-y-1">
                  <h4 className="font-heading font-bold text-base text-[#292B32] group-hover:text-[#E91E63] transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#646A73] leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Supporting Constituency & Legislative Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {politicalGallery.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() =>
                  onOpenLightbox(photo, [...POLITICAL_FEATURED_PHOTOS, ...politicalGallery])
                }
                className="neu-card neu-card-hover p-3 text-left group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#DEE2E8]">
                  <PortraitPlaceholder
                    variant="political"
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

