import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';

const options = [
  { label: 'カロミルをダウンロードする', osusume: true, isKaloriru: true },
  { label: 'AIコーチの提案を読む', osusume: false },
  { label: 'ミッション宣言をする', osusume: false },
];

interface Props {
  onBack: () => void;
  onSelectExercise: () => void;
}

export default function DietMethods({ onBack, onSelectExercise }: Props) {
  return (
    <>
      <StatusBar />
      <NavBar title="未来シミュレーション" onBack={onBack} />

      <div className="scroll-content">
        <div className="spacer" />

        <div className="section">
          <div className="card" style={{ border: '1px solid var(--gray-mid)', padding: '0 0 16px' }}>
            <div className="card-title">選べる食事方法</div>
            <div style={{ padding: '0 16px 12px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              あなたの身体は、
              <strong style={{ color: 'var(--text)' }}>『食事改善』</strong>
              の効果が数値に直接現れやすいタイプです！
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 16px' }}>
              {options.map((opt) => (
                <div key={opt.label} style={{ position: 'relative', paddingTop: opt.osusume ? 10 : 0 }}>
                  {opt.osusume && (
                    <span className="badge-osusume">おすすめ</span>
                  )}
                  <button className="btn-option">
                    {opt.label}
                    {opt.isKaloriru && (
                      <span className="kaloriru-badge">カロミル</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="spacer" />
        <div style={{ padding: '0 16px' }}>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
            運動と組み合わせますか？
          </div>
          <button
            className="btn-primary-rect"
            style={{ background: 'white', color: 'var(--red)', border: '1.5px solid var(--red)' }}
            onClick={onSelectExercise}
          >
            運動方法も見てみる
          </button>
        </div>
        <div className="spacer" />
      </div>

      <BottomNav />
    </>
  );
}
