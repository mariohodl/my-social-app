
import { create } from 'zustand'
import { Post, User, Friend } from './schemas'



interface AppSocialStore {

  currentUser: User | null;
  users: User[];

  posts: Post[];
  friends: Friend[];
  selectedPost: Post | null;
  isPendingLoading: boolean
  error: string | null;
  setCurrentUser: (user: User | null) => void;
  setUsers: (users: User[]) => void
  setPosts: (posts: Post[]) => void
  setFriends: (friends: Friend[]) => void;

  setSelectedPost: (post: Post | null) => void;
  setLoadingPending: (isPending: boolean) => void;
  setError: (error: string | null) => void;
  addPost: (post: Post) => void;
  updatePost: (id: number, post: Partial<Post>) => void;
  deletePost: (id: number) => void;
  addFriend: (friend: Friend) => void
  removeFriend: (friendId: number) => void

}

export const useSocialStore = create<AppSocialStore>((set) => ({
  currentUser: null,
  users: [],
  posts: [],
  friends: [],
  selectedPost: null,
  isPendingLoading: false,
  error: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  setUsers: (users) => set({ users }),
  setPosts: (allPosts) => set({ posts: allPosts }),
  setFriends: (allFriends) => set({ friends: allFriends }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setLoadingPending: (isLoading) => set({ isPendingLoading: isLoading }),
  setError: (errorMessage) => set({ error: errorMessage }),


  addPost: (post) => set((state) => ({
    posts: [post, ...state.posts]
  })),
  updatePost: (id, updatedPost) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, ...updatedPost } : post
    ),
  })),
  deletePost: (id) => set((state) => ({
    posts: state.posts.filter((post) => post.id !== id),
  })),

  addFriend: (friend) => set((state) => ({
    friends: [...state.friends, friend],
  })),

  removeFriend: (friendId) => set((state) => ({
    friends: state.friends.filter((friend) => friend.friendId !== friendId),
  }))
}))
