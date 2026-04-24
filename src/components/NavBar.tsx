interface Props {
  title: string;
  onBack?: () => void;
}

export default function NavBar({ title, onBack }: Props) {
  return (
    <div className="nav-bar">
      {onBack && (
        <span className="nav-back" onClick={onBack}>＜</span>
      )}
      <span className="nav-title">{title}</span>
    </div>
  );
}
