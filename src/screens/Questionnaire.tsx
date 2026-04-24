import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';

type QType = 'yesno' | 'choice' | 'numPicker';

interface Question {
  id: string;
  num: string;
  text: string;
  type: QType;
  choices?: string[];
  max?: number;
}

const questions: Question[] = [
  { id: 'q1', num: '①', text: '現在、たばこを習慣的に吸っていますか。', type: 'choice', choices: ['はい', '以前吸っていた', 'いいえ'] },
  { id: 'q2', num: '②', text: '20歳時から体重が10kg以上増えていますか。', type: 'yesno' },
  { id: 'q3', num: '③', text: '1回30分以上の運動を週2日以上、1年以上行っていますか。', type: 'yesno' },
  { id: 'q4', num: '④', text: '日常生活で1日1時間以上、身体活動をしていますか。', type: 'yesno' },
  { id: 'q5', num: '⑤', text: '同年齢・同性と比べ、歩く速度は速いですか。', type: 'yesno' },
  { id: 'q6', num: '⑥', text: '食事をかんで食べる状態はどれですか。', type: 'choice', choices: ['問題ない', 'かみにくい', 'ほとんどかめない'] },
  { id: 'q7', num: '⑦', text: '食べる速度はどれですか。', type: 'choice', choices: ['速い', 'ふつう', '遅い'] },
  { id: 'q8', num: '⑧', text: '就寝前2時間以内に夕食をとることが週3回以上ありますか。', type: 'yesno' },
  { id: 'q9', num: '⑨', text: '夕食後に間食（夜食）をとることが週3回以上ありますか。', type: 'yesno' },
  { id: 'q10', num: '⑩', text: '朝食を抜くことが週3回以上ありますか。', type: 'yesno' },
  { id: 'q11', num: '⑪', text: '典型的な週の飲酒日数（おおまかに）', type: 'numPicker', max: 7 },
  { id: 'q12', num: '⑫', text: '飲酒日の1日当たりの飲酒量', type: 'choice', choices: ['1合未満', '1〜2合未満', '2〜3合未満', '3合以上'] },
  { id: 'q13', num: '⑬', text: '睡眠で休養が十分とれていますか。', type: 'yesno' },
  { id: 't1', num: '⑭', text: '体を動かすのが好きですか？', type: 'choice', choices: ['好き', '苦手'] },
  { id: 't2', num: '⑮', text: '目標達成意欲が高いですか？', type: 'choice', choices: ['高い', '低い'] },
  { id: 't3', num: '⑯', text: '食事を作るのが好きですか？', type: 'choice', choices: ['好き', '苦手'] },
];

interface Props {
  onBack: () => void;
  onNext: (answers: Record<string, string | number>) => void;
}

export default function Questionnaire({ onBack, onNext }: Props) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  const setAnswer = (id: string, val: string | number) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount >= questions.length;

  return (
    <>
      <StatusBar />
      <NavBar title="生活習慣に関するアンケート" onBack={onBack} />

      <div className="scroll-content">
        <div className="ai-bubble-wrap">
          <div className="ai-icon">🤖</div>
          <div className="ai-bubble">
            あなたの未来をAI予測するため、生活習慣について教えてください。
          </div>
        </div>

        {questions.map((q) => (
          <div key={q.id} className="question-block">
            <div className="question-text">
              <span className="q-num">{q.num}</span>
              {q.text}
            </div>

            {q.type === 'yesno' && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {['はい', 'いいえ'].map((opt) => (
                  <button
                    key={opt}
                    className={`btn-yesno${answers[q.id] === opt ? ' selected' : ''}`}
                    onClick={() => setAnswer(q.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {q.type === 'choice' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {q.choices!.map((opt) => (
                  <button
                    key={opt}
                    className={`btn-choice${answers[q.id] === opt ? ' selected' : ''}`}
                    onClick={() => setAnswer(q.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {q.type === 'numPicker' && (
              <div style={{ marginBottom: 16 }}>
                <div className="num-picker">
                  {Array.from({ length: (q.max ?? 7) + 1 }, (_, i) => i).map((n) => (
                    <div
                      key={n}
                      className={`num-item${answers[q.id] === n ? ' selected' : ''}`}
                      onClick={() => setAnswer(q.id, n)}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div style={{ padding: '16px 16px 8px', fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
          {answeredCount} / {questions.length} 項目回答済み
        </div>

        <div className="section">
          <button
            className="btn-primary"
            style={{ opacity: allAnswered ? 1 : 0.5 }}
            onClick={() => allAnswered && onNext(answers)}
          >
            結果を見る →
          </button>
        </div>
        <div className="spacer" />
      </div>
    </>
  );
}
