const stats = [
  { v: "50+", l: "Exceptional vehicles sold" },
  { v: "1000%", l: "Discreet transactions" },
  { v: "10+", l: "Years of experience" },
  { v: "Global", l: "Network of partners" },
  { v: "High", l: "Client satisfaction & referrals" },
];

export default function StatsStrip() {
  return (
    <ul className="stats">
      {stats.map((s) => (
        <li key={s.l}>
          <span className="stat-value">{s.v}</span>
          <span className="stat-label">{s.l}</span>
        </li>
      ))}
    </ul>
  );
}
