import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ActivityLevel from '../../ActivityLevel';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const SERIES_DATA = gql`
  query getActivitySeries($input: ActivityInput!) {
    activitySeries(input: $input) {
      records {
        date
        activityValue
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    textAlign: 'center',
  }
}));

const ActivityValue = () => {
  const theme = useTheme();
  const styles = useStyles();
  const { loading, error, data: queryData } = useQuery(
    SERIES_DATA,
    {
      variables: {
        input: {
          from: '2021-01-07',
          to: '2021-02-07',
          resolution: 'DAILY',
        },
      },
    },
  );

  if (loading) { return 'Loading...'; }

  if (error) console.debug(error);

  const { activitySeries } = queryData;
  const { records } = activitySeries;

  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography variant="h5">Total Points: 7 Jan - 7 Feb</Typography>
        <ResponsiveContainer height={400}>
          <AreaChart
            data={records}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              dataKey="activityValue"
              stroke={theme.palette.secondary.dark}
              fill={theme.palette.secondary.dark}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityValue;
