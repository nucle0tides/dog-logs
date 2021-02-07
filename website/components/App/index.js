import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Dog from '../Dog';
import ActivityLevel from '../ActivityLevel';
import ActivitySeries from '../ActivitySeries';
import '../../theme/theme.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    backgroundColor: '#f5f5f5',
    height: '100vh',
    overflow: 'auto',
    flexGrow: 1,
  },
  /* offset: theme.mixins.toolbar,
   * container: {
   *   paddingTop: theme.spacing(5)
   * }, */
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Dog />
      <main className={classes.main}>
        <Container className={classes.container}><span /></Container>
      </main>
    </div>
  )
};

export default App;
