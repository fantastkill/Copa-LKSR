import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import ChampionshipCard from './ChampionshipCard';
import { DEMO_CHAMPIONSHIPS } from '@/data/presentationData';

const ChampionshipGrid = () => {
  return (
    <section id="schedule" className="py-24 bg-background relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-border pb-6">
          <div>
            <h2 className="f1-title text-4xl md:text-5xl text-white mb-2">PROXIMAS ETAPAS</h2>
            <p className="text-muted-foreground font-medium">Calendario oficial da temporada 2026</p>
          </div>
          <Link
            to="/ranking"
            className="text-sm font-heading font-bold text-primary uppercase tracking-widest hover:text-white f1-transition flex items-center gap-2"
          >
            Ver calendario completo <span className="text-lg leading-none">&rarr;</span>
          </Link>
        </div>

        <div className="mb-8 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 md:px-5 md:py-4">
          <p className="text-xs sm:text-sm md:text-base text-primary flex items-start sm:items-center gap-2 tracking-wide">
            <MapPin className="w-4 h-4 mt-0.5 sm:mt-0 shrink-0" />
            <span className="font-semibold">Local oficial de todas as etapas:</span>
            <span className="text-white/90">Santa Cruz Kart - Sao Paulo, SP</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DEMO_CHAMPIONSHIPS.map((championship, index) => (
            <motion.div
              key={championship.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <ChampionshipCard championship={championship} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChampionshipGrid;
