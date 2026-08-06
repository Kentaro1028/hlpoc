import { trackEvent } from './ga4';

/** セッションIDをsessionStorageで管理する */
function getSessionId(): string {
  const KEY = 'hlpoc_session_id';
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(KEY, id);
  }
  return id;
}

export type EventType =
  | 'health_check_submit'
  | 'survey_submit'
  | 'view_ai_result'
  | 'referral_click';

/**
 * ユーザー操作ログ・送客ログを送信する
 * - /api/log（Neon DB）への保存
 * - GA4 へのイベント送信
 * を同時に行う。いずれかが失敗しても静かに無視する。
 */
export async function logEvent(
  eventType: EventType,
  screenName: string,
  targetService?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  // GA4 送信（同期・即時）
  trackEvent(eventType, {
    screen_name: screenName,
    target_service: targetService,
  });

  // DB 保存（非同期）
  try {
    const sessionId = getSessionId();
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, eventType, screenName, targetService, metadata }),
    });
  } catch {
    // ローカル開発など API が存在しない場合は無視
  }
}
