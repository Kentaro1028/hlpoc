export type ScreenId =
  | 'health-results'
  | 'questionnaire'
  | 'future-sim'
  | 'exercise-methods'
  | 'diet-methods';

export interface AppState {
  answers: Record<string, string | number>;
  userType: 'exercise' | 'diet' | null;
}
