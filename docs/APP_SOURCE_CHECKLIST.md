# AppSource Submission Checklist

## Packaging
- [ ] `pbiviz package` builds cleanly from a fresh clone.
- [ ] Unique stable GUID in `pbiviz.json`.
- [ ] Versions aligned across `package.json`, `pbiviz.json`, CHANGELOG, release tag.
- [ ] `assets/icon.png` 300×300 transparent.

## Sample content
- [ ] Sample `.pbix` with each layout demonstrated.
- [ ] Sample commentary table (CSV or Excel) shipped alongside.

## Documentation
- [ ] Privacy policy URL (state explicitly: no data leaves Power BI; no writeback).
- [ ] Support URL.
- [ ] Terms of use URL.
- [ ] Public README + USAGE + SAMPLE_DATA_MODEL + CHANGELOG.

## Listing assets
- [ ] ≥3 screenshots (1280×720) covering Vertical, Compact list, and Executive cards.
- [ ] Short and long description.
- [ ] Logos (300×300 and 48×48).

## Test cases
- [ ] Empty data.
- [ ] One row.
- [ ] Many rows (≥ `maxItems`).
- [ ] Long comment text.
- [ ] Missing optional fields.
- [ ] Unknown status raw value.
- [ ] Unknown severity raw value.
- [ ] Newest first / Oldest first.
- [ ] Compact mode auto-engages on small tile.
- [ ] High-contrast mode.

## Accessibility
- [ ] Aria-labels on each event and badge.
- [ ] Keyboard focus visible on every interactive item.
- [ ] Status/severity conveyed by text + colour.

## Security & privacy
- [ ] No outbound network calls.
- [ ] No third-party JS.
- [ ] `privileges` array empty.
- [ ] Visual is strictly read-only; no writeback.
