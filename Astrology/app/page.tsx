'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { Planet } from '../components/Planet';
import { ArrowDown } from 'lucide-react';

export default function AstronomySite() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 stars" />
        
        <div className="absolute inset-0 z-10">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} />
            <Planet />
            <Stars radius={300} depth={60} count={5000} factor={4} saturation={0} fade />
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.2} />
          </Canvas>
        </div>

        <motion.div 
          className="relative z-20 text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6">
            ВСЁЛЕННАЯ
          </h1>
          <p className="text-2xl md:text-3xl text-blue-300 mb-8">Путешествие сквозь космос</p>
          <motion.a 
            href="#explore"
            className="inline-flex items-center gap-3 border border-white/50 px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Исследовать <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      <section id="explore" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-6xl font-bold text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Открой для себя космос
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Солнечная система", img: "https://picsum.photos/id/1015/600/400", desc: "8 планет и их тайны" },
              { title: "Чёрные дыры", img: "https://picsum.photos/id/1074/600/400", desc: "Гравитационные монстры" },
              { title: "Экзопланеты", img: "https://picsum.photos/id/1033/600/400", desc: "Мир за пределами" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group relative overflow-hidden rounded-3xl bg-zinc-900"
              >
                <img src={item.img} alt={item.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="p-8">
                  <h3 className="text-3xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-zinc-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
