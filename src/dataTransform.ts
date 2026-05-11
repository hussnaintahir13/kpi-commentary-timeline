import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import { KpiSummary, SortDirection, TimelineEvent, TimelineModel } from "./types";
import { normalizeSeverity, normalizeStatus } from "./formatting";

const safeNumber = (v: powerbi.PrimitiveValue | undefined | null): number | undefined => {
    if (v === undefined || v === null) return undefined;
    const n = Number(v);
    return isFinite(n) ? n : undefined;
};

const safeString = (v: powerbi.PrimitiveValue | undefined | null): string | undefined => {
    if (v === undefined || v === null) return undefined;
    const s = String(v).trim();
    return s.length === 0 ? undefined : s;
};

const safeDate = (v: powerbi.PrimitiveValue | undefined | null): Date | undefined => {
    if (v === undefined || v === null) return undefined;
    if (v instanceof Date) return v;
    const parsed = new Date(String(v));
    return isNaN(parsed.getTime()) ? undefined : parsed;
};

interface ColumnIndex {
    role: string;
    index: number;
}

function indexColumns(columns: DataViewMetadataColumn[]): ColumnIndex[] {
    const result: ColumnIndex[] = [];
    columns.forEach((c, i) => {
        const roles = c.roles || {};
        Object.keys(roles).forEach(role => {
            if (roles[role]) result.push({ role, index: i });
        });
    });
    return result;
}

export function extractModel(dataView: DataView | undefined, sort: SortDirection, maxItems: number): TimelineModel {
    if (!dataView || !dataView.table) {
        return { events: [], hasData: false };
    }
    const table = dataView.table;
    const rows = table.rows || [];
    if (rows.length === 0 || !table.columns) {
        return { events: [], hasData: false };
    }

    const roleByIndex: { [index: number]: string } = {};
    indexColumns(table.columns as DataViewMetadataColumn[]).forEach(c => { roleByIndex[c.index] = c.role; });

    const events: TimelineEvent[] = [];
    for (const row of rows) {
        const ev: TimelineEvent = {
            status: "Other",
            severity: "Normal"
        };

        row.forEach((cell, idx) => {
            const role = roleByIndex[idx];
            if (!role) return;
            switch (role) {
                case "eventDate":
                    ev.rawDate = safeString(cell);
                    ev.date = safeDate(cell);
                    break;
                case "kpiName":      ev.kpiName    = safeString(cell); break;
                case "commentText":  ev.comment    = safeString(cell); break;
                case "rootCause":    ev.rootCause  = safeString(cell); break;
                case "owner":        ev.owner      = safeString(cell); break;
                case "actionText":   ev.action     = safeString(cell); break;
                case "status":
                    ev.statusRaw = safeString(cell);
                    ev.status = normalizeStatus(ev.statusRaw);
                    break;
                case "severity":
                    ev.severityRaw = safeString(cell);
                    ev.severity = normalizeSeverity(ev.severityRaw);
                    break;
                case "currentValue":    ev.currentValue    = safeNumber(cell); break;
                case "previousValue":   ev.previousValue   = safeNumber(cell); break;
                case "varianceValue":   ev.varianceValue   = safeNumber(cell); break;
                case "variancePercent": ev.variancePercent = safeNumber(cell); break;
                case "sortOrder":       ev.sortOrder       = safeNumber(cell); break;
            }
        });

        // Derive variance if missing
        if (ev.varianceValue === undefined && ev.currentValue !== undefined && ev.previousValue !== undefined) {
            ev.varianceValue = ev.currentValue - ev.previousValue;
        }
        if (ev.variancePercent === undefined && ev.varianceValue !== undefined && ev.previousValue && ev.previousValue !== 0) {
            ev.variancePercent = (ev.varianceValue / Math.abs(ev.previousValue)) * 100;
        }

        events.push(ev);
    }

    const sorted = sortEvents(events, sort);
    const limited = sorted.slice(0, Math.max(1, maxItems));

    const summary = buildSummary(limited);

    return {
        events: limited,
        summary,
        hasData: limited.length > 0
    };
}

function sortEvents(events: TimelineEvent[], sort: SortDirection): TimelineEvent[] {
    const hasExplicit = events.some(e => e.sortOrder !== undefined);
    return [...events].sort((a, b) => {
        if (hasExplicit) {
            const ao = a.sortOrder ?? Number.POSITIVE_INFINITY;
            const bo = b.sortOrder ?? Number.POSITIVE_INFINITY;
            if (ao !== bo) return sort === "newest" ? bo - ao : ao - bo;
        }
        const at = a.date ? a.date.getTime() : 0;
        const bt = b.date ? b.date.getTime() : 0;
        return sort === "newest" ? bt - at : at - bt;
    });
}

function buildSummary(events: TimelineEvent[]): KpiSummary | undefined {
    const first = events.find(e =>
        e.currentValue !== undefined ||
        e.previousValue !== undefined ||
        e.varianceValue !== undefined ||
        e.variancePercent !== undefined
    );
    if (!first) return undefined;
    return {
        kpiName: first.kpiName,
        currentValue: first.currentValue,
        previousValue: first.previousValue,
        varianceValue: first.varianceValue,
        variancePercent: first.variancePercent
    };
}
