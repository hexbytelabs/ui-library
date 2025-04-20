import {defineConfig} from 'vite'
import {extname, relative, resolve} from 'path'
import {fileURLToPath} from 'node:url'
import {glob} from 'glob'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include:      ['lib'],
      tsconfigPath: resolve(
        __dirname,
        "tsconfig.lib.json",
      ),
    }),
  ],
  build:   {
    copyPublicDir: false,
    lib:           {
      entry:   resolve(
        __dirname,
        'lib/main.ts',
      ),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', /lodash\/.*/, 'tailwindcss'],
      input:    Object.fromEntries(
        glob.sync(
          'lib/**/*.{ts,tsx}',
          {
            ignore: ["lib/**/*.d.ts"],
          },
        ).map(file => [
          relative(
            'lib',
            file.slice(
              0,
              file.length - extname(file).length,
            ),
          ),
          fileURLToPath(new URL(
            file,
            import.meta.url,
          )),
        ]),
      ),
      output:   {
        assetFileNames: 'styles[extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./lib"),
    },
  },
})
