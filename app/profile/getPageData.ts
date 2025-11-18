import { ApiService } from '@/utils/apiSocialApp';
import { User, Post } from '@/utils/schemas';

export interface ProfilePageData {
  user: User;
  posts: Post[];
  error?: string;
}

export async function getProfilePageData(userId: number = 1): Promise<ProfilePageData> {
  try {
    const user = await ApiService.fetchUserById(userId);
    const posts = await ApiService.fetchPostsByUser(userId);
    return { user, posts };
  } catch (error) {
    console.error( error);
    throw new Error('Failed to load');
  }
}
