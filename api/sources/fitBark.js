import { RESTDataSource } from 'apollo-datasource-rest';

class FitBarkAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://app.fitbark.com/api/v2/';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getUser() {
    const { user } = await this.get('user');
    return user;
  }

  async getUserImage(user_slug) {
    const { image: { data } } = await this.get(`picture/user/${user_slug}`);
    return data;
  }

}

export default FitBarkAPI;