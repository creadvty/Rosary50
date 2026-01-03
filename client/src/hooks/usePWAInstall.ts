import { useState, useEffect } from 'react';

type Platform = 'ios' | 'android' | 'safari_desktop' | 'chrome_desktop' | 'edge_desktop' | 'other';

export function usePWAInstall() {
  const [platform, setPlatform] = useState<Platform>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [showSafariPrompt, setShowSafariPrompt] = useState(false);

  useEffect(() => {
    // Detect standalone mode
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(!!isStandaloneMode);

    // Detect platform
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/.test(ua);
    const isChrome = /chrome/.test(ua) && !/edge|edg/.test(ua);
    const isEdge = /edge|edg/.test(ua);
    const isAndroid = /android/.test(ua);
    const isDesktop = !/mobile|tablet|android|iphone|ipad|ipod/.test(ua);

    if (isIOS) setPlatform('ios');
    else if (isAndroid) setPlatform('android');
    else if (isDesktop && isSafari) setPlatform('safari_desktop');
    else if (isDesktop && isChrome) setPlatform('chrome_desktop');
    else if (isDesktop && isEdge) setPlatform('edge_desktop');

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    const installedHandler = () => {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'pwa_install_success', { 'method': 'native' });
      }
    };
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const install = async () => {
    if (platform === 'ios') {
      setShowIOSPrompt(true);
    } else if (platform === 'safari_desktop') {
      setShowSafariPrompt(true);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        // Handled by appinstalled event mostly, but good to have
        setDeferredPrompt(null);
      }
    }
  };

  const trackManualInstall = (method: string) => {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'pwa_install_success', { 'method': method });
    }
    setShowIOSPrompt(false);
    setShowSafariPrompt(false);
  };

  return {
    platform,
    isStandalone,
    canInstall: (platform !== 'other' && (deferredPrompt || platform === 'ios' || platform === 'safari_desktop')) && !isStandalone,
    install,
    showIOSPrompt,
    setShowIOSPrompt,
    showSafariPrompt,
    setShowSafariPrompt,
    trackManualInstall
  };
}
