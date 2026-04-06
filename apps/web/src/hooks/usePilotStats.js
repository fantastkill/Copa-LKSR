
import { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

export const usePilotStats = (pilotId) => {
  const [stats, setStats] = useState({
    likes: 0,
    reactions: { apoio: 0, fogo: 0, parabens: 0, torcida: 0 },
    comments: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!pilotId) return;

    const fetchStats = async () => {
      try {
        const [likes, reactions, comments] = await Promise.all([
          pb.collection('pilot_likes').getFullList({
            filter: `pilot_id = "${pilotId}"`,
            $autoCancel: false
          }),
          pb.collection('pilot_reactions').getFullList({
            filter: `pilot_id = "${pilotId}"`,
            $autoCancel: false
          }),
          pb.collection('pilot_comments').getFullList({
            filter: `pilot_id = "${pilotId}" && status = "approved"`,
            sort: '-created',
            $autoCancel: false
          })
        ]);

        const reactionCounts = {
          apoio: reactions.filter(r => r.reaction_type === 'apoio').length,
          fogo: reactions.filter(r => r.reaction_type === 'fogo').length,
          parabens: reactions.filter(r => r.reaction_type === 'parabens').length,
          torcida: reactions.filter(r => r.reaction_type === 'torcida').length
        };

        setStats({
          likes: likes.length,
          reactions: reactionCounts,
          comments,
          loading: false,
          error: null
        });
      } catch (err) {
        setStats(prev => ({ ...prev, loading: false, error: err.message }));
      }
    };

    fetchStats();
  }, [pilotId]);

  return stats;
};
