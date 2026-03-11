"use client";

import { useState } from "react";
import { Star, CheckCircle, X, ShieldCheck, PenLine } from "lucide-react";

interface ReviewFormProps {
  listingId: number;
  listingTitle: string;
  onReviewSubmitted: (review: any) => void;
  onClose: () => void;
}

export default function ReviewForm({ listingId, listingTitle, onReviewSubmitted, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [customerName, setCustomerName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReview = {
      id: Date.now(),
      listingId,
      customerName: customerName || "Anonymous Player",
      rating,
      comment,
      date: new Date().toISOString(),
      verified: true,
      accountPurchased: listingTitle
    };

    const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    existingReviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(existingReviews));

    onReviewSubmitted(newReview);

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        className="p-1 transition-transform active:scale-90"
      >
        <Star
          size={28}
          className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'} transition-all duration-200`}
        />
      </button>
    ));
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[2000] p-6">
        <div className="glass-card p-10 text-center max-w-sm w-full border border-[var(--accent-subtle)]">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-white">Review Published!</h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            Your elite feedback has been secured. Redirecting you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-end md:items-center justify-center z-[2000] p-0 md:p-6 overflow-y-auto">
      <div className="glass-card w-full max-w-[500px] min-h-[70vh] md:min-h-0 rounded-t-[32px] md:rounded-[24px] overflow-hidden relative border-t md:border border-[var(--border-accent)]">
        {/* Header with Close */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-glass)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
              <PenLine size={20} />
            </div>
            <h2 className="text-lg font-black uppercase tracking-tight">Review Order</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
          {/* Context Info */}
          <div className="bg-[var(--accent-subtle)] p-4 rounded-2xl border border-[var(--border-accent)] flex items-center gap-4">
            <div className="flex-1">
              <div className="text-[0.65rem] text-[var(--accent)] font-black uppercase tracking-widest mb-1">Authenticated Account</div>
              <div className="text-sm font-bold text-white mb-0.5">{listingTitle}</div>
              <div className="text-[0.6rem] text-[var(--text-tertiary)] flex items-center gap-1">
                <ShieldCheck size={10} /> Escrow Protected Purchase
              </div>
            </div>
          </div>

          {/* Rating Selector */}
          <div className="text-center">
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4">
              Rate Your Experience
            </label>
            <div className="flex justify-center gap-1">
              {renderStars()}
            </div>
            <div className="mt-3 text-[var(--accent)] font-black uppercase tracking-tighter text-sm">
              {['Poor', 'Fair', 'Good', 'Very Good', 'Elite Excellence'][rating - 1]}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[0.65rem] font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-2 ml-1">
                Public Alias (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ghost_01"
                className="w-full px-4 py-3 bg-white/5 border border-[var(--border-glass)] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-all placeholder:text-white/10"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-2 ml-1">
                Review Intel *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with the community..."
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-[var(--border-glass)] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-all resize-none placeholder:text-white/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="btn-primary w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed group transition-all"
          >
            {isSubmitting ? (
              'Transmitting...'
            ) : (
              <>Submit Verified Review <CheckCircle size={20} className="group-hover:scale-110 transition-transform" /></>
            )}
          </button>

          <p className="text-center text-[var(--text-tertiary)] text-[0.65rem] uppercase font-bold tracking-tight opacity-50">
            Secure Submission Protocol Active
          </p>
        </form>
      </div>
    </div>
  );
}
