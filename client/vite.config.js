// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // We use '/api' as a custom prefix to identify proxy requests
      '/api': {
        // The real target API server
        target: 'https://api.1inch.dev',
        
        // This is crucial. It changes the 'Origin' header of the request
        // to the target URL, which is required by many APIs.
        changeOrigin: true,
        
        // This removes the '/api' prefix from the path before forwarding it
        // so that '/api/swap/v6.0/1' becomes '/swap/v6.0/1'
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});