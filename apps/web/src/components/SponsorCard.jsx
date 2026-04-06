
import React from 'react';
import { ExternalLink } from 'lucide-react';

const SponsorCard = ({ sponsor }) => {
  const typeColors = {
    founder: 'bg-primary text-primary-foreground',
    premium: 'bg-secondary text-secondary-foreground',
    supporter: 'bg-muted text-foreground'
  };

  const typeLabels = {
    founder: 'FUNDADOR',
    premium: 'PREMIUM',
    supporter: 'APOIADOR'
  };

  return (
    <div className="flex flex-col border border-border bg-card rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg group">
      <div className="h-40 bg-muted flex items-center justify-center p-6 relative overflow-hidden">
        {/* Placeholder for logo */}
        <div className="text-3xl font-bold text-muted-foreground/30 font-mono-title uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
          {sponsor.name}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-50"></div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-foreground uppercase tracking-wide">
            {sponsor.name}
          </h3>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${typeColors[sponsor.type]}`}>
            {typeLabels[sponsor.type]}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6 flex-1">
          {sponsor.description}
        </p>
        
        <a 
          href={sponsor.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
        >
          Visitar Site
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default SponsorCard;
