import React, { forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonModeEnum, IconClass, ColorSettings, BadgeSettings } from '../types';
import { PSAccessibleProps, PSTextProps } from '../types';
import { usePSButton } from '../hooks/usePSButton';

// Enhanced Button props that preserve PSControls API while adding React/i18n/a11y
export interface PSButtonProps extends PSAccessibleProps, PSTextProps {
  mode?: ButtonModeEnum;
  value?: string;
  tooltip?: string;
  tooltipKey?: string; // i18n tooltip
  colorSettings?: ColorSettings;
  icon?: IconClass;
  onlyIcon?: boolean;
  imageUrl?: string;
  confirmationMessage?: string;
  confirmationMessageKey?: string; // i18n confirmation
  badgeSettings?: BadgeSettings;
  loading?: boolean;

  // React-style events (cleaner than PSControls)
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRightClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMiddleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onHover?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Enhanced Button component with full PSControls compatibility + modern features
export const PSButton = forwardRef<HTMLButtonElement, PSButtonProps>(({
  // Text & i18n
  text,
  textKey,
  textParams,
  
  // PSControls original props
  mode = ButtonModeEnum.Default,
  value,
  tooltip,
  tooltipKey,
  colorSettings,
  icon,
  onlyIcon = false,
  imageUrl,
  confirmationMessage,
  confirmationMessageKey,
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
}, ref) => {
  const { t } = useTranslation();
  
  // Use PSControls business logic through custom hook
  const {
    buttonRef,
    isLoading,
    className: psClassName,
    style: psStyle,
    handleConfirmation,
    handleMouseDown: psMouseDown,
    handleMouseUp: psMouseUp,
    handleMouseLeave
  } = usePSButton({
    mode,
    colorSettings,
    icon,
    imageUrl,
    onlyIcon,
    confirmationMessage: confirmationMessage || (confirmationMessageKey ? t(confirmationMessageKey) : undefined),
    disabled: !enabled,
    loading
  });

  // i18n text resolution
  const resolvedText = textKey ? t(textKey, textParams) : text;
  const resolvedTooltip = tooltipKey ? t(tooltipKey) : tooltip;
  
  // Accessibility: Enhanced ARIA support
  const ariaProps = {
    'aria-label': ariaLabel || (onlyIcon ? resolvedText : undefined),
    'aria-describedby': ariaDescribedby,
    'aria-expanded': ariaExpanded,
    'aria-pressed': ariaPressed,
    'aria-disabled': !enabled,
    'aria-busy': isLoading || loading,
    role,
    tabIndex: enabled ? tabIndex : -1
  };

  // Enhanced click handler with confirmation and accessibility
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (!enabled || isLoading) {
      return;
    }

    // Preserve PSControls confirmation behavior
    handleConfirmation(() => {
      onClick?.(event);
    });
  }, [enabled, isLoading, handleConfirmation, onClick]);

  // Mouse event handlers
  const handleMouseDownEvent = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    psMouseDown();
    onMouseDown?.(event);
  }, [psMouseDown, onMouseDown]);

  const handleMouseUpEvent = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    psMouseUp();
    onMouseUp?.(event);
  }, [psMouseUp, onMouseUp]);

  // Keyboard accessibility (Enter and Space)
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === 'Enter' || event.key === ' ') && enabled && !isLoading) {
      event.preventDefault();
      handleClick(event as any);
    }
  }, [enabled, isLoading, handleClick]);

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
    ...psStyle,
    ...style,
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    display: visible ? undefined : 'none'
  };

  const combinedClassName = [psClassName, className].filter(Boolean).join(' ');

  // Render icon (preserve PSControls icon system)
  const renderIcon = () => {
    if (icon) {
      return <i className={`${icon} ps-button-icon`} aria-hidden="true" />;
    }
    if (imageUrl) {
      return <img src={imageUrl} className="ps-button-image" alt="" aria-hidden="true" />;
    }
    return null;
  };

  // Render badge (preserve PSControls badge system)
  const renderBadge = () => {
    if (!badgeSettings || (!badgeSettings.text && !badgeSettings.visible)) {
      return null;
    }

    const badgeStyle: React.CSSProperties = {
      color: badgeSettings.color || '#FFF',
      backgroundColor: badgeSettings.backgroundColor || 'red',
      ...(badgeSettings.css ? {} : {}) // Parse CSS string if needed
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
        ref={ref || buttonRef}
        type="button"
        className={combinedClassName}
        style={combinedStyle}
        title={resolvedTooltip}
        value={value}
        disabled={!enabled || isLoading}
        data-testid={testId}
        onClick={handleClick}
        onMouseDown={handleMouseDownEvent}
        onMouseUp={handleMouseUpEvent}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={onHover}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onMouseDownCapture={handleMouseDownCapture}
        onContextMenu={(e) => e.preventDefault()} // Disable context menu
        {...ariaProps}
        {...htmlProps}
      >
        {/* Icon before text */}
        {icon && renderIcon()}
        
        {/* Button text (with loading indicator) */}
        {isLoading || loading ? (
          <span className="ps-button-loading">
            <i className="ps-icon-loading" aria-hidden="true" />
            {t('common.loading', 'Loading...')}
          </span>
        ) : (
          !onlyIcon && <span className="ps-button-text">{resolvedText}</span>
        )}
        
        {/* Image after text */}
        {imageUrl && renderIcon()}
      </button>
      
      {/* Badge outside button (preserve PSControls behavior) */}
      {renderBadge()}
    </div>
  );
});

PSButton.displayName = 'PSButton';