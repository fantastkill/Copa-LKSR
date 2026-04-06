export const DEMO_CHAMPIONSHIPS = [
  {
    id: 'etapa-1-2026',
    title: 'GP Santa Cruz Sprint',
    event_date: '2026-02-28 00:00:00.000Z',
    event_time: '12:00',
    stage: 'Etapa 1',
    status: 'finished',
    isPast: true,
    isNext: false,
    statusText: 'Resultado disponivel',
    ctaLabel: 'Ver resultado',
    ctaHref: '/ranking',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1400&auto=format&fit=crop',
    shareUrl: '/ranking?etapa=etapa-1-2026'
  },
  {
    id: 'etapa-2-2026',
    title: 'GP Santa Cruz Challenge',
    event_date: '2026-03-28 00:00:00.000Z',
    event_time: '12:00',
    stage: 'Etapa 2',
    status: 'upcoming',
    isPast: false,
    isNext: true,
    statusText: 'Proxima etapa',
    ctaLabel: 'Ver detalhes',
    ctaHref: '/ranking',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1400&auto=format&fit=crop',
    shareUrl: '/ranking?etapa=etapa-2-2026'
  },
  {
    id: 'etapa-3-2026',
    title: 'GP Santa Cruz Open',
    event_date: '2026-04-25 00:00:00.000Z',
    event_time: '12:00',
    stage: 'Etapa 3',
    status: 'upcoming',
    isPast: false,
    isNext: false,
    statusText: 'Agendada',
    ctaLabel: 'Acompanhar etapa',
    ctaHref: '/ranking',
    image: 'https://images.unsplash.com/photo-1611742708307-c6608f8f9f3f?q=80&w=1400&auto=format&fit=crop',
    shareUrl: '/ranking?etapa=etapa-3-2026'
  },
  {
    id: 'etapa-4-2026',
    title: 'GP Santa Cruz Finals',
    event_date: '2026-05-30 00:00:00.000Z',
    event_time: '12:00',
    stage: 'Etapa 4',
    status: 'upcoming',
    isPast: false,
    isNext: false,
    statusText: 'Agendada',
    ctaLabel: 'Acompanhar etapa',
    ctaHref: '/ranking',
    image: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?q=80&w=1400&auto=format&fit=crop',
    shareUrl: '/ranking?etapa=etapa-4-2026'
  }
];

const PRO_RANKING = [
  { id: 'pro-1', position_label: '1', kart_number_snapshot: 7, pilot_name: 'Luis Ferrari', mv: '65', tmv: '00:22.456', tt: '00:27:34.391', dl: '--', da: '--', tuv: '00:23.124', tv: '70', vm: '75.86', points: 125 },
  { id: 'pro-2', position_label: '2', kart_number_snapshot: 12, pilot_name: 'Victor Antonio', mv: '64', tmv: '00:22.507', tt: '00:27:57.674', dl: '00:23.283', da: '00:23.283', tuv: '00:23.689', tv: '70', vm: '74.91', points: 118 },
  { id: 'pro-3', position_label: '3', kart_number_snapshot: 19, pilot_name: 'Lucas Policarpo', mv: '63', tmv: '00:22.417', tt: '00:28:16.145', dl: '-2 voltas', da: '-1 volta', tuv: '00:25.398', tv: '68', vm: '72.52', points: 111 },
  { id: 'pro-4', position_label: '4', kart_number_snapshot: 14, pilot_name: 'Matheus Belisario', mv: '63', tmv: '00:22.859', tt: '00:28:01.100', dl: '-3 voltas', da: '00:08.549', tuv: '00:47.017', tv: '68', vm: '72.52', points: 102 },
  { id: 'pro-5', position_label: '5', kart_number_snapshot: 3, pilot_name: 'Deyvis', mv: '59', tmv: '00:24.049', tt: '00:28:20.438', dl: '-4 voltas', da: '00:19.338', tuv: '00:24.897', tv: '65', vm: '70.06', points: 96 },
  { id: 'pro-6', position_label: '6', kart_number_snapshot: 17, pilot_name: 'Vinicius Rodrigues', mv: '50', tmv: '00:24.399', tt: '00:27:43.278', dl: '-5 voltas', da: '00:06.239', tuv: '00:25.160', tv: '65', vm: '70.06', points: 90 }
];

