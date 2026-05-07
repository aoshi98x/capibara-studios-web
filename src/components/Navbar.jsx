import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Detectar scroll para el Glassmorphism
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Inicializar Google Translate
    if (!document.querySelector('#google-translate-script')) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { 
            pageLanguage: 'es', 
            includedLanguages: 'en,es,pt', // Limita a los idiomas que prefieras
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
          },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'PROYECTO', id: 'featured', side: 'left' },
    { name: 'EXPERIENCIA', id: 'services', side: 'left' },
    { name: 'CATÁLOGO', id: 'portfolio', side: 'right' },
    { name: 'CONTACTO', id: 'contact', side: 'right' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-capibara-black/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Enlaces Izquierdos (Desktop) */}
        <div className="hidden md:flex flex-1 justify-end gap-8 pr-12">
          {navLinks.filter(link => link.side === 'left').map((link) => (
            <button 
              key={link.id} 
              onClick={() => scrollToSection(link.id)}
              className="text-capibara-white text-sm font-bold tracking-[0.2em] hover:text-capibara-cyan transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Logo Central */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <img 
            src="https://miofbanwzrqcbtzybbfm.supabase.co/storage/v1/object/public/page_images/Logo%20Capibara%20Studios%20Color.png" 
            alt="Capibara Studios Logo" 
            className="h-10 w-auto object-contain hover:scale-105 transition-transform"
          />
        </div>

        {/* Sección Derecha (Enlaces + Traductor + Menú Móvil) */}
        <div className="flex flex-1 justify-end md:justify-start items-center gap-4 md:gap-8 md:pl-12">
          
          {/* Enlaces Derechos (Desktop) */}
          <div className="hidden md:flex gap-8">
            {navLinks.filter(link => link.side === 'right').map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id)}
                className="text-capibara-white text-sm font-bold tracking-[0.2em] hover:text-capibara-magenta transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Contenedor del Widget de Google */}
          <div id="google_translate_element" className="h-8 flex items-center overflow-hidden rounded-lg"></div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-capibara-yellow transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

      </div>

      {/* Menú Desplegable Móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-950 border-b border-white/10 md:hidden shadow-2xl"
          >
            <div className="flex flex-col py-6 px-6 gap-6 items-center">
              {navLinks.map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => scrollToSection(link.id)}
                  className="text-capibara-white font-bold tracking-[0.2em] hover:text-capibara-cyan text-lg w-full text-center pb-4 border-b border-white/5 last:border-0"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
