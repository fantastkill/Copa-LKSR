import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Check, Eye, EyeOff, Pencil, Save, Trash2, X } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatLapTime, parseLapTimeToSeconds } from '@/lib/lapTime';
import AdminMeetingRegistrationTab from '@/components/AdminMeetingRegistrationTab.jsx';

const EMPTY_FORM = { id: '', pilot_id: '', position_label: '', mv: '', kart_number_snapshot: '' };

const AdminDashboard = () => {
  const { currentAdmin } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [championships, setChampionships] = useState([]);
  const [rankingEntries, setRankingEntries] = useState([]);
  const [selectedChampionship, setSelectedChampionship] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('PRO');
  const [rankingForm, setRankingForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [savingRanking, setSavingRanking] = useState(false);

  const pilotsByCategory = useMemo(
    () => pilots.filter((pilot) => pilot.category === selectedCategory),
    [pilots, selectedCategory]
  );

  const fetchBaseData = async () => {
    setLoading(true);
    try {
      const [regs, pils, champs] = await Promise.all([
        pb.collection('pilot_registrations').getFullList({ sort: '-created', $autoCancel: false }),
        pb.collection('pilots').getFullList({ sort: '-created', $autoCancel: false }),
        pb.collection('championships').getFullList({ sort: '-event_date', $autoCancel: false })
      ]);

      setRegistrations(regs);
      setPilots(pils);
      setChampionships(champs);
      if (!selectedChampionship && champs.length > 0) {
        setSelectedChampionship(champs[0].id);
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar painel.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRanking = async (championshipId, category) => {
    if (!championshipId) return;
    try {
      const entries = await pb.collection('ranking_entries').getFullList({
        filter: `championship_id = "${championshipId}" && category = "${category}"`,
        sort: 'position_label',
        expand: 'pilot_id',
        $autoCancel: false
      });
      setRankingEntries(entries);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar ranking.');
    }
  };

  useEffect(() => {
    fetchBaseData();
  }, []);

  useEffect(() => {
    if (selectedChampionship) fetchRanking(selectedChampionship, selectedCategory);
  }, [selectedChampionship, selectedCategory]);

  const getNextKartNumber = async (category) => {
    const existing = await pb.collection('pilots').getFullList({
      filter: `category = "${category}"`,
      sort: '-kart_number',
      $autoCancel: false
    });
    const used = new Set(existing.map((pilot) => Number(pilot.kart_number)).filter(Number.isFinite));
    for (let i = 1; i <= 999; i += 1) if (!used.has(i)) return i;
    throw new Error('Sem numero de kart livre.');
  };

  const approveRegistration = async (reg) => {
    try {
      const kart = await getNextKartNumber(reg.category || 'PRO');
      await pb.collection('pilots').create(
        {
          full_name: reg.full_name,
          display_name: reg.display_name,
          category: reg.category,
          city: reg.city,
          instagram: reg.instagram,
          bio: reg.bio,
          avatar_url: reg.avatar_url,
          kart_number: kart,
          status: 'approved',
          slug: `${(reg.display_name || reg.full_name || 'piloto').toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
        },
        { $autoCancel: false }
      );
      await pb.collection('pilot_registrations').update(reg.id, { status: 'approved' }, { $autoCancel: false });
      toast.success(`Aprovado com kart #${kart}.`);
      fetchBaseData();
      fetchRanking(selectedChampionship, selectedCategory);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao aprovar cadastro.');
    }
  };

  const rejectRegistration = async (id) => {
    await pb.collection('pilot_registrations').update(id, { status: 'rejected' }, { $autoCancel: false });
    fetchBaseData();
  };

  const togglePilotStatus = async (pilot) => {
    try {
      await pb.collection('pilots').update(
        pilot.id,
        { status: pilot.status === 'approved' ? 'hidden' : 'approved' },
        { $autoCancel: false }
      );
      fetchBaseData();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar status do piloto.');
    }
  };

  const saveRankingEntry = async (e) => {
    e.preventDefault();
    if (!rankingForm.pilot_id || !rankingForm.position_label || !selectedChampionship) {
      toast.error('Preencha piloto, posicao e campeonato.');
      return;
    }

    const mv = rankingForm.mv.trim() ? parseLapTimeToSeconds(rankingForm.mv.trim()) : null;
    if (rankingForm.mv.trim() && mv === null) {
      toast.error('MV invalida. Use mm:ss.mmm ou segundos.');
      return;
    }

    const selectedPilot = pilots.find((p) => p.id === rankingForm.pilot_id);
    const payload = {
      championship_id: selectedChampionship,
      category: selectedCategory,
      pilot_id: rankingForm.pilot_id,
      position_label: rankingForm.position_label.trim(),
      mv,
      kart_number_snapshot:
        rankingForm.kart_number_snapshot !== '' ? Number(rankingForm.kart_number_snapshot) : selectedPilot?.kart_number ?? null
    };

    setSavingRanking(true);
    try {
      if (rankingForm.id) {
        await pb.collection('ranking_entries').update(rankingForm.id, payload, { $autoCancel: false });
      } else {
        await pb.collection('ranking_entries').create(payload, { $autoCancel: false });
      }
      setRankingForm(EMPTY_FORM);
      fetchRanking(selectedChampionship, selectedCategory);
      toast.success('Ranking salvo.');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar ranking.');
    } finally {
      setSavingRanking(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-background" />;

  return (
    <>
      <Helmet><title>Admin Dashboard - COPA LSKR</title></Helmet>
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">ADMIN DASHBOARD</h1>
          <p className="text-sm text-muted-foreground">Logado como: {currentAdmin?.email}</p>

          <Tabs defaultValue="cadastros" className="space-y-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="cadastros">Cadastros</TabsTrigger>
              <TabsTrigger value="pilotos">Pilotos</TabsTrigger>
              <TabsTrigger value="ranking">Ranking</TabsTrigger>
              <TabsTrigger value="reuniao">Reuniao</TabsTrigger>
            </TabsList>

            <TabsContent value="cadastros">
              <Card><CardHeader><CardTitle>Pendentes</CardTitle></CardHeader><CardContent className="space-y-3">
                {registrations.filter((reg) => reg.status === 'pending').map((reg) => (
                  <div key={reg.id} className="border border-border rounded p-3">
                    <p className="font-semibold">{reg.display_name} <Badge variant="outline">{reg.category}</Badge></p>
                    <p className="text-sm text-muted-foreground">{reg.full_name}</p>
                    <p className="text-sm text-muted-foreground">{reg.email}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" onClick={() => approveRegistration(reg)}><Check className="w-4 h-4 mr-1" />Aprovar</Button>
                      <Button size="sm" variant="outline" onClick={() => rejectRegistration(reg.id)}><X className="w-4 h-4 mr-1" />Rejeitar</Button>
                    </div>
                  </div>
                ))}
              </CardContent></Card>
            </TabsContent>

            <TabsContent value="pilotos">
              <Card><CardHeader><CardTitle>Pilotos Aprovados</CardTitle></CardHeader><CardContent className="space-y-3">
                {pilots.map((pilot) => (
                  <div key={pilot.id} className="border border-border rounded p-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">#{pilot.kart_number} {pilot.display_name}</p>
                      <p className="text-sm text-muted-foreground">{pilot.category}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => togglePilotStatus(pilot)}>
                      {pilot.status === 'approved' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </CardContent></Card>
            </TabsContent>

            <TabsContent value="ranking">
              <Card><CardHeader><CardTitle>Cadastro de MV e Posicoes</CardTitle></CardHeader><CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div><Label>Campeonato</Label><Select value={selectedChampionship} onValueChange={setSelectedChampionship}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{championships.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent></Select></div>
                  <div><Label>Categoria</Label><Select value={selectedCategory} onValueChange={setSelectedCategory}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="PRO">PRO</SelectItem><SelectItem value="LIGHT">LIGHT</SelectItem></SelectContent></Select></div>
                </div>

                <form onSubmit={saveRankingEntry} className="grid md:grid-cols-2 gap-3 border border-border rounded p-3">
                  <div><Label>Piloto</Label><Select value={rankingForm.pilot_id} onValueChange={(value) => setRankingForm((prev) => ({ ...prev, pilot_id: value }))}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{pilotsByCategory.map((pilot) => <SelectItem key={pilot.id} value={pilot.id}>#{pilot.kart_number} - {pilot.display_name}</SelectItem>)}</SelectContent></Select></div>
                  <div><Label>Posicao</Label><Input value={rankingForm.position_label} onChange={(e) => setRankingForm((prev) => ({ ...prev, position_label: e.target.value }))} placeholder="1" /></div>
                  <div><Label>MV</Label><Input value={rankingForm.mv} onChange={(e) => setRankingForm((prev) => ({ ...prev, mv: e.target.value }))} placeholder="01:10.345" /></div>
                  <div><Label>Kart snapshot</Label><Input type="number" value={rankingForm.kart_number_snapshot} onChange={(e) => setRankingForm((prev) => ({ ...prev, kart_number_snapshot: e.target.value }))} placeholder="27" /></div>
                  <div className="md:col-span-2 flex gap-2">
                    <Button type="submit" disabled={savingRanking}><Save className="w-4 h-4 mr-1" />Salvar</Button>
                    {rankingForm.id && <Button type="button" variant="outline" onClick={() => setRankingForm(EMPTY_FORM)}>Cancelar edicao</Button>}
                  </div>
                </form>

                <div className="overflow-x-auto border border-border rounded">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead><tr className="border-b border-border"><th className="p-3 text-left">POS</th><th className="p-3 text-left">#</th><th className="p-3 text-left">Piloto</th><th className="p-3 text-left">MV</th><th className="p-3 text-left">Acoes</th></tr></thead>
                    <tbody>
                      {rankingEntries.map((entry) => (
                        <tr key={entry.id} className="border-b border-border/60">
                          <td className="p-3">{entry.position_label}</td>
                          <td className="p-3">#{entry.kart_number_snapshot || entry.expand?.pilot_id?.kart_number || '-'}</td>
                          <td className="p-3">{entry.expand?.pilot_id?.display_name || '-'}</td>
                          <td className="p-3">{formatLapTime(entry.mv)}</td>
                          <td className="p-3 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setRankingForm({ id: entry.id, pilot_id: entry.pilot_id, position_label: entry.position_label || '', mv: formatLapTime(entry.mv), kart_number_snapshot: entry.kart_number_snapshot || '' })}><Pencil className="w-4 h-4" /></Button>
                            <Button size="sm" variant="destructive" onClick={() => pb.collection('ranking_entries').delete(entry.id, { $autoCancel: false }).then(() => fetchRanking(selectedChampionship, selectedCategory))}><Trash2 className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent></Card>
            </TabsContent>

            <TabsContent value="reuniao">
              <AdminMeetingRegistrationTab
                approveRegistration={approveRegistration}
                onAfterCreate={fetchBaseData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
