import { VrControl } from "../common";
import { ChartAreaSettings, ChartDataLabelAlignEnum, ChartDataLabelsAnchorEnum, ChartDataLabelsSettings, ChartLegendSettings, ChartTitleSettings, ChartTooltipSettings, ChartTypeEnum, ControlTypeEnum, ChartFont, ChartAspectRatioSettings, ChartOptions, ChartAxisFormatterEvent, ChartLegendClickEvent, ChartLegendLeaveEvent, ChartLegendHoverEvent, ChartLabelClickEvent, ChartLabelLeaveEvent, ChartLabelHoverEvent, ChartDataSource, puma } from "../vr";

declare var Chart: any;
declare var ChartDataLabels: any;

//#region Control
export class ChartVr extends VrControl
{
	private _chart: any;
	private _plugins: ChartPlugin;
	private _datasource: ChartDataSource[];

	constructor(element: HTMLElement, options?: ChartOptions | null)
	{
		//#region Options
		if (options == null)
			options = new ChartOptions();

		if (options.width == null) options.width = 400;
		if (options.height == null) options.height = 400;
		if (options.type == null) options.type = ChartTypeEnum.Bar;
		if (options.padding == null) options.padding = 0;
		if (options.showHideDatasetOnLegendClick == null) options.showHideDatasetOnLegendClick = true;
		if (options.responsive == null) options.responsive = true;

		if (options.stacked == null) options.stacked = false;
		if (options.type == ChartTypeEnum.StackedBar && options.stacked === false) options.stacked = true;
		if (options.stacked === true) options.stacked = { x: true, y: true };

		if (options.title == null) options.title = false;
		if (options.title === true) options.title = new ChartTitleSettings();
		if (options.subTitle == null) options.subTitle = false;
		if (options.subTitle === true) options.subTitle = new ChartTitleSettings();

		if (options.dataLabels == null) options.dataLabels = true;
		if (options.dataLabels === true) options.dataLabels = new ChartDataLabelsSettings();

		if (options.legend == null) options.legend = false;
		if (options.legend === true) options.legend = new ChartLegendSettings();

		if (options.tooltip == null) options.tooltip = true;
		if (options.tooltip === true) options.tooltip = new ChartTooltipSettings();
		//#endregion

		super(element, options, ControlTypeEnum.Chart);
		this._plugins = new ChartPlugin();

		//#region Title
		let title: any = undefined;
		if (options.title !== false)
		{
			if (typeof (options.title) == "string")
			{
				let text = options.title;
				options.title = new ChartTitleSettings();
				options.title.text = text;
			}

			(options.title as any).display = true;
			if (options.title.color == null) options.title.color = "#51B3E1";
			if (options.title.font == null) options.title.font = new ChartFont();
			if (options.title.font.size == null) options.title.font.size = 16;
			title = options.title;
		}
		this._plugins.title = title;
		//#endregion

		//#region SubTitle
		let subTitle: any = undefined;
		if (options.subTitle !== false)
		{
			if (typeof (options.subTitle) == "string")
			{
				let text = options.subTitle;
				options.subTitle = new ChartTitleSettings();
				options.subTitle.text = text;
			}

			(options.subTitle as any).display = true;
			if (options.subTitle.color == null) options.subTitle.color = "#666666";
			subTitle = options.subTitle;
		}
		this._plugins.subtitle = subTitle;
		//#endregion

		//#region Data labels
		let dataLabels: any = undefined;
		if (options.dataLabels !== false)
		{
			if (options.dataLabels.color == null) options.dataLabels.color = "#666666";
			if (options.dataLabels.anchor == null) options.dataLabels.anchor = ChartDataLabelsAnchorEnum.End;
			if (options.dataLabels.align == null) options.dataLabels.align = ChartDataLabelAlignEnum.End;
			if (options.dataLabels.padding == null) options.dataLabels.padding = { left: 5, right: 5 };
			dataLabels = options.dataLabels;

			if (options.onDataFormatter != null)
			{
				dataLabels.formatter = (value: any, context: any) => 
				{
					let axisFormatterEvent = new ChartAxisFormatterEvent();
					axisFormatterEvent.sender = this;
					axisFormatterEvent.value = value;
					axisFormatterEvent.context = context;
					return options!.onDataFormatter!(axisFormatterEvent);
				}
			}

			dataLabels.listeners = {
				enter: (context: any) =>
				{
					context.hovered = true;
					if (options!.onLabelHover != null)
					{
						let hoverEvent = new ChartLabelHoverEvent();
						hoverEvent.sender = this;
						hoverEvent.context = context;
						options!.onLabelHover(hoverEvent);
					}
					return true;
				},
				leave: (context: any) =>
				{
					context.hovered = false;
					if (options!.onLabelLeave != null)
					{
						let leaveEvent = new ChartLabelLeaveEvent();
						leaveEvent.sender = this;
						leaveEvent.context = context;
						options!.onLabelLeave(leaveEvent);
					}
					return true;
				},
				click: (context: any) =>
				{
					if (options!.onLabelClick != null)
					{
						let clickEvent = new ChartLabelClickEvent();
						clickEvent.sender = this;
						clickEvent.context = context;
						options!.onLabelClick(clickEvent);
					}
				}
			}
		}
		else
			dataLabels = { display: false };

		this._plugins.datalabels = dataLabels;
		//#endregion

		//#region Tooltip
		let tooltip: any = { enabled: false };
		if (options.tooltip !== false)
		{
			(options.tooltip as any).enabled = true;
			tooltip = options.tooltip;
		}
		this._plugins.tooltip = tooltip;
		//#endregion

		//#region Legend
		let legend: any = { display: false };
		if (options.legend !== false)
		{
			legend = {
				display: true,
				position: options.legend.position,
				align: options.legend.align,
				labels: options.legend.labels,
				title: options.legend.title,
				onHover: (e: any, legendItem: any, legend: any) =>
				{
					if (options!.onLegendHover != null)
					{
						let hoverEvent = new ChartLegendHoverEvent();
						hoverEvent.sender = this;
						hoverEvent.event = e;
						hoverEvent.legendItem = legendItem;
						hoverEvent.legend = legend;
						options!.onLegendHover(hoverEvent);
					}
				},
				onLeave: (e: any, legendItem: any, legend: any) =>
				{
					if (options!.onLegendLeave != null)
					{
						let leaveEvent = new ChartLegendLeaveEvent();
						leaveEvent.sender = this;
						leaveEvent.event = e;
						leaveEvent.legendItem = legendItem;
						leaveEvent.legend = legend;
						options!.onLegendLeave(leaveEvent);
					}
				},
				onClick: (e: any, legendItem: any, legend: any) =>
				{
					if (options!.showHideDatasetOnLegendClick)
					{
						if (legend.chart.config.type === ChartTypeEnum.Pie || legend.chart.config.type === ChartTypeEnum.Donut)
							Chart.controllers.doughnut.overrides.plugins.legend.onClick(e, legendItem, legend)
						else
							Chart.defaults.plugins.legend.onClick(e, legendItem, legend);
					}

					if (options!.onLegendClick != null)
					{
						let clickEvent = new ChartLegendClickEvent();
						clickEvent.sender = this;
						clickEvent.event = e;
						clickEvent.legendItem = legendItem;
						clickEvent.legend = legend;
						options!.onLegendClick(clickEvent);
					}
				}
			}
		}
		this._plugins.legend = legend;
		//#endregion

		//#region Scales
		if (options.scales == null) options.scales = {};
		if (options.scales.x == null) options.scales.x = {};
		options.scales.x.grace = "5%";
		if (options.scales.y == null) options.scales.y = {};
		options.scales.y.grace = "5%";

		if (options.type == ChartTypeEnum.Pie || options.type == ChartTypeEnum.Donut)
		{
			options.scales.x.display = false;
			options.scales.y.display = false;
		}

		if (options.stacked !== false)
		{
			options.scales.x.stacked = options.stacked.x;
			options.scales.y.stacked = options.stacked.y;
		}

		if (options.onAxisLabelFormatter != null)
		{
			let callback = (value: any, context: any) => 
			{
				let axisFormatterEvent = new ChartAxisFormatterEvent();
				axisFormatterEvent.sender = this;
				axisFormatterEvent.value = value;
				axisFormatterEvent.context = context;
				return options!.onAxisLabelFormatter!(axisFormatterEvent);
			};

			if (options.type == ChartTypeEnum.HorizontalBar)
			{
				options.scales.x.ticks = {
					callback: callback
				}
			}
			else
			{
				options.scales.y.ticks = {
					callback: callback
				}
			}
		}

		if (options.limit != null)
		{
			options.scales.x.min = options.limit.minX;
			options.scales.x.max = options.limit.maxX;
			options.scales.y.min = options.limit.minY;
			options.scales.y.max = options.limit.maxY;
		}
		//#endregion

		//#region Aspect ratio
		if (options.aspectRatio == null) options.aspectRatio = new ChartAspectRatioSettings();
		if (options.aspectRatio.maintain == null) options.aspectRatio.maintain = false;
		//#endregion

		//#region Data
		if (options.datasource == null) options.datasource = [];
		this.datasource(options.datasource);
		//#endregion
	}

