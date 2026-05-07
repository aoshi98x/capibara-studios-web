import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Play, Gamepad2, Monitor, Smartphone, Globe, ArrowLeft, Image as ImageIcon } from 'lucide-react';

const getFallbackMarkdown = (title) => `
## Explorando el mundo de ${title}
Bienvenido al DevLog interno. Actualmente estamos estructurando la documentación pública para detallar todo el proceso de ingeniería y diseño detrás de **${title}**.

### ⚙️ Enfoque Técnico
Este título sigue nuestros estándares más estrictos de desarrollo:
* **Lógica Multijugador:** Estructuras optimizadas para una sincronización precisa.
* **Pipeline Visual:** Integración limpia de modelos y animaciones 3D.
`;

// Función para extraer el ID del video sin importar qué link de YouTube pegues en la BD
const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [content, setContent] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) return;
      setProject(data);

      try {
        if (!data.markdown_url) throw new Error("URL vacía");
        const response = await fetch(data.markdown_url);
        if (!response.ok) throw new Error("Error HTTP");
        setContent(await response.text());
      } catch (err) {
        setContent(getFallbackMarkdown(data.title));
      }
    };
    
    fetchProject();
  }, [slug]);

  if (!project) return <div className="min-h-screen bg-capibara-black flex items-center justify-center text-capibara-cyan font-black tracking-[0.3em] uppercase">Cargando Mundo...</div>;

  const videoId = getYoutubeId(project.youtube_url);

  // Mapeo inteligente de tiendas e iconos
  const storeConfig = {
    "steam": { name: "Steam", icon: <Monitor size={24} /> },
    "itch.io": { name: "Itch.io", icon: <Gamepad2 size={24} /> },
    "playstation": { name: "PlayStation", icon: <Gamepad2 size={24} /> },
    "xbox": { name: "Xbox", icon: <Gamepad2 size={24} /> },
    "nintendo": { name: "Nintendo eShop", icon: <Gamepad2 size={24} /> },
    "playstore": { name: "Google Play", icon: <Smartphone size={24} /> },
    "appstore": { name: "App Store", icon: <Smartphone size={24} /> },
    "web": { name: "Sitio Oficial", icon: <Globe size={24} /> }
  };

  return (
    <div className="min-h-screen bg-capibara-black text-white pt-32 pb-16 px-6 md:px-16 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <Link to="/" className="inline-flex items-center gap-2 text-capibara-cyan hover:text-capibara-white mb-8 transition-colors font-bold tracking-widest text-sm uppercase">
          <ArrowLeft size={18} /> Volver al Catálogo
        </Link>
        
        {/* CABECERA: Video de YouTube interactivo o Imagen */}
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,180,216,0.1)] mb-12 bg-zinc-900 group">
          {videoId ? (
            isVideoPlaying ? (
              <iframe 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full absolute inset-0"
              ></iframe>
            ) : (
              <div 
                onClick={() => setIsVideoPlaying(true)}
                className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center"
              >
                {/* Miniatura en alta calidad de YouTube */}
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-capibara-black/40 backdrop-blur-sm transition-all group-hover:backdrop-blur-0" />
                
                {/* Título en Standby */}
                <h1 className="relative z-10 text-5xl md:text-8xl font-black text-capibara-white italic uppercase tracking-tighter text-center px-4 drop-shadow-2xl">
                  {project.title}
                </h1>
                
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 mt-8 w-20 h-20 bg-capibara-magenta rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,0,110,0.6)]"
                >
                  <Play fill="white" size={32} className="ml-2" />
                </motion.div>
              </div>
            )
          ) : (
            // Fallback si no hay video, mostramos la imagen principal
            <div className="absolute inset-0 flex items-end p-10 bg-gradient-to-t from-capibara-black to-transparent">
               <img src={project.img_url} className="absolute inset-0 w-full h-full object-cover -z-10 opacity-60" alt="" />
               <h1 className="text-5xl md:text-7xl font-black text-capibara-white italic uppercase tracking-tighter">
                  {project.title}
               </h1>
            </div>
          )}
        </div>

        {/* SLIDER DE SCREENSHOTS (Solo aparece si hay imágenes en la BD) */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-16">
            <h3 className="flex items-center gap-2 text-xl font-bold text-capibara-cyan mb-6 uppercase tracking-widest">
              <ImageIcon size={20} /> Galería
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {project.screenshots.map((img, idx) => (
                <div key={idx} className="min-w-[85%] md:min-w-[60%] lg:min-w-[45%] aspect-video snap-center shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
                  <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENIDO MARKDOWN ESTILIZADO */}
        <article className="prose prose-invert max-w-none mb-20 font-sans leading-relaxed">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Sobrescribimos las etiquetas HTML para aplicarles las clases de tu branding
              h2: ({node, ...props}) => <h2 className="text-3xl md:text-4xl font-black text-capibara-magenta mt-12 mb-6 uppercase tracking-wide border-b border-white/10 pb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-capibara-yellow mt-8 mb-4 uppercase" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-300 text-lg mb-6" {...props} />,
              a: ({node, ...props}) => <a className="text-capibara-cyan font-bold hover:text-white underline decoration-capibara-cyan/40 decoration-2 transition-colors" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-capibara-white bg-white/5 px-2 py-0.5 rounded" {...props} />,
              ul: ({node, ...props}) => <ul className="list-none space-y-3 my-6" {...props} />,
              li: ({node, ...props}) => (
                <li className="flex gap-3 text-gray-300 items-start">
                  <span className="text-capibara-magenta mt-1">▹</span>
                  <span {...props} />
                </li>
              ),
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-capibara-yellow bg-capibara-yellow/5 p-6 rounded-r-2xl text-gray-400 italic my-8" {...props} />
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* BOTONES DE TIENDAS */}
        {project.store_links && Object.keys(project.store_links).length > 0 && (
          <div className="border-t border-white/10 pt-12">
            <h3 className="text-2xl font-black text-capibara-white mb-8 uppercase tracking-[0.2em] text-center md:text-left">
              Jugar Ahora
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {Object.entries(project.store_links).map(([storeKey, url]) => {
                const store = storeConfig[storeKey.toLowerCase()] || { name: storeKey, icon: <Globe size={24} /> };
                
                return (
                  <a 
                    key={storeKey} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-5 bg-zinc-900 border border-white/5 rounded-2xl hover:border-capibara-cyan hover:bg-zinc-800 transition-all group"
                  >
                    <span className="text-gray-400 group-hover:text-capibara-cyan transition-colors">
                      {store.icon}
                    </span>
                    <span className="font-black uppercase tracking-widest text-sm text-white group-hover:text-capibara-cyan transition-colors">
                      {store.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;