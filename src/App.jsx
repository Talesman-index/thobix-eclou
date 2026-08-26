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
import ProjectDossierModal from './components/ProjectDossierModal';
import LightboxModal from './components/LightboxModal';
import BookingDrawer from './components/BookingDrawer';
import Toast from './components/Toast';
import { PROJECTS_COLLECTIONS } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
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
        <FilmRolls onOpenProject={handleOpenProject} onSelectPhoto={(index) => setSelectedPhotoIndex(index)} />
        <ProjectsGrid onOpenProject={handleOpenProject} />
        <Services onOpenBooking={handleOpenBooking} />
        <Pricing onOpenBooking={handleOpenBooking} />
        <Clients />
      </main>
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Full Project Dossier Modal with Slider, Thumbnails Ribbon, & Grid */}
      <ProjectDossierModal 
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={handleCloseProject}
        onOpenBooking={handleOpenBooking}
      />

      {/* Lightbox Modal (Individual highlights) */}
      <LightboxModal 
        selectedIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(index) => setSelectedPhotoIndex(index)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Booking Drawer */}
      <BookingDrawer 
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        onSubmitSuccess={handleSubmitSuccess}
      />

      <Toast active={toastActive} />
    </div>
  );
}
