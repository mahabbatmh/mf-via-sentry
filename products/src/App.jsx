import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "./components/Product.jsx";
import BackdropLoading from "host/BackdropLoading";

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
