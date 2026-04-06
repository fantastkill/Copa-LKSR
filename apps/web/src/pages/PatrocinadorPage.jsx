import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DEMO_SPONSORS } from '@/data/presentationData';

const PatrocinadorPage = () => {
  const sponsors = useMemo(
    () => [...DEMO_SPONSORS].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)),
    []
  );

  const founderSponsor = sponsors.find((sponsor) => sponsor.sponsor_type === 'founder') || sponsors[0];

  return (
    <>
      <Helmet>
        <title>Patrocinadores - COPA LSKR</title>
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <Header />

        <main className="flex-1 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-[#999999] text-sm uppercase tracking-widest font-bold mb-4">Patrocinador fundador</span>

              <h1 className="text-5xl md:text-7xl font-bold text-white font-mono-title uppercase tracking-tighter mb-6">
                {founderSponsor?.company_name || 'COPA LSKR'}
              </h1>

              <p className="text-xl text-[#999999] max-w-2xl mx-auto mb-10 leading-relaxed">
                {founderSponsor?.description || 'Parceiros que constroem cada etapa da temporada.'}
              </p>

              <a
                href={founderSponsor?.website_url || 'mailto:contato@copalskr.com.br'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-[#333333] hover:border-white hover:bg-[#111111] text-white px-8 py-4 rounded-md uppercase tracking-widest text-sm font-bold transition-all duration-300"
              >
                Conhecer parceria
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="w-full mt-16 rounded-2xl overflow-hidden border border-[#333333] relative aspect-[21/9]">
                <img
                  src={
                    founderSponsor?.banner_url ||
                    'https://images.unsplash.com/photo-1511910849309-0f63c0e10d26?q=80&w=1400&auto=format&fit=crop'
                  }
                  alt="Patrocinador fundador"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {sponsors.map((sponsor) => (
                <article key={sponsor.id} className="border border-[#333333] bg-[#111111] rounded-2xl p-8">
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">
                    {sponsor.sponsor_type === 'founder'
                      ? 'Fundador'
                      : sponsor.sponsor_type === 'premium'
                        ? 'Premium'
                        : 'Apoiador'}
                  </p>
                  <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">{sponsor.company_name}</h2>
                  <p className="text-[#999999] mb-5">{sponsor.description}</p>
                  <a
                    href={sponsor.website_url || 'mailto:contato@copalskr.com.br'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                  >
                    Conhecer a marca
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </article>
              ))}
            </div>

            <div className="border border-[#333333] bg-[#111111] rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white font-mono-title uppercase tracking-tight mb-4">
                Quero ser patrocinador
              </h2>
              <p className="text-[#999999] mb-8 max-w-xl mx-auto">
                Associe sua marca ao campeonato e fale com a organizacao para receber o plano de cotas.
              </p>
              <a
                href="mailto:contato@copalskr.com.br?subject=Interesse%20em%20patrocinar%20a%20COPA%20LSKR"
                className="inline-block bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-md uppercase tracking-widest text-sm font-bold transition-colors duration-300"
              >
                Falar com a organizacao
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PatrocinadorPage;
