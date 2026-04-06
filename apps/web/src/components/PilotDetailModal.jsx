import React, { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Instagram, MapPin, Trophy, Users, Zap } from 'lucide-react';
import { formatLapTime } from '@/lib/lapTime';

const buildInitials = (pilot) => {
  const source = pilot?.display_name || pilot?.full_name || 'Piloto';
  const letters = source
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
  return letters || 'PL';
};

const PilotDetailModal = ({ pilot, open, onClose }) => {
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    setAvatarError(false);
  }, [pilot]);

  const initials = useMemo(() => buildInitials(pilot), [pilot]);

  if (!pilot) return null;

  const bestLap = formatLapTime(pilot.best_lap);
  const points = Number(pilot.points || 0);
  const showAvatar = Boolean(pilot.avatar_url) && !avatarError;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{pilot.display_name || pilot.full_name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center text-4xl font-bold text-primary border-2 border-primary/20 overflow-hidden">
              {showAvatar ? (
                <img
                  src={pilot.avatar_url}
                  alt={pilot.display_name || pilot.full_name}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                initials
              )}
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-lg font-semibold">{pilot.full_name || pilot.display_name}</p>
              {pilot.city ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{pilot.city}</span>
                </div>
              ) : null}
              {pilot.team ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{pilot.team}</span>
                </div>
              ) : null}
              {pilot.instagram ? (
                <a
                  href={`https://instagram.com/${String(pilot.instagram).replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{pilot.instagram}</span>
                </a>
              ) : null}
            </div>
          </div>

          {pilot.bio ? (
            <div>
              <h3 className="font-semibold mb-2">Sobre</h3>
              <p className="text-muted-foreground">{pilot.bio}</p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Melhor volta</span>
              </div>
              <p className="text-xl font-bold text-primary">{bestLap}</p>
            </div>

            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-sm">Posicao</span>
              </div>
              <p className="text-xl font-bold text-primary">{pilot.final_position ? `${pilot.final_position}o` : '-'}</p>
            </div>

            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-sm">Pontuacao</span>
              </div>
              <p className="text-xl font-bold text-primary">{points}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PilotDetailModal;
