import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const ACTIVITY_DATA = gql`
  query getActivityLevel($input: ActivityInput!) {
    activityLevel(input: $input) {
      play
      rest
      active
    }
  }
`;

const ActivityLevel = () => {
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
  const data = Object.entries({ play, rest, active }).map(
    ([key, val]) => ({
      activity: key,
      value: val,
  }));

  const randomColor = () => Math.floor(Math.random()*16777215).toString(16);

  return (
    <RadarChart width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="activity" />
      <PolarRadiusAxis />
      <Radar
        name="Pius"
        dataKey="value"
        fill="#E3B215"
        stroke="#E3B215"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default ActivityLevel;
