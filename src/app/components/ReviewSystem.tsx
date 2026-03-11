"use client";

import { useState, useEffect } from "react";
import { Star, Check, CheckCircle, Filter, MessageSquare, TrendingUp } from "lucide-react";

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  accountPurchased: string;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: 1,
    customerName: "Alex Thompson",
    rating: 5,
    comment: "Amazing account! Exactly as described. The delivery was instant and the support team was very helpful throughout the process.",
    date: "2024-02-10",
    accountPurchased: "Cyber-Ops Elite",
    verified: true
  },
  {
    id: 2,
    customerName: "Sarah Chen",
    rating: 5,
    comment: "This is my third purchase from this marketplace. Always reliable accounts and great customer service. Highly recommend!",
    date: "2024-02-08",
    accountPurchased: "Ghost Protocol",
    verified: true
  },
  {
    id: 3,
    customerName: "Mike Rodriguez",
    rating: 4,
    comment: "Great account with all the promised items. The quality is excellent and the verification was super fast.",
    date: "2024-02-05",
    accountPurchased: "Neon Assassin",
    verified: true
  },
  {
    id: 4,
    customerName: "Emma Wilson",
    rating: 5,
    comment: "Perfect! The account has everything advertised and more. The verification process was smooth and secure. Will definitely buy again.",
    date: "2024-02-03",
    accountPurchased: "Damascus Overlord",
    verified: true
  },
  {
    id: 5,
    customerName: "James Park",
    rating: 5,
    comment: "Outstanding service! The account was delivered within minutes and all items were exactly as described. 10/10 would recommend.",
    date: "2024-02-01",
    accountPurchased: "Mythic Sovereign",
    verified: true
  }
];

export default function ReviewSystem() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filter, setFilter] = useState<'all' | 5 | 4 | 3 | 2 | 1>('all');

  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      const userReviews = JSON.parse(savedReviews);
      const allReviews = [...userReviews, ...mockReviews];
      setReviews(allReviews);
    }
  }, []);

  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter(review => review.rating === filter);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const renderStars = (rating: number, size = 12) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-10 md:py-20 px-4 md:px-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="neon-tag inline-flex mb-4 text-[0.7rem] items-center gap-2 px-4 py-1.5 border border-[var(--border-accent)]">
          <TrendingUp size={14} className="text-[var(--accent)]" /> 99.7% SATISFACTION RATE
        </div>
        <h2 className="section-title text-center !text-3xl md:!text-5xl">
          Verified <span className="text-[var(--accent)]">Player Reviews</span>
        </h2>
        <p className="section-subtitle mx-auto text-center !text-sm md:!text-base max-w-2xl">
          Authentic feedback from our global community of elite collectors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8">
        {/* Left Column: Stats & Filter */}
        <div className="space-y-6">
          <div className="glass-card p-4 md:p-6 border border-[var(--border-glass)]">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Star size={18} className="text-[var(--accent)]" /> Marketplace Rating
            </h3>

            <div className="flex items-end gap-3 mb-6">
              <div className="text-4xl md:text-5xl font-black text-white leading-none">
                {averageRating.toFixed(1)}
              </div>
              <div className="pb-1">
                {renderStars(Math.round(averageRating), 16)}
                <div className="text-[var(--text-tertiary)] text-[0.6rem] mt-1 uppercase font-bold tracking-tighter">
                  Based on {reviews.length} total reviews
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="w-12 text-[0.65rem] text-[var(--text-secondary)] font-bold uppercase">
                    {rating} Star
                  </div>
                  <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${percentage}%`,
                        background: rating >= 4 ? "var(--accent)" : rating >= 3 ? "rgba(21,101,192,0.5)" : "rgba(255,255,255,0.1)"
                      }}
                    />
                  </div>
                  <div className="w-4 text-right text-[0.65rem] text-[var(--text-tertiary)] font-mono">
                    {count}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-glass)]">
              <div className="flex items-center gap-3 text-green-500/80 text-[0.65rem] font-bold uppercase tracking-widest leading-relaxed">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={16} />
                </div>
                Verified Purchase Program Active
              </div>
            </div>
          </div>

          <div className="glass-card p-4 md:p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-5 flex items-center gap-2 text-[var(--text-secondary)]">
              <Filter size={14} /> Filter Experience
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all' as const, label: 'All Reviews' },
                { value: 5 as const, label: '5.0 Rating' },
                { value: 4 as const, label: '4.0 Rating' },
                { value: 3 as const, label: '3.0 Rating' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`flex-1 min-w-[100px] px-3 py-2.5 text-[0.7rem] font-bold rounded-xl border transition-all duration-300
                      ${filter === value
                      ? 'bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]'
                      : 'bg-white/5 text-[var(--text-secondary)] border-[var(--border-glass)] hover:border-[var(--accent-dim)]'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Reviews Grid */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="glass-card p-20 text-center border-dashed border-[var(--border-glass)]">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-[var(--text-secondary)] font-medium">No reviews found for this rating.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="glass-card p-4 md:p-5 group hover:border-[var(--accent-dim)] transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] font-black text-sm border border-[var(--border-accent)]">
                        {review.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-extrabold text-white">{review.customerName}</h4>
                          {review.verified && (
                            <div className="p-0.5 rounded-full bg-green-500/10 text-green-500" title="Verified Buyer">
                              <CheckCircle size={10} />
                            </div>
                          )}
                        </div>
                        <div className="text-[0.65rem] text-[var(--text-tertiary)] font-bold uppercase tracking-tighter">
                          Purchased: <span className="text-[var(--text-secondary)]">{review.accountPurchased}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    {renderStars(review.rating, 14)}
                    <span className="text-[var(--text-tertiary)] text-[0.65rem] font-mono">
                      {new Date(review.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
