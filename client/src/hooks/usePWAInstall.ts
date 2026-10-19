import { useEffect, useState } from 'react';

// Which set of "how to add this app" instructions a visitor needs
export type InstallGuideKind =
  | 'ios_safari' // iPhone / iPad in Safari
  | 'ios_other' // iPhone / iPad in Chrome, Firefox, Edge, etc.
  | 'android' // Android when the browser didn't offer its own install box
  | 'mac_safari' // Safari on a Mac
  | 'inapp'; // inside Facebook, Instagram, Messenger, TikTok, etc.

type Platform = 'ios' | 'android' | 'mac_safari' | 'desktop' | 'other';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// ---------------------------------------------------------------------------
// Shared state, set up once when the app loads.
// The browser announces "this site can be installed" only once per page load,
// so it is caught here instead of inside a screen that may not be showing yet.
// ---------------------------------------------------------------------------
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installedThisVisit = false;
const subscribers = new Set<() => void>();
const notify = () => subscribers.forEach((fn) => fn());

const track = (event: string, params: Record<string, string>) => {
  const gtag = (window as any).gtag;
  if (typeof gtag === 'function') gtag('event', event, params);
};

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Hold on to it so our own button can open the install box later
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    notify();
  });

  window.addEventListener('appinstalled', () => {
    installedThisVisit = true;
    deferredPrompt = null;
    track('pwa_install_success', { method: 'native' });
    notify();
  });
}

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------
const isRunningAsApp = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  window.matchMedia('(display-mode: fullscreen)').matches ||
  (window.navigator as any).standalone === true;

const detect = (): { platform: Platform; inApp: boolean; iosSafari: boolean } => {
  const ua = window.navigator.userAgent;

  // iPads report themselves as Macs; a touch screen gives them away
  const isIPad = /Macintosh/.test(ua) && window.navigator.maxTouchPoints > 1;
  const isIOS = /iPhone|iPad|iPod/i.test(ua) || isIPad;
  const isAndroid = /Android/i.test(ua);

  // Browsers built into social and messaging apps can't install web apps
  const inApp =
    /FBAN|FBAV|FB_IAB|Instagram|Messenger|Snapchat|TikTok|musical_ly|BytedanceWebview|LinkedInApp|Pinterest|Line\//i.test(ua) ||
    (isAndroid && /; wv\)/.test(ua));

  const iosSafari = isIOS && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA\/|DuckDuckGo|YaBrowser/i.test(ua);

  let platform: Platform = 'other';
  if (isIOS) platform = 'ios';
  else if (isAndroid) platform = 'android';
  else if (/Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Edg|Firefox/.test(ua)) platform = 'mac_safari';
  else if (!/Mobile|Tablet/i.test(ua)) platform = 'desktop';

  return { platform, inApp, iosSafari };
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function usePWAInstall() {
  const [, forceRender] = useState(0);
  const [env, setEnv] = useState<{ platform: Platform; inApp: boolean; iosSafari: boolean; standalone: boolean }>({
    platform: 'other',
    inApp: false,
    iosSafari: false,
    standalone: false,
  });
  const [guide, setGuide] = useState<InstallGuideKind | null>(null);

  useEffect(() => {
    setEnv({ ...detect(), standalone: isRunningAsApp() });
    const rerender = () => forceRender((n) => n + 1);
    subscribers.add(rerender);
    return () => {
      subscribers.delete(rerender);
    };
  }, []);

  const { platform, inApp, iosSafari, standalone } = env;

  // Which written instructions to show when the browser has no install box of its own
  const guideKind: InstallGuideKind | null = inApp
    ? 'inapp'
    : platform === 'ios'
      ? iosSafari
        ? 'ios_safari'
        : 'ios_other'
      : platform === 'android'
        ? 'android'
        : platform === 'mac_safari'
          ? 'mac_safari'
          : null;

  // Hidden when opened from the home screen icon, or once installed during this visit
  const canInstall = !standalone && !installedThisVisit && (!!deferredPrompt || guideKind !== null);

  const isPhoneOrTablet = platform === 'ios' || platform === 'android';
  const buttonLabel = isPhoneOrTablet || inApp
    ? 'Add to Home Screen'
    : platform === 'mac_safari'
      ? 'Add to Dock'
      : 'Install App';

  // `where` records which button was tapped (start screen or end of rosary)
  const install = async (where: string = 'start') => {
    track('pwa_install_click', { location: where });

    if (deferredPrompt && !inApp) {
      // Android, Chrome, Edge: open the browser's own "Install app?" box
      const promptEvent = deferredPrompt;
      deferredPrompt = null; // each one can only be used once
      notify();
      await promptEvent.prompt();
      await promptEvent.userChoice;
      return;
    }

    if (guideKind) setGuide(guideKind);
  };

  const closeGuide = () => setGuide(null);

  // "Done" on the written instructions (kept from the original version for analytics)
  const trackManualInstall = () => {
    if (guide) track('pwa_install_success', { method: `${guide}_manual` });
    setGuide(null);
  };

  return {
    canInstall,
    install,
    guide,
    closeGuide,
    trackManualInstall,
    buttonLabel,
    isPhoneOrTablet: isPhoneOrTablet || inApp,
  };
}
