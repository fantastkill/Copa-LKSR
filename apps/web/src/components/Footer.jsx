import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-border pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-sm transform -skew-x-12" />
              <span className="f1-title text-3xl text-foreground italic tracking-tighter">COPA LSKR</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Plataforma oficial da COPA LSKR com ranking, pilotos, calendario e area de cadastro.
            </p>
            <a
              href="mailto:contato@copalskr.com.br?subject=Contato%20COPA%20LSKR"
              className="inline-flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-wider text-primary hover:text-white f1-transition"
            >
              <Mail className="w-4 h-4" />
              Contato oficial
            </a>
          </div>

          <div>
            <h4 className="f1-subtitle text-lg text-foreground mb-6">NAVEGACAO</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm font-medium uppercase tracking-wider f1-transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/ranking" className="text-muted-foreground hover:text-primary text-sm font-medium uppercase tracking-wider f1-transition">
                  Ranking
                </Link>
              </li>
              <li>
                <Link to="/pilotos" className="text-muted-foreground hover:text-primary text-sm font-medium uppercase tracking-wider f1-transition">
                  Pilotos
                </Link>
              </li>
              <li>
                <Link
                  to="/patrocinadores"
                  className="text-muted-foreground hover:text-primary text-sm font-medium uppercase tracking-wider f1-transition"
                >
                  Patrocinadores
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="f1-subtitle text-lg text-foreground mb-6">ACESSO RAPIDO</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/cadastro"
                  className="text-muted-foreground hover:text-primary text-sm font-medium uppercase tracking-wider f1-transition"
                >
                  Cadastro de Piloto
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-primary text-sm font-medium uppercase tracking-wider f1-transition"
                >
                  Login de Piloto
                </Link>
              </li>
              <li>
                <Link
                  to="/ranking"
                  className="text-muted-foreground hover:text-primary text-sm font-medium uppercase tracking-wider f1-transition"
                >
                  Classificacao oficial
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="f1-subtitle text-lg text-foreground mb-6">CONTATO</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contato@copalskr.com.br" className="hover:text-primary f1-transition">
                  contato@copalskr.com.br
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Sao Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
            {new Date().getFullYear()} COPA LSKR. Todos os direitos reservados.
          </p>
          <a
            href="mailto:contato@copalskr.com.br?subject=Contato%20COPA%20LSKR"
            className="text-xs text-muted-foreground font-medium tracking-wider uppercase hover:text-foreground f1-transition"
          >
            Fale com a organizacao
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