const LIGHT_RANKING = [
  { id: 'light-1', position_label: '1', kart_number_snapshot: 5, pilot_name: 'Joao Gabriel', mv: '70', tmv: '00:22.548', tt: '00:28:19.015', dl: '--', da: '--', tuv: '00:23.682', tv: '72', vm: '75.98', points: 120 },
  { id: 'light-2', position_label: '2', kart_number_snapshot: 7, pilot_name: 'Leo Braga', mv: '61', tmv: '00:22.548', tt: '00:28:16.773', dl: '-1 volta', da: '-1 volta', tuv: '00:23.607', tv: '71', vm: '75.02', points: 113 },
  { id: 'light-3', position_label: '3', kart_number_snapshot: 17, pilot_name: 'Lucas Sodre', mv: '46', tmv: '00:22.972', tt: '00:28:05.101', dl: '-4 voltas', da: '-3 voltas', tuv: '00:23.362', tv: '68', vm: '72.35', points: 105 },
  { id: 'light-4', position_label: '4', kart_number_snapshot: 19, pilot_name: 'Diogo Polisel', mv: '53', tmv: '00:24.506', tt: '00:28:25.688', dl: '-7 voltas', da: '-3 voltas', tuv: '00:25.341', tv: '65', vm: '68.32', points: 99 },
  { id: 'light-5', position_label: '5', kart_number_snapshot: 3, pilot_name: 'Renan', mv: '62', tmv: '00:24.852', tt: '00:28:02.596', dl: '-8 voltas', da: '-1 volta', tuv: '00:25.619', tv: '64', vm: '68.19', points: 94 },
  { id: 'light-6', position_label: '6', kart_number_snapshot: 14, pilot_name: 'Diogo Lopes', mv: '58', tmv: '00:24.903', tt: '00:28:07.923', dl: '-10 voltas', da: '-2 voltas', tuv: '00:25.973', tv: '62', vm: '65.85', points: 89 }
];

export const DEMO_RANKINGS = {
  PRO: PRO_RANKING,
  LIGHT: LIGHT_RANKING
};

export const DEMO_PILOTS = [
  ...PRO_RANKING.map((entry) => ({
    id: `pilot-pro-${entry.position_label}`,
    full_name: entry.pilot_name,
    display_name: entry.pilot_name,
    kart_number: entry.kart_number_snapshot,
    best_lap: entry.tmv,
    final_position: Number(entry.position_label),
    category: 'PRO',
    city: 'Sao Paulo',
    team: 'Equipe PRO',
    instagram: '',
    bio: 'Piloto em destaque na temporada da COPA LSKR.',
    points: entry.points,
    avatar_url: '',
    status: 'approved'
  })),
  ...LIGHT_RANKING.map((entry) => ({
    id: `pilot-light-${entry.position_label}`,
    full_name: entry.pilot_name,
    display_name: entry.pilot_name,
    kart_number: entry.kart_number_snapshot,
    best_lap: entry.tmv,
    final_position: Number(entry.position_label),
    category: 'LIGHT',
    city: 'Sao Paulo',
    team: 'Equipe LIGHT',
    instagram: '',
    bio: 'Piloto competitivo da categoria LIGHT.',
    points: entry.points,
    avatar_url: '',
    status: 'approved'
  }))
];

export const DEMO_SPONSORS = [
  {
    id: 'sponsor-founder',
    company_name: 'Santa Cruz Kart',
    title: 'Patrocinador fundador da COPA LSKR',
    description: 'Estrutura oficial das etapas e parceiro de desempenho da temporada.',
    banner_url: 'https://images.unsplash.com/photo-1511910849309-0f63c0e10d26?q=80&w=1400&auto=format&fit=crop',
    website_url: 'mailto:contato@copalskr.com.br?subject=Contato%20patrocinador%20fundador',
    sponsor_type: 'founder',
    is_active: true,
    display_order: 1
  },
  {
    id: 'sponsor-premium',
    company_name: 'Speed Parts Racing',
    title: 'Equipamentos premium',
    description: 'Linha completa de equipamentos e suporte para pilotos.',
    banner_url: '',
    website_url: 'mailto:contato@copalskr.com.br?subject=Contato%20sponsor%20premium',
    sponsor_type: 'premium',
    is_active: true,
    display_order: 2
  },
  {
    id: 'sponsor-supporter-1',
    company_name: 'Karting BR',
    title: 'Apoiador tecnico',
    description: 'Apoio tecnico e operacional em eventos e treinos.',
    banner_url: '',
    website_url: 'mailto:contato@copalskr.com.br?subject=Contato%20Karting%20BR',
    sponsor_type: 'supporter',
    is_active: true,
    display_order: 3
  },
  {
    id: 'sponsor-supporter-2',
    company_name: 'Energy Drive',
    title: 'Apoiador oficial',
    description: 'Energia e ativacoes de marca durante as etapas.',
    banner_url: '',
    website_url: 'mailto:contato@copalskr.com.br?subject=Contato%20Energy%20Drive',
    sponsor_type: 'supporter',
    is_active: true,
    display_order: 4
  }
];

const toDateValue = (value) => {
  const raw = String(value || '').split(' ')[0];
  const date = new Date(`${raw}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const getNextChampionship = () => {
  const today = new Date();
  const upcoming = DEMO_CHAMPIONSHIPS.find((championship) => {
    const date = toDateValue(championship.event_date);
    return date && date >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
  });

  return upcoming || DEMO_CHAMPIONSHIPS[0] || null;
};

export const getRankingsByCategory = (category) => {
  const normalizedCategory = String(category || 'PRO').toUpperCase() === 'LIGHT' ? 'LIGHT' : 'PRO';
  return [...(DEMO_RANKINGS[normalizedCategory] || [])].sort((a, b) => b.points - a.points);
};

export const getPilotsByCategory = (category) => {
  const normalizedCategory = String(category || 'PRO').toUpperCase() === 'LIGHT' ? 'LIGHT' : 'PRO';
  return DEMO_PILOTS
    .filter((pilot) => pilot.category === normalizedCategory)
    .sort((a, b) => (b.points || 0) - (a.points || 0));
};
