import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "./components/Product.jsx";
import BackdropLoading from "host/BackdropLoading";
import * as Sentry from "@sentry/react";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/what")
      .then((res) => {
        if (!res.ok) {
          Sentry.captureException(
            new Error(`Unexpected HTTP error ${res.status}`),
            (scope) => {
              scope.setTag("feature", "products");
              return scope;
            }
          );
        }
      })
      .then((res) => res.json())
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <BackdropLoading />}
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
