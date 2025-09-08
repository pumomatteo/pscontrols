import { MapModeEnum, ControlTypeEnum, puma, MapMarker } from "../vr.js";
import { VrControl, VrControlOptions, VrControlsEvent } from "../common.js";
class MapsOptions extends VrControlOptions {
  latitude;
  longitude;
  zoom;
  maxZoom;
  credits;
  marker;
  mode;
  onClick;
  onPinClick;
  onHover;
}
class Maps extends VrControl {
  _map;
  _internalMarkerList;
  constructor(element, options) {
    if (options == null)
      options = new MapsOptions();
    if (options.zoom == null) options.zoom = 15;
    if (options.maxZoom == null) options.maxZoom = 18;
    if (options.marker == null) options.marker = true;
    if (options.latitude == null) options.latitude = 0;
    if (options.longitude == null) options.longitude = 0;
    if (options.height == null) options.height = 200;
    if (options.width == null) options.width = "100%";
    if (options.mode == null) options.mode = MapModeEnum.Light;
    if (options.tabIndex == null) options.tabIndex = -1;
    if (options.credits == null) options.credits = true;
    if (options.credits)
      options.credits = `<span style='font-size: 10px'><a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors`;
    else
      options.credits = "";
    let enable = options.enable;
    if (options.enable == false)
      options.enable = void 0;
    super(element, options, ControlTypeEnum.Map);
    this._internalMarkerList = [];
    puma(this.element()).height("100%");
    let accessToken = "pk.eyJ1IjoibWF0dGV1enppc3RlZmFubyIsImEiOiJja3I3aHp2bzIwNHNpMnBtYzVndGN5YzFxIn0.tEqLhXaDn9FC9Mrqu8o-lQ";
    this._map = L.map(this.element(), { preferCanvas: true }).setView([options.latitude, options.longitude], options.zoom);
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" + accessToken, {
      maxZoom: options.maxZoom,
      attribution: options.credits,
      id: options.mode,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this._map);
    if (options.onClick != null) {
      puma(this._map).on("click", (e) => {
        let clickEvent = new MapPinClickEvent();
        clickEvent.sender = this;
        options.onClick(clickEvent);
      });
    }
    if (typeof options.marker == "boolean" && options.marker) {
      let defaultMarker = new MapMarker();
      defaultMarker.latitude = options.latitude;
      defaultMarker.longitude = options.longitude;
      options.marker = [defaultMarker];
      this.marker([defaultMarker]);
    } else if (Array.isArray(options.marker))
      this.marker(options.marker);
    if (enable === false)
      this.disable();
    else
      this.enable();
  }
  //#region Methods
  map() {
    return this._map;
  }
  locate(latitude, longitude) {
    L.latLng(latitude, longitude).addTo(this._map);
  }
  marker(markers) {
    let options = this.getOptions();
    if (markers != null) {
      options.marker = markers;
      for (let marker of markers) {
        let pin = L.circleMarker([marker.latitude, marker.longitude], {
          color: "#3388ff"
        });
        if (marker.title != null)
          pin.bindPopup(marker.title);
        pin.addTo(this._map);
        this._internalMarkerList.push(pin);
        if (options.onPinClick != null) {
          puma(pin).on("click", (e) => {
            let clickEvent = new MapPinClickEvent();
            clickEvent.sender = this;
            clickEvent.coordinate = { latitude: pin._latlng.lat, longitude: pin._latlng.lng };
            clickEvent.point = { x: pin._point.x, y: pin._point.y };
            clickEvent.color = pin.options.color;
            clickEvent.dataItem = marker;
            clickEvent.element = pin;
            options.onPinClick(clickEvent);
          });
        }
        puma(pin).on("mouseover", (e) => {
          if (marker.title != null)
            e.target.openPopup();
          if (options.onHover != null) {
            let clickEvent = new MapPinHoverEvent();
            clickEvent.sender = this;
            clickEvent.coordinate = { latitude: pin._latlng.lat, longitude: pin._latlng.lng };
            clickEvent.point = { x: pin._point.x, y: pin._point.y };
            clickEvent.color = pin.options.color;
            clickEvent.dataItem = marker;
            clickEvent.element = pin;
            options.onHover(clickEvent);
          }
        });
      }
    }
    return options.marker;
  }
  clear() {
    let options = this.getOptions();
    if (options.marker != null && Array.isArray(options.marker)) {
      for (let marker of this._internalMarkerList)
        this._map.removeLayer(marker);
    }
    this._internalMarkerList = [];
  }
  disable() {
    super.disable();
    this._map.dragging.disable();
    this._map.touchZoom.disable();
    this._map.doubleClickZoom.disable();
    this._map.scrollWheelZoom.disable();
    this._map.boxZoom.disable();
    this._map.keyboard.disable();
    puma(this.container()).find(".leaflet-control-zoom").hide();
    if (this._map.tap)
      this._map.tap.disable();
    this.element().style.cursor = "default";
  }
  enable() {
    super.enable();
    this._map.dragging.enable();
    this._map.touchZoom.enable();
    this._map.doubleClickZoom.enable();
    this._map.scrollWheelZoom.enable();
    this._map.boxZoom.enable();
    this._map.keyboard.enable();
    puma(this.container()).find(".leaflet-control-zoom").show();
    if (this._map.tap)
      this._map.tap.enable();
    this.element().style.cursor = "grab";
  }
  invalidateSize() {
    this._map.invalidateSize();
  }
  getOptions() {
    return this.options();
  }
  //#endregion    
}
class MapEvent extends VrControlsEvent {
  sender;
  coordinate;
  point;
  color;
  dataItem;
  element;
}
class MapPinClickEvent extends MapEvent {
}
class MapPinHoverEvent extends MapEvent {
}
export {
  Maps,
  MapsOptions
};
//# sourceMappingURL=maps.js.map
