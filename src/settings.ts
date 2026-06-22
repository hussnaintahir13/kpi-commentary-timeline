import powerbi from "powerbi-visuals-api";
import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import ValidatorType = powerbi.visuals.ValidatorType;
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;
import FormattingSettingsSlice = formattingSettings.Slice;

class DisplayCard extends FormattingSettingsCard {
    name = "display";
    displayName = "Display";

    titleText = new formattingSettings.TextInput({ name: "titleText", displayName: "Visual title", value: "KPI Commentary Timeline", placeholder: "KPI Commentary Timeline" });
    timelineLayout = new formattingSettings.ItemDropdown({
        name: "timelineLayout", displayName: "Timeline layout",
        items: [
            { value: "vertical", displayName: "Vertical" },
            { value: "compact", displayName: "Compact list" },
            { value: "executive", displayName: "Executive cards" }
        ],
        value: { value: "vertical", displayName: "Vertical" }
    });
    maxItems = new formattingSettings.NumUpDown({
        name: "maxItems", displayName: "Max items", value: 50,
        options: { minValue: { value: 1, type: ValidatorType.Min } }
    });
    sortOrder = new formattingSettings.ItemDropdown({
        name: "sortOrder", displayName: "Sort order",
        items: [
            { value: "newest", displayName: "Newest first" },
            { value: "oldest", displayName: "Oldest first" }
        ],
        value: { value: "newest", displayName: "Newest first" }
    });
    showKpiSummary = new formattingSettings.ToggleSwitch({ name: "showKpiSummary", displayName: "Show KPI summary", value: true });
    showRootCause = new formattingSettings.ToggleSwitch({ name: "showRootCause", displayName: "Show root cause", value: true });
    showOwner = new formattingSettings.ToggleSwitch({ name: "showOwner", displayName: "Show owner", value: true });
    showAction = new formattingSettings.ToggleSwitch({ name: "showAction", displayName: "Show action", value: true });
    showSeverity = new formattingSettings.ToggleSwitch({ name: "showSeverity", displayName: "Show severity", value: true });
    showStatus = new formattingSettings.ToggleSwitch({ name: "showStatus", displayName: "Show status", value: true });
    compactMode = new formattingSettings.ToggleSwitch({ name: "compactMode", displayName: "Compact mode", value: false });

    slices: FormattingSettingsSlice[] = [
        this.titleText, this.timelineLayout, this.maxItems, this.sortOrder,
        this.showKpiSummary, this.showRootCause, this.showOwner, this.showAction,
        this.showSeverity, this.showStatus, this.compactMode
    ];
}

class FormattingCard extends FormattingSettingsCard {
    name = "formatting";
    displayName = "Formatting";
    dateFormat = new formattingSettings.ItemDropdown({
        name: "dateFormat", displayName: "Date format",
        items: [
            { value: "iso", displayName: "YYYY-MM-DD" },
            { value: "long", displayName: "DD MMM YYYY" },
            { value: "short", displayName: "DD/MM/YYYY" },
            { value: "month", displayName: "MMM YYYY" }
        ],
        value: { value: "long", displayName: "DD MMM YYYY" }
    });
    numberFormat = new formattingSettings.ItemDropdown({
        name: "numberFormat", displayName: "Number format",
        items: [
            { value: "auto", displayName: "Auto" },
            { value: "currency", displayName: "Currency" },
            { value: "percentage", displayName: "Percentage" },
            { value: "decimal", displayName: "Decimal" },
            { value: "whole", displayName: "Whole number" }
        ],
        value: { value: "auto", displayName: "Auto" }
    });
    decimalPlaces = new formattingSettings.NumUpDown({
        name: "decimalPlaces", displayName: "Decimal places", value: 1,
        options: {
            minValue: { value: 0, type: ValidatorType.Min },
            maxValue: { value: 10, type: ValidatorType.Max }
        }
    });
    currencySymbol = new formattingSettings.TextInput({ name: "currencySymbol", displayName: "Currency symbol", value: "£", placeholder: "£" });

    slices: FormattingSettingsSlice[] = [this.dateFormat, this.numberFormat, this.decimalPlaces, this.currencySymbol];
}

class ColorsCard extends FormattingSettingsCard {
    name = "colors";
    displayName = "Colors";

    backgroundColor = new formattingSettings.ColorPicker({ name: "backgroundColor", displayName: "Background", value: { value: "#FFFFFF" } });
    textColor = new formattingSettings.ColorPicker({ name: "textColor", displayName: "Text", value: { value: "#252423" } });
    timelineLineColor = new formattingSettings.ColorPicker({ name: "timelineLineColor", displayName: "Timeline line", value: { value: "#C8C6C4" } });
    openColor = new formattingSettings.ColorPicker({ name: "openColor", displayName: "Open status", value: { value: "#0078D4" } });
    inProgressColor = new formattingSettings.ColorPicker({ name: "inProgressColor", displayName: "In progress status", value: { value: "#D9822B" } });
    closedColor = new formattingSettings.ColorPicker({ name: "closedColor", displayName: "Closed status", value: { value: "#107C10" } });
    blockedColor = new formattingSettings.ColorPicker({ name: "blockedColor", displayName: "Blocked status", value: { value: "#605E5C" } });
    lowColor = new formattingSettings.ColorPicker({ name: "lowColor", displayName: "Low severity", value: { value: "#107C10" } });
    mediumColor = new formattingSettings.ColorPicker({ name: "mediumColor", displayName: "Medium severity", value: { value: "#D9822B" } });
    highColor = new formattingSettings.ColorPicker({ name: "highColor", displayName: "High severity", value: { value: "#B85C00" } });
    criticalColor = new formattingSettings.ColorPicker({ name: "criticalColor", displayName: "Critical severity", value: { value: "#A4262C" } });

    slices: FormattingSettingsSlice[] = [
        this.backgroundColor, this.textColor, this.timelineLineColor,
        this.openColor, this.inProgressColor, this.closedColor, this.blockedColor,
        this.lowColor, this.mediumColor, this.highColor, this.criticalColor
    ];
}

export class VisualSettings extends FormattingSettingsModel {
    display = new DisplayCard();
    formatting = new FormattingCard();
    colors = new ColorsCard();
    cards = [this.display, this.formatting, this.colors];
}
