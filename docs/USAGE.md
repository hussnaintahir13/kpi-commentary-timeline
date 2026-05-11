# KPI Commentary Timeline — Usage Guide

## 1. Add the visual
**Visualizations → … → Import a visual from a file**, then drag the icon onto your page.

## 2. Bind data
Minimum: **Event Date**, **KPI Name**, **Comment**. Add Root Cause / Owner / Action / Status / Severity as available.

If your KPI table has the underlying values, also add **Current Value** and **Previous Value** to get a KPI summary on top of the timeline.

## 3. Pick a layout
In **Format → Display → Timeline layout**:

- **Vertical** — classic timeline with a dotted spine and dot per event. Best on a tall tile.
- **Compact list** — one row per event, ideal for slim side-panels.
- **Executive cards** — wide cards with severity-coloured left edge, for board packs.

## 4. Filter and sort
Use Power BI slicers (Status, Severity, Owner, KPI Name) to narrow the timeline. The visual respects all filters.

`Sort Order` measure overrides date sorting when supplied.

## 5. Customise
**Display** — title, max items, sort direction, toggles for each meta block.
**Formatting** — date format, number format, currency symbol, decimal places.
**Colors** — full palette: background / text / line / status × 4 / severity × 4.

## 6. Read it
- The **dot** colour reflects severity.
- **Badges** show status and severity in text + colour (works under high-contrast).
- The **KPI summary** uses red/green tones for variance, but is also always labelled.
- Unknown statuses are rendered as a dashed-outline badge showing the raw text — so you never lose information.

## 7. Tips
- Keep `maxItems` modest (≤ 100) — the visual renders DOM nodes, not virtualised rows.
- Status keywords are case-insensitive. Stick to English keywords for now; localisation is on the roadmap.
- Use the **Compact mode** toggle (or let the visual auto-engage at < 360 px width) on dashboard tiles.
