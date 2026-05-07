import { motion } from 'framer-motion';
import { Send } from 'lucide-react'; // Quité 'Mail' ya que no se estaba usando en el código

export const Contact = () => (
  <section id="contact" className="py-24 px-4 sm:px-6 bg-zinc-950 relative overflow-hidden flex justify-center">
    {/* Decoración de fondo sutil */}
    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-capibara-magenta/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
    
    <div className="w-full max-w-3xl mx-auto text-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-10 md:mb-12 px-2"
      >
        {/* Ajuste responsivo del título para evitar overflow en celulares */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-capibara-white mb-4 md:mb-6 leading-tight">
          ¿LIST@ PARA <span className="text-capibara-yellow italic block sm:inline">JUGAR JUNTOS?</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Cuéntanos tu idea y hagamos que la gente juegue unida.
        </p>
      </motion.div>

      {/* Formulario con w-full y paddings dinámicos */}
      <form 
        action="https://formspree.io/f/xkoyvnee" 
        method="POST" 
        className="w-full mx-auto space-y-6 text-left bg-capibara-black p-6 sm:p-8 md:p-12 rounded-3xl md:rounded-[2rem] border border-white/5 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-capibara-cyan text-xs md:text-sm font-bold ml-2 tracking-widest text-center md:text-left">NOMBRE</label>
            <input 
              required
              name="name"
              type="text" 
              placeholder="Tu nombre"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 md:px-6 py-4 text-white focus:outline-none focus:border-capibara-cyan transition-colors text-center md:text-left"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-capibara-magenta text-xs md:text-sm font-bold ml-2 tracking-widest text-center md:text-left">EMAIL</label>
            <input 
              required
              name="email"
              type="email" 
              placeholder="tu@email.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 md:px-6 py-4 text-white focus:outline-none focus:border-capibara-magenta transition-colors text-center md:text-left"
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <label className="text-capibara-yellow text-xs md:text-sm font-bold ml-2 tracking-widest text-center md:text-left">MENSAJE</label>
          <textarea 
            required
            name="message"
            rows="4"
            placeholder="¿Qué tienes en mente?"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 md:px-6 py-4 text-white focus:outline-none focus:border-capibara-yellow transition-colors resize-none text-center md:text-left"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 md:py-5 mt-4 bg-capibara-white text-capibara-black font-black text-lg md:text-xl rounded-2xl flex items-center justify-center gap-3 hover:bg-capibara-yellow transition-colors cursor-pointer"
        >
          ENVIAR PROPUESTA <Send size={20} />
        </motion.button>
      </form>

      <div className="mt-12 flex justify-center gap-8 text-gray-500 font-bold tracking-wider text-sm">
        <a href="https://www.linkedin.com/company/capibara-studios/" target="_blank" rel="noopener noreferrer" className="hover:text-capibara-magenta transition-colors">LINKEDIN</a>
      </div>
    </div>
  </section>
);