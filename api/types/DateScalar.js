import { GraphQLScalarType } from 'graphql';

export default new GraphQLScalarType({
  name: 'Date',
  serialize: (value) => {
    const [year, month, day] = value.split(/-| /);
    return `${month}/${day}/${year}`;
  },
  parseValue: (value) => {
    return new Date(value).toISOString();
  },
});
