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
