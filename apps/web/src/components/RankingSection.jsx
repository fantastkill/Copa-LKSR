import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getRankingsByCategory } from '@/data/presentationData';

const RankingSection = () => {
  const [activeCategory, setActiveCategory] = useState('PRO');

  const rankingData = useMemo(() => getRankingsByCategory(activeCategory), [activeCategory]);
  const highlightPilots = rankingData.slice(0, 4);

  return (
    <section id="standings" className="py-24 bg-[#050505] relative border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="f1-title text-4xl md:text-6xl text-white mb-4">CLASSIFICACAO OFICIAL</h2>
          <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
            Ranking consolidado para apresentacao com dados consistentes por categoria.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card border border-border rounded-sm p-1">
            <button
              onClick={() => setActiveCategory('PRO')}
              className={`px-8 py-3 text-sm font-heading font-bold tracking-widest uppercase rounded-sm f1-transition ${
                activeCategory === 'PRO' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-white'
              }`}
            >
              PRO
            </button>
            <button
              onClick={() => setActiveCategory('LIGHT')}
              className={`px-8 py-3 text-sm font-heading font-bold tracking-widest uppercase rounded-sm f1-transition ${
                activeCategory === 'LIGHT' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-white'
              }`}
            >
              LIGHT
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden mb-16 shadow-2xl">
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-black/50 border-b border-border">
                  <th className="py-4 px-6 text-xs font-heading font-bold text-muted-foreground uppercase tracking-widest w-20 text-center">POS</th>
                  <th className="py-4 px-6 text-xs font-heading font-bold text-muted-foreground uppercase tracking-widest">PILOTO</th>
                  <th className="py-4 px-6 text-xs font-heading font-bold text-muted-foreground uppercase tracking-widest">MELHOR VOLTA</th>
                  <th className="py-4 px-6 text-xs font-heading font-bold text-muted-foreground uppercase tracking-widest text-right">PONTOS</th>
                </tr>
              </thead>
              <tbody>
                {rankingData.map((pilot, index) => (
                  <tr key={pilot.id} className="border-b border-border/50 last:border-0 hover:bg-white/5 f1-transition group">
                    <td className="py-4 px-6 text-center">
                      <span className={`text-xl font-heading font-black ${index === 0 ? 'text-primary' : 'text-secondary'}`}>
                        {pilot.position_label}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-heading font-bold text-lg text-white uppercase tracking-wide">
                        {pilot.pilot_name}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground font-medium uppercase text-sm">{pilot.tmv}</td>
                    <td className="py-4 px-6 text-right">
                      <span className="bg-black/50 border border-border px-3 py-1 rounded-sm font-heading font-bold text-primary">
                        {pilot.points} PTS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="drivers">
          <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
            <h3 className="f1-subtitle text-2xl text-white">DESTAQUES DO GRID</h3>
            <Link to="/pilotos" className="text-sm font-heading font-bold text-primary uppercase tracking-widest hover:text-white f1-transition">
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightPilots.map((pilot, index) => (
              <motion.div
                key={pilot.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 f1-transition"
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-heading font-black text-xl rounded-sm mb-4">
                    {pilot.position_label}
                  </div>
                  <h4 className="f1-subtitle text-xl text-white mb-1">{pilot.pilot_name}</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Categoria {activeCategory}</p>
                  <div className="flex justify-between items-center border-t border-border/50 pt-4">
                    <span className="text-xs font-heading font-bold text-secondary uppercase tracking-widest">Pontuacao</span>
                    <span className="font-heading font-black text-primary text-lg">{pilot.points}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/ranking"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-sm font-heading font-bold uppercase tracking-widest text-sm hover:bg-white f1-transition"
            >
              Ver ranking completo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingSection;
