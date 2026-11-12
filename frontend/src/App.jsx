import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import {
  FILMOGRAPHY,
  AWARDS_DATA,
  POLITICAL_TIMELINE,
  GALLERY_ITEMS,
  MEDIA_ITEMS,
  ABOUT_CONTENT,
  CONTACT_INFO,
} from './data/portfolioData';
import { fetchPortfolioBootstrap } from './services/api';
import ConceptBanner from './components/ConceptBanner';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CareerSwitcherBar from './components/CareerSwitcherBar';
import PoliticalJourneySection from './components/PoliticalJourneySection';
import CinemaJourneySection from './components/CinemaJourneySection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import LightboxModal from './components/LightboxModal';
import MediaSection from './components/MediaSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

const SECTION_IDS = [
  'home',
  'political-journey',
  'cinema-journey',
  'about',
  'gallery',
  'contact',
];

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [careerView, setCareerView] = useState('both');

  // Interactive demo state (hydrated by backend if configured, otherwise verified local data)
  const [movies, setMovies] = useState(FILMOGRAPHY);
  const [awards, setAwards] = useState(AWARDS_DATA);
  const [timeline, setTimeline] = useState(POLITICAL_TIMELINE);
  const [gallery, setGallery] = useState(GALLERY_ITEMS);
  const [media, setMedia] = useState(MEDIA_ITEMS);
  const [about, setAbout] = useState(ABOUT_CONTENT);
  const [contact, setContact] = useState(CONTACT_INFO);

  // Lightbox state
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [lightboxList, setLightboxList] = useState([]);

  useEffect(() => {
    fetchPortfolioBootstrap().then((data) => {
      if (!data) return;
      if (Array.isArray(data.movies) && data.movies.length) setMovies(data.movies);
      if (Array.isArray(data.awards) && data.awards.length) setAwards(data.awards);
      if (Array.isArray(data.timeline) && data.timeline.length) setTimeline(data.timeline);
      if (Array.isArray(data.gallery) && data.gallery.length) setGallery(data.gallery);
      if (Array.isArray(data.media) && data.media.length) setMedia(data.media);
    });
  }, []);

  // Active section scroll spy
  useEffect(() => {
    if (isAdminView) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isAdminView, careerView]);

  const handleNavigate = (id) => {
    if (id === 'political-journey' && careerView === 'cinema') {
      setCareerView('both');
    } else if (id === 'cinema-journey' && careerView === 'political') {
      setCareerView('both');
    }
  };

  const handleOpenLightbox = (photo, list) => {
    setLightboxPhoto(photo);
    setLightboxList(list && list.length ? list : gallery);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#EDF0F3] text-[#292B32] flex flex-col">
        <ConceptBanner
          isAdminView={isAdminView}
          onToggleAdmin={() => {
            setIsAdminView((prev) => !prev);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {isAdminView ? (
          <AdminDashboard
            movies={movies}
            setMovies={setMovies}
            awards={awards}
            setAwards={setAwards}
            timeline={timeline}
            setTimeline={setTimeline}
            gallery={gallery}
            setGallery={setGallery}
            media={media}
            setMedia={setMedia}
            about={about}
            setAbout={setAbout}
            contact={contact}
            setContact={setContact}
            onExitAdmin={() => setIsAdminView(false)}
          />
        ) : (
          <>
            <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

            <main className="flex-1">
              <HeroSection onJumpToSection={handleNavigate} />

              <CareerSwitcherBar
                careerView={careerView}
                setCareerView={setCareerView}
              />

              {(careerView === 'both' || careerView === 'political') && (
                <PoliticalJourneySection
                  timelineData={timeline}
                  galleryData={gallery}
                  onOpenLightbox={handleOpenLightbox}
                />
              )}

              {(careerView === 'both' || careerView === 'cinema') && (
                <CinemaJourneySection
                  filmographyData={movies}
                  awardsData={awards}
                  galleryData={gallery}
                  onOpenLightbox={handleOpenLightbox}
                />
              )}

              <AboutSection aboutData={about} />

              <GallerySection
                galleryData={gallery}
                onOpenLightbox={handleOpenLightbox}
              />

              <MediaSection mediaData={media} />

              <ContactSection contactData={contact} />
            </main>

            <Footer
              onOpenAdmin={() => {
                setIsAdminView(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <LightboxModal
              activePhoto={lightboxPhoto}
              photos={lightboxList}
              onClose={() => setLightboxPhoto(null)}
              onSelectPhoto={setLightboxPhoto}
            />
          </>
        )}
      </div>
    </MotionConfig>
  );
}

