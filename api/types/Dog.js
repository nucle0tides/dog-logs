import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

const Dog = new GraphQLObjectType({
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
    }
  },
});

export default Dog;
