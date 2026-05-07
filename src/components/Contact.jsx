// src/components/Contact.jsx
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

export const Contact = () => (
  <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
    {/* Decoración de fondo sutil */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-capibara-magenta/5 blur-[120px] rounded-full" />
    
    <div className="max-w-3xl mx-auto text-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-5xl md:text-7xl font-black text-capibara-white mb-6">
          ¿LIST@ PARA <span className="text-capibara-yellow italic">JUGAR JUNTOS?</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Cuéntanos tu idea y hagamos que la gente juegue unida.
        </p>
      </motion.div>

      <form 
        action="https://formspree.io/f/xkoyvnee" 
        method="POST" 
        className="space-y-6 text-left bg-capibara-black p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-capibara-cyan text-sm font-bold ml-2 tracking-widest">NOMBRE</label>
            <input 
              required
              name="name" // Obligatorio para Formspree
              type="text" 
              placeholder="Tu nombre"
              className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-capibara-cyan transition-colors"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-capibara-magenta text-sm font-bold ml-2 tracking-widest">EMAIL</label>
            <input 
              required
              name="email" // Obligatorio para Formspree
              type="email" 
              placeholder="tu@email.com"
              className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-capibara-magenta transition-colors"
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <label className="text-capibara-yellow text-sm font-bold ml-2 tracking-widest">MENSAJE</label>
          <textarea 
            required
            name="message" // Obligatorio para Formspree
            rows="4"
            placeholder="¿Qué tienes en mente?"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-capibara-yellow transition-colors resize-none"
          />
        </div>

        <motion.button
          type="submit" // Aseguramos que sea tipo submit
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 bg-capibara-white text-capibara-black font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:bg-capibara-yellow transition-colors cursor-pointer"
        >
          ENVIAR PARTIDA <Send size={20} />
        </motion.button>
      </form>

      <div className="mt-12 flex justify-center gap-8 text-gray-500">
        <a href="#" className="hover:text-capibara-cyan transition-colors">Instagram</a>
        <a href="#" className="hover:text-capibara-magenta transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-capibara-yellow transition-colors">X (Twitter)</a>
      </div>
    </div>
  </section>
);