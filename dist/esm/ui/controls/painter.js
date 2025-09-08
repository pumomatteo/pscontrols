import { ControlTypeEnum, puma } from "../vr.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
class PainterOptions extends VrControlOptions {
  imagePath;
  size;
  color;
  saveSettings;
  onMouseDown;
  onMouseMove;
  onMouseUp;
}
class Painter extends VrControl {
  _color;
  _size;
  _points;
  _ctx;
  _image;
  _isMoving;
  _pointTag;
  constructor(element, options) {
    if (options == null)
      options = new PainterOptions();
    if (options.imagePath == null) options.imagePath = "";
    if (options.size == null) options.size = 10;
    if (options.color == null) options.color = "rgba(255, 0, 0, 0.25)";
    if (options.height == null) options.height = 200;
    if (options.width == null) options.width = 200;
    let canvasHeight = Number(options.height);
    let canvasWidth = Number(options.width);
    options.height = void 0;
    options.width = void 0;
    if (options.saveSettings == null) options.saveSettings = new PainterSaveSettings();
    if (options.saveSettings.legendWidth == null) options.saveSettings.legendWidth = 550;
    if (options.saveSettings.legendHeight == null) options.saveSettings.legendHeight = 400;
    if (options.tabIndex == null) options.tabIndex = -1;
    super(element, options, ControlTypeEnum.Painter);
    puma(this.element()).attr("width", canvasWidth);
    puma(this.element()).attr("height", canvasHeight);
    this._image = new Image();
    this.image(options.imagePath);
    this._ctx = this.element().getContext("2d");
    this._ctx.clearRect(0, 0, this._ctx.width, this._ctx.height);
    this._ctx.drawImage(this.image(), 0, 0);
    this._points = [];
    this.color(options.color);
    this.size(options.size);
    window.setTimeout(() => this.draw(), 1e3);
    this._isMoving = false;
    puma(this.element()).mousemove((e) => {
      if (!this._isMoving)
        return;
      let point = this.getPoint(e);
      if (this._points[this._points.length - 1] != null)
        this._points[this._points.length - 1].push(point);
      if (options.onMouseMove != null) {
        let event = new PainterMouseMoveEvent();
        event.sender = this;
        event.event = e;
        event.points = this._points;
        options.onMouseMove(event);
        if (event.isDefaultPrevented()) {
          e.preventDefault();
          return;
        }
      }
      this.draw();
    });
    puma(this.element()).mousedown((e) => {
      this._isMoving = true;
      let point = this.getPoint(e);
      if (options.onMouseDown != null) {
        let event = new PainterMouseDownEvent();
        event.sender = this;
        event.event = e;
        event.points = this._points;
        options.onMouseDown(event);
        if (event.isDefaultPrevented()) {
          e.preventDefault();
          return;
        }
      }
      this._points.push([point]);
    });
    puma(this.element()).mouseup((e) => {
      this._isMoving = false;
      if (options.onMouseUp != null) {
        let event = new PainterMouseUpEvent();
        event.sender = this;
        event.event = e;
        event.points = this._points;
        options.onMouseUp(event);
        if (event.isDefaultPrevented()) {
          e.preventDefault();
          return;
        }
      }
    });
  }
  color(color) {
    if (color != null)
      this._color = color;
    return this._color;
  }
  size(size) {
    if (size != null)
      this._size = size;
    return this._size;
  }
  image(imagePath) {
    if (imagePath != null)
      this._image.src = imagePath;
    return this._image;
  }
  pointTag(tag) {
    if (tag != null)
      this._pointTag = tag;
    return this._pointTag;
  }
  points(points) {
    if (points != null) {
      this._points = points;
      this.draw();
    }
    return this._points;
  }
  draw() {
    this._ctx.clearRect(0, 0, this._ctx.width, this._ctx.height);
    this._ctx.drawImage(this.image(), 0, 0);
    for (let i = 0; i < this._points.length; ++i) {
      let points = this._points[i];
      if (points.length < 1)
        continue;
      this._ctx.strokeStyle = points[0].color;
      this._ctx.lineCap = "round";
      this._ctx.lineJoin = "round";
      this._ctx.lineWidth = points[0].size;
      this._ctx.beginPath();
      this._ctx.moveTo(points[0].x, points[0].y);
      for (let j = 1; j < points.length; ++j)
        this._ctx.lineTo(points[j].x, points[j].y);
      this._ctx.stroke();
    }
  }
  getPoint(e) {
    let point = new Point();
    point.x = e.clientX - this.element().getBoundingClientRect().x;
    point.y = e.clientY - this.element().getBoundingClientRect().y;
    point.color = this.color();
    point.size = this.size();
    point.tag = this._pointTag;
    return point;
  }
  clear(imagePath) {
    this._points = [];
    if (imagePath != null)
      this.image(imagePath);
    window.setTimeout(() => this.draw(), 200);
  }
  clearLastRoute() {
    this._points.pop();
    this.draw();
  }
  clearRoute(tag) {
    let pointsToDelete = [];
    for (let point of this.points()) {
      for (let singlePoint of point) {
        if (singlePoint.tag == tag) {
          pointsToDelete.push(point);
          break;
        }
      }
    }
    for (let pointToDelete of pointsToDelete)
      this._points.vrDelete(pointToDelete);
    this.draw();
  }
  save(legendItems) {
    let dataURL;
    if (legendItems != null) {
      let options = this.getOptions();
      let legendCanvas = puma("<canvas>")[0];
      legendCanvas.width = options.saveSettings.legendWidth;
      legendCanvas.height = options.saveSettings.legendHeight;
      let context = legendCanvas.getContext("2d");
      context.drawImage(this.element(), 0, 0);
      let fontSize = 18;
      let y = 10;
      for (let legendItem of legendItems) {
        let textWidth = legendItem.color == null ? 100 : 130;
        let textSize = context.measureText(legendItem.text);
        let lines = Math.ceil(textSize.width / textWidth);
        let realHeight = fontSize * lines;
        context.font = fontSize.toString() + "px Arial";
        if (legendItem.color != null) {
          context.fillStyle = legendItem.color;
          context.fillRect(410, y, 20, 20);
          context.fillStyle = "#000000";
          context.fillText(legendItem.text, 440, y + realHeight, 100);
        } else
          context.fillText(legendItem.text, 410, y + realHeight, 130);
        y += realHeight + 10;
      }
      dataURL = legendCanvas.toDataURL();
    } else
      dataURL = this.element().toDataURL();
    return dataURL;
  }
  //#region Enable/Disable
  enable() {
    super.enable();
    puma(this.element()).removeClass("vrPainterDisabled");
  }
  disable() {
    super.disable();
    puma(this.element()).addClass("vrPainterDisabled");
  }
  //#endregion
  getOptions() {
    return this.options();
  }
}
class Point {
  x;
  y;
  color;
  size;
  tag;
}
class PainterSaveSettings {
  legendWidth;
  legendHeight;
}
class PainterEvent extends VrControlsEvent {
  sender;
  event;
  points;
}
class PainterMouseDownEvent extends PainterEvent {
}
class PainterMouseMoveEvent extends PainterEvent {
}
class PainterMouseUpEvent extends PainterEvent {
}
export {
  Painter,
  PainterOptions
};
//# sourceMappingURL=painter.js.map
