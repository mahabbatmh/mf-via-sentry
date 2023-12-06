import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Heading } from "./components/Heading.jsx";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { CartsRoute } from "./pages/carts.jsx";
import { ProductsRoute } from "./pages/products.jsx";
import Toolbar from "@mui/material/Toolbar";
import { ROUTES } from "./pages/consts.js";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";

const App = () => {
  useEffect(() => {
    Sentry.setUser({
      id: "456",
      username: "filankes_filankesov",
      email: "someone@example.com",
    });
  }, []);

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
