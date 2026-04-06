import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  buildPilotId,
  clearPilotSession,
  findPilotAccountByIdentifier,
  normalizeEmail,
  normalizePilotName,
  normalizePilotNameLookup,
  readPilotAccounts,
  readPilotSession,
  savePilotAccounts,
  savePilotSession,
  toPublicPilotSession,
  updatePilotAccountById
} from '@/lib/pilotLocalStore';

const PilotAuthContext = createContext(null);

const sanitizeRegistrationPayload = (payload) => {
  const fullName = normalizePilotName(payload.fullName);
  const displayName = normalizePilotName(payload.displayName || fullName);
  const email = normalizeEmail(payload.email);
  const phone = String(payload.phone ?? '').replace(/[^\d+]/g, '').trim();
  const team = normalizePilotName(payload.team);
  const category = String(payload.category ?? '').toUpperCase() === 'LIGHT' ? 'LIGHT' : 'PRO';
  const city = normalizePilotName(payload.city);
  const password = String(payload.password ?? '').trim();
  const confirmPassword = String(payload.confirmPassword ?? '').trim();
  const avatarUrl = String(payload.avatarUrl ?? '').trim();
  const acceptedTerms = payload.acceptedTerms === true;

  return {
    fullName,
    displayName,
    email,
    phone,
    team,
    category,
    city,
    password,
    confirmPassword,
    avatarUrl,
    acceptedTerms
  };
};

const validateRegistrationPayload = (payload) => {
  if (payload.fullName.length < 4) {
    throw new Error('Informe o nome completo com pelo menos 4 caracteres.');
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error('Informe um e-mail valido.');
  }

  if (payload.phone.replace(/\D/g, '').length < 10) {
    throw new Error('Informe um telefone/WhatsApp valido com DDD.');
  }

  if (payload.password.length < 6) {
    throw new Error('A senha precisa ter no minimo 6 caracteres.');
  }

  if (payload.password !== payload.confirmPassword) {
    throw new Error('A confirmacao de senha nao confere.');
  }

  if (!payload.acceptedTerms) {
    throw new Error('Voce precisa aceitar os termos para continuar.');
  }
};

export const PilotAuthProvider = ({ children }) => {
  const [currentPilot, setCurrentPilot] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const session = readPilotSession();
    if (session?.id) {
      const accounts = readPilotAccounts();
      const account = accounts.find((item) => item.id === session.id);
      if (account) {
        const publicSession = toPublicPilotSession(account);
        savePilotSession(publicSession);
        setCurrentPilot(publicSession);
      } else {
        clearPilotSession();
      }
    }
    setInitialLoading(false);
  }, []);

  const registerPilot = async (registrationPayload) => {
    const payload = sanitizeRegistrationPayload(registrationPayload ?? {});
    validateRegistrationPayload(payload);

    const accounts = readPilotAccounts();

    const emailAlreadyInUse = accounts.some((account) => normalizeEmail(account.email) === payload.email);
    if (emailAlreadyInUse) {
      throw new Error('Este e-mail ja esta cadastrado.');
    }

    const normalizedDisplayName = normalizePilotNameLookup(payload.displayName);
    const displayNameInUse = accounts.some(
      (account) => normalizePilotNameLookup(account.displayName) === normalizedDisplayName
    );

    if (displayNameInUse) {
      throw new Error('Ja existe um piloto cadastrado com este nome completo.');
    }

    const nowIso = new Date().toISOString();
    const account = {
      id: buildPilotId(),
      fullName: payload.fullName,
      displayName: payload.displayName,
      email: payload.email,
      phone: payload.phone,
      team: payload.team,
      category: payload.category,
      city: payload.city,
      password: payload.password,
      avatarUrl: payload.avatarUrl,
      termsAccepted: true,
      status: 'Recebido pela organizacao',
      points: 0,
      rankingPosition: null,
      createdAt: nowIso,
      updatedAt: nowIso
    };

    savePilotAccounts([...accounts, account]);
    return toPublicPilotSession(account);
  };

  const loginPilot = async (identifier, password) => {
    const normalizedIdentifier = String(identifier ?? '').trim();
    const normalizedPassword = String(password ?? '').trim();

    if (!normalizedIdentifier || !normalizedPassword) {
      throw new Error('Informe seu acesso e senha.');
    }

    const accounts = readPilotAccounts();
    const account = findPilotAccountByIdentifier(accounts, normalizedIdentifier);

    if (!account || account.password !== normalizedPassword) {
      throw new Error('Acesso ou senha invalidos.');
    }

    const publicPilot = toPublicPilotSession(account);
    savePilotSession(publicPilot);
    setCurrentPilot(publicPilot);

    return publicPilot;
  };

  const updatePilotProfile = async (changes) => {
    if (!currentPilot?.id) {
      throw new Error('Sessao de piloto nao encontrada.');
    }

    const nextDisplayName =
      changes?.displayName !== undefined ? normalizePilotName(changes.displayName) : currentPilot.displayName;
    const nextEmail = changes?.email !== undefined ? normalizeEmail(changes.email) : currentPilot.email;

    if (!nextDisplayName || nextDisplayName.length < 2) {
      throw new Error('Nome de piloto invalido.');
    }

    if (!nextEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      throw new Error('E-mail invalido.');
    }

    const accounts = readPilotAccounts();
    const duplicate = accounts.find(
      (account) =>
        account.id !== currentPilot.id &&
        (normalizeEmail(account.email) === nextEmail ||
          normalizePilotNameLookup(account.displayName) === normalizePilotNameLookup(nextDisplayName))
    );

    if (duplicate) {
      throw new Error('Ja existe outro piloto com este e-mail ou nome.');
    }

    const updated = updatePilotAccountById(currentPilot.id, {
      fullName: changes?.fullName !== undefined ? normalizePilotName(changes.fullName) : currentPilot.fullName,
      displayName: nextDisplayName,
      email: nextEmail,
      phone:
        changes?.phone !== undefined
          ? String(changes.phone ?? '').replace(/[^\d+]/g, '').trim()
          : currentPilot.phone,
      team: changes?.team !== undefined ? normalizePilotName(changes.team) : currentPilot.team,
      category:
        changes?.category !== undefined
          ? String(changes.category).toUpperCase() === 'LIGHT'
            ? 'LIGHT'
            : 'PRO'
          : currentPilot.category,
      city: changes?.city !== undefined ? normalizePilotName(changes.city) : currentPilot.city,
      avatarUrl: changes?.avatarUrl !== undefined ? String(changes.avatarUrl ?? '').trim() : currentPilot.avatarUrl
    });

    const publicPilot = toPublicPilotSession(updated);
    savePilotSession(publicPilot);
    setCurrentPilot(publicPilot);

    return publicPilot;
  };

  const logoutPilot = () => {
    clearPilotSession();
    setCurrentPilot(null);
  };

  return (
    <PilotAuthContext.Provider
      value={{
        currentPilot,
        registerPilot,
        loginPilot,
        updatePilotProfile,
        logoutPilot,
        isPilotAuthenticated: !!currentPilot,
        initialLoading
      }}
    >
      {children}
    </PilotAuthContext.Provider>
  );
};

export const usePilotAuth = () => {
  const context = useContext(PilotAuthContext);
  if (!context) {
    throw new Error('usePilotAuth must be used within PilotAuthProvider');
  }
  return context;
};
