import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import PortraitPlaceholder from './PortraitPlaceholder';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'political-journey', label: 'Political Journey' },
  { id: 'cinema-journey', label: 'Cinema Journey' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#EDF0F3]/92 backdrop-blur-md shadow-[0_8px_24px_rgba(194,200,210,0.45)] border-b border-[#DEE2E8]/80'
          : 'bg-[#EDF0F3]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4"
      >
        {/* Left: Circular portrait badge + Brand text */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] rounded-full pr-2"
        >
          <PortraitPlaceholder
            variant="avatar"
            label="BM"
            imageUrl="/images/babu-mohan-portrait.png"
            alt="Babu Mohan portrait"
          />
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-sm sm:text-base tracking-[0.09em] text-[#292B32] group-hover:text-[#E91E63] transition-colors">
              BABU MOHAN
            </span>
            <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#646A73] hidden sm:block">
              Portfolio Concept
            </span>
          </div>
        </a>

        {/* Right: Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1.5">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 inline-flex items-center ${
                    isActive
                      ? 'text-[#E91E63] font-semibold neu-card-sm'
                      : 'text-[#646A73] hover:text-[#292B32]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="ml-1.5 w-1.5 h-1.5 rounded-full bg-[#E91E63]"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="lg:hidden neu-btn w-11 h-11 rounded-xl flex items-center justify-center text-[#292B32] cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#EDF0F3] border-b border-[#DEE2E8] shadow-lg"
          >
            <ul className="px-4 py-4 space-y-2 max-w-7xl mx-auto">
              {NAV_LINKS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      className={`block w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'neu-pill-active font-semibold'
                          : 'neu-card-sm text-[#292B32] hover:text-[#E91E63]'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

