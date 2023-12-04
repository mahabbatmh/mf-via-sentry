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
