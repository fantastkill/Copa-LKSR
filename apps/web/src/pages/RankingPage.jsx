import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChampionshipCard from '@/components/ChampionshipCard';
import { exportRankingToPDF } from '@/hooks/PDFExport';
import { DEMO_CHAMPIONSHIPS, getRankingsByCategory } from '@/data/presentationData';

const RankingPage = () => {
  const [category, setCategory] = useState('PRO');
  const [isExporting, setIsExporting] = useState(false);

  const rankings = useMemo(() => getRankingsByCategory(category), [category]);
  const selectedChampionship = DEMO_CHAMPIONSHIPS[0] || null;

  const handleExportPDF = async () => {
    if (rankings.length === 0) {
      toast.error('Nenhum dado para exportar nesta categoria.');
      return;
    }

    setIsExporting(true);
    try {
      const rows = rankings.map((entry) => ({
        ...entry,
        expand: {
          pilot_id: {
            display_name: entry.pilot_name,
            kart_number: entry.kart_number_snapshot
          }
        }
      }));
      await exportRankingToPDF(rows, selectedChampionship?.title || 'Ranking', category);
      toast.success('PDF exportado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Classificacao Oficial - COPA LSKR</title>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />

        <main className="flex-1 py-24">
          <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h1 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter mb-12">
                CLASSIFICACAO OFICIAL
              </h1>

              <h2 className="text-xl font-heading font-bold text-white uppercase tracking-tight mb-6">
                Proximas Etapas
              </h2>
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x hide-scrollbar">
                {DEMO_CHAMPIONSHIPS.filter((championship) => championship.status !== 'finished').map((championship) => (
                  <div key={championship.id} className="min-w-[300px] md:min-w-[400px] snap-start">
                    <ChampionshipCard championship={championship} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="flex gap-2 bg-card p-1 rounded-lg border border-border">
                <button
                  className={`px-6 py-2 rounded-md text-sm font-bold tracking-wider uppercase transition-colors ${
                    category === 'PRO' ? 'bg-white text-black' : 'text-muted-foreground hover:text-white'
                  }`}
                  onClick={() => setCategory('PRO')}
                >
                  PRO
                </button>
                <button
                  className={`px-6 py-2 rounded-md text-sm font-bold tracking-wider uppercase transition-colors ${
                    category === 'LIGHT' ? 'bg-white text-black' : 'text-muted-foreground hover:text-white'
                  }`}
                  onClick={() => setCategory('LIGHT')}
                >
                  LIGHT
                </button>
              </div>

              <button
                onClick={handleExportPDF}
                disabled={isExporting || rankings.length === 0}
                className="flex items-center justify-center gap-2 border-2 border-primary bg-transparent text-white hover:bg-primary hover:text-black px-6 py-2 rounded-md uppercase tracking-widest text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isExporting ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isExporting ? 'Exportando...' : 'Exportar PDF'}
              </button>
            </div>

            <div className="border border-border rounded-xl overflow-hidden bg-card shadow-lg">
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                  <thead>
                    <tr>
                      {['POS', '#', 'NOME', 'MV', 'TMV', 'TT', 'DL', 'DA', 'TUV', 'TV', 'VM', 'PTS'].map((column) => (
                        <th
                          key={column}
                          className="text-muted-foreground text-[11px] sm:text-xs font-medium tracking-wider border-b border-border py-4 px-4 uppercase"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.length === 0 ? (
                      <tr>
                        <td colSpan="12" className="text-center py-12 text-muted-foreground">
                          Nenhum ranking disponivel para a categoria {category}.
                        </td>
                      </tr>
                    ) : (
                      rankings.map((entry, index) => {
                        const isFirst = index === 0;
                        const isSecond = index === 1;
                        const isThird = index === 2;

                        let posColor = 'text-foreground';
                        if (isFirst) posColor = 'text-[hsl(var(--gold))]';
                        else if (isSecond) posColor = 'text-[hsl(var(--silver))]';
                        else if (isThird) posColor = 'text-[hsl(var(--bronze))]';

                        return (
                          <tr key={entry.id} className="border-b border-border/50 last:border-0 even:bg-background/50 hover:bg-white/5 transition-colors">
                            <td className={`py-4 px-4 font-heading font-bold text-lg ${posColor}`}>{entry.position_label}</td>
                            <td className="py-4 px-4 font-heading text-muted-foreground">#{entry.kart_number_snapshot}</td>
                            <td className="py-4 px-4 font-bold text-white text-base whitespace-nowrap">{entry.pilot_name}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{entry.mv}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{entry.tmv}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{entry.tt}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{entry.dl}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{entry.da}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{entry.tuv}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{entry.tv}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{entry.vm}</td>
                            <td className="py-4 px-4 whitespace-nowrap font-semibold text-primary">{entry.points}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 border border-border bg-card rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground">
              <p><strong className="text-white">MV</strong> = Numero da melhor volta</p>
              <p><strong className="text-white">TMV</strong> = Tempo da melhor volta</p>
              <p><strong className="text-white">TT</strong> = Tempo total</p>
              <p><strong className="text-white">DL</strong> = Diferenca para o lider</p>
              <p><strong className="text-white">DA</strong> = Diferenca para o anterior</p>
              <p><strong className="text-white">TUV</strong> = Tempo da ultima volta</p>
              <p><strong className="text-white">TV</strong> = Total de voltas</p>
              <p><strong className="text-white">VM</strong> = Velocidade media (km/h)</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RankingPage;
