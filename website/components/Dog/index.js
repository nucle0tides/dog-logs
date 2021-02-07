import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './styles.scss';

const DOG_DATA = gql`
  query getPius {
    pius: dog {
      name
      picture
      activityValue
      activityGoal
      breeds
    }
  }
`;

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
  },
  bio: {
    marginTop: '75px',
    borderRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 250,
    position: 'relative',
    overflow: 'initial',
  },
  dogAvatar: {
    width: '70%',
    borderRadius: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 0,
    paddingBottom: '70%',
    transform: 'translateY(-50px)',
  },
  content: {

  }
}));

const Dog = () => {
  const classes = useStyles();
  /* const { loading, error, data } = useQuery(DOG_DATA); */

  /* if (loading) {
   *   return (
   *     <Paper />
   *   );
   * } */
  const data = {
    pius: {
      name: 'Pius',
      zip: '64111',
      breeds: ['American Eskimo Dog (Standard)', 'American Staffordshire Terrier'],
      sex: 'male',
      weight: '40lbs',
      activityValue: 10000,
      activityGoal: 15000,
      picture: 'http://placerabbit.com/rabbit/1500x1500.jpg',
    },
  };
  const { pius } = data;

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Card className={classes.bio}>
        <CardMedia
          className={classes.dogAvatar}
          image={pius.picture}
          alt={pius.name}
        />
        <CardContent className={classes.content}>
          <Typography>{pius.name}</Typography>
          <Typography>{pius.sex}, {pius.zip}</Typography>
        </CardContent>
      </Card>
    </Drawer>
  );
};

export default Dog;
