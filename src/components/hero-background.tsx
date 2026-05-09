// Decorative move-log table that sits behind the hero. Same visual language as
// the waylight-data hero (monospace data rows, blurred, theme-aware) but the
// dataset is piano-move logs instead of contact data. Pure decoration; rows
// repeat to fill the hero box. Hidden columns at smaller breakpoints so the
// pattern still reads on mobile.

const baseRows = [
  { date: "2025-04-12", suburb: "Hawthorn", piano: "Yamaha U1 upright", zone: "Inner", status: "delivered" },
  { date: "2025-04-13", suburb: "Brunswick", piano: "Kawai grand 5'1\"", zone: "Inner", status: "delivered" },
  { date: "2025-04-14", suburb: "Coburg", piano: "Kawai K3 upright", zone: "Inner", status: "delivered" },
  { date: "2025-04-15", suburb: "Carlton North", piano: "Schimmel grand 6'", zone: "Inner", status: "delivered" },
  { date: "2025-04-16", suburb: "Frankston", piano: "Yamaha P-125 digital", zone: "Outer", status: "delivered" },
  { date: "2025-04-17", suburb: "Werribee", piano: "Beale upright (disposal)", zone: "Outer", status: "recycled" },
  { date: "2025-04-18", suburb: "Glen Iris", piano: "Yamaha C3 grand", zone: "Inner", status: "delivered" },
  { date: "2025-04-19", suburb: "Footscray", piano: "Kawai NS-15 upright", zone: "Inner", status: "delivered" },
  { date: "2025-04-20", suburb: "Williamstown", piano: "Steinway B grand 6'11\"", zone: "Outer", status: "delivered" },
  { date: "2025-04-21", suburb: "Reservoir", piano: "Beale console upright", zone: "Outer", status: "delivered" },
  { date: "2025-04-22", suburb: "Eltham", piano: "Yamaha GB1 baby grand", zone: "Outer", status: "delivered" },
  { date: "2025-04-23", suburb: "Box Hill", piano: "Kawai GL-10 baby grand", zone: "Outer", status: "delivered" },
  { date: "2025-04-24", suburb: "Doncaster", piano: "Yamaha YUS5 upright", zone: "Outer", status: "delivered" },
  { date: "2025-04-25", suburb: "Mornington", piano: "Kawai upright (disposal)", zone: "Outer Mel", status: "recycled" },
  { date: "2025-04-26", suburb: "Sunbury", piano: "Yamaha U3 upright", zone: "Outer Mel", status: "delivered" },
  { date: "2025-04-27", suburb: "Berwick", piano: "Roland FP-30 digital", zone: "Outer Mel", status: "delivered" },
  { date: "2025-04-28", suburb: "Kew", piano: "Bosendorfer 200 grand", zone: "Inner", status: "delivered" },
  { date: "2025-04-29", suburb: "Yarraville", piano: "Yamaha U1 upright", zone: "Inner", status: "delivered" },
  { date: "2025-04-30", suburb: "Northcote", piano: "Kawai K-300 upright", zone: "Inner", status: "delivered" },
  { date: "2025-05-01", suburb: "St Kilda", piano: "Schimmel C189 grand", zone: "Inner", status: "delivered" },
  { date: "2025-05-02", suburb: "Bayswater", piano: "Yamaha CLP-735 digital", zone: "Outer", status: "delivered" },
  { date: "2025-05-03", suburb: "Pakenham", piano: "Bechstein upright", zone: "Outer Mel", status: "delivered" },
  { date: "2025-05-04", suburb: "Caulfield", piano: "Kawai RX-3 grand", zone: "Inner", status: "delivered" },
  { date: "2025-05-05", suburb: "Heidelberg", piano: "Yamaha U2 upright", zone: "Outer", status: "delivered" },
  { date: "2025-05-06", suburb: "Dandenong", piano: "August Forster upright", zone: "Outer", status: "delivered" },
  { date: "2025-05-07", suburb: "Melton", piano: "Beale upright (disposal)", zone: "Outer Mel", status: "recycled" },
] as const

export function HeroBackground() {
  // Render the cycle 2x so the table fills tall hero boxes without obvious seams.
  const rows = [...baseRows, ...baseRows]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 select-none font-mono text-[11px] leading-[1.6] text-foreground/30 [&_td]:px-3 [&_td]:py-1.5 [&_th]:px-3 [&_th]:py-1.5">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="border-b border-foreground/[0.08] text-foreground/40">
              <th className="text-left font-medium uppercase tracking-wider text-[10px]">date</th>
              <th className="text-left font-medium uppercase tracking-wider text-[10px] hidden sm:table-cell">suburb</th>
              <th className="text-left font-medium uppercase tracking-wider text-[10px]">piano</th>
              <th className="text-left font-medium uppercase tracking-wider text-[10px] hidden md:table-cell">zone</th>
              <th className="text-left font-medium uppercase tracking-wider text-[10px]">status</th>
            </tr>
          </thead>
          <tbody className="blur-[5px]">
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-foreground/[0.05]">
                <td className="text-foreground/30 whitespace-nowrap">{r.date}</td>
                <td className="text-foreground/35 hidden sm:table-cell">{r.suburb}</td>
                <td className="text-foreground/40">{r.piano}</td>
                <td className="text-foreground/30 hidden md:table-cell">{r.zone}</td>
                <td className="whitespace-nowrap">
                  <span className={r.status === "recycled" ? "text-accent/70" : "text-primary/70"}>
                    ✓ {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
