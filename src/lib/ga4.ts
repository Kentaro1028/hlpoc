/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/** 画面遷移を GA4 の page_view として記録する */
export function trackPageView(screenId: string, screenTitle: string): void {
  if (typeof window.gtag !== 'function') return;
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
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params ?? {});
}
