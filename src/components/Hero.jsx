import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-capibara-black overflow-hidden font-sans">
      <ParticleBackground />
      
      {/* Fondo con Efecto de Luces (Glows) con tamaños responsivos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-48 h-48 md:w-64 md:h-64 bg-capibara-magenta/20 rounded-full blur-[100px] md:blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-60 h-60 md:w-80 md:h-80 bg-capibara-cyan/20 rounded-full blur-[120px] md:blur-[150px] animate-pulse" />
      </div>

      {/* Contenido Principal */}
      <div className="z-10 w-full px-4 md:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          {/* Solución al overflow: Flex column en móviles, Flex row en desktop */}
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0 text-[12vw] sm:text-4xl md:text-6xl lg:text-7xl font-black text-capibara-white tracking-tighter leading-none">
            <span>CAPIBARA</span>
            <span className="text-capibara-yellow text-glow-yellow">STUDIOS</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Tracking y tamaños de fuente ajustados dinámicamente */}
          <p className="mt-4 md:mt-6 text-xs sm:text-sm md:text-xl lg:text-2xl text-capibara-cyan font-semibold tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase">
            Let's Play Together
          </p>
        </motion.div>

        {/* Botón de Acción con ancho máximo seguro en móviles */}
        <motion.button
          onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0px 0px 20px rgba(255, 0, 110, 0.7)" 
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 md:mt-12 px-6 py-4 md:px-10 text-sm md:text-base bg-capibara-magenta text-capibara-white font-bold rounded-full transition-colors cursor-pointer w-[90%] sm:w-auto max-w-sm"
        >
          CREEMOS ALGO JUNTOS
        </motion.button>
      </div>

      {/* Decoración Inferior - Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 md:bottom-10 w-6 h-10 border-2 border-capibara-white/30 rounded-full flex justify-center pointer-events-none"
      >
        <div className="w-1 h-2 bg-capibara-yellow mt-2 rounded-full" />
      </motion.div>
    </section>
  );
};

export default Hero;