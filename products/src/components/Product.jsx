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
