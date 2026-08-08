import { trackEvent } from '../lib/ga4';

interface Props {
  title: string;
  onBack?: () => void;
  screenName?: string;
}

export default function NavBar({ title, onBack, screenName }: Props) {
  const handleBack = () => {
    if (!onBack) return;
    trackEvent('back_button_click', { screen_name: screenName ?? title });
    onBack();
  };

  return (
    <div className="nav-bar">
      {onBack && (
        <span className="nav-back" onClick={handleBack}>＜</span>
      )}
      <span className="nav-title">{title}</span>
    </div>
  );
}
