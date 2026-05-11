# Sample Data Model

A practical star schema for feeding the KPI Commentary Timeline.

## Tables

### `KPIValues`
| Column | Type | Notes |
| --- | --- | --- |
| Date | Date | Joins to `Date[Date]`. |
| KPI Name | Text | Joins to `Commentary[KPI Name]`. |
| Value | Decimal | Numeric KPI value for the period. |

### `Commentary`
| Column | Type | Notes |
| --- | --- | --- |
| Date | Date | When the comment applies. |
| KPI Name | Text | Joins to `KPIValues[KPI Name]`. |
| Comment | Text | Free-text narrative. |
| Root Cause | Text | Optional. |
| Owner | Text | Optional. |
| Action | Text | Optional. |
| Status | Text | Open / In Progress / Closed / Blocked (or your own — visual will surface unknown values). |
| Severity | Text | Low / Medium / High / Critical. |

### `Date`
Standard date dimension (one row per day; year/quarter/month attributes).

## Relationships

- `Commentary[KPI Name]` → `KPIValues[KPI Name]` (many → many or via a small `KPIs` dimension).
- `Commentary[Date]` → `Date[Date]` (many → one).
- `KPIValues[Date]` → `Date[Date]` (many → one).

## Tips

- Keep `Commentary` thin — one row per (date × KPI × comment) — so filters cascade cleanly.
- A small `KPIs` dimension is recommended for KPI metadata (display name, owner, target).
- If you want measures inside the visual to reflect a single selected KPI, bind a KPI slicer on the page.

## Where the commentary lives in practice

- **Excel on SharePoint** — refreshed via the SharePoint connector. Friendly for finance teams.
- **Dataverse** — when you want validation, security, and audit trail.
- **SQL / Fabric Lakehouse** — when commentary is an output of another process (audit logs, JIRA, ServiceNow).
- **Power Apps** — capture commentary at the source, surface here read-only.
