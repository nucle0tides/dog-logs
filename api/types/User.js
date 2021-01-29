import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (obj, args, context) => {
        return obj.slug;
      }
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    picture: {
      type: GraphQLString,
      resolve: async (obj, args, context) => {
        const { slug } = obj;
        const { dataSources } = context;
        return dataSources.fitBarkAPI.getUserImage(slug);
      }
    },
  },
});

export default User;
