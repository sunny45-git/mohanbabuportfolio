import { LayoutDashboard } from 'lucide-react';
import { SITE_META } from '../data/portfolioData';

export default function Footer({ onOpenAdmin }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#E5E9EE] border-t border-[#DEE2E8] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="font-heading font-extrabold text-lg tracking-[0.08em] text-[#292B32]">
              BABU MOHAN
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#E91E63]">
              {SITE_META.conceptNotice}
            </p>
            <p className="text-xs sm:text-sm text-[#646A73] leading-relaxed">
              {SITE_META.disclaimerDetail}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'home', label: 'Home' },
              { id: 'political-journey', label: 'Political Journey' },
              { id: 'cinema-journey', label: 'Cinema Journey' },
              { id: 'about', label: 'About' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="text-xs font-semibold text-[#646A73] hover:text-[#E91E63] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[#DEE2E8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#646A73]">
          <p>
            Concept Portfolio Architecture • Built with React, Vite, Tailwind CSS &amp; Framer Motion
          </p>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#E91E63]" aria-hidden="true" />
            Open Admin Dashboard Concept
          </button>
        </div>
      </div>
    </footer>
  );
}

