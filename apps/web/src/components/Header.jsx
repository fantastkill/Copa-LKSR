import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'INICIO', href: '/' },
  { name: 'RANKING', href: '/ranking' },
  { name: 'PILOTOS', href: '/pilotos' },
  { name: 'PATROCINADORES', href: '/patrocinadores' }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 f1-transition ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg py-2'
            : 'bg-gradient-to-b from-background/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={closeMobileMenu} className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-sm transform -skew-x-12 group-hover:scale-105 f1-transition" />
              <span className="f1-title text-2xl md:text-3xl text-foreground italic tracking-tighter">
                COPA LSKR
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 xl:gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 text-[13px] font-heading font-bold uppercase tracking-wider rounded-sm f1-transition ${
                      isActive
                        ? 'text-primary bg-white/5'
                        : 'text-secondary-foreground hover:text-primary hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="hidden md:flex items-center justify-center border border-border px-5 py-2 rounded-sm font-heading font-bold uppercase tracking-widest text-xs text-secondary-foreground hover:text-primary hover:border-primary f1-transition"
              >
                Login Piloto
              </Link>

              <Link
                to="/cadastro"
                className="hidden md:flex items-center justify-center bg-primary text-primary-foreground px-5 py-2 rounded-sm font-heading font-bold uppercase tracking-widest text-xs hover:bg-white f1-transition"
              >
                Cadastrar Piloto
              </Link>

              <button
                className="lg:hidden p-2 text-secondary-foreground hover:text-primary f1-transition"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden fixed inset-0 top-[60px] bg-background/98 backdrop-blur-xl border-t border-border f1-transition transform ${
            mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.href === '/'}
                onClick={closeMobileMenu}
                className="text-xl font-heading font-bold uppercase tracking-wider text-secondary-foreground hover:text-primary border-b border-border/50 pb-4 f1-transition"
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/cadastro"
              onClick={closeMobileMenu}
              className="mt-4 w-full flex items-center justify-center bg-primary text-primary-foreground px-5 py-4 rounded-sm font-heading font-bold uppercase tracking-widest text-sm hover:bg-white f1-transition"
            >
              Cadastrar Piloto
            </Link>

            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="w-full mt-2 flex items-center justify-center border border-border px-5 py-4 rounded-sm font-heading font-bold uppercase tracking-widest text-sm text-secondary-foreground hover:text-primary hover:border-primary f1-transition"
            >
              Login Piloto
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
