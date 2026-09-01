import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('thobix_theme') || 'light';
  });
  const lenisRef = useRef(null);

  // Sync theme with HTML attribute and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('thobix_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // Initialize Lenis Smooth Physics Scroll
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
      infinite: false,
    });

    lenisRef.current = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Scroll progress calculation & section active states
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Section reveal on scroll observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-scroll-active');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const sections = document.querySelectorAll('section, footer');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Lock/unlock Lenis when modals are open
  useEffect(() => {
    if (lenisRef.current) {
      if (selectedProject || selectedPhotoIndex !== null || bookingOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [selectedProject, selectedPhotoIndex, bookingOpen]);

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
      {/* Top Editorial Scroll Progress Indicator */}
      <div 
        className="editorial-scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <Header 
        onOpenBooking={handleOpenBooking} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
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
