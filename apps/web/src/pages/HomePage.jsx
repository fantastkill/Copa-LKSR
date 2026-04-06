import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NextRaceSection from '@/components/NextRaceSection';
import ChampionshipGrid from '@/components/ChampionshipGrid';
import RankingSection from '@/components/RankingSection';
import SponsorsSection from '@/components/SponsorsSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>COPA LSKR | Plataforma Oficial</title>
        <meta
          name="description"
          content="Acompanhe o maior campeonato de kart amador. Resultados, pilotos, calendario e muito mais."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground">
        <Header />

        <main className="flex-1">
          <Hero />
          <NextRaceSection />
          <ChampionshipGrid />
          <RankingSection />
          <SponsorsSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
