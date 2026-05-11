export type StatusLevel = "Open" | "In Progress" | "Closed" | "Blocked" | "Other";
export type SeverityLevel = "Low" | "Medium" | "High" | "Critical" | "Normal";
export type TimelineLayout = "vertical" | "compact" | "executive";
export type SortDirection = "newest" | "oldest";
export type DateFormat = "iso" | "long" | "short" | "month";
export type NumberFormat = "auto" | "currency" | "percentage" | "decimal" | "whole";

export interface TimelineEvent {
    date?: Date;
    rawDate?: string;
    kpiName?: string;
    comment?: string;
    rootCause?: string;
    owner?: string;
    action?: string;
    status: StatusLevel;
    statusRaw?: string;
    severity: SeverityLevel;
    severityRaw?: string;
    currentValue?: number;
    previousValue?: number;
    varianceValue?: number;
    variancePercent?: number;
    sortOrder?: number;
}

export interface KpiSummary {
    kpiName?: string;
    currentValue?: number;
    previousValue?: number;
    varianceValue?: number;
    variancePercent?: number;
}

export interface TimelineModel {
    events: TimelineEvent[];
    summary?: KpiSummary;
    hasData: boolean;
}

export interface ColorScheme {
    background: string;
    text: string;
    line: string;
    open: string;
    inProgress: string;
    closed: string;
    blocked: string;
    low: string;
    medium: string;
    high: string;
    critical: string;
}

export interface FormatOptions {
    dateFormat: DateFormat;
    numberFormat: NumberFormat;
    decimalPlaces: number;
    currencySymbol: string;
}
