

import { Post } from '@/utils/schemas';
import { ApiService } from '@/utils/apiSocialApp';


export interface TimelinePageData {
  posts: Post[];
  error?: string;
}


export async function getTimelinePageData(): Promise<TimelinePageData> {
  
  try {
    const posts = await ApiService.fetchPosts(30);
    return { posts };
  } catch (error) {
    console.error('Error loading data:', error);

    return {
      posts: [],
      error: 'Failed to load',
    };
  }
}



