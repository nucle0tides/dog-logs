import { GraphQLInputObjectType, GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import Date from './DateScalar';

export default new GraphQLInputObjectType({
  name: 'ActivityInput',
  fields: {
    slug: { type: GraphQLString },
    from: { type: new GraphQLNonNull(Date) },
    to: { type: new GraphQLNonNull(Date) },
    resolution: { type: GraphQLString },
  },
});
