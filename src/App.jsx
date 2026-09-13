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
import DidiBSpotlight from './components/DidiBSpotlight';
import LocalSeoPage from './components/LocalSeoPage';
import ProjectStandalonePage from './components/ProjectStandalonePage';
import CategoryPortfolioPage from './components/CategoryPortfolioPage';
import { Analytics } from '@vercel/analytics/react';
import { PROJECTS_COLLECTIONS, DIDI_B_PROJECT } from './data/projects';
import { SITE_CONFIG, SITE_URL } from './config/site';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [lightboxPhotos, setLightboxPhotos] = useState(COLLAGE_GALLERY_ITEMS);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');
  const [toastActive, setToastActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('thobix_theme') || 'light';
  });
  const lenisRef = useRef(null);

  // Parse initial route from URL
  const parseCurrentRoute = () => {
    if (typeof window === 'undefined') return { type: 'home' };
    const pathname = window.location.pathname.replace(/\/$/, '') || '/';
    
    if (pathname === '/photographe-benin' || pathname === '/photographe-cotonou') {
      return { type: 'local', region: 'benin', path: pathname };
    }
    if (pathname === '/photographe-guinee' || pathname === '/photographe-conakry') {
      return { type: 'local', region: 'guinee', path: pathname };
    }
    if (pathname === '/portfolio') {
      return { type: 'portfolio', category: null, path: pathname };
    }
    if (pathname.startsWith('/portfolio/')) {
      const category = pathname.replace('/portfolio/', '').replace(/\/$/, '');
      return { type: 'portfolio', category, path: pathname };
    }
    if (pathname.startsWith('/projects/')) {
      const slug = pathname.replace('/projects/', '').replace(/\/$/, '');
      return { type: 'project', slug, path: pathname };
    }
    return { type: 'home', path: '/' };
  };

  const [route, setRoute] = useState(parseCurrentRoute);

  // Sync theme with HTML attribute and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('thobix_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const newRoute = parseCurrentRoute();
      setRoute(newRoute);
      if (newRoute.type === 'home') {
        document.title = SITE_CONFIG.title;
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation handler
  const navigateTo = (path, replace = false) => {
    if (path.startsWith('/#') || path.startsWith('#')) {
      const hash = path.replace('/#', '').replace('#', '');
      if (route.type !== 'home') {
        if (replace) {
          window.history.replaceState({}, '', `/#${hash}`);
        } else {
          window.history.pushState({}, '', `/#${hash}`);
        }
        setRoute({ type: 'home', path: '/' });
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }

    if (path === '/' || path === '') {
      setRoute({ type: 'home', path: '/' });
      document.title = SITE_CONFIG.title;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.includes('photographe-benin') || path.includes('photographe-cotonou')) {
      setRoute({ type: 'local', region: 'benin', path });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.includes('photographe-guinee') || path.includes('photographe-conakry')) {
      setRoute({ type: 'local', region: 'guinee', path });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/portfolio') {
      setRoute({ type: 'portfolio', category: null, path });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('/portfolio/')) {
      const category = path.replace('/portfolio/', '').replace(/\/$/, '');
      setRoute({ type: 'portfolio', category, path });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('/projects/')) {
      const slug = path.replace('/projects/', '').replace(/\/$/, '');
      setRoute({ type: 'project', slug, path });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Initialize Lenis Smooth Physics Scroll (tuned for instant response)
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
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

    // Section reveal on scroll observer (anticipates scroll by 120px)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-scroll-active');
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '120px 0px 80px 0px',
      }
    );

    const sections = document.querySelectorAll('section, footer, article');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [route.type]);

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
    let proj = projectOrId;
    if (typeof projectOrId === 'string') {
      proj = PROJECTS_COLLECTIONS.find((p) => p.id === projectOrId);
    }
    if (proj) {
      setSelectedProject(proj);
      // Synchronize URL with clean project permalink
      window.history.pushState({}, '', `/projects/${proj.id}`);
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    // Restore home or previous route URL
    if (route.type === 'home') {
      window.history.pushState({}, '', '/#projects');
    } else {
      window.history.pushState({}, '', route.path || '/');
    }
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

  const handleOpenCustomLightbox = (photos, index) => {
    setLightboxPhotos(photos);
    setSelectedPhotoIndex(index);
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
        onNavigate={navigateTo}
        currentRoute={route.path || '/'}
      />

      <main>
        {route.type === 'home' && (
          <>
            <Hero onOpenBooking={handleOpenBooking} />
            <About onOpenBooking={handleOpenBooking} />
            <FilmRolls 
              onSelectPhoto={(index) => {
                setLightboxPhotos(COLLAGE_GALLERY_ITEMS);
                setSelectedPhotoIndex(index);
              }} 
              onOpenBooking={handleOpenBooking} 
            />
            <WhyMe onOpenBooking={handleOpenBooking} />
            <Services onOpenBooking={handleOpenBooking} />
            <ProjectsGrid onOpenProject={handleOpenProject} />
            <DidiBSpotlight 
              onOpenPhoto={() => handleOpenProject(DIDI_B_PROJECT)}
              onOpenDossier={() => handleOpenProject(DIDI_B_PROJECT)}
            />
            <Testimonials />
            <BookingCalendar 
              onOpenBookingDrawer={handleOpenBooking}
              onBookingConfirmed={handleSubmitSuccess}
            />
          </>
        )}

        {route.type === 'local' && (
          <LocalSeoPage 
            region={route.region}
            onOpenBooking={handleOpenBooking}
            onNavigate={navigateTo}
            onOpenProject={(proj) => navigateTo(`/projects/${proj.id}`)}
          />
        )}

        {route.type === 'portfolio' && (
          <CategoryPortfolioPage 
            categorySlug={route.category}
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
            onOpenProject={(proj) => navigateTo(`/projects/${proj.id}`)}
          />
        )}

        {route.type === 'project' && (
          <ProjectStandalonePage 
            projectId={route.slug}
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
            onOpenLightbox={handleOpenCustomLightbox}
          />
        )}
      </main>

      <Footer 
        onOpenBooking={handleOpenBooking} 
        onNavigate={navigateTo}
      />

      {/* Project Dossier Modal */}
      {selectedProject && (
        <ProjectDossierModal 
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={handleCloseProject}
          onOpenBooking={() => handleOpenBooking(`Projet ${selectedProject.title}`)}
        />
      )}

      {/* Pure Single Photo Lightbox Viewer */}
      {selectedPhotoIndex !== null && (
        <LightboxModal 
          photos={lightboxPhotos}
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

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
