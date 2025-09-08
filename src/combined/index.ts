/**
 * Combined PSControls + React Build
 * Maintains backward compatibility while adding React support
 */

// Import original PSControls (maintains 'vr' global)
import * as PSControlsLegacy from '../ui/vr';

// Import React components
import { 
  PSControlsProvider,
  PSButton,
  usePSTranslation,
  PSBaseProps,
  PSAccessibleProps,
  PSTextProps
} from '../react';

// Re-export legacy API (maintains existing code compatibility)
export * from '../ui/vr';

// Enhanced API with React + i18n + a11y
export const PSReact = {
  // Provider component
  Provider: PSControlsProvider,
  
  // Enhanced components
  Button: PSButton,
  
  // Hooks
  useTranslation: usePSTranslation,
  
  // Types
  Props: {
    Base: {} as PSBaseProps,
    Accessible: {} as PSAccessibleProps,
    Text: {} as PSTextProps
  }
};

// Legacy API compatibility layer
export const vr = {
  ...PSControlsLegacy,
  
  // Enhanced create functions that return React-compatible components
  createButtonEnhanced: (options: any, container?: any) => {
    // If container is a React component/element, use React
    if (container && typeof container === 'object' && 'setState' in container) {
      // Return React component
      return PSButton;
    }
    
    // Otherwise use legacy PSControls
    return PSControlsLegacy.createButton(options, container);
  }
};

// Global namespace setup (maintains existing usage)
if (typeof window !== 'undefined') {
  // Legacy namespace (existing code continues to work)
  (window as any).vr = vr;
  
  // New namespace (enhanced features)
  (window as any).ps = {
    legacy: vr,
    react: PSReact,
    
    // Migration helper
    migrate: {
      // Convert PSControls options to React props
      buttonOptionsToProps: (options: any) => ({
        text: options.text,
        textKey: options.textKey,
        mode: options.mode,
        onClick: options.onClick,
        disabled: !options.enable,
        loading: options.loading,
        // ... other mappings
      })
    }
  };
}