
import { z } from 'zod';


export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
  gender: z.string().optional(),
  image: z.string().url().optional(),
  bio: z.string().optional()

});

export const UserPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
  tags: z.array(z.string()),
  reactions: z.object({
    likes: z.number(),
    dislikes: z.number()
  }),
  views: z.number()
});


export const UserCommentSchema = z.object({
  id: z.number(),
  postId: z.number(),
  body: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string()
  })
});



export const FriendSchema = z.object({
  id: z.number(),
  userId: z.number(),
  friendId: z.number(),
  status: z.enum(['pending', 'accepted', 'rejected']),
  createdAt: z.string()
});

export type User = z.infer<typeof UserSchema>
export type Post = z.infer<typeof UserPostSchema>

export type Comment = z.infer<typeof UserCommentSchema>;
export type Friend = z.infer<typeof FriendSchema>;

export const PostsResponseSchema = z.object({
  posts: z.array(UserPostSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number()
});

export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number()
  
});

export type UerPostsResponse = z.infer<typeof PostsResponseSchema>;

export type UsersResponse = z.infer<typeof UsersResponseSchema>;



