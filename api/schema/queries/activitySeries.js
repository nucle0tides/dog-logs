import { GraphQLString } from 'graphql';
import ActivitySeries from '../../types/ActivitySeries';
import ActivityInput from '../../types/ActivityInput';

export default {
  type: ActivitySeries,
  args: {
    input: { type: ActivityInput },
  },
  resolve: async (obj, args, context) => {
    const { input } = args;
    const { pius, dataSources } = context;
    return dataSources.fitBarkAPI.getActivitySeries({ slug: pius, input });
  },
};
