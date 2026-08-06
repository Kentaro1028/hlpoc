/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

let initialized = false;

/** gtag.js を動的に注入して初期化する（初回のみ） */
function init(): void {
  if (initialized || !MEASUREMENT_ID) return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: any[]) { window.dataLayer.push(args); };
  window.gtag('js', new Date());
  // send_page_view: false → 手動で page_view を送るため自動計測を無効化
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

/** 画面遷移を GA4 の page_view として記録する */
export function trackPageView(screenId: string, screenTitle: string): void {
  init();
  if (!MEASUREMENT_ID) return;
  window.gtag('event', 'page_view', {
    page_title: screenTitle,
    page_location: `${window.location.origin}/#${screenId}`,
    page_path: `/#${screenId}`,
    screen_id: screenId,
  });
}

/** 任意のカスタムイベントを GA4 に送信する */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  init();
  if (!MEASUREMENT_ID) return;
  window.gtag('event', eventName, params ?? {});
}
