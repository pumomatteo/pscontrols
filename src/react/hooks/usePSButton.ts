import { useCallback, useRef, useState } from 'react';
import { ButtonModeEnum, ColorSettings, IconClass } from '../types';

// Extract core Button logic from PSControls
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

export const usePSButton = (options: PSButtonLogic) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(options.loading || false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Preserve PSControls button modes
  const getButtonClasses = useCallback(() => {
    const baseClass = 'ps-button';
    const classes = [baseClass];

    switch (options.mode) {
      case ButtonModeEnum.Default:
        classes.push('ps-button-default');
        break;
      case ButtonModeEnum.Primary:
        classes.push('ps-button-primary');
        break;
      case ButtonModeEnum.Danger:
        classes.push('ps-button-danger');
        break;
      case ButtonModeEnum.Success:
        classes.push('ps-button-success');
        break;
      case ButtonModeEnum.Warning:
        classes.push('ps-button-warning');
        break;
    }

    if (options.onlyIcon) {
      classes.push('ps-button-icon-only');
    }

    if (isPressed) {
      classes.push('ps-button-pressed');
    }

    if (options.disabled) {
      classes.push('ps-button-disabled');
    }

    return classes.join(' ');
  }, [options.mode, options.onlyIcon, options.disabled, isPressed]);

  // Extract PSControls color logic
  const getButtonStyles = useCallback((): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    if (options.colorSettings) {
      if (options.colorSettings.textColor) {
        styles.color = options.colorSettings.textColor;
      }
      if (options.colorSettings.background) {
        styles.backgroundColor = options.colorSettings.background;
      }
      if (options.colorSettings.border) {
        styles.borderColor = options.colorSettings.border;
      }
    }

    // PSControls default styling
    styles.minWidth = '27px';
    
    return styles;
  }, [options.colorSettings]);

  // Handle confirmation dialog (preserve PSControls behavior)
  const handleConfirmation = useCallback(async (onClick?: () => void) => {
    if (!options.confirmationMessage) {
      onClick?.();
      return;
    }

    // In real implementation, use your preferred modal/confirmation library
    const confirmed = window.confirm(options.confirmationMessage);
    if (confirmed) {
      onClick?.();
    }
  }, [options.confirmationMessage]);

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    buttonRef,
    isLoading,
    setIsLoading,
    className: getButtonClasses(),
    style: getButtonStyles(),
    handleConfirmation,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave
  };
};