// src/components/AboutServices.jsx
import { Gamepad2, Users, Rocket } from 'lucide-react';

export const AboutServices = () => (
    <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl text-white mb-16">EXPERIENCIAS QUE CONECTAN</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: <Gamepad2 size={40} />, title: "Game Design", color: "text-capibara-magenta", description: "Diseño de juegos y experiencias que enganchan, mecánicas atractivas hasta narrativa profunda. Creamos experiencias memorables." },
                    { icon: <Users size={40} />, title: "Social Play", color: "text-capibara-cyan", description: "Creación de experiencias de juego social y multijugador que amplian la interacción y la participación entre jugadores." },
                    { icon: <Rocket size={40} />, title: "Gamificación", color: "text-capibara-yellow", description: "Aplicación de principios de juego en contextos no lúdicos para aumentar la motivación y el engagement." },
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-capibara-black border border-white/5 hover:border-white/20 transition-all">
                        <div className={`${item.color} mb-6 flex justify-center`}>{item.icon}</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);