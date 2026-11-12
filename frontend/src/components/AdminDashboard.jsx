import { useState } from 'react';
import {
  Film,
  Award,
  Landmark,
  Image as ImageIcon,
  Newspaper,
  BookOpen,
  Mail,
  Plus,
  Trash2,
  Database,
  CloudUpload,
  CheckCircle2,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';

const ADMIN_TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'movies', label: 'Filmography', icon: Film },
  { id: 'awards', label: 'Awards', icon: Award },
  { id: 'timeline', label: 'Political Timeline', icon: Landmark },
  { id: 'gallery', label: 'Gallery & Cloudinary', icon: ImageIcon },
  { id: 'media', label: 'Interviews & News', icon: Newspaper },
  { id: 'biography', label: 'Biography', icon: BookOpen },
  { id: 'contact', label: 'Contact Info', icon: Mail },
];

export default function AdminDashboard({
  movies,
  setMovies,
  awards,
  setAwards,
  timeline,
  setTimeline,
  gallery,
  setGallery,
  media,
  setMedia,
  about,
  setAbout,
  contact,
  setContact,
  onExitAdmin,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notice, setNotice] = useState('');

  // Quick add states
  const [newMovie, setNewMovie] = useState({
    title: '',
    year: '2024',
    language: 'Telugu',
    role: '',
    description: '',
  });
  const [newAward, setNewAward] = useState({
    name: '',
    category: '',
    year: '',
    organization: '',
    description: '',
  });
  const [newMilestone, setNewMilestone] = useState({
    year: '',
    party: '',
    constituency: 'Andole',
    outcome: '',
    title: '',
    summary: '',
  });
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Cinema',
    caption: '',
  });
  const [newMedia, setNewMedia] = useState({
    type: 'Television Interviews',
    headline: '',
    source: '',
    date: '',
    summary: '',
  });

  const flashNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3500);
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newMovie.title.trim()) return;
    const yr = Number(newMovie.year) || 2024;
    const decade =
      yr < 2000
        ? '1990-1999'
        : yr < 2010
        ? '2000-2009'
        : yr < 2020
        ? '2010-2019'
        : '2020-onwards';

    setMovies((prev) => [
      {
        id: `film-${Date.now()}`,
        title: newMovie.title.trim(),
        year: yr,
        decade,
        language: newMovie.language.trim() || 'Telugu',
        role: newMovie.role.trim() || 'Pending archival verification',
        verifiedCharacter: Boolean(newMovie.role.trim()),
        description:
          newMovie.description.trim() || 'Added in Admin Concept preview.',
      },
      ...prev,
    ]);
    setNewMovie({ title: '', year: '2024', language: 'Telugu', role: '', description: '' });
    flashNotice('Movie added to local preview state (MongoDB sync required for persistence).');
  };

  const handleAddAward = (e) => {
    e.preventDefault();
    if (!newAward.name.trim()) return;
    setAwards((prev) => [
      ...prev,
      {
        id: `award-${Date.now()}`,
        ...newAward,
      },
    ]);
    setNewAward({ name: '', category: '', year: '', organization: '', description: '' });
    flashNotice('Award record added to local preview state.');
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestone.year.trim() || !newMilestone.title.trim()) return;
    setTimeline((prev) => [
      ...prev,
      {
        id: `pt-${Date.now()}`,
        ...newMilestone,
      },
    ]);
    setNewMilestone({
      year: '',
      party: '',
      constituency: 'Andole',
      outcome: '',
      title: '',
      summary: '',
    });
    flashNotice('Political timeline milestone added to local preview state.');
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.title.trim()) return;
    setGallery((prev) => [
      {
        id: `gal-${Date.now()}`,
        title: newPhoto.title.trim(),
        category: newPhoto.category,
        caption: newPhoto.caption.trim() || 'Queued for Cloudinary upload upon backend integration.',
        year: 'Draft Slot',
        tag: 'Cloudinary Pending',
      },
      ...prev,
    ]);
    setNewPhoto({ title: '', category: 'Cinema', caption: '' });
    flashNotice('Gallery slot created locally (Cloudinary upload requires backend API).');
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newMedia.headline.trim()) return;
    setMedia((prev) => [
      {
        id: `med-${Date.now()}`,
        type: newMedia.type,
        headline: newMedia.headline.trim(),
        source: newMedia.source.trim() || 'Pending Source Verification',
        date: newMedia.date.trim() || 'Awaiting Verified Date',
        summary: newMedia.summary.trim() || 'Added in Admin Concept preview.',
      },
      ...prev,
    ]);
    setNewMedia({ type: 'Television Interviews', headline: '', source: '', date: '', summary: '' });
    flashNotice('Media entry added to local preview state.');
  };

  return (
    <div className="min-h-screen bg-[#EDF0F3] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Admin Status Header */}
        <div className="neu-card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E91E63] text-white text-[11px] font-bold uppercase tracking-wider">
                Admin Dashboard Concept
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#646A73]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                Demo UI Only • Production Auth &amp; MongoDB Persistence Disabled
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#292B32]">
              Official Content Management Architecture
            </h1>
          </div>

          <button
            type="button"
            onClick={onExitAdmin}
            className="neu-btn px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider self-start lg:self-auto cursor-pointer"
          >
            Return to Public Website
          </button>
        </div>

        {/* Toast Notice */}
        {notice && (
          <div
            role="status"
            className="neu-card-sm border-l-4 border-l-[#E91E63] px-5 py-3.5 flex items-center gap-2.5 text-sm font-medium text-[#292B32]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E91E63] shrink-0" aria-hidden="true" />
            <span>{notice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3 neu-card p-4 space-y-1.5">
            {ADMIN_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                    active
                      ? 'neu-pill-active'
                      : 'text-[#646A73] hover:text-[#292B32] hover:bg-[#EDF0F3]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Main Workspace */}
          <main className="lg:col-span-9 neu-card p-6 sm:p-8 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#292B32]">
                    Content Inventory &amp; Backend Integration Status
                  </h2>
                  <p className="text-sm text-[#646A73] mt-1">
                    Edits made in this demo update the live public preview in browser memory. Connecting the Node.js + Express + MongoDB + Cloudinary backend enables permanent multi-user publishing.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Movies', count: movies.length },
                    { label: 'Political Milestones', count: timeline.length },
                    { label: 'Gallery Slots', count: gallery.length },
                    { label: 'Media Entries', count: media.length },
                  ].map((stat) => (
                    <div key={stat.label} className="neu-inset rounded-xl p-4 text-center">
                      <p className="font-heading font-extrabold text-2xl text-[#E91E63]">
                        {stat.count}
                      </p>
                      <p className="text-xs font-semibold text-[#646A73] mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="neu-card-sm p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[#E91E63] font-bold text-xs uppercase tracking-wider">
                      <Database className="w-4 h-4" aria-hidden="true" />
                      Backend Dependency Notice
                    </div>
                    <p className="text-sm text-[#646A73] leading-relaxed">
                      MongoDB via Mongoose models (<code className="text-xs bg-[#EDF0F3] px-1.5 py-0.5 rounded">Movie</code>, <code className="text-xs bg-[#EDF0F3] px-1.5 py-0.5 rounded">PoliticalMilestone</code>, <code className="text-xs bg-[#EDF0F3] px-1.5 py-0.5 rounded">Award</code>, <code className="text-xs bg-[#EDF0F3] px-1.5 py-0.5 rounded">GalleryItem</code>, <code className="text-xs bg-[#EDF0F3] px-1.5 py-0.5 rounded">MediaItem</code>) are included in <code className="text-xs bg-[#EDF0F3] px-1.5 py-0.5 rounded">/backend</code> for Render deployment.
                    </p>
                  </div>

                  <div className="neu-card-sm p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[#E91E63] font-bold text-xs uppercase tracking-wider">
                      <CloudUpload className="w-4 h-4" aria-hidden="true" />
                      Cloudinary Media Pipeline
                    </div>
                    <p className="text-sm text-[#646A73] leading-relaxed">
                      Image uploads, poster replacements, and official portrait management use signed Cloudinary upload endpoints (<code className="text-xs bg-[#EDF0F3] px-1.5 py-0.5 rounded">POST /api/upload</code>) once API credentials are configured.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'movies' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#292B32]">
                  Manage Filmography Records
                </h2>
                <form onSubmit={handleAddMovie} className="neu-inset rounded-xl p-4 sm:p-5 space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#E91E63]">
                    Add Film Entry (Local Demo State)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Movie Title *"
                      value={newMovie.title}
                      onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg focus:outline-none"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Release Year"
                      value={newMovie.year}
                      onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Character / Role (if verified)"
                      value={newMovie.role}
                      onChange={(e) => setNewMovie({ ...newMovie, role: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Short verified synopsis"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    className="w-full neu-card-sm px-3.5 py-2.5 text-sm rounded-lg focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="neu-btn-accent px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Film
                  </button>
                </form>

                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {movies.map((m) => (
                    <div
                      key={m.id}
                      className="neu-card-sm p-3.5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-heading font-bold text-sm text-[#292B32]">
                          {m.title} ({m.year})
                        </p>
                        <p className="text-xs text-[#646A73]">{m.role}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setMovies((prev) => prev.filter((item) => item.id !== m.id));
                          flashNotice('Film entry removed from local preview.');
                        }}
                        aria-label={`Delete ${m.title}`}
                        className="p-2 rounded-lg text-[#646A73] hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'awards' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#292B32]">
                  Manage Verified Awards &amp; Recognitions
                </h2>
                <form onSubmit={handleAddAward} className="neu-inset rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Award Name *"
                      value={newAward.name}
                      onChange={(e) => setNewAward({ ...newAward, name: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newAward.category}
                      onChange={(e) => setNewAward({ ...newAward, category: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={newAward.year}
                      onChange={(e) => setNewAward({ ...newAward, year: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Awarding Organization"
                      value={newAward.organization}
                      onChange={(e) => setNewAward({ ...newAward, organization: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="neu-btn-accent px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Verified Award
                  </button>
                </form>

                <div className="space-y-2.5">
                  {awards.map((a) => (
                    <div key={a.id} className="neu-card-sm p-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-heading font-bold text-sm text-[#292B32]">
                          {a.name} ({a.year})
                        </p>
                        <p className="text-xs text-[#646A73]">{a.organization}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAwards((prev) => prev.filter((item) => item.id !== a.id));
                          flashNotice('Award removed from local preview.');
                        }}
                        aria-label={`Remove ${a.name}`}
                        className="p-2 text-[#646A73] hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#292B32]">
                  Update Political Timeline
                </h2>
                <form onSubmit={handleAddMilestone} className="neu-inset rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Year *"
                      value={newMilestone.year}
                      onChange={(e) => setNewMilestone({ ...newMilestone, year: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Party"
                      value={newMilestone.party}
                      onChange={(e) => setNewMilestone({ ...newMilestone, party: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Outcome (Won / Contested)"
                      value={newMilestone.outcome}
                      onChange={(e) => setNewMilestone({ ...newMilestone, outcome: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Milestone Title *"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                    className="w-full neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    required
                  />
                  <textarea
                    rows={2}
                    placeholder="Verified Milestone Summary"
                    value={newMilestone.summary}
                    onChange={(e) => setNewMilestone({ ...newMilestone, summary: e.target.value })}
                    className="w-full neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                  />
                  <button
                    type="submit"
                    className="neu-btn-accent px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Milestone
                  </button>
                </form>

                <div className="space-y-2.5">
                  {timeline.map((t) => (
                    <div key={t.id} className="neu-card-sm p-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-heading font-bold text-sm text-[#292B32]">
                          {t.year} — {t.title}
                        </p>
                        <p className="text-xs text-[#646A73]">
                          {t.party} • {t.constituency} ({t.outcome})
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setTimeline((prev) => prev.filter((item) => item.id !== t.id));
                          flashNotice('Milestone removed from local preview.');
                        }}
                        aria-label={`Remove ${t.year}`}
                        className="p-2 text-[#646A73] hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#292B32]">
                  Gallery &amp; Cloudinary Asset Manager
                </h2>

                <div className="neu-inset rounded-xl p-6 text-center border border-dashed border-[#CBD2DC] space-y-2">
                  <CloudUpload className="w-8 h-8 text-[#E91E63] mx-auto" aria-hidden="true" />
                  <p className="font-heading font-bold text-sm text-[#292B32]">
                    Cloudinary Direct Upload Zone (Backend-Dependent)
                  </p>
                  <p className="text-xs text-[#646A73] max-w-md mx-auto">
                    In production, dropping authorized photographs here signs and uploads them to Cloudinary (<code className="bg-[#F5F7FA] px-1 rounded">POST /api/upload</code>). In this standalone demo, create placeholder slots below.
                  </p>
                </div>

                <form onSubmit={handleAddPhoto} className="neu-inset rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Photo Title *"
                      value={newPhoto.title}
                      onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                      required
                    />
                    <select
                      value={newPhoto.category}
                      onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    >
                      <option>Cinema</option>
                      <option>Politics</option>
                      <option>Events</option>
                      <option>Interviews</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Caption"
                    value={newPhoto.caption}
                    onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                    className="w-full neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                  />
                  <button
                    type="submit"
                    className="neu-btn-accent px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Create Gallery Entry
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gallery.map((g) => (
                    <div key={g.id} className="neu-card-sm p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-heading font-bold text-sm text-[#292B32]">{g.title}</p>
                        <p className="text-xs text-[#646A73]">{g.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setGallery((prev) => prev.filter((item) => item.id !== g.id));
                          flashNotice('Gallery slot removed from local preview.');
                        }}
                        aria-label={`Remove ${g.title}`}
                        className="p-2 text-[#646A73] hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#292B32]">
                  Publish Interviews &amp; News
                </h2>
                <form onSubmit={handleAddMedia} className="neu-inset rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={newMedia.type}
                      onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    >
                      <option>Television Interviews</option>
                      <option>Newspaper Articles</option>
                      <option>Public Interviews</option>
                      <option>Film-Related News</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Source / Publication"
                      value={newMedia.source}
                      onChange={(e) => setNewMedia({ ...newMedia, source: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Publication Date"
                      value={newMedia.date}
                      onChange={(e) => setNewMedia({ ...newMedia, date: e.target.value })}
                      className="neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Headline *"
                    value={newMedia.headline}
                    onChange={(e) => setNewMedia({ ...newMedia, headline: e.target.value })}
                    className="w-full neu-card-sm px-3.5 py-2.5 text-sm rounded-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="neu-btn-accent px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Publish Media Card
                  </button>
                </form>

                <div className="space-y-2.5">
                  {media.map((m) => (
                    <div key={m.id} className="neu-card-sm p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-heading font-bold text-sm text-[#292B32]">{m.headline}</p>
                        <p className="text-xs text-[#646A73]">{m.type} • {m.source}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setMedia((prev) => prev.filter((item) => item.id !== m.id));
                          flashNotice('Media card removed from local preview.');
                        }}
                        aria-label={`Remove ${m.headline}`}
                        className="p-2 text-[#646A73] hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'biography' && (
              <div className="space-y-5">
                <h2 className="font-heading font-bold text-xl text-[#292B32]">
                  Edit Biography Content
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#646A73] mb-1.5">
                      Biography Subheading
                    </label>
                    <input
                      type="text"
                      value={about.subheading}
                      onChange={(e) => setAbout({ ...about, subheading: e.target.value })}
                      className="w-full neu-inset rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#646A73] mb-1.5">
                      Lead Editorial Summary
                    </label>
                    <textarea
                      rows={3}
                      value={about.summary}
                      onChange={(e) => setAbout({ ...about, summary: e.target.value })}
                      className="w-full neu-inset rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      flashNotice('Biography updated in live preview state.')
                    }
                    className="neu-btn-accent px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Save Preview Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-5">
                <h2 className="font-heading font-bold text-xl text-[#292B32]">
                  Update Official Contact Channels
                </h2>
                <div className="space-y-4">
                  {contact.channels.map((ch, idx) => (
                    <div key={ch.id} className="neu-inset rounded-xl p-4 space-y-2">
                      <p className="font-heading font-bold text-sm text-[#292B32]">
                        {ch.title}
                      </p>
                      <input
                        type="text"
                        value={ch.detail}
                        onChange={(e) => {
                          const updated = [...contact.channels];
                          updated[idx] = { ...ch, detail: e.target.value };
                          setContact({ ...contact, channels: updated });
                        }}
                        className="w-full neu-card-sm px-3.5 py-2 text-sm rounded-lg"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      flashNotice('Contact channels updated in live preview state.')
                    }
                    className="neu-btn-accent px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Save Preview Changes
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

