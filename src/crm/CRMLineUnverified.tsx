type CRMPage = 'top' | 'line-unverified';

interface Props {
  onNavigate: (p: CRMPage) => void;
}

export default function CRMLineUnverified({ onNavigate }: Props) {
  return (
    <>
      {/* ケースヘッダ */}
      <div className="crm-case-header">
        <div className="crm-case-header__row1">
          <span className="crm-case-header__brand">MIRAI</span>
          <div className="crm-case-header__case-no">
            <span>12-123456789</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <div className="crm-case-header__member-id">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            M123456789
          </div>
          <span className="crm-case-header__name">飯島 紀子</span>
        </div>

        {/* タブ */}
        <div className="crm-tabs">
          <div className="crm-tab active">
            <span className="crm-tab__icon crm-tab__icon--line" />
            LINE
          </div>
          <div className="crm-tab">
            <span className="crm-tab__icon" />
            まごころメール
          </div>
          <div className="crm-tab">
            <span className="crm-tab__icon" />
            聴くモン
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingBottom: 8 }}>
            <span
              style={{ fontSize: 12, color: '#1b2438', cursor: 'pointer' }}
              onClick={() => onNavigate('top')}
            >
              市案情報詳細
            </span>
          </div>
        </div>
      </div>

      {/* サブタブ */}
      <div className="crm-subtabs">
        <div className="crm-subtab active">[確認待ち] 契約者・佐藤 一郎</div>
        <div className="crm-subtab crm-subtab--new">＋ 新しいトーク</div>
      </div>

      {/* メインコンテンツ */}
      <div className="crm-content">
        <div className="crm-unverified-body">
          <p className="crm-unverified-notice">このトークはまだ開通していません。</p>

          <div className="crm-unverified-info">
            {/* 認証URL送信先電話番号 */}
            <div className="crm-unverified-info__block">
              <span className="crm-unverified-info__label">認証URL送信宛電話番号</span>
              <span className="crm-unverified-info__value">08012345678</span>
              <span className="crm-unverified-info__sub">2024年12月31日 23:59 履歴</span>
            </div>

            {/* ステータス */}
            <div className="crm-unverified-info__block">
              <span className="crm-unverified-info__label">ステータス</span>
              <div className="crm-unverified-info__pill">
                <span className="crm-unverified-info__pill-dot" />
                確認待ち・SMS送信済
              </div>
            </div>

            {/* メイン担当者 */}
            <div className="crm-unverified-info__block">
              <span className="crm-unverified-info__label">メイン担当者</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="crm-unverified-info__person">東白サ - 田中 花子</span>
                <button className="crm-unverified-info__edit" title="編集">✎</button>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="crm-unverified-actions">
            <button className="crm-btn crm-btn--secondary">認証URLを無効化する</button>
            <button className="crm-btn crm-btn--primary">SMSを再送する</button>
          </div>
        </div>
      </div>
    </>
  );
}
