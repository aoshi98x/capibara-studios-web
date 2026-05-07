import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error cargando el portfolio:", error);
      } else {
        setProjects(data || []);
      }
    };

    fetchProjects();
  }, []);

  // Misma imagen que usamos en el Featured para mantener consistencia visual
  const fallbackImage = "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070&auto=format&fit=crop";

  const bentoStyles = [
    { size: "md:col-span-2 md:row-span-2", color: "bg-capibara-magenta" },
    { size: "md:col-span-1 md:row-span-1", color: "bg-capibara-cyan" },
    { size: "md:col-span-1 md:row-span-1", color: "bg-capibara-yellow" },
  ];

  return (
    <section id="portfolio" className="py-24 px-6 bg-capibara-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-capibara-white uppercase tracking-tighter">
              Proyectos
            </h2>
            <p className="text-capibara-cyan mt-2 tracking-[0.3em] uppercase text-sm font-bold">
              Catálogo de experiencias
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {projects.map((project, index) => {
            const style = bentoStyles[index] || bentoStyles[0];

            return (
               <motion.div
                key={project.id}
                whileHover={{ scale: 0.98 }}
                className={`${style.size} relative group rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900`}
              >
                {/* 1. IMAGEN DE FONDO */}
                <img 
                  src={project.img_url || fallbackImage} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 ease-out" 
                  alt={project.title}
                />
                
                {/* 2. CAPAS DE ESTILO (Overlay y Gradiente) */}
                <div className={`absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity ${style.color} z-10 pointer-events-none`} />
                <div className="absolute inset-0 bg-gradient-to-t from-capibara-black via-capibara-black/20 to-transparent z-20 pointer-events-none" />

                {/* 3. TEXTOS (Añadimos pointer-events-none para que no bloqueen el click) */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-30 pointer-events-none">
                  <span className="text-capibara-cyan text-[10px] font-black uppercase tracking-[0.2em] mb-2 drop-shadow-md">
                    {project.tags && project.tags.length > 0 ? project.tags[0] : "Capibara Original"}
                  </span>
                  <h3 className="text-3xl font-bold text-capibara-white italic leading-none drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>

                {/* 4. EL ENLACE (Al final de todo con z-50 para cubrir la tarjeta completa) */}
                <Link to={`/project/${project.slug}`} className="absolute inset-0 z-50 cursor-pointer">
                  <span className="sr-only">Ver {project.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};