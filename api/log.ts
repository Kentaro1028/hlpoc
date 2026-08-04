import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS ヘッダー（同一オリジン想定だが念のため）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { sessionId, eventType, screenName, targetService, metadata } = req.body ?? {};

  if (!sessionId || !eventType || !screenName) {
    return res.status(400).json({ error: 'sessionId, eventType, screenName are required' });
  }

  try {
    await sql`
      INSERT INTO user_logs (session_id, event_type, screen_name, target_service, metadata)
      VALUES (
        ${sessionId},
        ${eventType},
        ${screenName},
        ${targetService ?? null},
        ${JSON.stringify(metadata ?? {})}
      )
    `;
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[log] DB insert error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
