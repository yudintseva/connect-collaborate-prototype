export default function StatusBar({ dim = false }: { dim?: boolean }) {
  return (
    <div className="statusbar" style={dim ? { opacity: 0.35 } : undefined}>
      <span className="clock">9:41</span>
      <div className="icons">
        <span className="bars">
          <i style={{ height: 4 }} />
          <i style={{ height: 6 }} />
          <i style={{ height: 8 }} />
          <i style={{ height: 10 }} />
        </span>
        <i className="signal" />
        <i className="battery" />
      </div>
    </div>
  );
}
