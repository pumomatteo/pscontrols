import { default as React } from 'react';
import { ButtonModeEnum, IconClass, ColorSettings, BadgeSettings } from '../../ui/vr';
import { PSAccessibleProps, PSTextProps } from '../types';
export interface PSButtonProps extends PSAccessibleProps, PSTextProps {
    mode?: ButtonModeEnum;
    value?: string;
    tooltip?: string;
    tooltipKey?: string;
    colorSettings?: ColorSettings;
    icon?: IconClass;
    onlyIcon?: boolean;
    imageUrl?: string;
    confirmationMessage?: string;
    confirmationMessageKey?: string;
    badgeSettings?: BadgeSettings;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onRightClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMiddleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onHover?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export declare const PSButton: React.ForwardRefExoticComponent<PSButtonProps & React.RefAttributes<HTMLButtonElement>>;
