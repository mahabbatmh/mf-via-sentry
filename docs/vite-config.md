# Micro Frontend Configuration

### Install Dependency

Install `@originjs/vite-plugin-federation` by using the following command:

```bash
npm install @originjs/vite-plugin-federation --save-dev
```

### Configure `products` app
Configure Module Federation in the `vite.config.js` file:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'products',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App.jsx',
            },
            shared: ['react','react-dom']
        })
    ],
    build: {
        target: 'esnext'
    },
})
```

### Configure `carts` app
Configure Module Federation in the `vite.config.js` file:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'carts',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App.jsx',
            },
            shared: ['react','react-dom']
        })
    ],
    build: {
        target: 'esnext'
    },
})
```

### Configure `host` app
Configure Module Federation in the `vite.config.js` file:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'host-app',
            remotes: {
                products: "http://localhost:5001/assets/remoteEntry.js",
                carts: "http://localhost:5002/assets/remoteEntry.js",
            },
            shared: ['react','react-dom']
        })
    ],
})
```