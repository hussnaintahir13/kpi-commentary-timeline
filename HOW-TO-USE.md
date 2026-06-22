# KPI Commentary Timeline — Simple Guide

## What this visual does

This visual shows the story behind your numbers. It lists dated notes about a KPI in time order. Each note can show a comment, who owns it, what action is planned, its status, and how serious it is. You can pick one of three looks: a vertical timeline, a compact list, or executive cards.

## What data you need

You add your data by dragging columns into "wells" (the boxes in Power BI where fields go). This visual works best when you show one KPI at a time.

- **Event Date** (required) — the date of each note. This sets the order.
- **KPI Name** (recommended) — the name of the KPI, like "Revenue" or "Margin".
- **Comment** (recommended) — the main note that explains what happened.
- **Root Cause** (optional) — the reason behind the change.
- **Owner** (optional) — the person responsible.
- **Action** (optional) — what will be done next.
- **Status** (optional) — where it stands, like Open, In Progress, Closed, or Blocked.
- **Severity** (optional) — how serious it is, like Low, Medium, High, or Critical.
- **Current Value** (optional) — the latest number for the KPI.
- **Previous Value** (optional) — the number from before.
- **Variance Value** (optional) — the difference between now and before. Worked out for you if left blank.
- **Variance Percent** (optional) — the difference as a percent. Worked out for you if left blank.
- **Sort Order** (optional) — a number that sets your own order instead of using the date.

## How to add it to your report (step by step)

1. Open Power BI Desktop and open or create a report.
2. In the **Visualizations** pane, click the **•••** (more options) button.
3. Choose **Import a visual from a file**.
4. If a warning about custom visuals appears, click **Import**.
5. Pick the file **dist\kpiCommentaryTimeline3E1B27A45F0C4FE9AC8B2D617F8E91D5.1.0.0.0.pbiviz** and open it.
6. Click the new icon in the Visualizations pane to add the visual to the page.
7. Select the visual, then drag your fields into the wells listed above.

## Buttons & options you can change

You change these in the **Format** pane (the paint roller icon) after you select the visual. The options are grouped into three cards.

### Display

- **Visual title** — type the heading shown at the top.
- **Timeline layout** — pick how the notes look: **Vertical** (a line with dots), **Compact list** (tight rows that fit small tiles), or **Executive cards** (board-pack style cards).
- **Max items** — the most notes to show at once.
- **Sort order** — show **Newest first** or **Oldest first**.
- **Show KPI summary** — turn the number summary row on or off.
- **Show root cause** — show or hide the reason.
- **Show owner** — show or hide the person.
- **Show action** — show or hide the next step.
- **Show severity** — show or hide the severity badge.
- **Show status** — show or hide the status badge.
- **Compact mode** — squeeze the spacing to fit more in a small space.

### Formatting

- **Date format** — how dates look: **YYYY-MM-DD**, **DD MMM YYYY**, **DD/MM/YYYY**, or **MMM YYYY**.
- **Number format** — how numbers look: **Auto**, **Currency**, **Percentage**, **Decimal**, or **Whole number**.
- **Decimal places** — how many digits show after the dot (0 to 10).
- **Currency symbol** — the symbol used for money, like £ or $.

### Colors

- **Background** — the panel colour behind the notes.
- **Text** — the colour of the words.
- **Timeline line** — the colour of the line in the vertical layout.
- **Open / In progress / Closed / Blocked status** — pick a colour for each status badge.
- **Low / Medium / High / Critical severity** — pick a colour for each severity badge.

## If it looks empty or wrong

- **Nothing shows up?** Make sure you dragged a field into **Event Date**. The visual needs dates to build the timeline.
- **Notes missing?** Check **Max items** in the Display card. Raising it shows more notes.
- **Wrong order?** Switch **Sort order** between Newest first and Oldest first, or add a **Sort Order** field to set your own order.
- **Seeing many KPIs mixed together?** This visual works best with one KPI at a time. Use a page filter or slicer to pick a single KPI.
