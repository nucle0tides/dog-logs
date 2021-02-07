import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTheme } from '@material-ui/core/styles';
import {
  PieChart, Pie, Sector, Cell, Tooltip,
} from 'recharts';

/* import {
 *   Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
 * } from 'recharts';
 *  */
const ACTIVITY_DATA = gql`
  query getActivityLevel($input: ActivityInput!) {
    activityLevel(input: $input) {
      play
      active
      rest
    }
  }
`;

const ActivityLevel = () => {
  const theme = useTheme();

  const { loading, error, data: queryData } = useQuery(
    ACTIVITY_DATA,
    {
      variables: {
        input: {
          from: '2020-12-31',
          to: '2021-01-31',
        },
      },
    },
  );

  if (loading) { return 'Loading...'; }

  if (error) console.debug(error);

  const { activityLevel } = queryData;
  const { play, rest, active } = activityLevel;
  const data = Object.entries({ play, active, rest }).map(
    ([key, val]) => ({
      name: key,
      value: val,
  }));

  console.log(data);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill={theme.palette.primary.dark}
        dataKey="value"
        label
      />
      <Tooltip />
    </PieChart>
  );
};

export default ActivityLevel;
