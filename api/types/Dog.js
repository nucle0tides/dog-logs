import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import Date from './DateScalar';
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
    birth: { type: new GraphQLNonNull(Date) },
    activityValue: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (obj, args, context) => obj.activity_value,
    },
    hourlyAverage: {
      type: GraphQLInt,
      resolve: (obj, args, context) => obj.hourly_average,
    },
    activityGoal: {
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
    },
    breeds: {
      type: new GraphQLNonNull(GraphQLList(GraphQLString)),
      resolve: (obj, args, context) => {
        const { breed1 = {}, breed2 = {} } = obj;
        return [breed1.name, breed2.name].filter(Boolean);
      }
    },
  },
});
