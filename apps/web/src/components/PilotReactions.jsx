
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';

const reactions = [
  { type: 'apoio', emoji: '👏', label: 'Apoio' },
  { type: 'fogo', emoji: '🔥', label: 'Fogo' },
  { type: 'parabens', emoji: '🎉', label: 'Parabéns' },
  { type: 'torcida', emoji: '📣', label: 'Torcida' }
];

const PilotReactions = ({ pilotId }) => {
  const [counts, setCounts] = useState({ apoio: 0, fogo: 0, parabens: 0, torcida: 0 });
  const [userReaction, setUserReaction] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFingerprint = () => {
    return localStorage.getItem('visitor_fp') || `fp_${Date.now()}_${Math.random()}`;
  };

  useEffect(() => {
    const fp = getFingerprint();
    localStorage.setItem('visitor_fp', fp);

    const fetchReactions = async () => {
      try {
        const allReactions = await pb.collection('pilot_reactions').getFullList({
          filter: `pilot_id = "${pilotId}"`,
          $autoCancel: false
        });

        const newCounts = { apoio: 0, fogo: 0, parabens: 0, torcida: 0 };
        allReactions.forEach(r => {
          newCounts[r.reaction_type]++;
          if (r.visitor_fingerprint === fp) {
            setUserReaction(r.reaction_type);
          }
        });
        setCounts(newCounts);
      } catch (err) {
        console.error('Error fetching reactions:', err);
      }
    };

    fetchReactions();
  }, [pilotId]);

  const handleReaction = async (type) => {
    if (loading || userReaction) return;

    setLoading(true);
    const fp = getFingerprint();

    try {
      await pb.collection('pilot_reactions').create({
        pilot_id: pilotId,
        reaction_type: type,
        visitor_fingerprint: fp
      }, { $autoCancel: false });

      setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReaction(type);
    } catch (err) {
      console.error('Error adding reaction:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map(({ type, emoji, label }) => (
        <Button
          key={type}
          onClick={() => handleReaction(type)}
          disabled={userReaction !== null || loading}
          variant={userReaction === type ? "default" : "outline"}
          className="gap-2 transition-all duration-200"
        >
          <span className="text-lg">{emoji}</span>
          <span className="text-sm">{counts[type]}</span>
        </Button>
      ))}
    </div>
  );
};

export default PilotReactions;
