import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-capibara-black overflow-hidden font-sans">
      <ParticleBackground />
      {/* Fondo con Efecto de Luces (Glows) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-capibara-magenta/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-capibara-cyan/20 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Contenido Principal */}
      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-8xl font-black text-capibara-white tracking-tighter">
            CAPIBARA<span className="text-capibara-yellow text-glow-yellow">STUDIOS</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="mt-4 text-lg md:text-2xl text-capibara-cyan font-semibold tracking-[0.3em] uppercase">
            Play Together
          </p>
        </motion.div>

        {/* Botón de Acción con Estilo Gaming */}
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0px 0px 20px rgba(255, 0, 110, 0.7)" 
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-10 py-4 bg-capibara-magenta text-capibara-white font-bold rounded-full transition-colors"
        >
          CREEMOS ALGO JUNTOS
        </motion.button>
      </div>

      {/* Decoración Inferior - Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 w-6 h-10 border-2 border-capibara-white/30 rounded-full flex justify-center"
      >
        <div className="w-1 h-2 bg-capibara-yellow mt-2 rounded-full" />
      </motion.div>
    </section>
  );
};

export default Hero;