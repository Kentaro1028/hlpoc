import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';

interface Props {
  onBack: () => void;
  onMission: () => void;
}

const lifestyleData = [
  { name: '高血圧性疾患', pct: 25 },
  { name: '糖尿病', pct: 5 },
  { name: '肝疾患', pct: 50 },
  { name: '腎疾患', pct: 1 },
  { name: '心疾患', pct: 1 },
  { name: '脳血管疾患', pct: 1 },
  { name: '脂質異常症', pct: 100 },
];

const cancerData = [
  { name: '肺がん', pct: 10 },
  { name: '大腸がん', pct: 5 },
  { name: '胃がん', pct: 50 },
  { name: '肝臓がん', pct: 25 },
  { name: '膵臓がん', pct: 1 },
  { name: '前立腺がん', pct: 30 },
  { name: '乳がん', pct: 75 },
  { name: '子宮体がん', pct: 1 },
];

function RiskBarRow({ name, pct }: { name: string; pct: number }) {
  return (
    <div className="risk-bar-row">
      <div className="risk-bar-label">
        {name}
        <span className="risk-bar-info">ⓘ</span>
      </div>
      <div className="risk-bar-track">
        <div className="risk-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="risk-bar-pct">{pct}%</div>
    </div>
  );
}

export default function RiskDetail({ onBack, onMission }: Props) {
  return (
    <>
      <StatusBar />
      <NavBar title="詳細一覧" onBack={onBack} />

      {/* 3タブ */}
      <div className="tab-bar-top" style={{ margin: '12px 16px', display: 'flex' }}>
        <div className="tab-item active" style={{ flex: 1 }}>罹患リスク</div>
        <div className="tab-item" style={{ flex: 1 }}>年間医療費</div>
        <div className="tab-item" style={{ flex: 1, fontSize: 11, lineHeight: 1.3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          検査値異常<br />リスク
        </div>
      </div>

      <div className="scroll-content">
        {/* セクションタイトル */}
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 15, padding: '8px 16px 12px' }}>
          5年以内の罹患リスク予測
          <span style={{ fontSize: 13, color: 'var(--gray)', fontWeight: 400, marginLeft: 4 }}>ⓘ</span>
        </div>

        {/* 生活習慣病 */}
        <div className="risk-section-header">生活習慣病</div>
        {lifestyleData.map((d) => (
          <RiskBarRow key={d.name} name={d.name} pct={d.pct} />
        ))}

        <div className="spacer" />

        {/* がん */}
        <div className="risk-section-header">がん</div>
        {cancerData.map((d) => (
          <RiskBarRow key={d.name} name={d.name} pct={d.pct} />
        ))}

        <div className="spacer" />

        {/* おすすめカード */}
        <div className="section">
          <div className="reco-card">
            <div className="reco-card__top">
              <div className="reco-card__text">
                健康リスクに合わせた<br />
                かんたんな運動から始めましょう
              </div>
              <div className="reco-card__illust">🏃</div>
            </div>
            <button className="btn-primary-rect" onClick={onMission}>
              健康ミッションを始める
            </button>
          </div>
        </div>

        <div className="spacer" />
      </div>

      <BottomNav />
    </>
  );
}
