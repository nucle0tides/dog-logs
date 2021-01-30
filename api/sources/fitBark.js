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

  async getDogRelations() {
    const { dog_relations } = await this.get('dog_relations');
    return dog_relations.map(rel => rel.dog);
  }

  async getDog(slug) {
    const { dog } = await this.get(`dog/${slug}`);
    return dog;
  }

  async getDogImage(dog_slug) {
    const { image: { data } } = await this.get(`picture/dog/${dog_slug}`);
    return data;
  }

  async getActivityLevel({ slug, input }) {
    const { activity_level } = await this.post('time_breakdown', { dog: { slug, ...input } });
    return { ...activity_level, slug, ...input };
  }
}

export default FitBarkAPI;
