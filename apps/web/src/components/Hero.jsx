import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { getNextChampionship } from '@/data/presentationData';

const Hero = () => {
  const nextChampionship = getNextChampionship();

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1692455042353-c8beda4a7398?q=80&w=2070&auto=format&fit=crop"
          alt="Racing background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/20 border border-primary/30 text-primary text-xs font-heading font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Temporada 2026
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-6 italic">
            COPA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">LSKR</span>
          </h1>

          <p className="text-lg md:text-2xl text-primary-contrast font-medium max-w-xl mb-12 border-l-4 border-primary pl-4">
            Plataforma oficial da temporada. Ranking, pilotos, etapas e cadastro em um fluxo confiavel para apresentacao.
          </p>

          {nextChampionship ? (
            <div className="mb-12">
              <p className="text-sm font-heading font-bold text-primary-contrast uppercase tracking-widest mb-4">
                Proxima etapa em:
              </p>
              <CountdownTimer targetDate={String(nextChampionship.event_date).replace(' ', 'T')} />
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/ranking"
              className="group relative flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-sm font-heading font-bold uppercase tracking-widest text-sm overflow-hidden f1-transition hover:bg-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver ranking <ChevronRight className="w-4 h-4 group-hover:translate-x-1 f1-transition" />
              </span>
            </Link>
            <Link
              to="/cadastro"
              className="group flex items-center justify-center gap-2 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 px-8 py-4 rounded-sm font-heading font-bold uppercase tracking-widest text-sm f1-transition"
            >
              Cadastrar piloto
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
