import { createCookieSessionStorage } from '@remix-run/node';

/**
 * Cookie-backed session storage. opilot-pm stores Firebase/Keycloak tokens
 * here; this is a minimal base to build real auth on top of.
 */
type SessionData = {
  userId: string;
  token: string;
};

type SessionFlashData = {
  error: string;
};

export const sessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET || 'dev-secret-change-me'],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
