import { VrControl } from "../common";
import { ChartOptions, ChartDataSource } from "../vr";
export declare class ChartVr extends VrControl {
    private _chart;
    private _plugins;
    private _datasource;
    constructor(element: HTMLElement, options?: ChartOptions | null);
    base64Data(): string;
    datasource(datasource?: ChartDataSource[]): ChartDataSource[];
    private createChart;
    getOptions(): ChartOptions;
}
export declare class BarChart extends ChartVr {
}
export declare class HorizontalBarChart extends ChartVr {
}
export declare class LineChart extends ChartVr {
}
export declare class DonutChart extends ChartVr {
}
export declare class PieChart extends ChartVr {
}
export declare class AreaChart extends ChartVr {
}
export declare class StackedBarChart extends ChartVr {
}
