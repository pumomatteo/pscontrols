import { ButtonModeEnum, ColorSettings, IconClass } from '../../ui/vr';
export interface PSButtonLogic {
    mode: ButtonModeEnum;
    colorSettings?: ColorSettings;
    icon?: IconClass;
    imageUrl?: string;
    onlyIcon?: boolean;
    confirmationMessage?: string;
    disabled?: boolean;
    loading?: boolean;
}
export declare const usePSButton: (options: PSButtonLogic) => {
    buttonRef: import('react').RefObject<HTMLButtonElement | null>;
    isLoading: boolean;
    setIsLoading: import('react').Dispatch<import('react').SetStateAction<boolean>>;
    className: string;
    style: import('react').CSSProperties;
    handleConfirmation: (onClick?: () => void) => Promise<void>;
    handleMouseDown: () => void;
    handleMouseUp: () => void;
    handleMouseLeave: () => void;
};
