import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PilotCard from '@/components/PilotCard';
import PilotDetailModal from '@/components/PilotDetailModal';
import { DEMO_PILOTS, getPilotsByCategory } from '@/data/presentationData';
import {
  PILOT_ACCOUNTS_UPDATED_EVENT,
  mapLocalAccountToPilot,
  readPilotAccounts
} from '@/lib/pilotLocalStore';

const mergePilots = (basePilots, localPilots) => {
  const byKey = new Map();

  [...basePilots, ...localPilots].forEach((pilot) => {
    const key = String(pilot.display_name || pilot.full_name || pilot.id).trim().toLowerCase();
    if (!key) return;

    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, pilot);
      return;
    }

    const merged = {
      ...existing,
      ...pilot,
      points: Math.max(existing.points || 0, pilot.points || 0),
      final_position: existing.final_position || pilot.final_position
    };

    byKey.set(key, merged);
  });

  return [...byKey.values()];
};

const PilotosPage = () => {
  const [selectedPilot, setSelectedPilot] = useState(null);
  const [category, setCategory] = useState('PRO');
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const onAccountsUpdated = () => setRefreshIndex((prev) => prev + 1);
    window.addEventListener(PILOT_ACCOUNTS_UPDATED_EVENT, onAccountsUpdated);
    return () => window.removeEventListener(PILOT_ACCOUNTS_UPDATED_EVENT, onAccountsUpdated);
  }, []);

  const pilots = useMemo(() => {

    const base = getPilotsByCategory(category);
    const local = readPilotAccounts()
      .filter((account) => account.category === category)
      .map(mapLocalAccountToPilot);

    return mergePilots(base, local).sort((a, b) => {
      const pointsA = Number(a.points || 0);
      const pointsB = Number(b.points || 0);
      if (pointsA !== pointsB) return pointsB - pointsA;

      const posA = Number(a.final_position || 9999);
      const posB = Number(b.final_position || 9999);
      return posA - posB;
    });
  }, [category, refreshIndex]);

  return (
    <>
      <Helmet>
        <title>Grid de Pilotos - COPA LSKR</title>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />

        <main className="flex-1 py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter">
                GRID DE PILOTOS
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">Conheca os pilotos ativos da temporada.</p>
            </div>

            <div className="flex gap-2 bg-card p-1 rounded-lg border border-border w-fit mb-8">
              <button
                className={`px-6 py-2 rounded-md text-sm font-bold tracking-wider uppercase transition-colors ${
                  category === 'PRO' ? 'bg-white text-black' : 'text-muted-foreground hover:text-white'
                }`}
                onClick={() => setCategory('PRO')}
              >
                PRO
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-bold tracking-wider uppercase transition-colors ${
                  category === 'LIGHT' ? 'bg-white text-black' : 'text-muted-foreground hover:text-white'
                }`}
                onClick={() => setCategory('LIGHT')}
              >
                LIGHT
              </button>
            </div>

            {pilots.length === 0 ? (
              <div className="text-center py-20 border border-border bg-card rounded-xl">
                <p className="text-muted-foreground text-lg">Nenhum piloto encontrado na categoria {category}.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pilots.map((pilot, index) => (
                  <PilotCard
                    key={pilot.id}
                    pilot={{
                      name: pilot.display_name || pilot.full_name,
                      best_lap: pilot.best_lap,
                      category: pilot.category,
                      city: pilot.city,
                      instagram: pilot.instagram,
                      bio: pilot.bio,
                      team: pilot.team,
                      points: pilot.points,
                      avatar_url: pilot.avatar_url
                    }}
                    position={pilot.final_position || index + 1}
                    onClick={() => setSelectedPilot(pilot)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <PilotDetailModal
          pilot={selectedPilot}
          open={!!selectedPilot}
          onClose={() => setSelectedPilot(null)}
        />

        <Footer />
      </div>
    </>
  );
};

export default PilotosPage;
