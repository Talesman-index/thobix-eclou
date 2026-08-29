import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FilmRolls, { COLLAGE_GALLERY_ITEMS } from './components/FilmRolls';
import WhyMe from './components/WhyMe';
import Services from './components/Services';
import ProjectsGrid from './components/ProjectsGrid';
import Testimonials from './components/Testimonials';
import BookingCalendar from './components/BookingCalendar';
import Footer from './components/Footer';
import ProjectDossierModal from './components/ProjectDossierModal';
import LightboxModal from './components/LightboxModal';
import BookingDrawer from './components/BookingDrawer';
import Toast from './components/Toast';
import { PROJECTS_COLLECTIONS } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');
  const [toastActive, setToastActive] = useState(false);

  const handleOpenProject = (projectOrId) => {
    if (typeof projectOrId === 'string') {
      const found = PROJECTS_COLLECTIONS.find((p) => p.id === projectOrId);
      if (found) {
        setSelectedProject(found);
        return;
      }
    }
    setSelectedProject(projectOrId);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleOpenBooking = (serviceName = '') => {
    setBookingService(serviceName);
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
        <Hero onOpenBooking={handleOpenBooking} />
        <About onOpenBooking={handleOpenBooking} />
        <FilmRolls 
          onSelectPhoto={(index) => setSelectedPhotoIndex(index)} 
          onOpenBooking={handleOpenBooking} 
        />
        <WhyMe onOpenBooking={handleOpenBooking} />
        <Services onOpenBooking={handleOpenBooking} />
        <ProjectsGrid onOpenProject={handleOpenProject} />
        <Testimonials />
        <BookingCalendar 
          onOpenBookingDrawer={handleOpenBooking}
          onBookingConfirmed={handleSubmitSuccess}
        />
      </main>
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Project Dossier Modal (For Project Collections) */}
      {selectedProject && (
        <ProjectDossierModal 
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={handleCloseProject}
          onOpenBooking={() => handleOpenBooking(`Projet ${selectedProject.title}`)}
        />
      )}

      {/* Pure Single Photo Lightbox Viewer (For Individual Gallery Shots) */}
      {selectedPhotoIndex !== null && (
        <LightboxModal 
          photos={COLLAGE_GALLERY_ITEMS}
          currentIndex={selectedPhotoIndex}
          isOpen={selectedPhotoIndex !== null}
          onClose={() => setSelectedPhotoIndex(null)}
          onNavigate={(newIndex) => setSelectedPhotoIndex(newIndex)}
        />
      )}

      {/* Booking Drawer */}
      <BookingDrawer 
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        initialService={bookingService}
        onSubmitSuccess={handleSubmitSuccess}
      />

      {/* Toast Notification */}
      <Toast 
        isActive={toastActive}
        message="Votre demande a été envoyée avec succès. Thobix vous contactera sous 24h."
      />
    </div>
  );
}
