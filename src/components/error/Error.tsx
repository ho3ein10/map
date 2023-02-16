// React:
import React from "react";
// React-Router-Dom Hooks:
import { useNavigate } from "react-router-dom";
// MUI Components:
import { Container, Typography, Button } from "@mui/material";
// MUI Styles:
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    overflow: "hidden",
    backgroundColor: theme.palette.primary.dark,
  },
  box: {},
  text: {
    color: theme.palette.background.default,
  },
}));

const Error = () => {
  const classes = useStyles();
  
  const navigate = useNavigate();
  
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 0 },
      }}
      className={classes.container}
    >
      <Typography variant="h1" className={classes.text}>
        ۴۰۴
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, mb: 4 }} className={classes.text}>
        صفحه ای یافت نشد!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ minWidth: 10, fontSize: "14px" }}
        onClick={() => navigate("/")}
      >
        صفحه اصلی
      </Button>
    </Container>
  );
};

export default Error;
