import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Mail, ChevronRight } from 'lucide-react';
import { SANTA_CRUZ_CITY, SANTA_CRUZ_LABEL, SANTA_CRUZ_MAPS_URL } from '@/lib/venue';
import { getNextChampionship } from '@/data/presentationData';

const NextRaceSection = () => {
  const navigate = useNavigate();
  const nextRace = useMemo(() => getNextChampionship(), []);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!nextRace?.event_date) return;

    const targetDateStr = String(nextRace.event_date).split(' ')[0];
    const targetTimeStr = nextRace.event_time || '12:00:00';
    const formattedTimeStr = targetTimeStr.length === 5 ? `${targetTimeStr}:00` : targetTimeStr;
    const targetDate = new Date(`${targetDateStr}T${formattedTimeStr}`);

    const calculateTimeLeft = () => {
      const difference = targetDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [nextRace]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const base = String(dateString).split(' ')[0];
    const date = new Date(`${base}T12:00:00Z`);
    if (Number.isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  };

  if (!nextRace) return null;

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 text-primary text-xs font-heading font-bold uppercase tracking-widest mb-6 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Proxima Etapa
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-6">
                {nextRace.title}
              </h2>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium text-white capitalize">{formatDate(nextRace.event_date)}</span>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium text-white">{nextRace.event_time || '12:00'}</span>
                </div>

                <a
                  href={SANTA_CRUZ_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:opacity-90 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium text-white leading-snug">
                    {SANTA_CRUZ_LABEL} - {SANTA_CRUZ_CITY}
                  </span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={() => navigate('/cadastro')}
                  className="group flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-lg font-heading font-bold uppercase tracking-widest text-sm overflow-hidden f1-transition hover:bg-white hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  Cadastrar Piloto
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 f1-transition" />
                </button>

                <a
                  href="mailto:contato@copalskr.com.br?subject=Interesse%20em%20participar%20da%20COPA%20LSKR"
                  className="group flex-1 flex items-center justify-center gap-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-black px-6 py-4 rounded-lg font-heading font-bold uppercase tracking-widest text-sm f1-transition"
                >
                  <Mail className="w-5 h-5" />
                  Falar com organizacao
                </a>
              </div>
            </div>

            <div className="bg-background/50 p-8 md:p-12 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-border relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

              <h3 className="text-xl md:text-2xl font-heading font-bold text-white text-center mb-8">
                Faltam <span className="text-primary">{timeLeft.days}</span> dias para a proxima corrida!
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-lg">
                {[
                  { label: 'DIAS', value: timeLeft.days },
                  { label: 'HORAS', value: timeLeft.hours },
                  { label: 'MINUTOS', value: timeLeft.minutes },
                  { label: 'SEGUNDOS', value: timeLeft.seconds }
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center bg-card border border-border rounded-xl p-4 shadow-inner relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter tabular-nums leading-none mb-2">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] md:text-xs font-heading font-bold uppercase text-primary tracking-widest">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-sm text-muted-foreground">Vagas limitadas por etapa. Garanta seu lugar no grid.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NextRaceSection;
