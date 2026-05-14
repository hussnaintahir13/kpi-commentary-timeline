# KPI Commentary Timeline

**Author:** [Syed Hussnain Tahir Sherazi](https://www.syedhussnain.com)
**License:** MIT
**Category:** Commentary / audit trail / executive reporting

## Short description (≤100 chars, for AppSource listing)
Timestamped KPI commentary timeline with root cause, owner, action, status & severity badges.

## Long description
KPI Commentary Timeline is a Power BI custom visual that renders timestamped business commentary alongside KPI movement. You bind a small commentary table (Excel / SharePoint / Dataverse / SQL / Fabric — anything Power BI can load) and the visual produces a clear chronological view of comments, root causes, owners, actions, status, and severity, with an optional KPI summary row. Three layouts — Vertical timeline, Compact list, Executive cards — adapt to dashboard tiles, side panels, or board packs.

## What it solves
Numbers explain *what*. Commentary explains *why*. Finance close packs, ops stand-ups, PMO updates, compliance logs, and exec reviews all need durable, dated narrative captured next to the KPI. Most tools either keep commentary in a separate workbook (where it gets lost) or rely on writeback (which requires Power Apps or Dataverse plumbing). This visual surfaces existing commentary read-only on the same page as the number.

## Who it's for
- Finance teams running monthly KPI reviews.
- PMO/ops teams tracking action items against operational KPIs.
- Compliance and audit teams logging dated rationale.
- Executive reporting teams who need narrative next to numbers.

## Key features
- Three layouts: Vertical timeline (spine + dots), Compact list (rows for tiles), Executive cards (board-pack style with severity edge).
- Optional KPI summary row driven by Current / Previous / Variance / Variance % measures (variance auto-derived if missing).
- Status normalisation (Open / In Progress / Closed / Blocked / Other) and severity normalisation (Low / Medium / High / Critical / Normal) — case-insensitive.
- Unknown status values surface as a dashed-outline badge with the raw text — no information lost.
- Sort by newest/oldest, or by a custom Sort Order measure.
- Max items, compact mode, configurable date format, number format, currency symbol, decimal places.
- Full palette override per status and per severity.
- Accessibility: aria-labels on every event, keyboard focus visible, status + severity reinforced by text *and* colour, high-contrast support.

## How it gets data
Read-only. The visual does **not** writeback. Maintain commentary in Excel on SharePoint, Dataverse, SQL, Fabric, or any source Power BI can load. Bind the columns to the visual's roles.

## Privacy & security
No network calls. No writeback. No third-party JS. `privileges` array is empty.

## Author
**Syed Hussnain Tahir Sherazi** — Power BI / Microsoft Fabric developer building the KPI Commentary Timeline and other Power BI custom visuals.

- Website: [www.syedhussnain.com](https://www.syedhussnain.com)
- Email: [contact@syedhussnain.co.uk](mailto:contact@syedhussnain.co.uk)
- LinkedIn: [linkedin.com/in/hussnainsherazi](https://uk.linkedin.com/in/hussnainsherazi)
- GitHub: [github.com/hussnaintahir13](https://github.com/hussnaintahir13)
