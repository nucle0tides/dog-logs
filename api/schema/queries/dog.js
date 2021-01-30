import { GraphQLNonNull, GraphQLString } from 'graphql';
import Dog from '../../types/Dog';

export default {
  type: Dog,
  args: {
    id: { type: GraphQLString },
  },
  resolve: async (obj, args, context) => {
    const { id } = args;
    const { pius, dataSources } = context;
    return dataSources.fitBarkAPI.getDog(id || pius);
  },
};
