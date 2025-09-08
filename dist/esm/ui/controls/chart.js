import { VrControl } from "../common.js";
import { ChartTypeEnum, ChartTitleSettings, ChartDataLabelsSettings, ChartLegendSettings, ChartTooltipSettings, ControlTypeEnum, ChartFont, ChartDataLabelsAnchorEnum, ChartDataLabelAlignEnum, ChartAxisFormatterEvent, ChartLabelClickEvent, ChartLabelLeaveEvent, ChartLabelHoverEvent, ChartLegendClickEvent, ChartLegendLeaveEvent, ChartLegendHoverEvent, ChartAspectRatioSettings, ChartAreaSettings, ChartOptions } from "../vr.js";
class ChartVr extends VrControl {
  _chart;
  _plugins;
  _datasource;
  constructor(element, options) {
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
    super(element, options, ControlTypeEnum.Chart);
    this._plugins = new ChartPlugin();
    let title = void 0;
    if (options.title !== false) {
      if (typeof options.title == "string") {
        let text = options.title;
        options.title = new ChartTitleSettings();
        options.title.text = text;
      }
      options.title.display = true;
      if (options.title.color == null) options.title.color = "#51B3E1";
      if (options.title.font == null) options.title.font = new ChartFont();
      if (options.title.font.size == null) options.title.font.size = 16;
      title = options.title;
    }
    this._plugins.title = title;
    let subTitle = void 0;
    if (options.subTitle !== false) {
      if (typeof options.subTitle == "string") {
        let text = options.subTitle;
        options.subTitle = new ChartTitleSettings();
        options.subTitle.text = text;
      }
      options.subTitle.display = true;
      if (options.subTitle.color == null) options.subTitle.color = "#666666";
      subTitle = options.subTitle;
    }
    this._plugins.subtitle = subTitle;
    let dataLabels = void 0;
    if (options.dataLabels !== false) {
      if (options.dataLabels.color == null) options.dataLabels.color = "#666666";
      if (options.dataLabels.anchor == null) options.dataLabels.anchor = ChartDataLabelsAnchorEnum.End;
      if (options.dataLabels.align == null) options.dataLabels.align = ChartDataLabelAlignEnum.End;
      if (options.dataLabels.padding == null) options.dataLabels.padding = { left: 5, right: 5 };
      dataLabels = options.dataLabels;
      if (options.onDataFormatter != null) {
        dataLabels.formatter = (value, context) => {
          let axisFormatterEvent = new ChartAxisFormatterEvent();
          axisFormatterEvent.sender = this;
          axisFormatterEvent.value = value;
          axisFormatterEvent.context = context;
          return options.onDataFormatter(axisFormatterEvent);
        };
      }
      dataLabels.listeners = {
        enter: (context) => {
          context.hovered = true;
          if (options.onLabelHover != null) {
            let hoverEvent = new ChartLabelHoverEvent();
            hoverEvent.sender = this;
            hoverEvent.context = context;
            options.onLabelHover(hoverEvent);
          }
          return true;
        },
        leave: (context) => {
          context.hovered = false;
          if (options.onLabelLeave != null) {
            let leaveEvent = new ChartLabelLeaveEvent();
            leaveEvent.sender = this;
            leaveEvent.context = context;
            options.onLabelLeave(leaveEvent);
          }
          return true;
        },
        click: (context) => {
          if (options.onLabelClick != null) {
            let clickEvent = new ChartLabelClickEvent();
            clickEvent.sender = this;
            clickEvent.context = context;
            options.onLabelClick(clickEvent);
          }
        }
      };
    } else
      dataLabels = { display: false };
    this._plugins.datalabels = dataLabels;
    let tooltip = { enabled: false };
    if (options.tooltip !== false) {
      options.tooltip.enabled = true;
      tooltip = options.tooltip;
    }
    this._plugins.tooltip = tooltip;
    let legend = { display: false };
    if (options.legend !== false) {
      legend = {
        display: true,
        position: options.legend.position,
        align: options.legend.align,
        labels: options.legend.labels,
        title: options.legend.title,
        onHover: (e, legendItem, legend2) => {
          if (options.onLegendHover != null) {
            let hoverEvent = new ChartLegendHoverEvent();
            hoverEvent.sender = this;
            hoverEvent.event = e;
            hoverEvent.legendItem = legendItem;
            hoverEvent.legend = legend2;
            options.onLegendHover(hoverEvent);
          }
        },
        onLeave: (e, legendItem, legend2) => {
          if (options.onLegendLeave != null) {
            let leaveEvent = new ChartLegendLeaveEvent();
            leaveEvent.sender = this;
            leaveEvent.event = e;
            leaveEvent.legendItem = legendItem;
            leaveEvent.legend = legend2;
            options.onLegendLeave(leaveEvent);
          }
        },
        onClick: (e, legendItem, legend2) => {
          if (options.showHideDatasetOnLegendClick) {
            if (legend2.chart.config.type === ChartTypeEnum.Pie || legend2.chart.config.type === ChartTypeEnum.Donut)
              Chart.controllers.doughnut.overrides.plugins.legend.onClick(e, legendItem, legend2);
            else
              Chart.defaults.plugins.legend.onClick(e, legendItem, legend2);
          }
          if (options.onLegendClick != null) {
            let clickEvent = new ChartLegendClickEvent();
            clickEvent.sender = this;
            clickEvent.event = e;
            clickEvent.legendItem = legendItem;
            clickEvent.legend = legend2;
            options.onLegendClick(clickEvent);
          }
        }
      };
    }
    this._plugins.legend = legend;
    if (options.scales == null) options.scales = {};
    if (options.scales.x == null) options.scales.x = {};
    options.scales.x.grace = "5%";
    if (options.scales.y == null) options.scales.y = {};
    options.scales.y.grace = "5%";
    if (options.type == ChartTypeEnum.Pie || options.type == ChartTypeEnum.Donut) {
      options.scales.x.display = false;
      options.scales.y.display = false;
    }
    if (options.stacked !== false) {
      options.scales.x.stacked = options.stacked.x;
      options.scales.y.stacked = options.stacked.y;
    }
    if (options.onAxisLabelFormatter != null) {
      let callback = (value, context) => {
        let axisFormatterEvent = new ChartAxisFormatterEvent();
        axisFormatterEvent.sender = this;
        axisFormatterEvent.value = value;
        axisFormatterEvent.context = context;
        return options.onAxisLabelFormatter(axisFormatterEvent);
      };
      if (options.type == ChartTypeEnum.HorizontalBar) {
        options.scales.x.ticks = {
          callback
        };
      } else {
        options.scales.y.ticks = {
          callback
        };
      }
    }
    if (options.limit != null) {
      options.scales.x.min = options.limit.minX;
      options.scales.x.max = options.limit.maxX;
      options.scales.y.min = options.limit.minY;
      options.scales.y.max = options.limit.maxY;
    }
    if (options.aspectRatio == null) options.aspectRatio = new ChartAspectRatioSettings();
    if (options.aspectRatio.maintain == null) options.aspectRatio.maintain = false;
    if (options.datasource == null) options.datasource = [];
    this.datasource(options.datasource);
  }
  //#region Methods
  base64Data() {
    return this.element().toDataURL().replace("data:image/png;base64,", "");
  }
  datasource(datasource) {
    if (this._chart != null)
      this._chart.destroy();
    let options = this.getOptions();
    let labels = [];
    if (datasource != null) {
      for (let dataset of datasource) {
        if (options.type == ChartTypeEnum.Area || dataset.type == ChartTypeEnum.Area) {
          if (dataset.areaSettings == null) dataset.areaSettings = new ChartAreaSettings();
          if (dataset.areaSettings.target == null) dataset.areaSettings.target = "origin";
          if (dataset.areaSettings.above == null) dataset.areaSettings.above = "rgba(255, 99, 132, 0.2)";
          if (dataset.areaSettings.below == null) dataset.areaSettings.below = "rgba(255, 159, 64, 0.2)";
          dataset.fill = dataset.areaSettings;
        } else if (options.type == ChartTypeEnum.Line) {
          if (dataset.smoothLine == null) dataset.smoothLine = true;
          if (dataset.smoothLine) dataset.tension = 0.4;
        }
        if (dataset.borderWidth == null) dataset.borderWidth = 1;
        if (dataset.title != null)
          dataset.label = dataset.title;
        if (dataset.labels != null)
          labels.vrPushRange(dataset.labels);
      }
      this._datasource = datasource;
      let chartData = { labels, datasets: datasource };
      this.createChart(chartData);
    }
    return this._datasource;
  }
  createChart(chartData) {
    let options = this.getOptions();
    let type = options.type == ChartTypeEnum.HorizontalBar || options.type == ChartTypeEnum.StackedBar ? ChartTypeEnum.Bar : options.type;
    if (options.type == ChartTypeEnum.Area) type = ChartTypeEnum.Line;
    let config = {
      type,
      data: chartData,
      options: {
        responsive: options.responsive,
        maintainAspectRatio: options.aspectRatio.maintain,
        aspectRatio: options.aspectRatio.value,
        circumference: options.circumference,
        rotation: options.rotation,
        scales: options.scales,
        parsing: options.parsing,
        plugins: {
          datalabels: this._plugins.datalabels,
          title: this._plugins.title,
          subtitle: this._plugins.subtitle,
          legend: this._plugins.legend,
          tooltip: this._plugins.tooltip,
          annotation: options.annotation
        },
        indexAxis: options.type == ChartTypeEnum.HorizontalBar ? "y" : "x"
      },
      layout: { padding: options.padding },
      plugins: [ChartDataLabels]
    };
    this._chart = new Chart(this.element(), config);
  }
  getOptions() {
    return this.options();
  }
  //#endregion
}
class ChartPlugin {
  datalabels;
  title;
  subtitle;
  legend;
  tooltip;
}
export {
  ChartVr
};
//# sourceMappingURL=chart.js.map
