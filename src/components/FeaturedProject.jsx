import { motion } from 'framer-motion';

export const FeaturedProject = () => (
  <section className="py-24 px-6 bg-capibara-black text-capibara-white">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
        <span className="text-capibara-magenta font-bold uppercase tracking-widest">Proyecto Actual</span>
        <h2 className="text-4xl md:text-6xl font-black mt-2 mb-6">NOMBRE DEL JUEGO</h2>
        <p className="text-gray-400 text-xl leading-relaxed">
          Una breve descripción épica de vuestro último desarrollo. Mecánicas innovadoras y arte disruptivo.
        </p>
        <button className="mt-8 border-b-2 border-capibara-yellow text-capibara-yellow py-2 font-bold hover:text-capibara-white transition-colors">
          Ver progreso del DevLog →
        </button>
      </motion.div>
      <div className="relative group rounded-2xl overflow-hidden border border-capibara-cyan/30">
        <img src="tu-imagen-aqui.jpg" alt="Dev" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-capibara-black/80 to-transparent" />
      </div>
    </div>
  </section>
);