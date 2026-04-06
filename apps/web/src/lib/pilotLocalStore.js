export const PILOT_ACCOUNTS_KEY = 'lskr_pilot_accounts_v2';
export const PILOT_SESSION_KEY = 'lskr_pilot_session_v2';
export const PILOT_ACCOUNTS_UPDATED_EVENT = 'lskr-pilot-accounts-updated';

const DEMO_PILOT_ACCOUNTS = [
  {
    id: 'demo_pilot_luis',
    fullName: 'Luis Ferrari',
    displayName: 'Luis Ferrari',
    email: 'luis@copalskr.com.br',
    phone: '11999990001',
    team: 'Ferrari Racing',
    category: 'PRO',
    city: 'Sao Paulo',
    password: '123456',
    avatarUrl: '',
    termsAccepted: true,
    status: 'Ativo para apresentacao',
    points: 125,
    rankingPosition: 1,
    createdAt: '2026-03-01T12:00:00.000Z',
    updatedAt: '2026-03-01T12:00:00.000Z'
  },
  {
    id: 'demo_pilot_victor',
    fullName: 'Victor Antonio',
    displayName: 'Victor Antonio',
    email: 'victor@copalskr.com.br',
    phone: '11999990002',
    team: 'Red Bull Kart',
    category: 'LIGHT',
    city: 'Sao Paulo',
    password: '123456',
    avatarUrl: '',
    termsAccepted: true,
    status: 'Ativo para apresentacao',
    points: 118,
    rankingPosition: 1,
    createdAt: '2026-03-01T12:00:00.000Z',
    updatedAt: '2026-03-01T12:00:00.000Z'
  }
];

const safeReadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const normalizeSpaces = (value) => String(value ?? '').trim().replace(/\s+/g, ' ');
export const normalizePilotName = (name) => normalizeSpaces(name);
export const normalizePilotNameLookup = (name) => normalizePilotName(name).toLowerCase();

export const normalizeEmail = (email) => String(email ?? '').trim().toLowerCase();
const normalizePhone = (phone) => String(phone ?? '').replace(/[^\d+]/g, '').trim();
const normalizeCategory = (category) => {
  const normalized = String(category ?? '').trim().toUpperCase();
  return normalized === 'LIGHT' ? 'LIGHT' : 'PRO';
};

