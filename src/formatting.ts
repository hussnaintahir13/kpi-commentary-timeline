import { DateFormat, FormatOptions, NumberFormat, SeverityLevel, StatusLevel } from "./types";

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Clamp decimal places into the range accepted by toFixed/toLocaleString (0–10 per visual settings)
// to avoid a RangeError if a user-set value ever falls outside the allowed bounds.
function clampDecimals(decimals: number): number {
    const dp = Math.floor(Number(decimals));
    if (!isFinite(dp)) return 0;
    return Math.max(0, Math.min(10, dp));
}

export function formatDate(date: Date | undefined, raw: string | undefined, format: DateFormat): string {
    if (!date || isNaN(date.getTime())) return raw || "—";
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    switch (format) {
        case "long":  return `${d} ${MONTHS_SHORT[date.getMonth()]} ${y}`;
        case "short": return `${d}/${m}/${y}`;
        case "month": return `${MONTHS_SHORT[date.getMonth()]} ${y}`;
        case "iso":
        default:      return `${y}-${m}-${d}`;
    }
}

export function formatValue(value: number | undefined, format: NumberFormat, currencySymbol: string, decimals: number): string {
    if (value === undefined || value === null || !isFinite(value)) return "—";
    switch (format) {
        case "currency":   return `${currencySymbol}${formatNumber(value, decimals)}`;
        case "percentage": return `${formatNumber(value, decimals)}%`;
        case "whole":      return formatNumber(value, 0);
        case "decimal":    return formatNumber(value, decimals);
        case "auto":
        default:           return formatAuto(value, decimals);
    }
}

function formatAuto(value: number, decimals: number): string {
    const dp = clampDecimals(decimals);
    const abs = Math.abs(value);
    if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(dp)}B`;
    if (abs >= 1_000_000)     return `${(value / 1_000_000).toFixed(dp)}M`;
    if (abs >= 1_000)         return `${(value / 1_000).toFixed(dp)}K`;
    return formatNumber(value, dp);
}

function formatNumber(value: number, decimals: number): string {
    const dp = clampDecimals(decimals);
    return value.toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

export function formatPercent(value: number | undefined, decimals = 1): string {
    if (value === undefined || value === null || !isFinite(value)) return "—";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(clampDecimals(decimals))}%`;
}

export function normalizeStatus(raw: string | undefined): StatusLevel {
    if (!raw) return "Other";
    const s = String(raw).toLowerCase().trim();
    if (s === "open" || s === "opened") return "Open";
    if (s === "progress" || s === "in progress" || s === "ongoing") return "In Progress";
    if (s === "closed" || s === "complete" || s === "completed" || s === "done") return "Closed";
    if (s === "blocked" || s === "delayed") return "Blocked";
    return "Other";
}

export function normalizeSeverity(raw: string | undefined): SeverityLevel {
    if (!raw) return "Normal";
    const s = String(raw).toLowerCase().trim();
    if (s === "low") return "Low";
    if (s === "medium" || s === "med") return "Medium";
    if (s === "high") return "High";
    if (s === "critical" || s === "severe") return "Critical";
    return "Normal";
}

export function truncate(text: string | undefined, max: number): string {
    if (!text) return "";
    if (text.length <= max) return text;
    return text.slice(0, max - 1).trimEnd() + "…";
}

export function buildFormatOptions(dateFormat: DateFormat, numberFormat: NumberFormat, decimalPlaces: number, currencySymbol: string): FormatOptions {
    return { dateFormat, numberFormat, decimalPlaces, currencySymbol };
}
