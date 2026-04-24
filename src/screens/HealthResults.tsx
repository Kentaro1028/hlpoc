import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';

const healthData = [
  { category: '体格', items: [
    { name: '性別', unit: '', value: '男性', prev: '男性', abnormal: false },
    { name: '受診年齢', unit: '歳', value: '38', prev: '37', abnormal: false },
    { name: '身長', unit: 'cm', value: '176.5', prev: '176.5', abnormal: false },
    { name: '体重', unit: 'kg', value: '90.0', prev: '88.2', abnormal: false },
    { name: '体格指数（BMI）', unit: 'kg/m²', value: '28.9', prev: '28.4', abnormal: true },
    { name: '腹囲', unit: 'cm', value: '92.3', prev: '90.1', abnormal: true },
  ]},
  { category: '血圧', items: [
    { name: '収縮期血圧 1回目', unit: 'mmHg', value: '–', prev: '–', abnormal: false },
    { name: '収縮期血圧 2回目', unit: 'mmHg', value: '162', prev: '158', abnormal: true },
    { name: '拡張期血圧 1回目', unit: 'mmHg', value: '79', prev: '78', abnormal: false },
    { name: '拡張期血圧 2回目', unit: 'mmHg', value: '76', prev: '75', abnormal: false },
  ]},
  { category: '血液検査', items: [
    { name: '白血球（WBC）', unit: '/μL', value: '1.5', prev: '1.5', abnormal: false },
    { name: '赤血球（RBC）', unit: '/μL', value: '1.5', prev: '1.5', abnormal: false },
    { name: '血色素（Hb）', unit: 'g/dL', value: '10.2', prev: '10.2', abnormal: false },
    { name: '血小板数（PLT）', unit: '×/μL', value: '1.5', prev: '1.5', abnormal: false },
  ]},
  { category: '肝機能', items: [
    { name: 'AST（GOT）', unit: 'U/L', value: '30', prev: '30', abnormal: false },
    { name: 'ALT（GPT）', unit: 'U/L', value: '44', prev: '44', abnormal: false },
    { name: 'γ-GTP', unit: 'U/L', value: '45', prev: '45', abnormal: false },
  ]},
  { category: '脂質代謝', items: [
    { name: 'HDLコレステロール', unit: 'mg/dL', value: '47', prev: '47', abnormal: false },
    { name: 'LDLコレステロール', unit: 'mg/dL', value: '133', prev: '133', abnormal: true },
    { name: '中性脂肪（TG）', unit: 'mg/dL', value: '122', prev: '122', abnormal: false },
  ]},
  { category: '糖代謝', items: [
    { name: '血糖値（FPG）', unit: 'mg/dL', value: '105', prev: '105', abnormal: false },
    { name: 'HbA1c（NGSP）', unit: '%', value: '5.2', prev: '5.2', abnormal: false },
  ]},
  { category: '尿検査', items: [
    { name: '尿蛋白', unit: '', value: '(2+)', prev: '(2+)', abnormal: true },
    { name: '尿糖', unit: '', value: '(2—)', prev: '(2—)', abnormal: true },
    { name: '尿潜血', unit: '', value: '(—)', prev: '(—)', abnormal: false },
  ]},
];

interface Props {
  onNext: () => void;
}

export default function HealthResults({ onNext }: Props) {
  const [activeTab, setActiveTab] = useState<'data' | 'risk'>('data');

  return (
    <>
      <StatusBar />
      <NavBar title="健診結果" />

      <div className="tab-bar-top">
        <div
          className={`tab-item${activeTab === 'data' ? ' active' : ''}`}
          onClick={() => setActiveTab('data')}
        >健診データ</div>
        <div
          className={`tab-item${activeTab === 'risk' ? ' active' : ''}`}
          onClick={() => setActiveTab('risk')}
        >リスク/医療費予測</div>
      </div>

      <div className="scroll-content">
        {activeTab === 'data' ? (
          <>
            <div className="note-text">
              ※赤字は基準範囲外の数値*です。<br />
              ※項目名をタップすると説明が表示されます。<br />
              ※リスク/医療費予測をタップすると、最新の健康診断結果をもとに健康リスクと年間医療費を予測します。
            </div>
            <div className="note-footnote">
              *公益社団法人日本人間ドック・予防医学会が公表している2024年4月時点の基準としています。
            </div>

            <div style={{ overflowX: 'auto', padding: '0 16px' }}>
              <table className="health-table" style={{ minWidth: 320 }}>
                <thead>
                  <tr>
                    <th>大項目</th>
                    <th>項目</th>
                    <th style={{ textAlign: 'right' }}>
                      2024-11-1<br />
                      <button className="modify-btn">修正</button>
                    </th>
                    <th style={{ textAlign: 'right' }}>
                      2023-10-1<br />
                      <button className="modify-btn">修正</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {healthData.map((group) =>
                    group.items.map((item, idx) => (
                      <tr key={`${group.category}-${idx}`}>
                        {idx === 0 && (
                          <td className="category-cell" rowSpan={group.items.length}>
                            {group.category}
                          </td>
                        )}
                        <td>
                          <div className="item-name">{item.name}</div>
                          {item.unit && <div className="item-unit">{item.unit}</div>}
                        </td>
                        <td className={`value-cell${item.abnormal ? ' abnormal' : ''}`}>
                          {item.value}
                        </td>
                        <td className={`value-cell${item.abnormal ? ' abnormal' : ''}`}>
                          {item.prev}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="spacer" />
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--gray-mid)', borderBottom: '1px solid var(--gray-mid)' }}>
              <p style={{ fontSize: 13, fontWeight: 700 }}>監修医：山村 聡 先生</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>[東京ミッドタウンクリニック]</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>
                クリニックを経営するほか、ヘルスケア関連サービスやアプリ開発、サプリメント開発などの顧問・監修を務めている。
              </p>
            </div>
            <div className="spacer" />
            <div className="section">
              <button className="btn-primary" onClick={onNext}>
                新しい健診結果を登録する
              </button>
            </div>
          </>
        ) : (
          <div style={{ padding: '0 16px', paddingTop: 8 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 16 }}>
              リスク/医療費予測タブの内容はA-2画面へ
            </p>
            <button className="btn-primary-rect" onClick={onNext}>
              未来シミュレーションを見る
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </>
  );
}
