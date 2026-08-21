import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FilmRolls from './components/FilmRolls';
import ProjectsGrid from './components/ProjectsGrid';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Clients from './components/Clients';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import BookingDrawer from './components/BookingDrawer';
import Toast from './components/Toast';

export default function App() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [toastActive, setToastActive] = useState(false);

  const handleOpenBooking = () => {
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
  };

  const handleSubmitSuccess = () => {
    setToastActive(true);
    setTimeout(() => {
      setToastActive(false);
    }, 4500);
  };

  return (
    <div className="app-container">
      <Header onOpenBooking={handleOpenBooking} />
      <main>
        <Hero />
        <About onOpenBooking={handleOpenBooking} />
        <FilmRolls onSelectPhoto={(index) => setSelectedPhotoIndex(index)} />
        <ProjectsGrid onSelectPhoto={(index) => setSelectedPhotoIndex(index)} />
        <Services onOpenBooking={handleOpenBooking} />
        <Pricing onOpenBooking={handleOpenBooking} />
        <Clients />
      </main>
      <Footer onOpenBooking={handleOpenBooking} />

      <LightboxModal 
        selectedIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(index) => setSelectedPhotoIndex(index)}
        onOpenBooking={handleOpenBooking}
      />

      <BookingDrawer 
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        onSubmitSuccess={handleSubmitSuccess}
      />

      <Toast active={toastActive} />
    </div>
  );
}
