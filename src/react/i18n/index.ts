import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common UI elements
      common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        remove: 'Remove',
        search: 'Search',
        filter: 'Filter',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        confirm: 'Confirm',
        close: 'Close'
      },
      
      // Button specific
      button: {
        click: 'Click',
        submit: 'Submit',
        reset: 'Reset'
      },
      
      // Grid specific (for future migration)
      grid: {
        noData: 'No data available',
        rowsPerPage: 'Rows per page',
        of: 'of',
        page: 'Page',
        firstPage: 'First page',
        lastPage: 'Last page',
        nextPage: 'Next page',
        previousPage: 'Previous page',
        sortAscending: 'Sort ascending',
        sortDescending: 'Sort descending',
        selectAll: 'Select all',
        selectRow: 'Select row'
      },
      
      // Form validation
      validation: {
        required: 'This field is required',
        minLength: 'Minimum length is {{min}} characters',
        maxLength: 'Maximum length is {{max}} characters',
        invalidFormat: 'Invalid format',
        invalidEmail: 'Invalid email address',
        invalidNumber: 'Please enter a valid number'
      },
      
      // Accessibility announcements
      a11y: {
        buttonPressed: 'Button pressed',
        menuExpanded: 'Menu expanded',
        menuCollapsed: 'Menu collapsed',
        itemSelected: 'Item selected',
        pageChanged: 'Page changed to {{page}}',
        sortChanged: 'Sorted by {{column}} {{direction}}'
      }
    }
  },
  
  it: {
    translation: {
      common: {
        save: 'Salva',
        cancel: 'Annulla',
        delete: 'Elimina',
        edit: 'Modifica',
        add: 'Aggiungi',
        remove: 'Rimuovi',
        search: 'Cerca',
        filter: 'Filtra',
        loading: 'Caricamento...',
        error: 'Errore',
        success: 'Successo',
        warning: 'Attenzione',
        confirm: 'Conferma',
        close: 'Chiudi'
      },
      
      button: {
        click: 'Clicca',
        submit: 'Invia',
        reset: 'Reimposta'
      },
      
      grid: {
        noData: 'Nessun dato disponibile',
        rowsPerPage: 'Righe per pagina',
        of: 'di',
        page: 'Pagina',
        firstPage: 'Prima pagina',
        lastPage: 'Ultima pagina',
        nextPage: 'Pagina successiva',
        previousPage: 'Pagina precedente',
        sortAscending: 'Ordina crescente',
        sortDescending: 'Ordina decrescente',
        selectAll: 'Seleziona tutto',
        selectRow: 'Seleziona riga'
      },
      
      validation: {
        required: 'Questo campo è obbligatorio',
        minLength: 'Lunghezza minima {{min}} caratteri',
        maxLength: 'Lunghezza massima {{max}} caratteri',
        invalidFormat: 'Formato non valido',
        invalidEmail: 'Email non valida',
        invalidNumber: 'Inserire un numero valido'
      },
      
      a11y: {
        buttonPressed: 'Pulsante premuto',
        menuExpanded: 'Menu espanso',
        menuCollapsed: 'Menu contratto',
        itemSelected: 'Elemento selezionato',
        pageChanged: 'Pagina cambiata a {{page}}',
        sortChanged: 'Ordinato per {{column}} {{direction}}'
      }
    }
  },
  
  es: {
    translation: {
      common: {
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        add: 'Añadir',
        remove: 'Quitar',
        search: 'Buscar',
        filter: 'Filtrar',
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        warning: 'Advertencia',
        confirm: 'Confirmar',
        close: 'Cerrar'
      },
      
      button: {
        click: 'Hacer clic',
        submit: 'Enviar',
        reset: 'Restablecer'
      },
      
      // ... Spanish translations
    }
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'it', // Default to Italian (matching PSControls current usage)
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // React already escapes
    },
    
    // Namespace support for complex applications
    defaultNS: 'translation',
    
    // Development features
    debug: process.env.NODE_ENV === 'development',
    
    // React specific options
    react: {
      useSuspense: false // Avoid loading states for now
    }
  });

export default i18n;

// Helper hook for PSControls migration
export const usePSTranslation = () => {
  const { t, i18n } = useTranslation();
  
  // Helper that mimics PSControls text resolution pattern
  const resolveText = (text?: string, textKey?: string, params?: Record<string, any>) => {
    if (textKey) {
      return t(textKey, params);
    }
    return text || '';
  };
  
  return {
    t,
    resolveText,
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage
  };
};