
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';

const PilotLikes = ({ pilotId }) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFingerprint = () => {
    return localStorage.getItem('visitor_fp') || `fp_${Date.now()}_${Math.random()}`;
  };

  useEffect(() => {
    const fp = getFingerprint();
    localStorage.setItem('visitor_fp', fp);

    const fetchLikes = async () => {
      try {
        const allLikes = await pb.collection('pilot_likes').getFullList({
          filter: `pilot_id = "${pilotId}"`,
          $autoCancel: false
        });
        setLikes(allLikes.length);
        setHasLiked(allLikes.some(like => like.visitor_fingerprint === fp));
      } catch (err) {
        console.error('Error fetching likes:', err);
      }
    };

    fetchLikes();
  }, [pilotId]);

  const handleLike = async () => {
    if (loading || hasLiked) return;

    setLoading(true);
    const fp = getFingerprint();

    try {
      await pb.collection('pilot_likes').create({
        pilot_id: pilotId,
        visitor_fingerprint: fp
      }, { $autoCancel: false });

      setLikes(prev => prev + 1);
      setHasLiked(true);
    } catch (err) {
      console.error('Error liking pilot:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      disabled={hasLiked || loading}
      variant={hasLiked ? "default" : "outline"}
      className="gap-2 transition-all duration-200"
    >
      <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
      <span>{likes}</span>
    </Button>
  );
};

export default PilotLikes;
