import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, Scatter, ResponsiveContainer
} from 'recharts';

const SERIES_DATA = gql`
  query getActivitySeries($input: ActivityInput!) {
    activitySeries(input: $input) {
      records {
        date
        activityValue
        play
        active
        rest
      }
    }
  }
`;

const ActivitySeries = () => {
  const { loading, error, data: queryData } = useQuery(
    SERIES_DATA,
    {
      variables: {
        input: {
          from: '2021-01-29',
          to: '2021-01-31',
          resolution: 'HOURLY',
        },
      },
    },
  );

  if (loading) { return 'Loading...'; }

  if (error) console.debug(error);

  const { activitySeries } = queryData;
  const { records } = activitySeries;

  return (
    <ResponsiveContainer height={500} width="100%">
      <ComposedChart
        data={records}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="play" stackId="foo" barSize={20} fill="pink" />
        <Bar dataKey="active" stackId="foo" barSize={20} fill="green" />
        <Bar dataKey="rest" stackId="foo" barSize={20} fill="orange" />
        <Line type="monotone" dataKey="activityValue" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ActivitySeries;
