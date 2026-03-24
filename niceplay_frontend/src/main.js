'use strict';

/**
 * React application entry alias.
 *
 * This project’s bundler/startup is typically wired to `src/index.js` (Create React App)
 * or `src/main.jsx` (Vite). Since the current container does not yet include the full
 * scaffold, we create `src/main.js` as a non-breaking entrypoint that can be adopted
 * later by simply pointing the bundler to it.
 *
 * By default, this file just delegates to `./index` if/when it exists.
 */

// PUBLIC_INTERFACE
export * from './index';
