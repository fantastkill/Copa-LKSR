import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePilotAuth } from '@/contexts/PilotAuthContext.jsx';
import { readPilotAccounts } from '@/lib/pilotLocalStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  team: '',
  category: 'PRO',
  city: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false
};

const CadastroPilotoPage = () => {
  const navigate = useNavigate();
  const { registerPilot } = usePilotAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [registeredPilot, setRegisteredPilot] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const registeredPilots = useMemo(() => {
    return readPilotAccounts().slice().reverse();
  }, [refreshIndex]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const pilot = await registerPilot(formData);
      setRegisteredPilot(pilot);
      setFormData(INITIAL_FORM);
      setRefreshIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Cadastro realizado com sucesso.');
    } catch (error) {
      toast.error(error?.message || 'Nao foi possivel finalizar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cadastro de Piloto - COPA LSKR</title>
        <meta
          name="description"
          content="Cadastre-se na COPA LSKR com nome, contato e dados de piloto para acesso ao perfil."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />

        <main className="flex-1 pt-28 pb-16 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight">Cadastro de Piloto</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Preencha os dados para criar seu acesso. Seu cadastro fica disponivel para validacao da organizacao.
              </p>
            </div>

            {registeredPilot ? (
              <Card className="border-primary/40 bg-primary/5">
                <CardContent className="pt-6 space-y-3">
                  <p className="text-sm text-muted-foreground">Cadastro realizado para:</p>
                  <p className="text-xl font-semibold">{registeredPilot.fullName || registeredPilot.displayName}</p>
                  <p className="text-sm text-muted-foreground">
                    Cadastro realizado com sucesso. Seu perfil ja esta disponivel para acesso inicial controlado.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button onClick={() => navigate('/login')}>Ir para Login</Button>
                    <Button variant="outline" onClick={() => setRegisteredPilot(null)}>
                      Realizar novo cadastro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <Card>
              <CardHeader>
                <CardTitle>Formulario de cadastro</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName">Nome completo *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={onInputChange}
                      placeholder="Ex: Luis Ferrari"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onInputChange}
                        placeholder="piloto@copalskr.com.br"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={onInputChange}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="team">Equipe</Label>
                      <Input
                        id="team"
                        name="team"
                        value={formData.team}
                        onChange={onInputChange}
                        placeholder="Ex: Ferrari Racing"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria *</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={onInputChange}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                        required
                      >
                        <option value="PRO">PRO</option>
                        <option value="LIGHT">LIGHT</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={onInputChange}
                        placeholder="Ex: Sao Paulo"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Senha *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={onInputChange}
                        minLength={6}
                        placeholder="Minimo 6 caracteres"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar senha *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={onInputChange}
                        minLength={6}
                        placeholder="Repita a senha"
                        required
                      />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground rounded-md border border-border p-3 bg-card/60">
                    Seu cadastro sera recebido e ficara disponivel para validacao da organizacao.
                  </p>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="acceptedTerms"
                      checked={formData.acceptedTerms}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptedTerms: checked === true }))}
                    />
                    <Label htmlFor="acceptedTerms" className="text-sm leading-relaxed cursor-pointer">
                      Confirmo que os dados informados estao corretos e autorizo o uso para a organizacao da COPA LSKR.
                    </Label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" disabled={loading} className="sm:flex-1" size="lg">
                      {loading ? 'Enviando cadastro...' : 'Cadastrar Piloto'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate('/login')} className="sm:flex-1">
                      Ja tenho cadastro
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pilotos cadastrados recentemente</CardTitle>
              </CardHeader>
              <CardContent>
                {registeredPilots.length === 0 ? (
                  <p className="text-muted-foreground">Nenhum cadastro encontrado.</p>
                ) : (
                  <ul className="space-y-2">
                    {registeredPilots.slice(0, 8).map((pilot) => (
                      <li
                        key={pilot.id}
                        className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2"
                      >
                        <div>
                          <p className="font-medium">{pilot.fullName || pilot.displayName}</p>
                          <p className="text-xs text-muted-foreground">
                            {pilot.category} - {pilot.city || 'Sem cidade'}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{pilot.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CadastroPilotoPage;
