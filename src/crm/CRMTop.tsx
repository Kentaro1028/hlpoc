type CRMPage = 'top' | 'line-unverified';

interface Props {
  onNavigate: (p: CRMPage) => void;
}

const cases = [
  {
    id: '12-123456789',
    brand: 'MIRAI',
    memberId: 'M123456789',
    name: '飯島 紀子',
    status: 'waiting' as const,
    statusLabel: '確認待ち・SMS送信済',
    channel: 'LINE',
    assignee: '東白サ - 田中 花子',
    updatedAt: '2024/12/31 23:59',
  },
  {
    id: '12-234567890',
    brand: 'MIRAI',
    memberId: 'M234567890',
    name: '鈴木 一郎',
    status: 'open' as const,
    statusLabel: '開通済み',
    channel: 'LINE',
    assignee: '東白サ - 田中 花子',
    updatedAt: '2024/12/30 14:22',
  },
  {
    id: '12-345678901',
    brand: 'MIRAI',
    memberId: 'M345678901',
    name: '佐藤 健太',
    status: 'sms' as const,
    statusLabel: '確認待ち・SMS送信済',
    channel: 'まごころメール',
    assignee: '東白サ - 山田 次郎',
    updatedAt: '2024/12/29 09:10',
  },
  {
    id: '12-456789012',
    brand: 'MIRAI',
    memberId: 'M456789012',
    name: '田中 美咲',
    status: 'closed' as const,
    statusLabel: 'クローズ済み',
    channel: 'LINE',
    assignee: '東白サ - 鈴木 三郎',
    updatedAt: '2024/12/28 17:45',
  },
  {
    id: '12-567890123',
    brand: 'MIRAI',
    memberId: 'M567890123',
    name: '山口 浩二',
    status: 'waiting' as const,
    statusLabel: '確認待ち・SMS送信済',
    channel: 'LINE',
    assignee: '東白サ - 田中 花子',
    updatedAt: '2024/12/28 11:30',
  },
  {
    id: '12-678901234',
    brand: 'MIRAI',
    memberId: 'M678901234',
    name: '小林 裕子',
    status: 'open' as const,
    statusLabel: '開通済み',
    channel: '聴くモン',
    assignee: '東白サ - 山田 次郎',
    updatedAt: '2024/12/27 16:05',
  },
];

const statusClass: Record<string, string> = {
  waiting: 'crm-badge--waiting',
  sms: 'crm-badge--sms',
  open: 'crm-badge--open',
  closed: 'crm-badge--closed',
};

export default function CRMTop({ onNavigate }: Props) {
  return (
    <>
      {/* ツールバー */}
      <div className="crm-content">
        <div className="crm-top__toolbar">
          <div className="crm-top__search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input placeholder="事案番号・顧客名・会員IDで検索" />
          </div>
          <button className="crm-top__filter-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            絞り込み
          </button>
          <button className="crm-top__filter-btn">
            ステータス：確認待ち
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button className="crm-top__filter-btn">
            担当者：全員
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <span className="crm-top__count">{cases.length} 件</span>
        </div>

        {/* テーブル */}
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>事案番号</th>
                <th>会員ID</th>
                <th>顧客名</th>
                <th>チャネル</th>
                <th>ステータス</th>
                <th>担当者</th>
                <th>更新日時</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => {
                    if (c.status === 'waiting' || c.status === 'sms') {
                      onNavigate('line-unverified');
                    }
                  }}
                >
                  <td>
                    <span className="crm-table__brand">{c.brand}</span>
                    <span className="crm-table__case-no">{c.id}</span>
                  </td>
                  <td style={{ color: '#777' }}>{c.memberId}</td>
                  <td className="crm-table__name">{c.name}</td>
                  <td>{c.channel}</td>
                  <td>
                    <span className={`crm-badge ${statusClass[c.status]}`}>
                      <span className="crm-badge__dot" />
                      {c.statusLabel}
                    </span>
                  </td>
                  <td style={{ color: '#666' }}>{c.assignee}</td>
                  <td style={{ color: '#999' }}>{c.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
