import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { DEMO_SPONSORS } from '@/data/presentationData';

const SponsorsSection = () => {
  const founderSponsor = DEMO_SPONSORS.find((sponsor) => sponsor.sponsor_type === 'founder') || DEMO_SPONSORS[0];
  const secondarySponsors = DEMO_SPONSORS.filter((sponsor) => sponsor.id !== founderSponsor?.id);

  return (
    <section id="sponsors" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="f1-title text-4xl md:text-5xl text-white mb-2">PATROCINADORES</h2>
          <p className="text-muted-foreground font-medium">Marcas parceiras da temporada da COPA LSKR.</p>
        </div>

        {founderSponsor ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl overflow-hidden mb-8 group hover:border-primary/30 f1-transition"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-heading font-bold uppercase tracking-widest rounded-sm w-fit mb-6 border border-primary/20">
                  Patrocinador Fundador
                </span>
                <h3 className="f1-title text-4xl text-white mb-6">{founderSponsor.company_name}</h3>
                <p className="text-secondary text-lg leading-relaxed mb-8 max-w-md">{founderSponsor.description}</p>
                <Link
                  to="/patrocinadores"
                  className="flex items-center gap-2 text-sm font-heading font-bold text-primary uppercase tracking-widest hover:text-white f1-transition w-fit"
                >
                  Conhecer patrocinadores <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-[#050505] flex items-center justify-center p-12 min-h-[300px] relative overflow-hidden">
                <div className="text-5xl font-heading font-black text-white/10 italic tracking-tighter transform -skew-x-12 group-hover:scale-110 transition-transform duration-700">
                  {founderSponsor.company_name}
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
              </div>
            </div>
          </motion.div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondarySponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center group hover:border-white/20 f1-transition min-h-[200px]"
            >
              <span className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-widest mb-4">
                {sponsor.sponsor_type === 'premium' ? 'Premium' : 'Apoiador'}
              </span>
              <h4 className="f1-subtitle text-2xl text-secondary group-hover:text-white f1-transition">{sponsor.company_name}</h4>
              <p className="text-sm text-muted-foreground mt-3">{sponsor.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
