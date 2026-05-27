import { ColorScheme, FormatOptions, KpiSummary, SeverityLevel, StatusLevel, TimelineEvent, TimelineLayout } from "./types";
import { formatDate, formatPercent, formatValue, truncate } from "./formatting";

export interface RenderOptions {
    layout: TimelineLayout;
    showKpiSummary: boolean;
    showRootCause: boolean;
    showOwner: boolean;
    showAction: boolean;
    showSeverity: boolean;
    showStatus: boolean;
    compactMode: boolean;
    colors: ColorScheme;
    format: FormatOptions;
    title: string;
}

const COMMENT_MAX_LONG = 320;
const COMMENT_MAX_COMPACT = 120;

export function statusColor(status: StatusLevel, c: ColorScheme): string {
    switch (status) {
        case "Open":        return c.open;
        case "In Progress": return c.inProgress;
        case "Closed":      return c.closed;
        case "Blocked":     return c.blocked;
        default:            return c.text;
    }
}

export function severityColor(sev: SeverityLevel, c: ColorScheme): string {
    switch (sev) {
        case "Low":      return c.low;
        case "Medium":   return c.medium;
        case "High":     return c.high;
        case "Critical": return c.critical;
        default:         return c.text;
    }
}

export function renderTimeline(root: HTMLElement, events: TimelineEvent[], summary: KpiSummary | undefined, opts: RenderOptions): void {
    while (root.firstChild) root.removeChild(root.firstChild);
    root.style.background = opts.colors.background;
    root.style.color = opts.colors.text;
    root.style.setProperty("--kct-line", opts.colors.line);
    root.classList.toggle("compact", opts.compactMode);
    root.dataset.layout = opts.layout;

    const header = document.createElement("h2");
    header.className = "kct-title";
    header.textContent = opts.title;
    root.appendChild(header);

    if (opts.showKpiSummary && summary) {
        root.appendChild(renderSummary(summary, opts));
    }

    if (events.length === 0) {
        renderEmpty(root);
        return;
    }

    if (opts.layout === "compact") {
        root.appendChild(renderCompactList(events, opts));
    } else if (opts.layout === "executive") {
        root.appendChild(renderExecutiveCards(events, opts));
    } else {
        root.appendChild(renderVertical(events, opts));
    }
}

function renderEmpty(root: HTMLElement): void {
    const wrap = document.createElement("div");
    wrap.className = "kct-empty";
    wrap.setAttribute("role", "status");
    const h = document.createElement("h3");
    h.textContent = "No commentary available";
    wrap.appendChild(h);
    const p = document.createElement("p");
    p.textContent = "No commentary available for the selected context. Bind Event Date, KPI Name and Comment fields, or adjust your filters.";
    wrap.appendChild(p);
    root.appendChild(wrap);
}

function renderSummary(s: KpiSummary, opts: RenderOptions): HTMLElement {
    const wrap = document.createElement("div");
    wrap.className = "kct-summary";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "KPI summary");

    const add = (label: string, value: string | undefined, tone?: string): void => {
        if (value === undefined || value === "—") return;
        const item = document.createElement("div");
        item.className = "kct-summary-item";
        const l = document.createElement("div"); l.className = "kct-summary-label"; l.textContent = label;
        const v = document.createElement("div"); v.className = "kct-summary-value"; v.textContent = value;
        if (tone) v.style.color = tone;
        item.appendChild(l); item.appendChild(v);
        wrap.appendChild(item);
    };

    if (s.kpiName) add("KPI", s.kpiName);
    add("Current", formatValue(s.currentValue, opts.format.numberFormat, opts.format.currencySymbol, opts.format.decimalPlaces));
    add("Previous", formatValue(s.previousValue, opts.format.numberFormat, opts.format.currencySymbol, opts.format.decimalPlaces));
    const varianceTone = s.varianceValue !== undefined
        ? (s.varianceValue > 0 ? opts.colors.closed : s.varianceValue < 0 ? opts.colors.critical : opts.colors.text)
        : undefined;
    add("Variance", formatValue(s.varianceValue, opts.format.numberFormat, opts.format.currencySymbol, opts.format.decimalPlaces), varianceTone);
    add("Variance %", formatPercent(s.variancePercent), varianceTone);
    return wrap;
}

function renderVertical(events: TimelineEvent[], opts: RenderOptions): HTMLElement {
    const list = document.createElement("ol");
    list.className = "kct-vertical";
    list.setAttribute("role", "list");
    events.forEach(ev => list.appendChild(renderVerticalItem(ev, opts)));
    return list;
}

function renderVerticalItem(ev: TimelineEvent, opts: RenderOptions): HTMLElement {
    const li = document.createElement("li");
    li.className = "kct-event";
    li.setAttribute("role", "listitem");
    li.setAttribute("tabindex", "0");

    const dot = document.createElement("span");
    dot.className = "kct-dot";
    dot.setAttribute("aria-hidden", "true");
    dot.style.background = severityColor(ev.severity, opts.colors);
    li.appendChild(dot);

    const body = document.createElement("div");
    body.className = "kct-event-body";

    const head = document.createElement("div");
    head.className = "kct-event-head";
    const dateEl = document.createElement("span");
    dateEl.className = "kct-date";
    dateEl.textContent = formatDate(ev.date, ev.rawDate, opts.format.dateFormat);
    head.appendChild(dateEl);

    if (ev.kpiName) {
        const kpi = document.createElement("span");
        kpi.className = "kct-kpi";
        kpi.textContent = ev.kpiName;
        head.appendChild(kpi);
    }
    appendBadges(head, ev, opts);

    body.appendChild(head);

    if (ev.comment) {
        const p = document.createElement("p");
        p.className = "kct-comment";
        p.textContent = truncate(ev.comment, COMMENT_MAX_LONG);
        if (ev.comment.length > COMMENT_MAX_LONG) p.title = ev.comment;
        body.appendChild(p);
    }

    const meta = renderMeta(ev, opts);
    if (meta.children.length > 0) body.appendChild(meta);

    li.appendChild(body);
    li.setAttribute("aria-label", buildAriaLabel(ev, opts));
    return li;
}

