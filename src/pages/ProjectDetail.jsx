import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../supabaseClient';

// Generador de Markdown de respaldo en caso de que el archivo no exista
const getFallbackMarkdown = (title) => `
## Explorando el mundo de ${title}

Bienvenido al DevLog interno. Actualmente estamos estructurando la documentación pública para detallar todo el proceso de ingeniería y diseño detrás de **${title}**.

En Capibara Studios, creemos en la filosofía *Play Together*, por lo que cada línea de código y cada asset está pensado para maximizar la conexión entre jugadores.

### ⚙️ Enfoque Técnico
Este título sigue nuestros estándares más estrictos de desarrollo:
* **Lógica Multijugador:** Estructuras optimizadas para una sincronización precisa.
* **Pipeline Visual:** Integración limpia de modelos y animaciones 3D.

Vuelve pronto para leer el análisis técnico completo de **${title}**.
`;

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      // 1. Obtener metadatos de la tabla
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        console.error("Error cargando el proyecto:", error);
        return;
      }

      setProject(data);

      // 2. Intentar obtener el archivo Markdown del Storage
      try {
        if (!data.markdown_url) throw new Error("URL de markdown vacía");
        
        const response = await fetch(data.markdown_url);
        if (!response.ok) throw new Error("Error HTTP al leer el archivo");
        
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.warn("Usando Markdown de respaldo para:", data.title);
        // Inyectamos el fallback con el título de la base de datos
        setContent(getFallbackMarkdown(data.title));
      }
    };
    
    fetchProject();
  }, [slug]);

  if (!project) return <div className="min-h-screen bg-capibara-black flex items-center justify-center text-white font-bold tracking-widest uppercase">Cargando mundo...</div>;

  // Diccionario para formatear los nombres de las tiendas basándonos en las keys del JSON
  const storeNames = {
    "steam": "Steam",
    "itch.io": "Itch.io",
    "playstation": "PlayStation Store",
    "xbox": "Xbox Store",
    "nintendo": "Nintendo eShop",
    "playstore": "Google Play",
    "appstore": "App Store",
    "web": "Sitio Web Oficial"
  };

  return (
    <div className="min-h-screen bg-capibara-black text-white p-8 md:p-16 font-sans">
      <Link to="/" className="text-capibara-cyan hover:text-white mb-8 inline-block transition-colors font-bold">
        &larr; VOLVER AL ESTUDIO
      </Link>
      
      <h1 className="text-5xl md:text-7xl font-black text-capibara-magenta uppercase italic tracking-tighter">
        {project.title}
      </h1>
      
      {/* Renderizado del Markdown con soporte para tablas y listas (GFM) */}
      <article className="prose prose-invert prose-capibara max-w-none mt-12 mb-16">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>

      {/* Botones de Tiendas Dinámicos */}
      {project.store_links && Object.keys(project.store_links).length > 0 && (
        <div className="border-t border-white/10 pt-12">
          <h3 className="text-2xl font-bold text-capibara-yellow mb-6 uppercase tracking-widest">Disponible en</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(project.store_links).map(([storeKey, url]) => (
              <a 
                key={storeKey} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-4 bg-zinc-900 border border-white/5 rounded-2xl hover:border-capibara-cyan hover:bg-zinc-800 transition-all font-bold uppercase"
              >
                {storeNames[storeKey] || storeKey}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;