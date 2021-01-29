import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import Dog from './Dog';

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
      resolve: (obj, args, context) => {
        const { slug } = obj;
        const { dataSources } = context;
        return dataSources.fitBarkAPI.getUserImage(slug);
      }
    },
    dogs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Dog))),
      resolve: (obj, args, context) => {
        const { dataSources } = context;
        return dataSources.fitBarkAPI.getDogRelations();
      }
    },
  },
});

export default User;
