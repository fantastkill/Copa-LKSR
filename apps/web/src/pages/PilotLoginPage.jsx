import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LogIn } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePilotAuth } from '@/contexts/PilotAuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const PilotLoginPage = () => {
  const navigate = useNavigate();
  const { loginPilot } = usePilotAuth();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await loginPilot(formData.identifier, formData.password);
      toast.success('Login realizado com sucesso.');
      navigate('/piloto/dashboard');
    } catch (error) {
      toast.error(error?.message || 'Nao foi possivel entrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login do Piloto - COPA LSKR</title>
        <meta name="description" content="Acesse seu perfil da COPA LSKR com e-mail ou nome de piloto e senha." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-28">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-2xl">L</span>
              </div>
              <CardTitle className="text-2xl font-bold" style={{ fontFamily: 'Space Mono, monospace' }}>
                LOGIN DO PILOTO
              </CardTitle>
              <p className="text-sm text-muted-foreground">Entre com seu e-mail ou nome de piloto.</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="identifier">E-mail ou nome de piloto</Label>
                  <Input
                    id="identifier"
                    type="text"
                    value={formData.identifier}
                    onChange={(event) => setFormData((prev) => ({ ...prev, identifier: event.target.value }))}
                    required
                    placeholder="Ex: luis@copalskr.com.br ou Luis Ferrari"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                    required
                    placeholder="Sua senha"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  {loading ? 'Entrando...' : 'Entrar no perfil'}
                </Button>

                <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/cadastro')}>
                  Ainda nao tenho cadastro
                </Button>
              </form>

              <div className="mt-6 rounded-md border border-border bg-card p-3">
                <p className="text-xs text-muted-foreground">
                  Acesso demo disponivel para apresentacao com dados de piloto persistidos no navegador.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PilotLoginPage;
