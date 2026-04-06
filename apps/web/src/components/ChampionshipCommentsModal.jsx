
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, MessageSquare, Clock } from 'lucide-react';
import { toast } from "sonner";
import pb from '@/lib/pocketbaseClient';
import { getVisitorFingerprint } from '@/lib/fingerprint';

const ChampionshipCommentsModal = ({ isOpen, onClose, championshipId, championshipTitle }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ author_name: '', comment_text: '' });
  
  const visitorFp = getVisitorFingerprint();

  useEffect(() => {
    if (isOpen && championshipId) {
      fetchComments();
    }
  }, [isOpen, championshipId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('championship_comments').getList(1, 100, {
        filter: `championship_id="${championshipId}" && status="approved"`,
        sort: '-created',
        $autoCancel: false
      });
      setComments(records.items);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Não foi possível carregar os comentários.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.comment_text.trim()) return;

    setSubmitting(true);
    try {
      await pb.collection('championship_comments').create({
        championship_id: championshipId,
        author_name: formData.author_name.trim() || 'Anônimo',
        comment_text: formData.comment_text.trim(),
        visitor_fingerprint: visitorFp,
        status: 'pending'
      }, { $autoCancel: false });

      toast.success('Comentário enviado! Aguardando aprovação da moderação.');
      setFormData({ author_name: '', comment_text: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Erro ao enviar comentário. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await pb.collection('championship_comments').delete(commentId, { $autoCancel: false });
      setComments(comments.filter(c => c.id !== commentId));
      toast.success('Comentário removido.');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Erro ao remover comentário.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border text-foreground max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="f1-subtitle text-2xl text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            Comentários
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {championshipTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 my-4 hide-scrollbar">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-background/50 rounded-lg border border-border/50">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Nenhum comentário ainda.</p>
              <p className="text-sm">Seja o primeiro a comentar!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-background/80 border border-border rounded-lg p-4 relative group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm uppercase">
                      {comment.author_name.substring(0, 2)}
                    </div>
                    <div>
                      <span className="font-bold text-white text-sm block">{comment.author_name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDate(comment.created)}
                      </span>
                    </div>
                  </div>
                  {comment.visitor_fingerprint === visitorFp && (
                    <button 
                      onClick={() => handleDelete(comment.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 opacity-0 group-hover:opacity-100"
                      title="Excluir meu comentário"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed mt-2">
                  {comment.comment_text}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-border mt-auto">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder="Seu nome (opcional)"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              className="bg-background border-border focus-visible:ring-primary text-white"
              maxLength={50}
            />
            <Textarea
              placeholder="Deixe seu comentário..."
              value={formData.comment_text}
              onChange={(e) => setFormData({ ...formData, comment_text: e.target.value })}
              className="bg-background border-border focus-visible:ring-primary text-white resize-none h-20"
              required
              maxLength={500}
            />
            <Button 
              type="submit" 
              disabled={submitting || !formData.comment_text.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-bold tracking-widest uppercase"
            >
              {submitting ? 'Enviando...' : 'Enviar Comentário'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChampionshipCommentsModal;
