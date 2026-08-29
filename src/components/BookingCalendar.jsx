import React, { useState } from 'react';
import { soundFx } from '../utils/sound';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function BookingCalendar({ onBookingConfirmed, onOpenBookingDrawer }) {
  useScrollReveal('.reveal-calendar', { threshold: 0.15 });

  const [selectedDay, setSelectedDay] = useState(17);
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [isBooked, setIsBooked] = useState(false);

  const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const calendarDays = [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30
  ];

  const timeSlots = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];

  const handleSelectDay = (day) => {
    if (!day) return;
    soundFx.playFilterTick();
    setSelectedDay(day);
  };

  const handleSelectTime = (time) => {
    soundFx.playFilterTick();
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    soundFx.playShutterClick();
    setIsBooked(true);
    if (onBookingConfirmed) onBookingConfirmed({ day: selectedDay, time: selectedTime });
    if (onOpenBookingDrawer) onOpenBookingDrawer(`Appel découverte — ${selectedDay} Septembre à ${selectedTime}`);
  };

  return (
    <section className="booking-cal-section" id="booking-calendar">
      <div className="container">
        {/* Section Header (Screenshot 2) */}
        <div className="booking-cal-header reveal-calendar">
          <span className="booking-cal-eyebrow">✦ PLANIFICATION & RENCONTRE</span>
          <h2 className="booking-cal-title">Réserver un appel</h2>
          <p className="booking-cal-subtitle">
            Choisissez le jour et l'heure qui vous conviennent. On démarre par un appel détendu pour définir le concept avant même de sortir l'appareil.
          </p>
        </div>

        {/* 3-Column Unified Calendar Widget (Screenshot 2) */}
        <div className="cal-widget-card reveal-calendar">
          {/* Column 1: Info & Details */}
          <div className="cal-col-info">
            <div className="cal-author-badge">
              <div className="cal-avatar-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"></path>
                </svg>
              </div>
              <span className="cal-author-name">Thobix Eclou</span>
            </div>

            <h3 className="cal-session-title">Appel découverte</h3>

            <div className="cal-meta-list">
              <div className="cal-meta-item">
                <span className="meta-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </span>
                <span>30 minutes</span>
              </div>
              <div className="cal-meta-item">
                <span className="meta-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </span>
                <span>Google Meet ou studio sur place</span>
              </div>
              <div className="cal-meta-item">
                <span className="meta-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </span>
                <span>Cotonou / Paris — fuseau CET / WAT</span>
              </div>
            </div>

            <p className="cal-info-note">
              Sans engagement — c'est simplement le meilleur moyen de vérifier qu'on est faits pour travailler ensemble sur votre projet.
            </p>
          </div>

          {/* Column 2: Date Selector Calendar */}
          <div className="cal-col-calendar">
            <div className="cal-month-nav">
              <span className="cal-month-label">Choisir une date</span>
              <div className="cal-month-stepper">
                <span className="month-current">Septembre 2026</span>
              </div>
            </div>

            <div className="cal-days-header">
              {daysOfWeek.map((d, i) => (
                <span key={i} className="day-name">{d}</span>
              ))}
            </div>

            <div className="cal-days-grid">
              {calendarDays.map((d, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={!d}
                  className={`day-cell ${d === selectedDay ? 'selected' : ''} ${!d ? 'empty' : ''}`}
                  onClick={() => handleSelectDay(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Time Slot Selector & Confirmation */}
          <div className="cal-col-slots">
            <div className="cal-slot-header">
              <span>Jeu. {selectedDay} Septembre</span>
            </div>

            <div className="cal-slots-list">
              {timeSlots.map((time, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`slot-pill ${time === selectedTime ? 'selected' : ''}`}
                  onClick={() => handleSelectTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            <button 
              type="button" 
              className="cal-confirm-btn"
              onClick={handleConfirm}
            >
              <span>{isBooked ? '✓ Créneau réservé' : 'Confirmer →'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
