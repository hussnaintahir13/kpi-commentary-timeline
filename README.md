# KPI Commentary Timeline

A Power BI custom visual that renders timestamped commentary — comments, root causes, owners, actions, severity and status — alongside KPI movement, in a vertical, compact-list, or executive-card layout.

## Quick install (no build required)

Grab the latest `.pbiviz` from [`release/`](release/) (use **Download raw file** in GitHub) and import via **Visualizations → … → Import a visual from a file** in Power BI Desktop. Full steps in [`release/README.md`](release/README.md).

## Why commentary timelines matter

Numbers explain *what*. Commentary explains *why*. Finance close packs, operations stand-ups, PMO updates, compliance logs and exec reviews all rely on durable, dated narrative captured next to the KPI. This visual surfaces that context on the same page as the number.

## How it gets its data

It does **not** writeback. You maintain commentary in Excel / SharePoint / Dataverse / SQL / Fabric (anything Power BI can load) and bind the columns to the visual's roles.

## Suggested commentary table

| Date | KPI Name | Comment | Root Cause | Owner | Action | Status | Severity |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-01-31 | Revenue | Revenue declined due to delayed orders | Customer delays | Finance Lead | Follow up with sales | Open | High |
| 2026-01-31 | Margin | Margin improved on freight savings | Carrier negotiation | Supply Chain | Lock 2026 rates | Closed | Low |
| 2026-02-28 | DSO | DSO worsened by 5 days | Two large invoices stuck | A/R Lead | Escalate to collections | In Progress | Medium |

## Data fields

| Role | Kind | Notes |
| --- | --- | --- |
| Event Date | Grouping | Drives sorting. Date or string. |
| KPI Name | Grouping | Shown in title row. |
| Comment | Grouping | Main narrative; auto-truncates with full text on hover. |
| Root Cause | Grouping (optional) | |
| Owner | Grouping (optional) | |
| Action | Grouping (optional) | |
| Status | Grouping (optional) | Normalised to Open / In Progress / Closed / Blocked / Other. |
| Severity | Grouping (optional) | Normalised to Low / Medium / High / Critical / Normal. |
| Current Value | Measure (optional) | Drives KPI summary. |
| Previous Value | Measure (optional) | |
| Variance Value | Measure (optional) | Derived if missing. |
| Variance Percent | Measure (optional) | Derived if missing. |
| Sort Order | Measure (optional) | Overrides date-based ordering. |

## Example DAX

```DAX
Current KPI Value  = SUM('KPI'[Value])
Previous KPI Value = CALCULATE([Current KPI Value], DATEADD('Date'[Date], -1, MONTH))
KPI Variance       = [Current KPI Value] - [Previous KPI Value]
KPI Variance %     = DIVIDE([KPI Variance], [Previous KPI Value])
```

## Status & severity normalisation

| Raw value (case-insensitive) | Maps to |
| --- | --- |
| open, opened | Open |
| progress, in progress, ongoing | In Progress |
| closed, complete, completed, done | Closed |
| blocked, delayed | Blocked |
| other / unknown | Other (rendered as a dashed-outline badge with the raw text) |

| Raw value | Maps to |
| --- | --- |
| low | Low |
| medium, med | Medium |
| high | High |
| critical, severe | Critical |
| other | Normal |

## Development setup

```bash
npm install
npm install -g powerbi-visuals-tools
pbiviz --create-cert
pbiviz start
pbiviz package
```

## Usage instructions

See [docs/USAGE.md](docs/USAGE.md). For a star schema, see [docs/SAMPLE_DATA_MODEL.md](docs/SAMPLE_DATA_MODEL.md).

## Test plan

- Empty data — friendly empty state.
- One comment.
- Many comments (capped at `maxItems`).
- Long comment text — truncated with title-attribute fallback.
- Missing owner / missing root cause — meta block hides empty rows.
- Unknown status — surfaces as dashed-outline "Other" badge.
- Unknown severity — falls back to Normal (no badge).
- Newest first / Oldest first.
- Compact list layout.
- Executive cards layout.
- Resize visual to small mobile tile.
- High contrast mode.

## AppSource checklist

See [docs/APP_SOURCE_CHECKLIST.md](docs/APP_SOURCE_CHECKLIST.md).

## Roadmap

- Filter chips by status/severity.
- Group-by KPI in vertical layout.
- Inline KPI sparkline per row.
- Localisation for status keywords.

## Contributing

Fork, branch, PR. Include a screenshot of the layout you changed. MIT-licensed.

## Author

Syed Hussnain Tahir Sherazi — Associate Data Engineer, Leicester, UK.
[www.syedhussnain.com](https://www.syedhussnain.com) · [LinkedIn](https://uk.linkedin.com/in/hussnainsherazi) · contact@syedhussnain.co.uk

## License

MIT — see [LICENSE](LICENSE).
