import React from 'react';

export default function Toast({ active }) {
  return (
    <div 
      className={`toast-notification ${active ? 'active' : ''}`}
      role="status" 
      aria-live="polite"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00F5D4" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>Votre demande a été transmise avec succès à Thobix Eclou.</span>
    </div>
  );
}
