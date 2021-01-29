import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import ActivityLevel from './ActivityLevel';
import ActivityInput from './ActivityInput';

export default new GraphQLObjectType({
  name: 'Dog',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (obj, args, context) => obj.slug,
    },
    name: { type: new GraphQLNonNull(GraphQLString) },
    birth: { type: new GraphQLNonNull(GraphQLString) },
    goal: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (obj, args, context) => obj.daily_goal,
    },
    weight: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (obj, args, context) => `${obj.weight} ${obj.weight_unit}`,
    },
    picture: {
      type: GraphQLString,
      resolve: (obj, args, context) => {
        const { slug } = obj;
        const { dataSources } = context;
        return dataSources.fitBarkAPI.getDogImage(slug);
      }
    },
    activityLevel: {
      type: ActivityLevel,
      args: {
        input: { type: ActivityInput },
      },
      resolve: (obj, args, context) => {
        const { slug } = obj;
        const { input } = args;
        const { dataSources } = context;
        return dataSources.fitBarkAPI.getActivityLevel({ slug, input });
      }
    }
  },
});
