'use client';

import { useEffect, useState } from 'react';

import { getProfileLayout } from './getLayout';
import { getProfilePageData, ProfilePageData } from './getPageData';
import { useSocialStore } from '@/utils/appStore';
import { Loader2, Mail, Calendar } from 'lucide-react';
import { PostCard } from '@/components/PostCard';

function ProfilePage() {
  const [data, setData] = useState<ProfilePageData | null>(null);
  const { setCurrentUser } = useSocialStore();

  useEffect(() => {
    async function loadData() {
      const pageData = await getProfilePageData(1);
      setData(pageData);
      setCurrentUser(pageData.user);
    }
    loadData();
  }, [setCurrentUser]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const { user, posts } = data;
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="p-10">
      <div className="mb-8">
        <div className="pb-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-32 h-32">
              <img src={user.image} alt={user.username} />
              <div className="text-2xl">{initials}</div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-xl text-gray-600 mb-4">@{user.username}</p>
              {user.bio && (
                <p className="text-gray-700 mb-4">{user.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                {user.age && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {user.age} years old
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div defaultValue="posts" className="w-full">
        <div className="grid w-full max-w-md grid-cols-2">
          <div >My Posts ({posts.length})</div>
          <div>About</div>
        </div>
        <div className="mt-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No posts yet
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-6">
          <div>
              <h2 className="text-xl font-semibold">About</h2>
            <div>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-base">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p className="text-base">@{user.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base">{user.email}</p>
                </div>
                {user.age && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="text-base">{user.age} years old</p>
                  </div>
                )}
                {user.gender && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-base capitalize">{user.gender}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfilePage.getLayout = getProfileLayout;

export default ProfilePage;
