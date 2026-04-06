import React from 'react';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

const ChampionshipInteractions = ({ championshipId, championshipTitle, shareUrl, className = '' }) => {
  const handleShare = async (event) => {
    event.stopPropagation();

    const targetUrl = shareUrl || `${window.location.origin}/ranking?etapa=${championshipId}`;
    const shareData = {
      title: `COPA LSKR - ${championshipTitle}`,
      text: `Confira o ${championshipTitle} na COPA LSKR!`,
      url: targetUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Link copiado para a area de transferencia.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Nao foi possivel compartilhar agora.');
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={handleShare}
        className="interaction-btn group ml-auto inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <Share2 className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span>Compartilhar</span>
      </button>
    </div>
  );
};

export default ChampionshipInteractions;
