import {defineConfig} from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig({

    build: {
        target: 'esnext',
        outDir: 'dist',
        rollupOptions: {
          input: {
            index: fileURLToPath(new URL('index.html', import.meta.url)),
            main: fileURLToPath(new URL('main.html', import.meta.url)),
            takeawaylist: fileURLToPath(new URL('takeaway-list.html', import.meta.url)),
            create: fileURLToPath(new URL('create_takeaway.html', import.meta.url)),
            upload: fileURLToPath(new URL('takeaway_edit.html', import.meta.url)),

          },
        },
      },
})