import './crm.css';

type CRMPage = 'top' | 'line-unverified';

interface CRMLayoutProps {
  page: CRMPage;
  onNavigate: (p: CRMPage) => void;
  children: React.ReactNode;
}

export default function CRMLayout({ page, onNavigate, children }: CRMLayoutProps) {
  return (
    <div className="crm-root">
      {/* グローバルナビ */}
      <nav className="crm-gnav">
        <div className="crm-gnav__left">
          <span
            className={`crm-gnav__item ${page === 'top' ? 'active' : ''}`}
            onClick={() => onNavigate('top')}
          >
            事案一覧
          </span>
          <span className="crm-gnav__item">設定・情報</span>
        </div>
        <div className="crm-gnav__right">
          <div className="crm-gnav__user">
            <div className="crm-gnav__user-dot" />
            <span>東白サ - 田中 花子</span>
          </div>
          <div className="crm-gnav__logout">
            <span>↩</span>
            <span>ログアウト</span>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
