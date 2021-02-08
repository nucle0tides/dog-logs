import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, Text } from 'recharts';
import styles from './styles.scss';

const DOG_DATA = gql`
  query getPius {
    pius: dog {
      name
      picture
      weight
      gender
      activityValue
      activityGoal
      hourlyAverage
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
    overflow: 'initial',
  },
  dogAvatar: {
    width: 150,
    height: 150,
    borderRadius: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: `translateY(${theme.spacing(-5)}px)`,
  },
  bioContent: {
    marginTop: theme.spacing(-5),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  stats: {
    width: 250,
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
  statsContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  progress: {
    width: 250,
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(2),
    textAlign: 'center',
  },
}));

// there's lots going on here
// break up into smaller components later
const Dog = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { loading, error, data } = useQuery(DOG_DATA);

  if (loading) {
    // add loading indicators
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      />
    );
  }

  const { pius } = data;

  const activityData = [ { points: pius.activityValue, goal: pius.activityGoal } ];

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
          component="img"
          src={`data:image/png;base64, ${pius.picture}`}
          alt={pius.name}
        />
        <CardContent className={classes.bioContent}>
          <Typography variant="h4" component="h1">{pius.name}</Typography>
          <Typography component="h2">{pius.breeds.join(' && ')}</Typography>
        </CardContent>
      </Card>
      <Card className={classes.stats}>
        <CardContent className={classes.statsContent}>
          <div>
            <Typography variant="h6" component="h3">gender</Typography>
            <Typography component="h4">{pius.gender}</Typography>
          </div>
          <div>
            <Typography variant="h6" component="h3">weight</Typography>
            <Typography component="h4">{pius.weight}</Typography>
          </div>
        </CardContent>
      </Card>
      <Card className={classes.progress}>
        <CardContent>
          <Typography variant="h6" component="h1">Activity Progress</Typography>
          <ResponsiveContainer minHeight={150} width="100%">
            <RadialBarChart
              data={activityData}
              startAngle={90}
              endAngle={-270}
              innerRadius="100%"
              outerRadius="75%"
            >
              <PolarAngleAxis
                type="number"
                domain={[0, pius.activityGoal]}
                tick={false}
              />
              <RadialBar
                background
                clockWise
                dataKey="points"
                fill={theme.palette.secondary.main}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {pius.activityValue} Points
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className={classes.progress}>
        <CardContent>
          <Typography variant="h6">Hourly Average</Typography>
          <Typography>{pius.hourlyAverage} points/hour</Typography>
        </CardContent>
      </Card>
    </Drawer>
  );
};

export default Dog;
