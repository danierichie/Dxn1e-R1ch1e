"use client";

import { useState } from "react";

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

    // Create new review
    const newReview = {
      id: Date.now(),
      listingId,
      customerName: customerName || "Anonymous",
      rating,
      comment,
      date: new Date().toISOString(),
      verified: true, // In real app, this would be verified based on purchase
      accountPurchased: listingTitle
    };

    // Save to localStorage (in real app, this would be saved to database)
    const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    existingReviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(existingReviews));

    // Notify parent component
    onReviewSubmitted(newReview);

    setIsSubmitting(false);
    setSubmitted(true);

    // Close form after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const renderStars = (interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => interactive && setRating(i + 1)}
        disabled={!interactive}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '32px',
          cursor: interactive ? 'pointer' : 'default',
          color: i < rating ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
          transition: 'color 0.2s ease',
          padding: '4px',
        }}
        onMouseEnter={() => interactive && setRating(i + 1)}
      >
        ★
      </button>
    ));
  };

  if (submitted) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}>
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', color: '#4CAF50' }}>
            Thank You for Your Review!
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Your feedback helps other customers make informed decisions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '1.5rem',
            zIndex: 10
          }}
        >
          ×
        </button>

        <form onSubmit={handleSubmit} style={{ padding: '40px 24px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', textAlign: 'center' }}>
            Leave a Review
          </h2>
          
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '32px',
            padding: '16px',
            background: 'var(--accent-subtle)',
            borderRadius: '12px',
            border: '1px solid var(--border-accent)'
          }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Purchased Account:
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>
              {listingTitle}
            </div>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
              How would you rate this purchase?
            </label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
              {renderStars(true)}
            </div>
            <div style={{ textAlign: 'center', marginTop: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {rating === 5 && 'Excellent!'}
              {rating === 4 && 'Very Good'}
              {rating === 3 && 'Good'}
              {rating === 2 && 'Fair'}
              {rating === 1 && 'Poor'}
            </div>
          </div>

          {/* Customer Name */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name or leave blank for anonymous"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Comment */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Your Review *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this purchase..."
              required
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="btn-primary"
            style={{ 
              width: '100%', 
              padding: '16px',
              fontSize: '1.1rem',
              opacity: (isSubmitting || !comment.trim()) ? 0.5 : 1,
              cursor: (isSubmitting || !comment.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>

          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-tertiary)', 
            fontSize: '0.8rem', 
            marginTop: '16px' 
          }}>
            Your review will help other customers make informed decisions.
          </p>
        </form>
      </div>
    </div>
  );
}
