import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt } from 'graphql';
import ActivityRecord from './ActivityRecord'

export default new GraphQLObjectType({
  name: 'ActivitySeries',
  fields: {
    id: {
      type: GraphQLString,
      resolve: (obj, args, context) => obj.slug,
    },
    records: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ActivityRecord))),
    },
  },
});
