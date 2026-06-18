const items = [
  { icon: '🏠', label: 'ホーム', active: true },
  { icon: '📋', label: '健診結果の登録' },
  { icon: '📖', label: '健康記事' },
  { icon: '🛡', label: '契約手続き' },
];

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      {items.map((item) => (
        <div key={item.label} className={`bottom-nav-item${item.active ? ' active' : ''}`}>
          <span className="bottom-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
