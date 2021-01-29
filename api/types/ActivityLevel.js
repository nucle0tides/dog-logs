import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'ActivityLevel',
  fields: {
    play: {
      type: GraphQLInt,
      resolve: (obj, args, context) => obj.min_play,
    },
    active: {
      type: GraphQLInt,
      resolve: (obj, args, context) => obj.min_active,
    },
    rest: {
      type: GraphQLInt,
      resolve: (obj, args, context) => obj.min_rest,
    }
  },
});
