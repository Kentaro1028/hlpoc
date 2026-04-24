import { useState, useRef } from 'react';
import PhoneFrame from './components/PhoneFrame';
import HealthResults from './screens/HealthResults';
import Questionnaire from './screens/Questionnaire';
import FutureSimulation from './screens/FutureSimulation';
import ExerciseMethods from './screens/ExerciseMethods';
import DietMethods from './screens/DietMethods';
import type { ScreenId } from './types';

type Direction = 'forward' | 'back';

interface HistoryEntry {
  screen: ScreenId;
}

export default function App() {
  const [history, setHistory] = useState<HistoryEntry[]>([{ screen: 'health-results' }]);
  const [animClass, setAnimClass] = useState('');
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [userType, setUserType] = useState<'exercise' | 'diet'>('exercise');
  const animating = useRef(false);

  const current = history[history.length - 1].screen;

  const navigate = (screen: ScreenId, dir: Direction = 'forward') => {
    if (animating.current) return;
    animating.current = true;
    const cls = dir === 'forward' ? 'screen-enter' : 'screen-enter-back';
    setAnimClass(cls);
    setTimeout(() => {
      if (dir === 'forward') {
        setHistory(prev => [...prev, { screen }]);
      } else {
        setHistory(prev => prev.slice(0, -1));
      }
      setAnimClass('');
      animating.current = false;
    }, 280);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    navigate(history[history.length - 2].screen, 'back');
  };

  const handleQuestionnaireNext = (ans: Record<string, string | number>) => {
    setAnswers(ans);
    // 趣向判定: T1=好き かつ T2=高い → 運動型、それ以外 → 食事型
    const type = (ans['t1'] === '好き' && ans['t2'] === '高い') ? 'exercise' : 'diet';
    setUserType(type);
    navigate('future-sim');
  };

  const key = `${current}-${history.length}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '24px 0' }}>
      {/* 画面タイトル（フレーム外） */}
      <div style={{
        color: '#555', fontSize: 13, fontWeight: 600,
        background: 'white', padding: '6px 16px', borderRadius: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      }}>
        {current === 'health-results' && '健診結果画面（既存）'}
        {current === 'questionnaire' && '新規：A-1 生活習慣アンケート画面'}
        {current === 'future-sim' && '新規：A-2 未来シミュレーション画面'}
        {current === 'exercise-methods' && '新規：A-3-1 選べる健康方法（運動）'}
        {current === 'diet-methods' && '新規：A-3-2 選べる食事方法'}
      </div>

      <PhoneFrame>
        <div key={key} className={animClass || ''} style={{ display: 'contents' }}>
          {current === 'health-results' && (
            <HealthResults onNext={() => navigate('questionnaire')} />
          )}
          {current === 'questionnaire' && (
            <Questionnaire
              onBack={goBack}
              onNext={handleQuestionnaireNext}
            />
          )}
          {current === 'future-sim' && (
            <FutureSimulation
              onBack={goBack}
              userType={userType}
              onSelectExercise={() => navigate('exercise-methods')}
              onSelectDiet={() => navigate('diet-methods')}
            />
          )}
          {current === 'exercise-methods' && (
            <ExerciseMethods
              onBack={goBack}
              onSelectDiet={() => navigate('diet-methods')}
            />
          )}
          {current === 'diet-methods' && (
            <DietMethods
              onBack={goBack}
              onSelectExercise={() => navigate('exercise-methods')}
            />
          )}
        </div>
      </PhoneFrame>

      {/* ナビゲーションヒント */}
      <div style={{
        display: 'flex', gap: 16, fontSize: 12, color: '#888',
        background: 'white', padding: '8px 20px', borderRadius: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <span>画面内のボタンで遷移</span>
        <span>｜</span>
        <span>「＜」で戻る</span>
        {history.length > 1 && (
          <>
            <span>｜</span>
            <span style={{ color: '#E8383D', cursor: 'pointer', fontWeight: 600 }} onClick={goBack}>
              ← 前の画面に戻る
            </span>
          </>
        )}
      </div>
    </div>
  );
}
