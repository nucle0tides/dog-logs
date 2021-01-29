import { GraphQLNonNull, GraphQLString } from 'graphql';
import Dog from '../../types/Dog';

export default {
  type: Dog,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args, context) => {
    const { id } = args;
    const { dataSources } = context;
    return dataSources.fitBarkAPI.getDog(id);
  },
};
