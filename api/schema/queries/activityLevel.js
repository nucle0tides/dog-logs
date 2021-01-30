import { GraphQLNonNull, GraphQLString } from 'graphql';
import ActivityLevel from '../../types/ActivityLevel';
import ActivityInput from '../../types/ActivityInput';

export default {
  type: ActivityLevel,
  args: {
    input: { type: ActivityInput },
  },
  resolve: async (obj, args, context) => {
    const { input } = args;
    const { pius, dataSources } = context;
    return dataSources.fitBarkAPI.getActivityLevel({ slug: pius, input });
  },
};
