import { getDict } from "@/i18n/server";

export default async function StatsStrip() {
  const stats = (await getDict()).stats;
  return (
    <ul className="stats">
      {stats.map(([v, l]) => (
        <li key={l}>
          <span className="stat-value">
            {v.endsWith("%") ? (
              <>
                {v.slice(0, -1)}
                <small>%</small>
              </>
            ) : (
              v
            )}
          </span>
          <span className="stat-label">{l}</span>
        </li>
      ))}
    </ul>
  );
}
