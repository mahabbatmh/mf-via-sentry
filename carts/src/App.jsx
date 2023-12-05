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
