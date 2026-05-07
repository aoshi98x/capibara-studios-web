import React, { useEffect } from 'react';

export const GoogleTranslate = () => {
  useEffect(() => {
    // 1. Evitar que el script se cargue múltiples veces si el componente se re-renderiza
    if (document.querySelector('#google-translate-script')) return;

    // 2. Crear la función de inicialización global
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: 'es', 
          includedLanguages: 'en,pt,fr,de', // Limita los idiomas si quieres mantener el control
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
        },
        'google_translate_element'
      );
    };

    // 3. Inyectar el script de Google en el DOM
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Limpieza al desmontar (opcional pero buena práctica)
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    // Aquí es donde Google inyectará su selector desplegable
    <div 
      id="google_translate_element" 
      className="fixed bottom-6 right-6 z-50 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-xl px-2 py-1 shadow-2xl"
    ></div>
  );
};