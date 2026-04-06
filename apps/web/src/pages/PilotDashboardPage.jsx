import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Edit3, LogOut, Medal, Save, UserCheck, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePilotAuth } from '@/contexts/PilotAuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const PilotDashboardPage = () => {
  const navigate = useNavigate();
  const { currentPilot, logoutPilot, updatePilotProfile } = usePilotAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    email: '',
    phone: '',
    team: '',
    category: 'PRO',
    city: '',
    avatarUrl: ''
  });

  useEffect(() => {
    if (!currentPilot) return;
    setAvatarError(false);
    setFormData({
      fullName: currentPilot.fullName || '',
      displayName: currentPilot.displayName || currentPilot.name || '',
      email: currentPilot.email || '',
      phone: currentPilot.phone || '',
      team: currentPilot.team || '',
      category: currentPilot.category || 'PRO',
      city: currentPilot.city || '',
      avatarUrl: currentPilot.avatarUrl || ''
    });
  }, [currentPilot]);

  const initials = useMemo(() => {
    const source = formData.displayName || formData.fullName || 'Piloto';
    const letters = source
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
    return letters || 'PL';
  }, [formData.displayName, formData.fullName]);

  const handleLogout = () => {
    logoutPilot();
    navigate('/login');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePilotProfile(formData);
      toast.success('Perfil atualizado com sucesso.');
      setIsEditing(false);
      setAvatarError(false);
    } catch (error) {
      toast.error(error?.message || 'Nao foi possivel atualizar o perfil.');
    } finally {
      setSaving(false);
    }
  };

  const showAvatar = Boolean(formData.avatarUrl) && !avatarError;

  return (
    <>
      <Helmet>
        <title>Perfil do Piloto - COPA LSKR</title>
        <meta name="description" content="Perfil do piloto com dados de cadastro e status na COPA LSKR." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />

        <main className="flex-1 px-4 py-28">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <UserCheck className="w-7 h-7 text-primary" />
                  Perfil do Piloto
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-24 h-24 rounded-full border-2 border-primary/50 bg-card overflow-hidden flex items-center justify-center text-2xl font-bold">
                    {showAvatar ? (
                      <img
                        src={formData.avatarUrl}
                        alt={formData.displayName || 'Piloto'}
                        className="w-full h-full object-cover"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Piloto autenticado</p>
                    <p className="text-2xl font-semibold">{currentPilot?.displayName || currentPilot?.name || '-'}</p>
                    <p className="text-sm text-muted-foreground">Status: {currentPilot?.status || 'Cadastro recebido'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-border rounded-md p-4 bg-card">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Pontuacao</p>
                    <p className="text-2xl font-bold">{currentPilot?.points ?? 0}</p>
                  </div>
                  <div className="border border-border rounded-md p-4 bg-card">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Posicao no ranking</p>
                    <p className="text-2xl font-bold">{currentPilot?.rankingPosition ? `${currentPilot.rankingPosition}o` : '-'}</p>
                  </div>
                  <div className="border border-border rounded-md p-4 bg-card">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Categoria</p>
                    <p className="text-2xl font-bold">{currentPilot?.category || 'PRO'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-border rounded-lg p-4">
                  <div>
                    <Label htmlFor="fullName">Nome completo</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      disabled={!isEditing}
                      onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="displayName">Nome de piloto</Label>
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      disabled={!isEditing}
                      onChange={(event) => setFormData((prev) => ({ ...prev, displayName: event.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled={!isEditing}
                      onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      disabled={!isEditing}
                      onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="team">Equipe</Label>
                    <Input
                      id="team"
                      value={formData.team}
                      disabled={!isEditing}
                      onChange={(event) => setFormData((prev) => ({ ...prev, team: event.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      disabled={!isEditing}
                      onChange={(event) => setFormData((prev) => ({ ...prev, city: event.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="avatarUrl">Foto (URL)</Label>
                    <Input
                      id="avatarUrl"
                      value={formData.avatarUrl}
                      disabled={!isEditing}
                      onChange={(event) => {
                        setAvatarError(false);
                        setFormData((prev) => ({ ...prev, avatarUrl: event.target.value }));
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Input id="category" value={formData.category} disabled />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} disabled={saving} className="sm:flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? 'Salvando...' : 'Salvar perfil'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={saving}
                        className="sm:flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} className="sm:flex-1">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar perfil
                    </Button>
                  )}

                  <Button variant="outline" onClick={() => navigate('/ranking')} className="sm:flex-1">
                    <Medal className="w-4 h-4 mr-2" />
                    Ver ranking
                  </Button>

                  <Button variant="destructive" onClick={handleLogout} className="sm:flex-1">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PilotDashboardPage;
