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
