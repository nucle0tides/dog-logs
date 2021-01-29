import { GraphQLScalarType } from 'graphql';

export default new GraphQLScalarType({
  name: 'Date',
  serialize: (value) => {
    return value;
  },
  parseValue: (value) => {
    return new Date(value).toISOString();
  },
});
