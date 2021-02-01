import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'ActivityLevel',
  fields: {
    id: {
      type: GraphQLString,
      resolve: (obj, args, context) => obj.slug,
    },
    // change to a single 'ActivityRecord'
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
