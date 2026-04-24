import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';

const riskData = [
  { rank: 1, name: '脂質異常症', before: '45%', after: '35%' },
  { rank: 2, name: '高血圧', before: '10%', after: '5%' },
  { rank: 3, name: '糖尿病 等', before: '5%', after: '3%' },
];

const medicalFees: Record<string, number> = {
  '3割': 130032,
  '2割': 86688,
  '1割': 43344,
};

interface Props {
  onBack: () => void;
  userType: 'exercise' | 'diet';
  onSelectExercise: () => void;
  onSelectDiet: () => void;
}

export default function FutureSimulation({ onBack, userType, onSelectExercise, onSelectDiet }: Props) {
  const [burden, setBurden] = useState<string>('3割');
  const [showModal, setShowModal] = useState(false);

  const isExercise = userType === 'exercise';

  return (
    <>
      <StatusBar />
      <NavBar title="健診結果" onBack={onBack} />

      <div className="tab-bar-top">
        <div className="tab-item" onClick={onBack}>健診データ</div>
        <div className="tab-item active">リスク/医療費予測</div>
      </div>

      <div className="scroll-content">
        <div className="date-label">2024年11月1日 受診結果</div>

        {/* ── Section 1: 未来を変える生活習慣改善 (NEW) ── */}
        <div className="section">
          <div className="card-pink" style={{ padding: '0 0 16px' }}>
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              未来を変える生活習慣改善
              <span
                style={{ fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer' }}
                onClick={() => setShowModal(true)}
              >ⓘ</span>
            </div>

            <div style={{ padding: '0 16px' }}>
              <div className="section-label" style={{ textAlign: 'center' }}>１年後の体重変化</div>
              <div className="weight-box">
                <span>90 kg</span>
                <span className="weight-arrow">⇒</span>
                <span className="weight-after">87 kg</span>
              </div>

              <div className="type-hint">あなたの効果的なタイプは？</div>
              <div className="type-hint-arrow">▼</div>
              <div className="spacer-sm" />

              {isExercise ? (
                <>
                  <button className="btn-primary-rect" onClick={onSelectExercise}>
                    〇 運動が有効なタイプ →
                  </button>
                  <div className="spacer-sm" />
                  <div className="text-link" onClick={onSelectDiet}>食事方法も見てみる</div>
                </>
              ) : (
                <>
                  <button className="btn-primary-rect" onClick={onSelectDiet}>
                    〇 食事が有効なタイプ →
                  </button>
                  <div className="spacer-sm" />
                  <div className="text-link" onClick={onSelectExercise}>運動方法も見てみる</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Section 2: 5年以内の予測疾患リスク TOP3 (NEW) ── */}
        <div className="section">
          <div className="card-pink">
            <div className="card-title">
              5年以内の予測疾患リスク<br />
              <span style={{ fontSize: 13, fontWeight: 700 }}>改善行動後の変化TOP3</span>
            </div>
            {riskData.map((r) => (
              <div key={r.rank} className="risk-row">
                <div className="risk-rank">{r.rank}</div>
                <div className="risk-name">{r.name}</div>
                <div className="risk-before">{r.before}</div>
                <div className="risk-arrow">⇒</div>
                <div className="risk-after">{r.after}</div>
              </div>
            ))}
            <div className="row-link" style={{ justifyContent: 'center', gap: 4 }}>
              詳細確認 <span>›</span>
            </div>
          </div>
        </div>

        {/* ── Section 3: 年間医療費予測 (既存) ── */}
        <div className="section">
          <div className="card-pink">
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              年間医療費予測
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>ⓘ</span>
            </div>
            <div style={{ padding: '0 16px' }}>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
                あなたの保険料の負担割合を選択することで、疾病に罹患した場合の平均年間医療費が算出されます。
              </p>
              <div className="burden-selector">
                {Object.keys(medicalFees).map((key) => (
                  <button
                    key={key}
                    className={`burden-btn${burden === key ? ' selected' : ''}`}
                    onClick={() => setBurden(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10 }}>
                脂質異常症 に<br />罹患した場合の年間医療費予測
              </div>
              <div className="fee-box">
                <span className="fee-label">年間</span>
                <span className="fee-amount">
                  {medicalFees[burden].toLocaleString()}円
                </span>
              </div>
            </div>
            <div className="row-link" style={{ justifyContent: 'center', gap: 4 }}>
              詳細確認 <span>›</span>
            </div>
          </div>
        </div>

        {/* ── Section 4: 5年以内に異常値になる確率が高い健診項目 (既存) ── */}
        <div className="section">
          <div className="card-pink">
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              5年以内に異常値になる<br />確率が高い健診項目
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>ⓘ</span>
            </div>
            <div className="risk-tags">
              {['血糖', '脂質', '血圧', '肝機能', '体格'].map((tag) => (
                <span
                  key={tag}
                  className={`risk-tag${['血糖', '血圧'].includes(tag) ? ' high' : ''}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="row-link" style={{ justifyContent: 'center', gap: 4 }}>
              詳細確認 <span>›</span>
            </div>
          </div>
        </div>

        {/* ── Section 5: ご加入中の保険 (既存) ── */}
        <div className="section">
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
            ご加入中の保険
          </div>
          <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto' }}>
            <div className="pie-placeholder" />
            <div className="pie-center" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
            {[
              { label: '病気・けが', color: '#E8383D' },
              { label: 'がん', color: '#c0392b' },
              { label: '介護・認知症', color: '#AAAAAA' },
              { label: '死亡', color: '#8B0000' },
              { label: '資産形成', color: '#CCCCCC' },
              { label: 'その他', color: '#EEEEEE' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="spacer" />
      </div>

      <BottomNav />

      {/* ── Modal: 未来シミュレーションとは？ ── */}
      {showModal && (
        <div
          style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'flex-end', zIndex: 100,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: 'white', borderRadius: '16px 16px 0 0',
              padding: 24, width: '100%', maxHeight: '70%', overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>未来シミュレーションとは？</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 12 }}>
              BMI、血圧、血糖値、コレステロール値、関節の状態、心肺機能、アンケートから導き出した、あなたに効果的な健康改善行動のタイプをAI判断しています。
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 20 }}>
              但し、体重やリスクに影響を与えるものは、食事や運動の他にも、ストレスや睡眠状況など、様々な要因もあげられます。目安としてとらえましょう。
            </p>
            <button className="btn-primary" onClick={() => setShowModal(false)}>閉じる</button>
          </div>
        </div>
      )}
    </>
  );
}
