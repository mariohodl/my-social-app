import {
  PostsResponseSchema,
  Post,
  User,
  UserSchema,
  UsersResponseSchema
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

  static async fetchPostsByUser(userId: number): Promise<Post[]> {
    try {
      const response = await fetch(`${apiUrl}/posts/user/${userId}`);
      const data = await response.json();
      const validated = PostsResponseSchema.parse(data);
      return validated.posts;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user posts');
    }
  }

  static async fetchUsers(limit = 10, skip = 0): Promise<User[]> {
    try {
      const response = await fetch(
        `${apiUrl}/users?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      const validated = UsersResponseSchema.parse(data);
      return validated.users;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch users');
    }
  }

  static async fetchUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${apiUrl}/users/${id}`);
      const data = await response.json();
      return UserSchema.parse(data);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user');
    }
  }

  static async searchPosts(query: string): Promise<Post[]> {
    try {
      const response = await fetch(`${apiUrl}/posts/search?q=${query}`);
      const data = await response.json();
      const validated = PostsResponseSchema.parse(data);
      return validated.posts;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to search posts');
    }
  }
}


