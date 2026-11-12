import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Film,
  CalendarCheck,
  Building,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { submitEnquiry } from '../services/api';

const CHANNEL_ICONS = {
  'ch-prof': Mail,
  'ch-film': Film,
  'ch-public': CalendarCheck,
  'ch-mgmt': Building,
};

export default function ContactSection({ contactData }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'Professional Enquiry',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({
        type: 'error',
        text: 'Please complete your name, email, and enquiry message.',
      });
      return;
    }

    setSubmitting(true);
    setFeedback(null);
    const result = await submitEnquiry(form);
    setSubmitting(false);
    setFeedback({
      type: 'success',
      text: result.data.message,
    });
    setForm({
      name: '',
      email: '',
      category: 'Professional Enquiry',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-card-sm text-xs font-semibold uppercase tracking-[0.16em] text-[#E91E63]">
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            Official Coordination Channels
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#292B32] tracking-tight">
            {contactData.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#646A73]">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Placeholder Contact Channels */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {contactData.channels.map((ch) => {
              const Icon = CHANNEL_ICONS[ch.id] || Mail;
              return (
                <div key={ch.id} className="neu-card p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl neu-inset flex items-center justify-center text-[#E91E63] shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base text-[#292B32]">
                      {ch.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#E91E63] break-words">
                      {ch.detail}
                    </p>
                    <p className="text-xs text-[#646A73] leading-relaxed">
                      {ch.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7 neu-card p-6 sm:p-8">
            <div className="space-y-1 mb-6">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#292B32]">
                Send an Enquiry (Demo Preview)
              </h3>
              <p className="text-xs sm:text-sm text-[#646A73]">
                Submit a sample enquiry below. Works offline with local confirmation or connects directly to the Express + MongoDB API when deployed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#646A73] mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name or organization"
                    className="w-full neu-inset rounded-xl px-4 py-3 text-sm text-[#292B32] focus:outline-none focus:ring-2 focus:ring-[#E91E63]/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#646A73] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full neu-inset rounded-xl px-4 py-3 text-sm text-[#292B32] focus:outline-none focus:ring-2 focus:ring-[#E91E63]/40"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-category"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#646A73] mb-2"
                >
                  Enquiry Type
                </label>
                <select
                  id="contact-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full neu-inset rounded-xl px-4 py-3 text-sm text-[#292B32] focus:outline-none focus:ring-2 focus:ring-[#E91E63]/40"
                >
                  <option>Professional Enquiry</option>
                  <option>Film-Related Enquiry</option>
                  <option>Public Event Enquiry</option>
                  <option>Management Coordination</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#646A73] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Provide details about your project, invitation, or event..."
                  className="w-full neu-inset rounded-xl px-4 py-3 text-sm text-[#292B32] focus:outline-none focus:ring-2 focus:ring-[#E91E63]/40 resize-y"
                />
              </div>

              {feedback && (
                <div
                  role="status"
                  className={`rounded-xl p-3.5 text-xs sm:text-sm flex items-start gap-2.5 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/25'
                      : 'bg-rose-500/10 text-rose-800 border border-rose-500/25'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="neu-btn-accent px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] inline-flex items-center gap-2.5 cursor-pointer disabled:opacity-60"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                {submitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