	//#region Methods
	base64Data()
	{
		return (this.element() as HTMLCanvasElement).toDataURL().replace("data:image/png;base64,", "");
	}

	datasource(datasource?: ChartDataSource[])
	{
		if (this._chart != null)
			this._chart.destroy();

		let options = this.getOptions();
		let labels: string[] = [];

		if (datasource != null)
		{
			for (let dataset of datasource)
			{
				//#region Area settings
				if (options.type == ChartTypeEnum.Area || dataset.type == ChartTypeEnum.Area)
				{
					if (dataset.areaSettings == null) dataset.areaSettings = new ChartAreaSettings();
					if (dataset.areaSettings.target == null) dataset.areaSettings.target = "origin";
					if (dataset.areaSettings.above == null) dataset.areaSettings.above = "rgba(255, 99, 132, 0.2)";
					if (dataset.areaSettings.below == null) dataset.areaSettings.below = "rgba(255, 159, 64, 0.2)";
					(dataset as any).fill = dataset.areaSettings;
				}
				//#endregion
				else if (options.type == ChartTypeEnum.Line)
				{
					if (dataset.smoothLine == null) dataset.smoothLine = true;
					if (dataset.smoothLine) (dataset as any).tension = 0.4;
				}

				if (dataset.borderWidth == null) dataset.borderWidth = 1;
				if (dataset.title != null)
					(dataset as any).label = dataset.title;

				if (dataset.labels != null)
					labels.vrPushRange(dataset.labels);
			}

			this._datasource = datasource;
			let chartData = { labels: labels, datasets: datasource };
			this.createChart(chartData);
		}
		return this._datasource;
	}

