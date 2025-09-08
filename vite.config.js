import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

/**
 * Unified Vite Configuration for All PSControls Builds
 * Handles: Legacy, React, and Combined builds with single configuration
 */
export default defineConfig(({ mode }) => {
  // Build configurations for different modes
  const buildConfigs = {
    // Legacy build (default) - jQuery + PSControls UMD
    legacy: {
      entry: resolve(__dirname, 'src/ui/vr.ts'),
      name: 'vr',
      fileName: (format) => 'vrcontrols.all.min.js',
      external: [],
      globals: {},
      outDir: 'dist',
      cssFileName: 'vrcontrols.all.min.css',
      dtsInclude: ['src/ui/**/*', 'src/managers/**/*'],
      dtsExclude: ['src/react/**/*', '**/*.tsx'],
      tsconfigPath: 'tsconfig.legacy.json'
    },
    
    // React build - Components only
    react: {
      entry: resolve(__dirname, 'src/react/index-simple.tsx'),
      name: 'PSReact',
      fileName: (format) => 'pscontrols-react.min.js',
      external: ['react', 'react-dom', 'react-i18next', 'i18next', 'jquery'],
      globals: { 
        react: 'React', 
        'react-dom': 'ReactDOM',
        'react-i18next': 'ReactI18next',
        'i18next': 'i18next',
        'jquery': 'jQuery'
      },
      outDir: 'dist/react',
      cssFileName: 'pscontrols-react.min.css',
      dtsInclude: ['src/react/**/*'],
      dtsExclude: ['src/ui/**/*', 'src/managers/**/*'],
      tsconfigPath: 'tsconfig.react.json'
    },
    
    // ESM Modular build - Individual controls as ES modules
    esm: {
      entry: resolve(__dirname, 'src/ui/vr.ts'),
      formats: ['es'],
      fileName: (format) => 'pscontrols.esm.js',
      external: ['jquery'],
      globals: { jquery: 'jQuery' },
      outDir: 'dist/esm',
      cssFileName: 'pscontrols.esm.css',
      dtsInclude: ['src/ui/**/*', 'src/managers/**/*'],
      dtsExclude: ['src/react/**/*', '**/*.tsx'],
      tsconfigPath: 'tsconfig.legacy.json',
      preserveModules: true,  // Key: preserva la struttura modulare
      preserveModulesRoot: 'src'
    },

    // Combined build - Legacy + React together
    combined: {
      entry: resolve(__dirname, 'src/combined/index.ts'),
      name: 'ps',
      fileName: 'pscontrols.combined.min.js',
      external: [],
      globals: {},
      outDir: 'dist',
      cssFileName: 'pscontrols.combined.min.css',
      dtsInclude: ['src/ui/**/*', 'src/managers/**/*', 'src/react/**/*', 'src/combined/**/*'],
      dtsExclude: [],
      tsconfigPath: 'tsconfig.json'
    }
  }
  
  // Default to legacy build
  const config = buildConfigs[mode] || buildConfigs.legacy

  return {
    // Library build mode
    build: {
      lib: {
        entry: config.entry,
        name: config.name,
        fileName: config.fileName,
        formats: config.formats || ['umd']
      },
      
      outDir: config.outDir,
      
      rollupOptions: {
        external: config.external,
        output: config.preserveModules ? {
          // ESM modular output
          preserveModules: config.preserveModules,
          preserveModulesRoot: config.preserveModulesRoot,
          entryFileNames: '[name].js',
          globals: config.globals,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return config.cssFileName;
            }
            return assetInfo.name;
          }
        } : {
          // UMD bundled output  
          globals: config.globals,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return config.cssFileName;
            }
            return assetInfo.name;
          }
        }
      },
      
      sourcemap: true,
      minify: 'terser',
      emptyOutDir: false
    },
    
    // Plugins based on build mode
    plugins: [
      // React plugin for React and Combined builds
      ...(mode === 'react' || mode === 'combined' ? [react()] : []),
      
      // TypeScript definitions (disabled for React build due to API Extractor issue)
      ...(mode !== 'react' ? [dts({
        include: config.dtsInclude,
        exclude: config.dtsExclude,
        outDir: config.outDir,
        tsconfigPath: config.tsconfigPath,
        rollupTypes: true
      })] : [])
    ],
    
    // Path aliases
    resolve: {
      alias: {
        '@pscontrols': resolve(__dirname, 'src/ui'),
        '@managers': resolve(__dirname, 'src/managers'),
        '@react': resolve(__dirname, 'src/react'),
        '@styles': resolve(__dirname, 'src/styles')
      },
      extensions: ['.tsx', '.ts', '.js']
    },
    
    // CSS processing
    css: {
      postcss: {
        plugins: [require('autoprefixer')]
      }
    },
    
    // Development server
    server: {
      port: mode === 'react' ? 9000 : 3000,
      open: false
    },
    
    // Define for compatibility
    define: {
      'process.env.NODE_ENV': JSON.stringify('production')
    }
  }
})