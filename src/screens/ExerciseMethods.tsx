import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';

const options = [
  { label: 'chocoZAPに通う', osusume: true },
  { label: '歩数の目標を設定する', osusume: false },
  { label: 'ミッション宣言をする', osusume: false },
  { label: 'AIコーチの提案を読む', osusume: false },
];

interface Props {
  onBack: () => void;
  onSelectDiet: () => void;
}

export default function ExerciseMethods({ onBack, onSelectDiet }: Props) {
  return (
    <>
      <StatusBar />
      <NavBar title="未来シミュレーション" onBack={onBack} />

      <div className="scroll-content">
        <div className="spacer" />

        <div className="section">
          <div className="card" style={{ border: '1px solid var(--gray-mid)', padding: '0 0 16px' }}>
            <div className="card-title">選べる運動方法</div>
            <div style={{ padding: '0 16px 12px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              あなたの身体は、運動による<br />
              <strong style={{ color: 'var(--text)' }}>『エネルギー消費』</strong>と
              <strong style={{ color: 'var(--text)' }}>『筋力アップ』</strong>の<br />
              効果が出やすいタイプです！
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 16px' }}>
              {options.map((opt) => (
                <div key={opt.label} style={{ position: 'relative', paddingTop: opt.osusume ? 10 : 0 }}>
                  {opt.osusume && (
                    <span className="badge-osusume">おすすめ</span>
                  )}
                  <button className="btn-option">
                    {opt.label}
                    {opt.label === 'chocoZAPに通う' && (
                      <span style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        background: '#FF6600', color: 'white', fontSize: 10, fontWeight: 700,
                        padding: '2px 6px', borderRadius: 4,
                      }}>
                        chocoZAP
                      </span>
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
            食事の改善も合わせて行いますか？
          </div>
          <button
            className="btn-primary-rect"
            style={{ background: 'white', color: 'var(--red)', border: '1.5px solid var(--red)' }}
            onClick={onSelectDiet}
          >
            食事方法も見てみる
          </button>
        </div>
        <div className="spacer" />
      </div>

      <BottomNav />
    </>
  );
}
