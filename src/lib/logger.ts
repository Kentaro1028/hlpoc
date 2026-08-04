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
 * ユーザー操作ログ・送客ログを /api/log に送信する
 * - ネットワークエラーや開発環境でのAPIなしは静かに無視する
 */
export async function logEvent(
  eventType: EventType,
  screenName: string,
  targetService?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
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