function renderCompactList(events: TimelineEvent[], opts: RenderOptions): HTMLElement {
    const list = document.createElement("ul");
    list.className = "kct-compact-list";
    list.setAttribute("role", "list");
    events.forEach(ev => {
        const li = document.createElement("li");
        li.className = "kct-compact-item";
        li.setAttribute("tabindex", "0");
        li.setAttribute("aria-label", buildAriaLabel(ev, opts));

        const date = document.createElement("span");
        date.className = "kct-date";
        date.textContent = formatDate(ev.date, ev.rawDate, opts.format.dateFormat);

        const kpi = document.createElement("span");
        kpi.className = "kct-kpi";
        kpi.textContent = ev.kpiName || "";

        const comment = document.createElement("span");
        comment.className = "kct-compact-comment";
        comment.textContent = truncate(ev.comment, COMMENT_MAX_COMPACT);
        if (ev.comment && ev.comment.length > COMMENT_MAX_COMPACT) comment.title = ev.comment;

        const badges = document.createElement("span");
        badges.className = "kct-badges";
        appendBadges(badges, ev, opts);

        li.appendChild(date);
        li.appendChild(kpi);
        li.appendChild(comment);
        li.appendChild(badges);
        list.appendChild(li);
    });
    return list;
}

function renderExecutiveCards(events: TimelineEvent[], opts: RenderOptions): HTMLElement {
    const grid = document.createElement("div");
    grid.className = "kct-exec-grid";
    grid.setAttribute("role", "list");
    events.forEach(ev => {
        const card = document.createElement("article");
        card.className = "kct-exec-card";
        card.setAttribute("role", "listitem");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", buildAriaLabel(ev, opts));
        card.style.borderLeftColor = severityColor(ev.severity, opts.colors);

        const head = document.createElement("header");
        head.className = "kct-exec-head";
        const date = document.createElement("span"); date.className = "kct-date"; date.textContent = formatDate(ev.date, ev.rawDate, opts.format.dateFormat);
        head.appendChild(date);
        if (ev.kpiName) {
            const k = document.createElement("span"); k.className = "kct-kpi"; k.textContent = ev.kpiName;
            head.appendChild(k);
        }
        appendBadges(head, ev, opts);
        card.appendChild(head);

        if (ev.comment) {
            const p = document.createElement("p"); p.className = "kct-comment";
            p.textContent = truncate(ev.comment, COMMENT_MAX_LONG);
            if (ev.comment.length > COMMENT_MAX_LONG) p.title = ev.comment;
            card.appendChild(p);
        }
        const meta = renderMeta(ev, opts);
        if (meta.children.length > 0) card.appendChild(meta);
        grid.appendChild(card);
    });
    return grid;
}

function renderMeta(ev: TimelineEvent, opts: RenderOptions): HTMLElement {
    const meta = document.createElement("dl");
    meta.className = "kct-meta";
    const add = (term: string, def: string | undefined): void => {
        if (!def) return;
        const dt = document.createElement("dt"); dt.textContent = term;
        const dd = document.createElement("dd"); dd.textContent = def;
        meta.appendChild(dt);
        meta.appendChild(dd);
    };
    if (opts.showRootCause) add("Root cause", ev.rootCause);
    if (opts.showOwner)     add("Owner", ev.owner);
    if (opts.showAction)    add("Action", ev.action);
    return meta;
}

function appendBadges(parent: HTMLElement, ev: TimelineEvent, opts: RenderOptions): void {
    if (opts.showStatus && ev.status !== "Other") {
        const badge = document.createElement("span");
        badge.className = "kct-badge status";
        badge.textContent = ev.status;
        badge.style.background = statusColor(ev.status, opts.colors);
        badge.setAttribute("aria-label", `Status: ${ev.status}`);
        parent.appendChild(badge);
    } else if (opts.showStatus && ev.statusRaw) {
        const badge = document.createElement("span");
        badge.className = "kct-badge status other";
        badge.textContent = ev.statusRaw;
        badge.setAttribute("aria-label", `Status: ${ev.statusRaw}`);
        parent.appendChild(badge);
    }
    if (opts.showSeverity && ev.severity !== "Normal") {
        const badge = document.createElement("span");
        badge.className = "kct-badge severity";
        badge.textContent = ev.severity;
        badge.style.background = severityColor(ev.severity, opts.colors);
        badge.setAttribute("aria-label", `Severity: ${ev.severity}`);
        parent.appendChild(badge);
    }
}

function buildAriaLabel(ev: TimelineEvent, opts: RenderOptions): string {
    const parts: string[] = [];
    parts.push(formatDate(ev.date, ev.rawDate, opts.format.dateFormat));
    if (ev.kpiName) parts.push(ev.kpiName);
    if (ev.comment) parts.push(truncate(ev.comment, 200));
    if (ev.status !== "Other") parts.push(`status ${ev.status}`);
    if (ev.severity !== "Normal") parts.push(`severity ${ev.severity}`);
    return parts.join(". ");
}