	private createChart(chartData: any)
	{
		let options = this.getOptions();
		let type = (options.type == ChartTypeEnum.HorizontalBar || options.type == ChartTypeEnum.StackedBar) ? ChartTypeEnum.Bar : options.type;
		if (options.type == ChartTypeEnum.Area) type = ChartTypeEnum.Line;

		let config = {
			type: type,
			data: chartData,
			options: {
				responsive: options.responsive,
				maintainAspectRatio: options.aspectRatio!.maintain,
				aspectRatio: options.aspectRatio!.value,
				scales: options.scales,
				parsing: options.parsing,
				plugins: {
					datalabels: this._plugins.datalabels,
					title: this._plugins.title,
					subtitle: this._plugins.subtitle,
					legend: this._plugins.legend,
					tooltip: this._plugins.tooltip
				},
				indexAxis: (options.type == ChartTypeEnum.HorizontalBar) ? "y" : "x",
			},
			layout: { padding: options.padding },
			plugins: [ChartDataLabels]
		};
		this._chart = new Chart(this.element(), config);
	}

	getOptions()
	{
		return this.options<ChartOptions>();
	}
	//#endregion
}

export class BarChart extends ChartVr { }
export class HorizontalBarChart extends ChartVr { }
export class LineChart extends ChartVr { }
export class DonutChart extends ChartVr { }
export class PieChart extends ChartVr { }
export class AreaChart extends ChartVr { }
export class StackedBarChart extends ChartVr { }
//#endregion

//#region Classes
class ChartPlugin
{
	datalabels: any;
	title: any;
	subtitle: any;
	legend: any;
	tooltip: any;
}
//#endregion