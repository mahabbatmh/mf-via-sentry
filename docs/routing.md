# Routing

### Install Dependencies in Host application
Install `react-router-dom` by using the following command:
```bash
npm install react-router-dom
```
Install Material UI by using the following command:
```bash
npm install @mui/material @emotion/react @emotion/styled
```

Install `prop-types` by using the following command:
```bash
npm install prop-types --save-dev
```

### Add nested components
Create components folder by using the following command:
```bash
mkdir host/src/components/
```

Add `Heading`:
```jsx
// host/src/components/Heading.jsx

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
import { ROUTES } from "../pages/consts.js";

const navItems = [
    {
        name: "Products",
        path: ROUTES.PRODUCTS,
    },
    {
        name: "Carts",
        path: ROUTES.CARTS,
    },
];

export function Heading() {
    return (
        <AppBar component="nav">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                    Demo App
                </Typography>
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "block",
                            typography: "body1",
                            "& > :not(style) ~ :not(style)": {
                                marginLeft: 16,
                            },
                        },
                    }}
                >
                    {navItems.map((item) => (
                        <Link
                            component={ReactRouterLink}
                            to={item.path}
                            key={item.path}
                            sx={{ color: "#fff" }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
```

Add `BackdropLoading`:
```jsx
// host/src/components/BackdropLoading.jsx

import Backdrop from "@mui/material/Backdrop";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";

export function BackdropLoading({ open = true }) {
  return (
    <Backdrop
      sx={{ color: "#fff" }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

BackdropLoading.propTypes = {
  open: PropTypes.bool,
};
```

### Nested Routes
Create `pages` folder by using the following command:
```bash
mkdir host/src/pages/
```
Add `ROUTES` constant:
```js
// host/src/pages/consts.js

export const ROUTES = {
    PATH: '/',
    PRODUCTS: '/products',
    CARTS: '/carts'
}
```

Add `products` app route:
```jsx
// host/src/pages/products.jsx

import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "./consts.js";
import { BackdropLoading } from "../components/BackdropLoading.jsx";

const Remote = lazy(() => import("products/App"));

const Products = () => {
  return (
    <Suspense fallback={<BackdropLoading />}>
      <Remote />
    </Suspense>
  );
};

export const ProductsRoute = (
  <Route path={ROUTES.PRODUCTS} element={<Products />} />
);
```

Add `carts` app route:
```jsx
// host/src/pages/carts.jsx

import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "./consts.js";
import { BackdropLoading } from "../components/BackdropLoading.jsx";

const Remote = lazy(() => import("carts/App"));

const Carts = () => {
    return (
        <Suspense fallback={<BackdropLoading />}>
            <Remote />
        </Suspense>
    );
};

export const CartsRoute = <Route path={ROUTES.CARTS} element={<Carts />} />;
```

Update `App.jsx` in host app:
```jsx
// host/src/App.jsx

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Heading } from "./components/Heading.jsx";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { CartsRoute } from "./pages/carts.jsx";
import { ProductsRoute } from "./pages/products.jsx";
import Toolbar from "@mui/material/Toolbar";
import { ROUTES } from "./pages/consts.js";

const App = () => {
    return (
        <BrowserRouter>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Heading />
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Routes>
                    {ProductsRoute}
                    {CartsRoute}
                    <Route
                        path={ROUTES.PATH}
                        element={<Navigate replace to={ROUTES.PRODUCTS} />}
                    />
                </Routes>
            </Box>
        </BrowserRouter>
    );
};
export default App;
```

