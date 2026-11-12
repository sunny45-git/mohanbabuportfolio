import { ShieldAlert, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { SITE_META } from '../data/portfolioData';

export default function ConceptBanner({ isAdminView, onToggleAdmin }) {
  return (
    <div className="bg-[#292B32] text-white/95 text-xs py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-[#E91E63] shrink-0" aria-hidden="true" />
          <span className="font-semibold tracking-[0.08em] uppercase text-[11px] sm:text-xs">
            {SITE_META.conceptNotice}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleAdmin}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-[#E91E63] text-white px-3 py-1 text-[11px] font-medium transition-colors cursor-pointer"
        >
          {isAdminView ? (
            <>
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Back to Public Portfolio
            </>
          ) : (
            <>
              <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
              Admin Dashboard Concept
            </>
          )}
        </button>
      </div>
    </div>
  );
}

