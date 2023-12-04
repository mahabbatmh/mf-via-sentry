import Backdrop from "@mui/material/Backdrop";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";

export function BackdropLoading({ open = true }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

BackdropLoading.propTypes = {
  open: PropTypes.bool,
};
