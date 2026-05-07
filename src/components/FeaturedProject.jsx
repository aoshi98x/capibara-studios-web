import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const FeaturedProject = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (data) setProject(data);
    };
    fetchFeatured();
  }, []);

  if (!project) return null;

  return (
    <section className="py-24 px-6 bg-capibara-black text-capibara-white overflow-hidden">
      <div id="featured" className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-capibara-magenta font-bold uppercase tracking-[0.3em] text-xs">
            Highlight Reel
          </span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 mb-6 uppercase italic tracking-tighter leading-none">
            {project.title}
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-lg">
            {project.short_description || "Explora una nueva dimensión de juego donde la ingeniería y el arte convergen en una experiencia única."}
          </p>
          
          <Link 
            to={`/project/${project.slug}`}
            className="inline-flex items-center gap-4 border-b-2 border-capibara-yellow text-capibara-yellow pb-2 font-bold hover:text-capibara-white transition-all group"
          >
            VER PROYECTO <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </motion.div>

        <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/5 aspect-video shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <img 
            src={project.img_url || "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070"} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-capibara-black via-transparent to-transparent opacity-80" />
          
          {/* Tags sobre la imagen con Glassmorphism */}
          <div className="absolute bottom-8 left-8 flex gap-3">
            {project.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};