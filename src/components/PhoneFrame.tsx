interface Props {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: Props) {
  return (
    <div className="phone-frame">
      {children}
    </div>
  );
}
