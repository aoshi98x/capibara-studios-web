// src/components/Portfolio.jsx
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: "Neon Runners", category: "Multiplayer", size: "md:col-span-2 md:row-span-2", color: "bg-capibara-magenta" },
  { id: 2, title: "Eco-World", category: "Gamification", size: "md:col-span-1 md:row-span-1", color: "bg-capibara-cyan" },
  { id: 3, title: "Capi Adventure", category: "Mobile Game", size: "md:col-span-1 md:row-span-1", color: "bg-capibara-yellow" },
  { id: 4, title: "Social Hub", category: "VR Experience", size: "md:col-span-2 md:row-span-1", color: "bg-zinc-800" },
];

export const Portfolio = () => (
  <section className="py-24 px-6 bg-capibara-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-capibara-white">PROYECTOS</h2>
          <p className="text-capibara-cyan mt-2 tracking-widest uppercase">Nuestros mundos creados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 0.98 }}
            className={`${project.size} relative group rounded-3xl overflow-hidden border border-white/10`}
          >
            {/* Placeholder para la imagen del proyecto */}
            <div className={`absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity ${project.color}`} />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs font-bold text-capibara-white/60 uppercase tracking-widest mb-1">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold text-capibara-white italic">
                {project.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);