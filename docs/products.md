# Products Application


### Install Dependencies
Install Material UI by using the following command:
```bash
npm install @mui/material @emotion/react @emotion/styled
```
Install `prop-types` by using the following command:
```bash
npm install prop-types --save-dev
```

### Nested Components

Create components folder by using the following command:
```bash
mkdir products/src/components/
```

Add `Product`:
```jsx
// products/src/components/Product.jsx

import Card from "@mui/material/Card";
import { CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

export function Product({ product }) {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardMedia
        component="img"
        alt="product"
        height="200"
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
        <Typography align="right" variant="body1">
          {product.price} AZN
        </Typography>
      </CardContent>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
```

### Use Host component in MF:
Update `vite.config.js` in `host` app:
```js
// host/src/vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        products: "http://localhost:5001/assets/remoteEntry.js",
        carts: "http://localhost:5002/assets/remoteEntry.js",
      },
      exposes: {
        "./BackdropLoading": "./src/components/BackdropLoading.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
  },
});
```

Update `preview` script in `package.json`:
```json
{
  "preview": "vite build --watch & vite preview --port=5173 --strictPort"
}
```

Update `vite.config.js` in `products` app:
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "products",
            filename: "remoteEntry.js",
            exposes: {
                "./App": "./src/App.jsx",
            },
            remotes: {
                host: "http://localhost:5173/assets/remoteEntry.js",
            },
            shared: ["react", "react-dom"],
        }),
    ],
    build: {
        target: "esnext",
    },
});
```

### Update `App.jsx` in `products` app:
```jsx
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "./components/Product.jsx";
import BackDropLoading from "host/BackDropLoading";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <BackDropLoading />}
      <Typography variant="h3" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} md={4} key={product.id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default App;
```