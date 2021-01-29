import User from '../../types/User';

export default {
  type: User,
  resolve: async (obj, args, context) => {
    const { dataSources } = context;
    return dataSources.fitBarkAPI.getUser();
  },
};
