import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "./consts.js";
import BackdropLoading from "../components/BackdropLoading.jsx";

const Remote = lazy(() => import("carts/App"));

const Carts = () => {
  return (
    <Suspense fallback={<BackdropLoading />}>
      <Remote />
    </Suspense>
  );
};

export const CartsRoute = <Route path={ROUTES.CARTS} element={<Carts />} />;
