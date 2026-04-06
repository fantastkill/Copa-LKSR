
import React, { useState } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const PilotComments = ({ pilotId, comments }) => {
  const [formData, setFormData] = useState({ author_name: '', city: '', comment_text: '' });
  const [loading, setLoading] = useState(false);

  const getFingerprint = () => {
    return localStorage.getItem('visitor_fp') || `fp_${Date.now()}_${Math.random()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.author_name.trim() || !formData.comment_text.trim()) {
      toast.error('Preencha nome e comentário');
      return;
    }

    setLoading(true);
    const fp = getFingerprint();
    localStorage.setItem('visitor_fp', fp);

    try {
      await pb.collection('pilot_comments').create({
        pilot_id: pilotId,
        author_name: formData.author_name,
        city: formData.city,
        comment_text: formData.comment_text,
        visitor_fingerprint: fp,
        status: 'pending'
      }, { $autoCancel: false });

      toast.success('Comentário enviado para moderação');
      setFormData({ author_name: '', city: '', comment_text: '' });
    } catch (err) {
      toast.error('Erro ao enviar comentário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg border border-border">
        <div>
          <Label htmlFor="author_name">Nome</Label>
          <Input
            id="author_name"
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            placeholder="Seu nome"
            required
          />
        </div>
        <div>
          <Label htmlFor="city">Cidade (opcional)</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Sua cidade"
          />
        </div>
        <div>
          <Label htmlFor="comment_text">Comentário</Label>
          <Textarea
            id="comment_text"
            value={formData.comment_text}
            onChange={(e) => setFormData({ ...formData, comment_text: e.target.value })}
            placeholder="Deixe seu comentário"
            rows={4}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Enviando...' : 'Enviar Comentário'}
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Comentários ({comments.length})</h3>
        {comments.length === 0 ? (
          <p className="text-muted text-center py-8">Nenhum comentário ainda. Seja o primeiro a comentar</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{comment.author_name}</p>
                  {comment.city && <p className="text-sm text-muted">{comment.city}</p>}
                </div>
                <span className="text-xs text-muted">
                  {new Date(comment.created).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="text-foreground">{comment.comment_text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PilotComments;
