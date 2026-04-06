import React, { useState } from 'react';
import { MapPin, Instagram, Trophy } from 'lucide-react';
import { formatLapTime } from '@/lib/lapTime';

const PilotCard = ({ pilot, position, onClick }) => {
  const [avatarError, setAvatarError] = useState(false);

  const isFirst = position === 1;
  const isSecond = position === 2;
  const isThird = position === 3;
  const isPodium = isFirst || isSecond || isThird;

  let cardStyle = 'border-border bg-card';
  let badgeStyle = 'bg-muted text-muted-foreground';
  let nameStyle = 'text-foreground';

  if (isFirst) {
    cardStyle = 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))/0.05] shadow-[0_0_15px_hsla(var(--gold),0.15)]';
    badgeStyle = 'bg-[hsl(var(--gold))] text-black';
    nameStyle = 'text-[hsl(var(--gold))]';
  } else if (isSecond) {
    cardStyle = 'border-[hsl(var(--silver))] bg-[hsl(var(--silver))/0.05]';
    badgeStyle = 'bg-[hsl(var(--silver))] text-black';
    nameStyle = 'text-[hsl(var(--silver))]';
  } else if (isThird) {
    cardStyle = 'border-[hsl(var(--bronze))] bg-[hsl(var(--bronze))/0.05]';
    badgeStyle = 'bg-[hsl(var(--bronze))] text-black';
    nameStyle = 'text-[hsl(var(--bronze))]';
  }

  const initials = pilot.name
    ? pilot.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((namePart) => namePart[0])
        .join('')
        .toUpperCase()
    : 'PL';

  const showAvatar = Boolean(pilot.avatar_url) && !avatarError;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col h-full ${cardStyle}`}
    >
      {pilot.category ? (
        <div className="absolute top-0 left-0 px-3 py-1 rounded-br-lg font-bold text-[10px] tracking-wider bg-primary/20 text-primary border-b border-r border-primary/20 uppercase">
          {pilot.category}
        </div>
      ) : null}

      {position ? (
        <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg font-bold text-xs tracking-wider ${badgeStyle}`}>
          POS {position}
        </div>
      ) : null}

      <div className="flex flex-col items-center text-center mt-4 flex-grow">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-2 overflow-hidden ${isPodium ? badgeStyle : 'bg-muted border-border text-foreground'}`}>
          {showAvatar ? (
            <img
              src={pilot.avatar_url}
              alt={pilot.name}
              className="w-full h-full object-cover"
              onError={() => setAvatarError(true)}
            />
          ) : (
            initials
          )}
        </div>

        <h3 className={`text-xl font-bold mb-2 font-heading uppercase tracking-tight ${nameStyle}`}>{pilot.name}</h3>

        {pilot.city ? (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <MapPin className="w-3 h-3" />
            <span>{pilot.city}</span>
          </div>
        ) : null}

        {pilot.team ? <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">{pilot.team}</p> : null}

        {pilot.bio ? <p className="text-sm text-muted-foreground line-clamp-2 mb-4 italic">"{pilot.bio}"</p> : null}

        <div className="w-full space-y-3 text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
          {pilot.instagram ? (
            <div className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-1">
                <Instagram className="w-4 h-4" /> Instagram:
              </span>
              <span className="text-foreground truncate">{pilot.instagram}</span>
            </div>
          ) : null}

          <div className="flex justify-between items-center">
            <span>Melhor volta:</span>
            <span className="text-foreground font-heading">{formatLapTime(pilot.best_lap)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4" /> Pontos:
            </span>
            <span className="text-primary font-heading font-bold">{pilot.points ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilotCard;
