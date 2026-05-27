import "./../style/visual.less";

import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";

import { VisualSettings } from "./settings";
import { extractModel } from "./dataTransform";
import { renderTimeline, RenderOptions } from "./timelineRenderer";
import { buildFormatOptions } from "./formatting";
import { ColorScheme, DateFormat, NumberFormat, SortDirection, TimelineLayout } from "./types";

export class Visual implements IVisual {
    private root: HTMLElement;
    private settings: VisualSettings = new VisualSettings();
    private formattingSettingsService: FormattingSettingsService;

    constructor(options?: VisualConstructorOptions) {
        if (!options) {
            throw new Error("KPI Commentary Timeline: VisualConstructorOptions are required.");
        }
        this.root = options.element;
        this.root.classList.add("kct-root");
        this.formattingSettingsService = new FormattingSettingsService();
    }

    public update(options: VisualUpdateOptions): void {
        const dataView = options.dataViews && options.dataViews[0];
        this.settings = this.formattingSettingsService.populateFormattingSettingsModel(VisualSettings, dataView);

        const display = this.settings.display;
        const sort = (display.sortOrder.value.value as SortDirection) || "newest";
        const layout = (display.timelineLayout.value.value as TimelineLayout) || "vertical";
        const maxItems = Math.max(1, Math.floor(display.maxItems.value || 50));

        const model = extractModel(dataView, sort, maxItems);

        const opts: RenderOptions = {
            layout,
            showKpiSummary: display.showKpiSummary.value,
            showRootCause: display.showRootCause.value,
            showOwner: display.showOwner.value,
            showAction: display.showAction.value,
            showSeverity: display.showSeverity.value,
            showStatus: display.showStatus.value,
            compactMode: display.compactMode.value || options.viewport.width < 360,
            colors: this.colors(),
            format: buildFormatOptions(
                (this.settings.formatting.dateFormat.value.value as DateFormat) || "long",
                (this.settings.formatting.numberFormat.value.value as NumberFormat) || "auto",
                this.settings.formatting.decimalPlaces.value,
                this.settings.formatting.currencySymbol.value || "£"
            ),
            title: display.titleText.value || "KPI Commentary Timeline"
        };

        renderTimeline(this.root, model.events, model.summary, opts);
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.settings);
    }

    private colors(): ColorScheme {
        const c = this.settings.colors;
        return {
            background: c.backgroundColor.value.value,
            text: c.textColor.value.value,
            line: c.timelineLineColor.value.value,
            open: c.openColor.value.value,
            inProgress: c.inProgressColor.value.value,
            closed: c.closedColor.value.value,
            blocked: c.blockedColor.value.value,
            low: c.lowColor.value.value,
            medium: c.mediumColor.value.value,
            high: c.highColor.value.value,
            critical: c.criticalColor.value.value
        };
    }
}
