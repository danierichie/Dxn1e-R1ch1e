"use client";

import { useState, useEffect } from "react";

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
    accountPurchased: "Legendary Account #124",
    verified: true
  },
  {
    id: 2,
    customerName: "Sarah Chen",
    rating: 5,
    comment: "This is my third purchase from this marketplace. Always reliable accounts and great customer service. Highly recommend!",
    date: "2024-02-08",
    accountPurchased: "Mythic Weapons Bundle",
    verified: true
  },
  {
    id: 3,
    customerName: "Mike Rodriguez",
    rating: 4,
    comment: "Great account with all the promised items. The only reason for 4 stars is that delivery took about 2 hours instead of instant, but the quality is excellent.",
    date: "2024-02-05",
    accountPurchased: "Elite Account #089",
    verified: true
  },
  {
    id: 4,
    customerName: "Emma Wilson",
    rating: 5,
    comment: "Perfect! The account has everything advertised and more. The verification process was smooth and secure. Will definitely buy again.",
    date: "2024-02-03",
    accountPurchased: "Premium Starter Pack",
    verified: true
  },
  {
    id: 5,
    customerName: "James Park",
    rating: 5,
    comment: "Outstanding service! The account was delivered within minutes and all items were exactly as described. 10/10 would recommend.",
    date: "2024-02-01",
    accountPurchased: "Pro Player Account",
    verified: true
  }
];

export default function ReviewSystem() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filter, setFilter] = useState<'all' | 5 | 4 | 3 | 2 | 1>('all');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Load user-submitted reviews from localStorage
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

  const renderStars = (rating: number, size = 'small') => {
    const starSize = size === 'small' ? '14px' : '16px';
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
          fontSize: starSize,
          marginRight: '2px'
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="neon-tag" style={{ marginBottom: 20, display: "inline-flex" }}>
          ⭐ CUSTOMER REVIEWS
        </div>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          What Our <span style={{ color: "var(--accent)" }}>Customers Say</span>
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
          Real reviews from verified customers who have purchased accounts from our marketplace.
        </p>
      </div>

      {/* Rating Summary */}
      <div className="glass-card" style={{ padding: "40px", marginBottom: 60 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "center" }}>
          {/* Average Rating */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "4rem", fontWeight: 800, color: "var(--accent)", marginBottom: 8 }}>
              {averageRating.toFixed(1)}
            </div>
            <div style={{ marginBottom: 16 }}>
              {renderStars(Math.round(averageRating), 'large')}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Based on {reviews.length} reviews
            </div>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: 8, 
              marginTop: 12,
              color: "#4CAF50",
              fontSize: "0.85rem"
            }}>
              <span>✓</span> Verified Purchases
            </div>
          </div>

          {/* Rating Distribution */}
          <div>
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ minWidth: "80px", fontSize: "0.9rem" }}>
                  {rating} {rating === 1 ? 'star' : 'stars'}
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 4, height: "8px", overflow: "hidden" }}>
                  <div 
                    style={{
                      width: `${percentage}%`,
                      height: "100%",
                      background: rating >= 4 ? "#4CAF50" : rating >= 3 ? "#FFC107" : "#FF5252",
                      borderRadius: 4
                    }}
                  />
                </div>
                <div style={{ minWidth: "40px", textAlign: "right", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
        {[
          { value: 'all' as const, label: 'All Reviews' },
          { value: 5 as const, label: '5 Stars' },
          { value: 4 as const, label: '4 Stars' },
          { value: 3 as const, label: '3 Stars' },
          { value: 2 as const, label: '2 Stars' },
          { value: 1 as const, label: '1 Star' }
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`btn-outline ${filter === value ? 'btn-primary' : ''}`}
            style={{
              padding: "8px 16px",
              fontSize: "0.85rem",
              borderRadius: "20px"
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div style={{ display: "grid", gap: 24 }}>
        {filteredReviews.map((review, index) => (
          <div 
            key={review.id} 
            className="glass-card reveal reveal-delay-${index + 1}"
            style={{ padding: "32px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                    {review.customerName}
                  </h3>
                  {review.verified && (
                    <span style={{
                      background: "rgba(76, 175, 80, 0.2)",
                      color: "#4CAF50",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "0.7rem",
                      fontWeight: 600
                    }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--text-tertiary)", fontSize: "0.85rem" }}>
                  <div>{renderStars(review.rating)}</div>
                  <div>•</div>
                  <div>{new Date(review.date).toLocaleDateString()}</div>
                  <div>•</div>
                  <div>{review.accountPurchased}</div>
                </div>
              </div>
            </div>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Add Review Button */}
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <button
          className="btn-primary"
          onClick={() => setShowReviewForm(true)}
          style={{ padding: "16px 32px" }}
        >
          Leave a Review
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .glass-card[style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
