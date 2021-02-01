import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLNonNull } from 'graphql';
import Date from './DateScalar';

export default new GraphQLObjectType({
  name: 'ActivityRecord',
  fields: {
    date: {
      type: new GraphQLNonNull(Date),
    },
    time: {
      type: GraphQLString,
      resovle: (obj, args, context) => {
        debugger;
        const { date } = obj;
        const opts = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        debugger;
        return new Date(date).toLocaleString('en-US', opts);
      },
    },
    activityValue: {
      type: GraphQLFloat,
      resolve: (obj, args, context) => obj.activity_value,
    },
    play: {
      type: GraphQLFloat,
      resolve: (obj, args, context) => obj.min_play,
    },
    active: {
      type: GraphQLFloat,
      resolve: (obj, args, context) => obj.min_active,
    },
    rest: {
      type: GraphQLFloat,
      resolve: (obj, args, context) => obj.min_rest,
    },
    origActivityValue: {
      type: GraphQLFloat,
      resolve: (obj, args, context) => obj.activity_value,
    },
    origPlay: {
      type: GraphQLFloat,
      resolve: (obj, args, context) => obj.min_play,
    },
    origActive: {
      type: GraphQLFloat,
      resolve: (obj, args, context) => obj.min_active,
    },
    origRest: {
      type: GraphQLFloat,
      resolve: (obj, args, context) => obj.min_rest,
    },
  },
});
