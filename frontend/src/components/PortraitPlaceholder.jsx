import { useState } from 'react';
import { Camera, Film, Landmark, Newspaper, User } from 'lucide-react';

/**
 * Renders either an authentic verified image (with graceful fallback & consistent cropping)
 * or a clearly labelled demo placeholder layered over original decorative artwork.
 */
export default function PortraitPlaceholder({
  variant = 'hero',
  label = 'Authorized Portrait Slot',
  sublabel = 'Pending Official Selection',
  badge,
  imageUrl,
  alt,
  isDemoPlaceholder = false,
  objectPosition = 'object-top',
  priority = false,
  className = '',
}) {
  const [imgError, setImgError] = useState(false);

  if (variant === 'avatar') {
    return (
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full neu-card-sm flex items-center justify-center border-2 border-white overflow-hidden shrink-0 bg-[#DDE2E9] ${className}`}
        title={alt || 'Babu Mohan'}
      >
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={alt || 'Babu Mohan portrait'}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <span className="font-heading font-extrabold text-xs tracking-wider text-[#292B32]">
            {label}
          </span>
        )}
      </div>
    );
  }

  // Authentic photograph or verified decorative background rendered cleanly
  if (imageUrl && !imgError && !isDemoPlaceholder) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#E3E7ED] ${className}`}>
        <img
          src={imageUrl}
          alt={alt || label}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover ${objectPosition} transition-transform duration-500`}
        />
        {badge && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] bg-[#292B32]/80 backdrop-blur-xs text-white border border-white/15">
            {badge}
          </span>
        )}
      </div>
    );
  }

  // Clearly labelled Demo Placeholder backed by original decorative art when imageUrl is provided
  const fallbackBg =
    imageUrl && !imgError
      ? imageUrl
      : variant === 'poster'
      ? '/images/decor-cinema-reel.jpg'
      : variant === 'political'
      ? '/images/decor-civic-pillars.jpg'
      : null;

  const iconMap = {
    hero: User,
    political: Landmark,
    poster: Film,
    gallery: Camera,
    media: Newspaper,
  };
  const Icon = iconMap[variant] || Camera;

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#292B32] flex flex-col items-center justify-center text-center p-5 select-none ${className}`}
      role="img"
      aria-label={alt || `${label} — ${sublabel}`}
    >
      {fallbackBg && (
        <img
          src={fallbackBg}
          alt=""
          aria-hidden="true"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-55 scale-105"
        />
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-[#1E2026]/92 via-[#292B32]/58 to-[#292B32]/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-2.5 rounded-xl border border-white/18 pointer-events-none"
        aria-hidden="true"
      />

      {badge && (
        <span className="relative z-10 mb-2.5 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/92 text-[#E91E63] shadow-xs">
          {badge}
        </span>
      )}

      <div className="relative z-10 w-11 h-11 rounded-xl bg-white/12 backdrop-blur-xs border border-white/20 flex items-center justify-center mb-2.5 text-white">
        <Icon className="w-5 h-5 stroke-[1.7]" aria-hidden="true" />
      </div>

      <p className="relative z-10 font-heading font-bold text-sm sm:text-base text-white tracking-wide max-w-[240px] drop-shadow-xs">
        {label}
      </p>
      <p className="relative z-10 text-[11px] text-white/80 mt-1 max-w-[240px] leading-snug">
        {sublabel}
      </p>
    </div>
  );
}
