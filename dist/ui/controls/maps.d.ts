import { MapMarker, MapModeEnum } from '../vr';
import { VrControlOptions, VrControl, VrControlsEvent } from '../common';
export declare class MapsOptions extends VrControlOptions {
    latitude?: number;
    longitude?: number;
    zoom?: number;
    maxZoom?: number;
    credits?: boolean | string;
    marker?: boolean | MapMarker[];
    mode?: MapModeEnum;
    onClick?: (e: MapClickEvent) => void;
    onPinClick?: (e: MapPinClickEvent) => void;
    onHover?: (e: MapPinHoverEvent) => void;
}
export declare class Maps extends VrControl {
    private _map;
    private _internalMarkerList;
    constructor(element: HTMLElement, options?: MapsOptions | null);
    map(): any;
    locate(latitude: number, longitude: number): void;
    marker(markers?: MapMarker[]): MapMarker[];
    clear(): void;
    disable(): void;
    enable(): void;
    invalidateSize(): void;
    getOptions(): MapsOptions;
}
declare class MapEvent extends VrControlsEvent {
    sender: Maps;
    coordinate: MapCoordinate;
    point: MapPoint;
    color: string;
    dataItem: any;
    element: any;
}
declare class MapPinClickEvent extends MapEvent {
}
declare class MapPinHoverEvent extends MapEvent {
}
declare class MapClickEvent extends VrControlsEvent {
    sender: Maps;
}
declare class MapCoordinate {
    latitude: number;
    longitude: number;
}
declare class MapPoint {
    x: number;
    y: number;
}
export {};
