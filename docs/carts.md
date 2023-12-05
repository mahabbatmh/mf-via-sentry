# Carts Application


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
mkdir carts/src/components/
```

Add `Cart`:
```jsx
// carts/src/components/Cart.jsx

import { useState, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import {
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export function Cart({ cart }) {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://fakestoreapi.com/products/${cart.productId}`)
            .then((res) => res.json())
            .then(setProduct)
            .finally(() => setIsLoading(false));
    }, []);

    const content = useMemo(() => {
        if (isLoading) {
            return <CircularProgress />;
        }

        return (
            <>
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
            </>
        );
    }, [isLoading, product]);

    return <Card sx={{ maxWidth: 345, height: "100%" }}>{content}</Card>;
}

Cart.propTypes = {
    cart: PropTypes.shape({
        productId: PropTypes.number,
        quantity: PropTypes.number,
    }).isRequired,
};
```

### Use Host component in MF:
Update `vite.config.js` in `carts` app:
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "carts",
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

### Update `App.jsx` in `carts` app:
```jsx
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Cart } from "./components/Cart.jsx";
import BackdropLoading from "host/BackdropLoading";

function App() {
    const [carts, setCarts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://fakestoreapi.com/carts/user/2")
            .then((res) => res.json())
            .then((res) =>
                setCarts(res.flatMap((cartDetails) => cartDetails.products)),
            )
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading && <BackdropLoading />}
            <Typography variant="h3" gutterBottom>
                Carts
            </Typography>
            <Grid container spacing={2}>
                {carts.map((cart) => (
                    <Grid item xs={6} md={4} key={cart.id}>
                        <Cart cart={cart} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default App;
```