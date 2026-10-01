export const EndpointsTable = () => {
  const [copied, setCopied] = useState(null);

  const regions = [
    { name: "Frankfurt, Germany", code: "FRA1", host: "fra1.solanagun.com" },
    { name: "Frankfurt, Germany", code: "FRA2", host: "fra2.solanagun.com" },
    { name: "Ashburn, USA", code: "ASH1", host: "ash1.solanagun.com" },
    { name: "Tokyo, Japan", code: "TYO1", host: "tyo1.solanagun.com" },
  ];
  const protocols = [
    { name: "RPC", url: (host) => `https://${host}:8875` },
    { name: "WebSocket", url: (host) => `wss://${host}:8875` },
    { name: "QUIC", url: (host) => `${host}:7000` },
  ];

  const copy = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(value);
      setTimeout(() => setCopied((current) => (current === value ? null : current)), 1500);
    });
  };

  const cell = "px-4 py-2 border-b border-zinc-950/10 dark:border-white/10 align-middle";

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-zinc-950/10 dark:border-white/10">
      <table className="w-full text-sm text-left" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr className="text-zinc-950/70 dark:text-white/70">
            <th className={`${cell} font-semibold`}>Location</th>
            <th className={`${cell} font-semibold`}>Protocol</th>
            <th className={`${cell} font-semibold`}>Endpoint</th>
          </tr>
        </thead>
        <tbody className="text-zinc-950/90 dark:text-white/90">
          {regions.map((region) =>
            protocols.map((protocol, i) => {
              const value = protocol.url(region.host);
              const isCopied = copied === value;
              return (
                <tr key={value}>
                  {i === 0 && (
                    <td rowSpan={protocols.length} className={cell} style={{ whiteSpace: "nowrap" }}>
                      <div className="font-medium">{region.name}</div>
                      <div className="text-xs text-zinc-950/50 dark:text-white/50">{region.code}</div>
                    </td>
                  )}
                  <td className={cell} style={{ whiteSpace: "nowrap" }}>{protocol.name}</td>
                  <td className={cell}>
                    <span style={{ position: "relative", display: "inline-block" }}>
                      <button
                        type="button"
                        onClick={() => copy(value)}
                        title="Click to copy"
                        aria-label={`Copy ${value}`}
                        className="group inline-flex items-center gap-2 rounded-md border border-zinc-950/10 dark:border-white/10 hover:border-primary dark:hover:border-primary-light bg-zinc-950/5 dark:bg-white/5 px-2 py-1 font-mono text-sm text-zinc-950/90 dark:text-white/90 transition-colors cursor-pointer"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <span>{value}</span>
                        {isCopied ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="opacity-50 group-hover:opacity-100 transition-opacity">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                      {isCopied && (
                        <span
                          role="status"
                          className="rounded-md bg-zinc-900 dark:bg-white px-2 py-1 text-xs font-medium text-white dark:text-zinc-900 shadow"
                          style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", pointerEvents: "none" }}
                        >
                          Copied!
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
