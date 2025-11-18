'use client';

import Link from 'next/link';
import { Post } from '@/utils/schemas';
import { ThumbsUp, ThumbsDown, Eye } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post?.id}`}>
      <div className="bg-white p-3 hover:shadow-lg transition-shadow cursor-pointer hover:border border-green-300">
        <div>
          <h3 className="text-xl font-semibold line-clamp-2">{post?.title}</h3>
        </div>
        <div>
          <p className="text-gray-600 line-clamp-3">{post?.body}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {post?.tags.map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {post?.reactions.likes}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsDown className="w-4 h-4" />
              {post?.reactions.dislikes}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}


