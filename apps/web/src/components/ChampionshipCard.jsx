import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import ChampionshipInteractions from './ChampionshipInteractions';

const STATUS_VARIANTS = {
  past: {
    badge: 'ENCERRADA',
    badgeClass: 'bg-white/10 text-white border border-white/20',
    cardClass: 'opacity-90 border-white/15',
    overlayClass: 'bg-black/72',
    statusText: 'Resultado disponivel'
  },
  next: {
    badge: 'PROXIMA ETAPA',
    badgeClass: 'bg-primary text-black shadow-[0_0_24px_rgba(255,215,0,0.25)]',
    cardClass: 'border-primary/70 ring-1 ring-primary/50',
    overlayClass: 'bg-black/50',
    statusText: 'Em contagem regressiva'
  },
  future: {
    badge: 'AGENDADA',
    badgeClass: 'bg-primary/85 text-black',
    cardClass: 'border-white/20',
    overlayClass: 'bg-black/62',
    statusText: 'Etapa agendada'
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const base = String(dateString).split(' ')[0];
  const d = new Date(`${base}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(d);
};

const ChampionshipCard = ({ championship }) => {
  const normalizedStatus = String(championship.status || '').toLowerCase();
  const isPast = championship.isPast || normalizedStatus === 'finished' || normalizedStatus === 'encerrada';
  const isNext = championship.isNext || normalizedStatus === 'proxima' || normalizedStatus === 'next' || normalizedStatus === 'live';
  const stateKey = isPast ? 'past' : isNext ? 'next' : 'future';
  const styles = STATUS_VARIANTS[stateKey];

  const date = formatDate(championship.event_date || championship.date);
  const time = championship.event_time || championship.time || '12:00';
  const stageLabel = championship.stage || 'Etapa';
  const complementaryStatus = championship.statusText || styles.statusText;
  const ctaLabel = championship.ctaLabel || (isPast ? 'Ver resultado' : isNext ? 'Ver detalhes' : 'Acompanhar etapa');
  const ctaHref = championship.ctaHref || '/ranking';
  const isInternalCta = ctaHref.startsWith('/');

  const fallbackShareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/ranking?etapa=${championship.id}`;
  const shareUrl =
    championship.shareUrl && championship.shareUrl.startsWith('http')
      ? championship.shareUrl
      : championship.shareUrl
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}${championship.shareUrl}`
        : fallbackShareUrl;
  const imageUrl =
    championship.image ||
    'https://images.unsplash.com/photo-1593476123561-9516f2097158?q=80&w=1400&auto=format&fit=crop';

  return (
    <article
      className={`group relative h-[430px] md:h-[470px] rounded-xl overflow-hidden shadow-lg flex flex-col bg-card border ${styles.cardClass}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={championship.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 transition-colors duration-300 ${styles.overlayClass}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col p-5 md:p-6">
        <div
          className={`self-start px-3 py-1.5 rounded-sm font-heading font-bold uppercase tracking-widest text-[11px] md:text-xs ${styles.badgeClass}`}
        >
          {styles.badge}
        </div>

        <div className="mt-auto">
          <h3 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter mb-4 leading-none drop-shadow-lg">
            {championship.title}
          </h3>

          <div className="space-y-3 text-primary font-medium text-sm md:text-base drop-shadow-md">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <span className="capitalize">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <span>{time}</span>
            </div>
            <p className="text-white/95 text-sm md:text-base font-semibold uppercase tracking-wide">{stageLabel}</p>
            <p className="text-primary/90 text-xs md:text-sm uppercase tracking-wider font-bold">{complementaryStatus}</p>
          </div>

          <div className="mt-4 border-t border-white/15 pt-4 flex items-center gap-3">
            {isInternalCta ? (
              <Link
                to={ctaHref}
                className="inline-flex items-center justify-center rounded-md border border-primary/50 bg-primary/10 px-3.5 py-2 text-xs md:text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-black transition-colors"
              >
                {ctaLabel}
              </Link>
            ) : (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-primary/50 bg-primary/10 px-3.5 py-2 text-xs md:text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-black transition-colors"
              >
                {ctaLabel}
              </a>
            )}
            <ChampionshipInteractions
              championshipId={championship.id}
              championshipTitle={championship.title}
              shareUrl={shareUrl}
              className="ml-auto"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ChampionshipCard;
