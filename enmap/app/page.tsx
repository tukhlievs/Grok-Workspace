"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Camera, Sparkles, Clock, Star, Navigation, ArrowRight, Play, X } from 'lucide-react';
import { toast } from 'sonner';

interface Location {
  id: number;
  name: string;
  description: string;
  aestheticScore: number;
  distance: string;
  timeOfDay: string;
  tips: string;
  category: string;
  imageId: number;
}

const demoLocations: Location[] = [
  { id: 1, name: "Тенистый дворик у мечети Минор", description: "Идеальная игра света и тени сквозь арки.", aestheticScore: 9.7, distance: "380 м", timeOfDay: "Утро / Закат", tips: "Золотой час.", category: "Архитектура", imageId: 1015 },
  { id: 2, name: "Крыша с видом на Чорсу", description: "Панорама базаров и гор.", aestheticScore: 9.4, distance: "1.2 км", timeOfDay: "Закат", tips: "Широкий угол.", category: "Панорама", imageId: 160 },
  { id: 3, name: "Граффити-аллея", description: "Стрит-арт в современном районе.", aestheticScore: 8.9, distance: "2.8 км", timeOfDay: "День", tips: "Ведущие линии.", category: "Урбан", imageId: 201 },
  { id: 4, name: "Отражающий пруд", description: "Идеальные отражения в парке.", aestheticScore: 9.2, distance: "950 м", timeOfDay: "Утро", tips: "Низкий ракурс.", category: "Природа", imageId: 251 }
];

export default function EnmapLanding() {
  const [locationInput, setLocationInput] = useState("Ташкент, Узбекистан");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSearchResults(demoLocations);
    setIsSearching(false);
    toast.success('Локации найдены!', { description: 'Enmap ИИ выбрал лучшие места' });
  };

  const handleUseMyLocation = () => {
    setLocationInput('Ташкент • Геолокация');
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur border-b z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div className="font-semibold text-2xl tracking-tighter">Enmap</div>
          </div>
          <button onClick={() => setIsDemoOpen(true)} className="px-8 py-3 bg-violet-600 text-white rounded-3xl">Демо</button>
        </div>
      </nav>

      <section className="pt-24 pb-20 bg-gradient-to-br from-violet-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold tracking-tighter leading-none mb-6">Найдите красоту вокруг</h1>
          <p className="text-2xl text-slate-600 max-w-xl mx-auto">ИИ Enmap находит уникальные места для эстетичных съемок по вашему местоположению.</p>
          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <button onClick={handleUseMyLocation} className="px-10 py-4 bg-violet-600 text-white rounded-3xl text-lg">Начать в Ташкенте</button>
            <button onClick={() => setIsDemoOpen(true)} className="px-10 py-4 border-2 border-violet-600 text-violet-600 rounded-3xl text-lg">Открыть демо</button>
          </div>
        </div>
      </section>

      {searchResults.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-semibold mb-8">Найденные локации</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {searchResults.map(loc => (
                <div key={loc.id} className="bg-white border rounded-3xl overflow-hidden shadow-sm cursor-pointer" onClick={() => setSelectedLocation(loc)}>
                  <img src={`https://picsum.photos/id/${loc.imageId}/800/300`} alt="" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="font-semibold mb-1">{loc.name}</div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600"><span>{loc.distance}</span><span>• {loc.aestheticScore}</span></div>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{loc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {isDemoOpen && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setIsDemoOpen(false)}>
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="p-8">
                <h2 className="text-3xl font-semibold mb-6">Enmap Demo</h2>
                <input value={locationInput} onChange={(e) => setLocationInput(e.target.value)} className="w-full px-4 py-3 border rounded-2xl mb-4" placeholder="Локация" />
                <button onClick={handleSearch} className="w-full bg-violet-600 text-white py-4 rounded-3xl">Поискать</button>
                {searchResults.length > 0 && <div className="mt-6">Результаты готовы</div>}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedLocation && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLocation(null)}>
            <div className="bg-white rounded-3xl max-w-lg w-full p-8" onClick={e => e.stopPropagation()}>
              <h3 className="font-semibold text-2xl">{selectedLocation.name}</h3>
              <p>{selectedLocation.description}</p>
              <div className="mt-6 text-sm">Эстетика: {selectedLocation.aestheticScore}</div>
              <button onClick={() => setSelectedLocation(null)} className="mt-6 w-full py-3 border rounded-3xl">Закрыть</button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