export const buildPilotId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `pilot_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const normalizeRankingPosition = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return Math.trunc(numeric);
};

const normalizePoints = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return 0;
  return Math.trunc(numeric);
};

const normalizeStatus = (value) => {
  const normalized = normalizeSpaces(value);
  return normalized || 'Pendente de validacao';
};

const normalizePassword = (value) => String(value ?? '').trim();

const normalizeAccount = (account) => {
  if (!account || typeof account !== 'object') return null;

  const fullName = normalizePilotName(account.fullName || account.name || account.displayName);
  if (!fullName) return null;

  const displayName = normalizePilotName(account.displayName || fullName);
  const email = normalizeEmail(account.email || `${normalizePilotNameLookup(displayName).replace(/[^a-z0-9]/g, '')}@local.copalskr`);
  const nowIso = new Date().toISOString();

  return {
    id: account.id || buildPilotId(),
    fullName,
    displayName,
    email,
    phone: normalizePhone(account.phone),
    team: normalizePilotName(account.team),
    category: normalizeCategory(account.category),
    city: normalizePilotName(account.city),
    password: normalizePassword(account.password),
    avatarUrl: normalizeSpaces(account.avatarUrl),
    termsAccepted: account.termsAccepted === true,
    status: normalizeStatus(account.status),
    points: normalizePoints(account.points),
    rankingPosition: normalizeRankingPosition(account.rankingPosition),
    createdAt: account.createdAt || nowIso,
    updatedAt: account.updatedAt || nowIso
  };
};

const normalizeAccountList = (accounts) => {
  if (!Array.isArray(accounts)) return [];
  return accounts.map(normalizeAccount).filter(Boolean);
};

export const emitPilotAccountsUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PILOT_ACCOUNTS_UPDATED_EVENT));
  }
};

export const savePilotAccounts = (accounts) => {
  const normalized = normalizeAccountList(accounts);
  localStorage.setItem(PILOT_ACCOUNTS_KEY, JSON.stringify(normalized));
  emitPilotAccountsUpdated();
};

const ensureDemoAccounts = (accounts) => {
  if (accounts.length > 0) return accounts;
  const normalizedSeed = normalizeAccountList(DEMO_PILOT_ACCOUNTS);
  localStorage.setItem(PILOT_ACCOUNTS_KEY, JSON.stringify(normalizedSeed));
  return normalizedSeed;
};

export const readPilotAccounts = () => {
  const rawAccounts = safeReadJSON(PILOT_ACCOUNTS_KEY, []);
  const normalized = normalizeAccountList(rawAccounts);
  const seeded = ensureDemoAccounts(normalized);

  const hasChanges = JSON.stringify(rawAccounts) !== JSON.stringify(seeded);
  if (hasChanges) {
    localStorage.setItem(PILOT_ACCOUNTS_KEY, JSON.stringify(seeded));
  }

  return seeded;
};

export const readPilotSession = () => {
  const raw = safeReadJSON(PILOT_SESSION_KEY, null);
  if (!raw || typeof raw !== 'object') return null;

  const id = String(raw.id || '').trim();
  if (!id) return null;

  return {
    id,
    fullName: normalizePilotName(raw.fullName || raw.name || raw.displayName),
    name: normalizePilotName(raw.name || raw.displayName || raw.fullName),
    displayName: normalizePilotName(raw.displayName || raw.name || raw.fullName),
    email: normalizeEmail(raw.email),
    phone: normalizePhone(raw.phone),
    team: normalizePilotName(raw.team),
    category: normalizeCategory(raw.category),
    city: normalizePilotName(raw.city),
    avatarUrl: normalizeSpaces(raw.avatarUrl),
    status: normalizeStatus(raw.status),
    points: normalizePoints(raw.points),
    rankingPosition: normalizeRankingPosition(raw.rankingPosition),
    createdAt: raw.createdAt || null,
    updatedAt: raw.updatedAt || null
  };
};

export const savePilotSession = (session) => {
  localStorage.setItem(PILOT_SESSION_KEY, JSON.stringify(session));
};

export const clearPilotSession = () => localStorage.removeItem(PILOT_SESSION_KEY);

export const toPublicPilotSession = (account) => ({
  id: account.id,
  fullName: account.fullName,
  name: account.displayName,
  displayName: account.displayName,
  email: account.email,
  phone: account.phone,
  team: account.team,
  category: account.category,
  city: account.city,
  avatarUrl: account.avatarUrl,
  status: account.status,
  points: account.points,
  rankingPosition: account.rankingPosition,
  createdAt: account.createdAt,
  updatedAt: account.updatedAt
});

export const findPilotAccountByIdentifier = (accounts, identifier) => {
  const lookup = normalizePilotNameLookup(identifier);
  const emailLookup = normalizeEmail(identifier);

  return accounts.find((account) => {
    const byEmail = normalizeEmail(account.email) === emailLookup;
    const byDisplayName = normalizePilotNameLookup(account.displayName) === lookup;
    const byFullName = normalizePilotNameLookup(account.fullName) === lookup;
    return byEmail || byDisplayName || byFullName;
  });
};

export const updatePilotAccountById = (accountId, partialData) => {
  const accounts = readPilotAccounts();
  const index = accounts.findIndex((account) => account.id === accountId);
  if (index === -1) {
    throw new Error('Conta de piloto nao encontrada.');
  }

  const merged = {
    ...accounts[index],
    ...partialData,
    updatedAt: new Date().toISOString()
  };

  const normalized = normalizeAccount(merged);
  if (!normalized) {
    throw new Error('Nao foi possivel atualizar os dados do piloto.');
  }

  accounts[index] = normalized;
  savePilotAccounts(accounts);

  const session = readPilotSession();
  if (session?.id === normalized.id) {
    savePilotSession(toPublicPilotSession(normalized));
  }

  return normalized;
};

export const mapLocalAccountToPilot = (account) => ({
  id: `local_${account.id}`,
  display_name: account.displayName,
  full_name: account.fullName,
  category: account.category,
  city: account.city || 'Sao Paulo',
  instagram: '',
  team: account.team || 'Equipe independente',
  bio: 'Piloto cadastrado no portal da COPA LSKR.',
  best_lap: null,
  final_position: account.rankingPosition,
  points: account.points,
  avatar_url: account.avatarUrl,
  status: account.status,
  isLocal: true
});
