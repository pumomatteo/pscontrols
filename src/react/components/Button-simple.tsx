import React, { useCallback } from 'react';
import { ButtonModeEnum, IconClass, ColorSettings, BadgeSettings } from '../types';
import { PSAccessibleProps, PSTextProps } from '../types';

// Simplified Button props without i18n for testing
export interface PSButtonProps extends PSAccessibleProps, PSTextProps {
  mode?: ButtonModeEnum;
  value?: string;
  tooltip?: string;
  colorSettings?: ColorSettings;
  icon?: IconClass;
  onlyIcon?: boolean;
  imageUrl?: string;
  confirmationMessage?: string;
  badgeSettings?: BadgeSettings;
  loading?: boolean;

  // React-style events
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRightClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMiddleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onHover?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Simplified Button component for testing (removed forwardRef temporarily for debugging)
export const PSButton: React.FC<PSButtonProps> = ({
  // Text & props
  text,
  textKey,
  
  // PSControls original props
  mode = ButtonModeEnum.Default,
  value,
  tooltip,
  colorSettings,
  icon,
  onlyIcon = false,
  imageUrl,
  confirmationMessage,
  badgeSettings,
  loading = false,
  
  // Base props
  enabled = true,
  visible = true,
  className,
  style,
  width,
  height,
  testId,
  
  // Accessibility
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-expanded': ariaExpanded,
  'aria-pressed': ariaPressed,
  role = 'button',
  tabIndex = 0,
  
  // Events
  onClick,
  onRightClick,
  onMiddleClick,
  onHover,
  onBlur,
  onMouseDown,
  onMouseUp,
  
  ...htmlProps
}) => {
  // Simple text resolution (no i18n for testing)
  const resolvedText = text || textKey || 'Button';
  
  // Get button class based on mode
  const getButtonClass = (mode: ButtonModeEnum): string => {
    const baseClass = 'ps-button';
    switch (mode) {
      case ButtonModeEnum.Primary:
        return `${baseClass} ps-button-primary`;
      case ButtonModeEnum.Danger:
        return `${baseClass} ps-button-danger`;
      case ButtonModeEnum.Success:
        return `${baseClass} ps-button-success`;
      case ButtonModeEnum.Warning:
        return `${baseClass} ps-button-warning`;
      case ButtonModeEnum.Delete:
        return `${baseClass} ps-button-delete`;
      default:
        return `${baseClass} ps-button-default`;
    }
  };
  
  // Enhanced click handler with confirmation
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (!enabled || loading) {
      return;
    }

    if (confirmationMessage) {
      if (window.confirm(confirmationMessage)) {
        onClick?.(event);
      }
    } else {
      onClick?.(event);
    }
  }, [enabled, loading, confirmationMessage, onClick]);

  // Keyboard accessibility (Enter and Space)
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === 'Enter' || event.key === ' ') && enabled && !loading) {
      event.preventDefault();
      handleClick(event as any);
    }
  }, [enabled, loading, handleClick]);

  // Right/Middle click handling
  const handleMouseDownCapture = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    switch (event.button) {
      case 1: // Middle click
        event.preventDefault();
        onMiddleClick?.(event);
        break;
      case 2: // Right click
        event.preventDefault();
        onRightClick?.(event);
        break;
    }
  }, [onMiddleClick, onRightClick]);

  // Combined styling
  const combinedStyle: React.CSSProperties = {
    ...style,
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    display: visible ? undefined : 'none'
  };

  const combinedClassName = [getButtonClass(mode), className].filter(Boolean).join(' ');

  // Accessibility props
  const ariaProps = {
    'aria-label': ariaLabel || (onlyIcon ? resolvedText : undefined),
    'aria-describedby': ariaDescribedby,
    'aria-expanded': ariaExpanded,
    'aria-pressed': ariaPressed,
    'aria-disabled': !enabled,
    'aria-busy': loading,
    role,
    tabIndex: enabled ? tabIndex : -1
  };

  // Render icon
  const renderIcon = () => {
    if (icon) {
      return <i className={`${icon} ps-button-icon`} aria-hidden="true" />;
    }
    if (imageUrl) {
      return <img src={imageUrl} className="ps-button-image" alt="" aria-hidden="true" />;
    }
    return null;
  };

  // Render badge
  const renderBadge = () => {
    if (!badgeSettings || (!badgeSettings.text && !badgeSettings.visible)) {
      return null;
    }

    const badgeStyle: React.CSSProperties = {
      color: badgeSettings.color || '#FFF',
      backgroundColor: badgeSettings.backgroundColor || 'red',
    };

    return (
      <span 
        className="ps-badge ps-button-badge"
        style={badgeStyle}
        aria-label={`Badge: ${badgeSettings.text}`}
      >
        {badgeSettings.text}
      </span>
    );
  };

  return (
    <div className="ps-button-container">
      <button
        type="button"
        className={combinedClassName}
        style={combinedStyle}
        title={tooltip}
        value={value}
        disabled={!enabled || loading}
        data-testid={testId}
        onClick={handleClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onHover}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onMouseDownCapture={handleMouseDownCapture}
        onContextMenu={(e) => e.preventDefault()}
        {...ariaProps}
        {...htmlProps}
      >
        {/* Icon/Image before text */}
        {(icon || imageUrl) && renderIcon()}
        
        {/* Button text (with loading indicator) */}
        {loading ? (
          <span className="ps-button-loading">
            <i className="ps-icon-loading" aria-hidden="true" />
            Loading...
          </span>
        ) : (
          !onlyIcon && <span className="ps-button-text">{resolvedText}</span>
        )}
      </button>
      
      {/* Badge outside button */}
      {renderBadge()}
    </div>
  );
};

PSButton.displayName = 'PSButton';