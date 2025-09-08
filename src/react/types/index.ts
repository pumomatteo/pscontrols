// PSControls types defined directly to avoid importing legacy system
export type IconClass = string;

export enum ButtonModeEnum {
  Default = "vrButtonDefaultMode",
  Primary = "vrButtonPrimaryMode",
  Delete = "vrButtonDeleteMode",
  Excel = "vrButtonExcelMode",
  Print = "vrButtonPrintMode",
  Warning = "vrButtonWarningMode",
  Danger = "vrButtonDangerMode",
  Success = "vrButtonSuccessMode"
}

export interface ColorSettings {
  textColor?: string;
  background?: string;
  border?: string;
}

export enum PositionEnum {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom"
}

export enum TextAlignEnum {
  Left = "left",
  Center = "center",
  Right = "right"
}

export interface BadgeSettings {
  text?: string;
  visible?: boolean;
  color?: string;
  backgroundColor?: string;
  css?: string;
}

// Base props that all React components will inherit
export interface PSBaseProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  visible?: boolean;
  enabled?: boolean;
  testId?: string; // For testing
}

// Enhanced props with i18n and a11y
export interface PSAccessibleProps extends PSBaseProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
  role?: string;
  tabIndex?: number;
}

// i18n-enabled text props
export interface PSTextProps {
  text?: string;
  textKey?: string; // i18n key
  textParams?: Record<string, any>; // i18n parameters
}