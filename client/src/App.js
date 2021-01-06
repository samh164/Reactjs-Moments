import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux"; //redux hook, dispatch an action

import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import capture from "./images/capture.png";
import useStyles from "./styles";

//parent to both post and form
const App = () => {
  const [currentId, setCurrentId] = useState(0); {/* ID for post */}
  const classes = useStyles();
  //react redux hook, useDispatch returns reference from the store.
  const dispatch = useDispatch();
  //successful dispatch
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId,dispatch]);

  return (
    //created my header with image
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Moments
        </Typography>
        <img
          className={classes.image}
          src={capture}
          alt="capture"
          height="80"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId = {setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}> {/* for screen sizes */}
              <Form currentId = {currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
