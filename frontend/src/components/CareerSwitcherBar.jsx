import { Landmark, Film, Layers } from 'lucide-react';

export default function CareerSwitcherBar({ careerView, setCareerView }) {
  const options = [
    { id: 'both', label: 'Explore Both Journeys', icon: Layers },
    { id: 'political', label: 'Political Journey', icon: Landmark },
    { id: 'cinema', label: 'Cinema Journey', icon: Film },
  ];

  const handleSelect = (id) => {
    setCareerView(id);
    if (id === 'political') {
      document.getElementById('political-journey')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'cinema') {
      document.getElementById('cinema-journey')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-8 sm:py-10 bg-[#EDF0F3] border-b border-[#DEE2E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-center md:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E91E63]">
            Two Major Career Experiences
          </p>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#292B32] mt-1">
            Navigate Public Service &amp; Telugu Cinema
          </h2>
        </div>

        <div
          className="neu-inset p-1.5 rounded-2xl flex flex-wrap items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Career journey view mode"
        >
          {options.map((opt) => {
            const Icon = opt.icon;
            const active = careerView === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleSelect(opt.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer ${
                  active
                    ? 'neu-pill-active'
                    : 'text-[#646A73] hover:text-[#292B32]'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

