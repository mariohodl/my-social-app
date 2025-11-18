import {
  PostsResponseSchema,
  Post,
} from './schemas';

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
export class ApiService {

  static async fetchPosts(limit = 10, skip = 0): Promise<Post[]> {
    try {
      const response = await fetch(
        `${apiUrl}/posts?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      const validPosts = PostsResponseSchema.parse(data);
      return validPosts.posts;

    } catch (error) {
      console.error('Error fetching:', error);
      throw new Error('Failed to get posts');
    }

  }
}


