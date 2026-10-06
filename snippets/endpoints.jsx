export const EndpointsTable = ({ protocol } = {}) => {
  const [copied, setCopied] = useState(null);

  const regions = [
    { name: "Frankfurt, Germany", code: "FRA1", host: "fra1.solanagun.com" },
    { name: "Frankfurt, Germany", code: "FRA2", host: "fra2.solanagun.com" },
    { name: "Ashburn, USA", code: "ASH1", host: "ash1.solanagun.com" },
    { name: "Tokyo, Japan", code: "TYO1", host: "tyo1.solanagun.com" },
  ];
  const allProtocols = [
    { name: "RPC", url: (host) => `https://${host}:8875` },
    { name: "WebSocket", url: (host) => `wss://${host}:8875` },
    { name: "QUIC", url: (host) => `${host}:7000` },
  ];
  const protocols = protocol ? allProtocols.filter((p) => p.name === protocol) : allProtocols;
  const showProtocol = protocols.length > 1;

  const copy = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(value);
      setTimeout(() => setCopied((current) => (current === value ? null : current)), 1500);
    });
  };

  const cell = "px-4 py-2 border-b border-white/10 align-middle";

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-white/10" style={{ backgroundColor: "#131313" }}>
      <table className="w-full text-sm text-left" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr className="text-white/70">
            <th className={`${cell} font-semibold`}>Location</th>
            {showProtocol && <th className={`${cell} font-semibold`}>Protocol</th>}
            <th className={`${cell} font-semibold`}>Endpoint</th>
          </tr>
        </thead>
        <tbody className="text-white/90">
          {regions.map((region) =>
            protocols.map((proto, i) => {
              const value = proto.url(region.host);
              const isCopied = copied === value;
              return (
                <tr key={value}>
                  {i === 0 && (
                    <td rowSpan={protocols.length} className={cell} style={{ whiteSpace: "nowrap" }}>
                      <div className="font-medium">{region.name}</div>
                      <div className="text-xs text-white/50">{region.code}</div>
                    </td>
                  )}
                  {showProtocol && <td className={cell} style={{ whiteSpace: "nowrap" }}>{proto.name}</td>}
                  <td className={cell}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span className="font-mono text-sm text-white" style={{ whiteSpace: "nowrap" }}>{value}</span>
                      <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
                        <button
                          type="button"
                          onClick={() => copy(value)}
                          title="Copy"
                          aria-label={`Copy ${value}`}
                          className="pn-copy-button"
                        >
                          {isCopied ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          )}
                        </button>
                        {isCopied && (
                          <span
                            role="status"
                            className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black shadow"
                            style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", pointerEvents: "none" }}
                          >
                            Copied!
                          </span>
                        )}
                      </span>
                    </div>
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
