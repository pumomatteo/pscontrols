export type { IconClass } from '../../ui/vr';
export { ButtonModeEnum, ColorSettings, PositionEnum, TextAlignEnum, BadgeSettings } from '../../ui/vr';
export interface PSBaseProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    width?: string | number;
    height?: string | number;
    visible?: boolean;
    enabled?: boolean;
    testId?: string;
}
export interface PSAccessibleProps extends PSBaseProps {
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-expanded'?: boolean;
    'aria-pressed'?: boolean;
    role?: string;
    tabIndex?: number;
}
export interface PSTextProps {
    text?: string;
    textKey?: string;
    textParams?: Record<string, any>;
}
