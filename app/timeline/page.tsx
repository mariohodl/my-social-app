'use client'

import React, {useState, useEffect } from 'react'
import { getTimelinePageData, TimelinePageData } from './getPageData';
import { useSocialStore } from '@/utils/appStore';
import { Loader2 } from 'lucide-react';
import { getTimelineLayout } from './getLayout';
import { ApiService } from '@/utils/apiSocialApp';
import { PostCard } from '@/components/PostCard';

function TimelinePage() {
  const [data, setData] = useState<TimelinePageData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { setPosts, posts } = useSocialStore();

  useEffect(() => {
    async function loadData() {
      const pageData = await getTimelinePageData();
      setData(pageData);
      setPosts(pageData.posts);
      console.log({pageData})

    }
    loadData();
  }, [setPosts]);

  useEffect(() => {

    async function loadData() {
      const pageData = await getTimelinePageData();
      setData(pageData);
      setPosts(pageData.posts);
    }
    loadData();
  }, [setPosts]);

  useEffect(() => {

    if (!searchQuery.trim()) {
      if (data) {
        setPosts(data.posts);
      }
      return;
    }

    const debounce = setTimeout(async () => {
      setIsSearching(true);
      try {

        const results = await ApiService.searchPosts(searchQuery);
        setPosts(results);

      } catch (error) {
        console.error(error);

      } finally {
        setIsSearching(false);
      }

    }, 800);

    return () => clearTimeout(debounce);
  }, [searchQuery, data, setPosts]);


  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{data.error}</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-40">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Yours Timeline</h1>
        <input
          type="search"
          placeholder="Search some posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-[500px] border-0"
        />
      </div>

      {isSearching ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Posts not found
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))}
        </div>
      )}
    </div>
  );
}

TimelinePage.getLayout = getTimelineLayout;

export default TimelinePage;
